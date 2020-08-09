import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormControlName,
} from "@angular/forms";
import { Observable, fromEvent } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriesService } from "../../category.service";
import {
  Category,
  CreateSubCategoryDto,
  UpdateCategoryDto,
  Vendor,
} from "src/app/common/generated-types";
import { NotificationService } from "src/app/core/services/notification.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  tap,
} from "rxjs/operators";
import { VendorsService } from "../../../vendors/vendors.service";

@AutoUnsubscribe()
@Component({
  selector: "app-categories-editor",
  templateUrl: "categories-editor.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesEditorComponent implements OnInit, OnDestroy {
  readonly types: string[] = ["Main Category", "Sub Category"];
  categoryEditorForm: FormGroup;
  submitLoading: boolean;
  loading = true;
  previewImage: any;
  categories$: Observable<Category[]>;
  vendors$: Observable<Vendor[]>;
  @ViewChild("mainCategorySearch", { static: true })
  mainCategorySearch: ElementRef;
  @ViewChild("vendorSearch", { static: true }) venodorSearch: ElementRef;
  updatedCategory: Category;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly categoriesService: CategoriesService,
    private readonly vendorsService: VendorsService,
    private readonly notify: NotificationService
  ) {}
  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get("slug");

    this.categories$ = fromEvent(
      this.mainCategorySearch.nativeElement,
      "keyup"
    ).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => {
        return this.categoriesService.getMainCategories(
          {},
          { searchKey: this.mainCategorySearch.nativeElement.value }
        );
      }),
      map((response) => response.categories)
    );

    this.vendors$ = fromEvent(this.venodorSearch.nativeElement, "keyup").pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => {
        return this.vendorsService.getAll(
          {},
          { searchKey: this.venodorSearch.nativeElement.value }
        );
      }),
      map((response) => response.vendors)
    );

    this.categoriesService.getCategoryById(categoryId).subscribe((data) => {
      this.updatedCategory = data;
      this.loading = false;
      const {
        nameAr,
        nameEn,
        descriptionAr,
        activated,
        descriptionEn,
        thumbnail,
        vendor,
      } = data;

      this.categoryEditorForm.patchValue({
        vendor: vendor ? vendor : null,
        nameAr,
        nameEn,
        activated,
        descriptionAr,
        descriptionEn,
        thumbnail,
        type: "Main Category",
      });
    });

    this.initCategoryForm();
  }

  ngOnDestroy(): void {}

  private initCategoryForm(): void {
    this.categoryEditorForm = new FormGroup({
      vendor: new FormControl(null),
      mainCategory: new FormControl({
        value: null,
        disabled: true,
      }),
      nameAr: new FormControl(null, [Validators.required]),
      nameEn: new FormControl(null, [Validators.required]),
      descriptionAr: new FormControl(null),
      descriptionEn: new FormControl(null),
      thumbnail: new FormControl(null),
      newThumbnail: new FormControl(null),
      activated: new FormControl(null),
      type: new FormControl(null),
    });
  }

  submit(): void {
    this.categoryEditorForm.markAllAsTouched();
    const controls = this.categoryEditorForm.controls;
    const invalidControls = [];
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }
    if (!invalidControls.length && !this.submitLoading) {
      const {
        mainCategory,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        newThumbnail,
        vendor,
        activated,
      } = this.categoryEditorForm.value;

      console.log(this.categoryEditorForm.value);

      if (this.categoryEditorForm.get("mainCategory").value) {
        const subCategoryInput: CreateSubCategoryDto = {
          categoryId: mainCategory.id,
          nameAr,
          nameEn,
          descriptionAr,
          descriptionEn,
          thumbnail: newThumbnail,
        };

        this.submitLoading = true;

        this.categoriesService
          .createSubCategory(subCategoryInput)
          .pipe(tap(() => (this.submitLoading = false)))
          .subscribe({
            next: (response) => {
              if (response.success) {
                this.notify.success("SubCategory has been created");
                this.router.navigate(["/dashboard/categories"]);
              } else {
                this.notify.info(response.message);
              }
            },
            error: () => this.notify.error("Something went wrong"),
          });
      } else {
        const mainCategoryInput: UpdateCategoryDto = {
          vendorId: vendor ? vendor.id : null,
          activated,
          nameAr,
          nameEn,
          descriptionAr,
          descriptionEn,
          thumbnail: newThumbnail,
        };

        if (!newThumbnail) {
          delete mainCategoryInput.thumbnail;
        }

        this.submitLoading = true;

        this.categoriesService
          .updateCategory(this.updatedCategory.id, mainCategoryInput)
          .pipe(tap(() => (this.submitLoading = false)))
          .subscribe({
            next: (response) => {
              if (response.success) {
                this.submitLoading = false;
                this.notify.success("Main Category has been updated");
                this.router.navigate(["/dashboard/categories"]);
              } else {
                this.notify.info(response.message);
              }
            },
            error: () => this.notify.error("Something went wrong"),
          });
      }
    }
  }

  goBack(): void {
    this.router.navigateByUrl("/dashboard/categories", {
      relativeTo: this.route,
    });
  }

  resetForm(): void {
    this.categoryEditorForm.reset();
  }

  displayFn(item: Category | Vendor): string {
    return item ? `${item.nameEn} - ${item.nameAr}` : "";
  }

  onSelectType(event) {
    if (event.value === "Main category") {
      this.categoryEditorForm.get("mainCategory").disable();
      this.categoryEditorForm.get("mainCategory").reset();
      this.categoryEditorForm.get("mainCategory").clearValidators();
    } else {
      this.categoryEditorForm.get("mainCategory").enable();
      this.categoryEditorForm
        .get("mainCategory")
        .setValidators(Validators.required);
    }
  }

  uploadThumbnail(event: Event): void {
    const thumbnail = (event.target as HTMLInputElement).files[0];
    this.categoryEditorForm.patchValue({ newThumbnail: thumbnail });
    this.categoryEditorForm.get("newThumbnail").updateValueAndValidity();

    if (thumbnail) {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnail);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.categoryEditorForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }
}
