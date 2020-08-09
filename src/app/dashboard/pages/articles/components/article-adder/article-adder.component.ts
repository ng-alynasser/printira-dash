import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ArticlesService } from "../../articles.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { CreateStaticValueInput } from "src/app/common/generated-types";
import { tap } from "rxjs/operators";
@AutoUnsubscribe()
@Component({
  templateUrl: "./article-adder.component.html",
  styleUrls: ["./article-adder.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleAdderComponent implements OnInit, OnDestroy {
  articleAdderForm: FormGroup;
  submitLoading: boolean;
  previewImage: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly articlesService: ArticlesService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.initArticleForm();
  }

  private initArticleForm(): void {
    this.articleAdderForm = new FormGroup({
      titleAr: new FormControl(null, Validators.required),
      titleEn: new FormControl(null, Validators.required),
      contentAr: new FormControl("Content In Arabic"),
      contentEn: new FormControl("Content In English"),
      thumbnail: new FormControl(null),
    });
  }

  submit(): void {
    this.articleAdderForm.markAllAsTouched();
    const {
      titleAr,
      titleEn,
      contentAr,
      contentEn,
      thumbnail,
    } = this.articleAdderForm.value;

    const articleInput: CreateStaticValueInput = {
      staticId: this.articlesService.staticId,
      titleAr,
      titleEn,
      contentAr,
      contentEn,
      thumbnail,
    };

    this.submitLoading = true;

    this.articlesService.createArticle(articleInput).subscribe({
      next: (response) => {
        this.submitLoading = false;
        if (response.success) {
          this.notify.success("Article has been created");
          this.router.navigate([".."], { relativeTo: this.route });
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

  resetForm(): void {
    this.articleAdderForm.reset();
  }

  goBack() {
    this.router.navigate([".."], { relativeTo: this.route });
  }

  uploadThumbnail(event: Event): void {
    const thumbnail = (event.target as HTMLInputElement).files[0];
    this.articleAdderForm.patchValue({ thumbnail });
    this.articleAdderForm.get("thumbnail").updateValueAndValidity();

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
    const control = this.articleAdderForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }
}
