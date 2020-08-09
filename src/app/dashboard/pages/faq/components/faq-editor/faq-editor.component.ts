import { Component, OnInit, OnDestroy } from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { FaqService } from "../../faq.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UpdateStaticValueInput } from "src/app/common/generated-types";
import { NotificationService } from "src/app/core/services/notification.service";

@AutoUnsubscribe()
@Component({
  templateUrl: "./faq-editor.component.html",
  styleUrls: ["./faq-editor.component.scss"],
})
export class FaqEditorComponent implements OnInit, OnDestroy {
  faqEditorForm: FormGroup;
  loading = true;
  submitLoading: boolean;
  updatedFaqId: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly faqService: FaqService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit(): void {
    const faqId = this.route.snapshot.paramMap.get("slug");
    this.faqService.getFaqById(faqId).subscribe((data) => {
      this.loading = false;
      this.updatedFaqId = data.id;
      const { titleAr, titleEn, contentEn, contentAr } = data;

      this.faqEditorForm.patchValue({
        titleAr,
        titleEn,
        contentEn,
        contentAr,
      });
    });

    this.initFaqForm();
  }

  private initFaqForm(): void {
    this.faqEditorForm = new FormGroup({
      titleAr: new FormControl(null, Validators.required),
      titleEn: new FormControl(null, Validators.required),
      contentEn: new FormControl("Answer in english"),
      contentAr: new FormControl("Answer in arabic"),
    });
  }

  submit(): void {
    this.faqEditorForm.markAllAsTouched();
    if (this.faqEditorForm.valid) {
      const {
        titleAr,
        titleEn,
        contentEn,
        contentAr,
      } = this.faqEditorForm.value;

      const faqInput: UpdateStaticValueInput = {
        staticValueId: this.updatedFaqId,
        titleAr,
        titleEn,
        contentEn,
        contentAr,
      };

      this.submitLoading = true;

      this.faqService.updateFaq(faqInput).subscribe({
        next: (response) => {
          this.submitLoading = false;
          if (response.success) {
            this.notify.success("FAQ has been updated");
            this.router.navigate(["/dashboard/faq"]);
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
    this.router.navigate(["/dashboard/faq"]);
  }

  resetForm(): void {
    this.faqEditorForm.reset();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.faqEditorForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  ngOnDestroy(): void {}
}
