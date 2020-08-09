import { Component, OnInit, OnDestroy } from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NotificationService } from "src/app/core/services/notification.service";
import { ArticlesService } from "../../articles.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdateStaticValueInput } from "src/app/common/generated-types";

@AutoUnsubscribe()
@Component({
  templateUrl: "./article-editor.component.html",
  styleUrls: ["./article-editor.component.scss"],
})
export class ArticleEditorComponent implements OnInit, OnDestroy {
  articleEditorForm: FormGroup;
  loading = true;
  submitLoading: boolean;
  previewImage: any;
  updatedArticleId: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly articlesService: ArticlesService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get("slug");
    this.articlesService.getArticleById(articleId).subscribe((data) => {
      this.loading = false;
      this.updatedArticleId = data.id;
      const { titleAr, titleEn, contentAr, contentEn, thumbnail } = data;

      this.articleEditorForm.patchValue({
        titleAr,
        titleEn,
        contentAr,
        contentEn,
        thumbnail,
      });
    });

    this.initArticleForm();
  }

  private initArticleForm(): void {
    this.articleEditorForm = new FormGroup({
      titleAr: new FormControl(null, Validators.required),
      titleEn: new FormControl(null, Validators.required),
      contentAr: new FormControl("Content In Arabic"),
      contentEn: new FormControl("Content In English"),
      thumbnail: new FormControl(null),
      newThumbnail: new FormControl(null),
    });
  }

  submit(): void {
    this.articleEditorForm.markAllAsTouched();
    if (this.articleEditorForm.valid) {
      const {
        titleAr,
        titleEn,
        contentAr,
        contentEn,
        newThumbnail,
      } = this.articleEditorForm.value;

      const articleInput: UpdateStaticValueInput = {
        staticValueId: this.updatedArticleId,
        titleAr,
        titleEn,
        contentAr,
        contentEn,
        thumbnail: newThumbnail,
      };

      if (!newThumbnail) {
        delete articleInput.thumbnail;
      }

      this.submitLoading = true;

      this.articlesService.updateArticle(articleInput).subscribe({
        next: (response) => {
          this.submitLoading = false;
          if (response.success) {
            this.notify.success("Article has been updated");
            this.router.navigate(["/dashboard/articles"]);
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

  resetForm(): void {
    this.articleEditorForm.reset();
  }

  goBack() {
    this.router.navigate(["/dashboard/articles"]);
  }

  uploadThumbnail(event: Event): void {
    const thumbnail = (event.target as HTMLInputElement).files[0];
    this.articleEditorForm.patchValue({ newThumbnail: thumbnail });
    this.articleEditorForm.get("newThumbnail").updateValueAndValidity();

    if (thumbnail) {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnail);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  ngOnDestroy(): void {}

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.articleEditorForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }
}
