import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriesService } from "../../category.service";
import { Observable, fromEvent } from "rxjs";
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  tap,
  map,
  finalize,
} from "rxjs/operators";
import {
  Category,
  CreateSubCategoryDto,
  CreateCategoryDto,
  Vendor,
} from "src/app/common/generated-types";
import { NotificationService } from "src/app/core/services/notification.service";
import { VendorsService } from "../../../vendors/vendors.service";
@AutoUnsubscribe()
@Component({
  templateUrl: "categories-adder.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesAdderComponent implements OnInit, OnDestroy {
  readonly types: string[] = ["Main Category", "Sub Category"];
  categoryAdderForm: FormGroup;
  submitLoading: boolean;
  previewImage: any;
  categories$: Observable<Category[]>;
  vendors$: Observable<Vendor[]>;
  @ViewChild("mainCategorySearch", { static: true })
  mainCategorySearch: ElementRef;

  @ViewChild("vendorSearch", { static: true }) venodorSearch: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly categoriesService: CategoriesService,
    private readonly vendorsService: VendorsService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initCategoryForm();
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
  }

  ngOnDestroy(): void {}

  private initCategoryForm(): void {
    this.categoryAdderForm = new FormGroup({
      categoryType: new FormControl(null, Validators.required),
      mainCategory: new FormControl({
        value: null,
        disabled: true,
      }),
      vendor: new FormControl(null),
      nameAr: new FormControl(null, Validators.required),
      nameEn: new FormControl(null, Validators.required),
      descriptionAr: new FormControl(null),
      descriptionEn: new FormControl(null),
      thumbnail: new FormControl(null),
      type: new FormControl(null),
      activated: new FormControl(true),
    });
  }

  submit() {
    this.categoryAdderForm.markAllAsTouched();
    const controls = this.categoryAdderForm.controls;
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
        thumbnail,
        activated,
        vendor,
      } = this.categoryAdderForm.value;

      if (this.categoryAdderForm.get("mainCategory").value) {
        const subCategoryInput: CreateSubCategoryDto = {
          categoryId: mainCategory.id,
          nameAr,
          nameEn,
          descriptionAr,
          descriptionEn,
          thumbnail,
        };

        this.submitLoading = true;

        return this.categoriesService
          .createSubCategory(subCategoryInput)
          .pipe(finalize(() => (this.submitLoading = false)))
          .subscribe({
            next: (response) => {
              if (response.success) {
                this.notificationService.success(
                  "SubCategory has been created"
                );
                this.router.navigate([".."], {
                  relativeTo: this.activatedRoute,
                });
              } else {
                this.notificationService.info(response.message);
              }
            },
            error: () => this.notificationService.error("Something went wrong"),
          });
      } else {
        const mainCategoryInput: CreateCategoryDto = {
          vendorId: vendor ? vendor.id : null,
          nameAr,
          nameEn,
          descriptionAr,
          descriptionEn,
          thumbnail,
          activated,
        };

        this.submitLoading = true;

        this.categoriesService
          .createMainCategory(mainCategoryInput)
          .pipe(finalize(() => (this.submitLoading = false)))
          .subscribe({
            next: (response) => {
              if (response.success) {
                this.submitLoading = false;
                this.notificationService.success(
                  "Main Category has been created"
                );
                this.router.navigate([".."], {
                  relativeTo: this.activatedRoute,
                });
              } else {
                this.notificationService.info(response.message);
              }
            },
            error: () => this.notificationService.error("Something went wrong"),
          });
      }
    }
  }

  resetForm(): void {
    this.categoryAdderForm.reset();
  }

  goBack() {
    this.router.navigate([".."], { relativeTo: this.activatedRoute });
  }

  displayFn(item: Category | Vendor): string {
    return item ? `${item.nameEn} - ${item.nameAr}` : "";
  }

  onSelectType(event) {
    if (event.value === "Main category") {
      this.categoryAdderForm.get("mainCategory").disable();
      this.categoryAdderForm.get("mainCategory").reset();
      this.categoryAdderForm.get("mainCategory").clearValidators();
    } else {
      this.categoryAdderForm.get("mainCategory").enable();
      this.categoryAdderForm
        .get("mainCategory")
        .setValidators(Validators.required);
    }
  }

  uploadThumbnail(event: Event): void {
    const thumbnail = (event.target as HTMLInputElement).files[0];
    this.categoryAdderForm.patchValue({ thumbnail });
    this.categoryAdderForm.get("thumbnail").updateValueAndValidity();

    if (thumbnail) {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnail);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.categoryAdderForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }
}
