import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { OptionsService } from "../../options.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { Observable } from "rxjs";
import { CreateOptionInput } from "src/app/common/generated-types";

@AutoUnsubscribe()
@Component({
  templateUrl: "./option-adder.component.html",
  styleUrls: ["./option-adder.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class OptionAdderComponent implements OnInit, OnDestroy {
  optionAdderForm: FormGroup;
  submitLoading: boolean;
  optionSets$: Observable<any[]>;
  previewImage: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly optionsService: OptionsService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.initOptionForm();
    this.optionSets$ = this.optionsService.getOptionSets();
  }

  ngOnDestroy(): void {}

  private initOptionForm(): void {
    this.optionAdderForm = new FormGroup(
      {
        optionSetId: new FormControl(null, [Validators.required]),
        nameAr: new FormControl(null, [Validators.required]),
        nameEn: new FormControl(null, [Validators.required]),
        thumbnail: new FormControl(null),
      },
      {
        updateOn: "blur",
      }
    );
  }

  submit() {
    this.optionAdderForm.markAllAsTouched();
    if (this.optionAdderForm.valid) {
      const {
        optionSetId,
        nameAr,
        nameEn,
        thumbnail,
      } = this.optionAdderForm.value;

      const optionInput: CreateOptionInput = {
        optionSetId,
        nameAr,
        nameEn,
        thumbnail,
      };

      this.submitLoading = true;

      this.optionsService.createOption(optionInput).subscribe({
        next: (response) => {
          if (response.success) {
            this.submitLoading = false;
            this.notify.success("Option has been created");
            this.router.navigate([".."], { relativeTo: this.route });
          } else {
            this.notify.info(response.message);
          }
        },
        error: () => this.notify.error("Something went wrong"),
      });
    }
  }

  goBack(): void {
    this.router.navigate([".."], { relativeTo: this.route });
  }

  resetForm(): void {
    this.optionAdderForm.reset();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.optionAdderForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  uploadThumbnail(event: Event): void {
    const thumbnail = (event.target as HTMLInputElement).files[0];
    this.optionAdderForm.patchValue({ thumbnail });
    this.optionAdderForm.get("thumbnail").updateValueAndValidity();

    if (thumbnail) {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnail);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }
}
