import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { NotificationService } from "src/app/core/services/notification.service";
import { OptionsService } from "../../options.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdateOptionInput } from "src/app/common/generated-types";

@AutoUnsubscribe()
@Component({
  templateUrl: "./option-editor.component.html",
  styleUrls: ["./option-editor.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class OptionEditorComponent implements OnInit, OnDestroy {
  optionEditorForm: FormGroup;
  loading = true;
  submitLoading: boolean;
  optionSets$: Observable<any[]>;
  previewImage: any;
  updatedOptionId: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly optionsService: OptionsService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit(): void {
    const optionId = this.route.snapshot.paramMap.get("slug");
    this.optionsService.getOptionById(optionId).subscribe((data) => {
      this.loading = false;
      this.updatedOptionId = data.id;
      const { nameAr, nameEn, thumbnail, optionSet } = data;

      this.optionEditorForm.patchValue({
        optionSetId: optionSet.id,
        nameAr,
        nameEn,
        thumbnail,
      });
    });

    this.initOptionForm();
    this.optionSets$ = this.optionsService.getOptionSets();
  }

  private initOptionForm(): void {
    this.optionEditorForm = new FormGroup(
      {
        optionSetId: new FormControl(null, [Validators.required]),
        nameAr: new FormControl(null, [Validators.required]),
        nameEn: new FormControl(null, [Validators.required]),
        thumbnail: new FormControl(null),
        newThumbnail: new FormControl(null),
      },
      {
        updateOn: "blur",
      }
    );
  }

  submit(): void {
    this.optionEditorForm.markAllAsTouched();
    if (this.optionEditorForm.valid) {
      const {
        nameAr,
        nameEn,
        newThumbnail,
        optionSetId,
      } = this.optionEditorForm.value;

      const optionInput: UpdateOptionInput = {
        optionSetId,
        nameAr,
        nameEn,
        thumbnail: newThumbnail,
      };

      if (!newThumbnail) {
        delete optionInput.thumbnail;
      }

      this.submitLoading = true;

      this.optionsService
        .updateOption(this.updatedOptionId, optionInput)
        .subscribe({
          next: (response) => {
            this.submitLoading = false;
            if (response.success) {
              this.notify.success("Option has been updated");
              this.router.navigate(["/dashboard/options"]);
            } else {
              this.notify.info(response.message);
            }
          },
          error: () => {
            this.submitLoading = false;
            this.notify.error("Something went wrong");
          },
        });
    }
  }

  goBack(): void {
    this.router.navigate(["/dashboard/options"]);
  }

  resetForm(): void {
    this.optionEditorForm.reset();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.optionEditorForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  uploadThumbnail(event: Event): void {
    const thumbnail = (event.target as HTMLInputElement).files[0];
    this.optionEditorForm.patchValue({ newThumbnail: thumbnail });
    this.optionEditorForm.get("newThumbnail").updateValueAndValidity();

    if (thumbnail) {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnail);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  ngOnDestroy(): void {}
}
