import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, fromEvent } from "rxjs";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  Product,
  Art,
  SubCategory,
  UpdateProductInput,
} from "src/app/common/generated-types";
import { NotificationService } from "src/app/core/services/notification.service";
import { OptionsService } from "../../../options/options.service";
import { CategoriesService } from "../../../categories/category.service";
import { ProductsService } from "../../products.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from "rxjs/operators";
import {
  MatChipInputEvent,
  MatAutocompleteSelectedEvent,
} from "@angular/material";
@AutoUnsubscribe()
@Component({
  templateUrl: "./product-editor.component.html",
  styleUrls: ["./product-editor.component.scss"],
})
export class ProductEditorComponent implements OnInit, OnDestroy {
  productEditorForm: FormGroup;
  submitLoading: boolean;
  loading = true;
  subCategories$: Observable<any[]>;
  @ViewChild("subCategorySearch", { static: true })
  subCategorySearch: ElementRef;

  /**
   * Properties for multiple select options
   */
  @ViewChild("optionSearch", { static: true })
  optionSearch: ElementRef;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes = [ENTER, COMMA];
  optionChips: string[] = [];
  filteredOptions$: Observable<any[]>;
  selectedOptions: any[] = [];
  previewImage: any;
  updatedProductId: string;

  /**
   * Properties for multiple input of features and details
   */
  addOnBlur = true;
  details: string[] = [];
  features: string[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly optionsService: OptionsService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get("slug");
    this.productsService.productById(productId).subscribe((data) => {
      this.loading = false;
      this.updatedProductId = data.id;

      const {
        subCategory,
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        thumbnails,
        featured,
        url,
        stock,
        options,
        details,
        features,
      } = data;

      this.selectedOptions = options;
      this.details = details;
      this.features = features;

      this.productEditorForm.patchValue({
        subCategory,
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        thumbnails: thumbnails ? thumbnails[0] : null,
        stock,
        featured,
        url,
      });
    });

    this.initProductForm();

    this.subCategories$ = fromEvent(
      this.subCategorySearch.nativeElement,
      "keyup"
    ).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => {
        return this.categoriesService.getSubcategories(
          {},
          { searchKey: this.subCategorySearch.nativeElement.value }
        );
      }),
      map((response) => response.subCategories)
    );

    this.filteredOptions$ = fromEvent(
      this.optionSearch.nativeElement,
      "keyup"
    ).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => {
        return this.optionsService.getAll(
          {},
          { searchKey: this.optionSearch.nativeElement.value }
        );
      }),
      map((response) => response.options)
    );
  }

  private initProductForm(): void {
    this.productEditorForm = new FormGroup({
      subCategory: new FormControl(null, [Validators.required]),
      sku: new FormControl(null),
      nameAr: new FormControl(null, [Validators.required]),
      nameEn: new FormControl(null, [Validators.required]),
      descriptionAr: new FormControl(null),
      descriptionEn: new FormControl(null),
      thumbnails: new FormControl(null),
      newThumbnails: new FormControl(null),
      stock: new FormControl(null),
      featured: new FormControl(null),
      url: new FormControl(""),
    });
  }

  submit(): void {
    this.productEditorForm.markAllAsTouched();
    if (this.productEditorForm.valid) {
      const {
        subCategory,
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        newThumbnails,
        stock,
        featured,
        url,
      } = this.productEditorForm.value;

      const productInput: UpdateProductInput = {
        subCategoryId: subCategory.id,
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        thumbnails: newThumbnails,
        featured,
        url,
        stock,
        options: this.selectedOptions.length
          ? this.selectedOptions.map((option) => option.id)
          : null,
        details: this.details.length ? this.details : null,
        features: this.features.length ? this.features : null,
      };

      if (!newThumbnails) {
        delete productInput.thumbnails;
      }

      this.submitLoading = true;

      this.productsService
        .updateProduct(this.updatedProductId, productInput)
        .subscribe({
          next: (response) => {
            this.submitLoading = false;
            if (response.success) {
              this.notify.success("Product has been updated");
              this.router.navigate(["/dashboard/products"]);
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

  ngOnDestroy(): void {}

  uploadThumbnail(event: Event): void {
    const thumbnails = (event.target as HTMLInputElement).files[0];
    this.productEditorForm.patchValue({ newThumbnails: thumbnails });
    this.productEditorForm.get("newThumbnails").updateValueAndValidity();

    if (thumbnails) {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnails);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  goBack(): void {
    this.router.navigate(["/dashboard/products"]);
  }

  resetForm(): void {
    this.productEditorForm.reset();
  }

  displaySubCategoryFn(subCategory: SubCategory): string {
    return subCategory ? `${subCategory.nameEn} - ${subCategory.nameAr}` : "";
  }

  displayArtFn(art: Art): string {
    return art ? `${art.nameEn} - ${art.nameAr}` : "";
  }

  displayMockupFn(product: Product) {
    return product ? `${product.nameEn} - ${product.nameAr}` : "";
  }

  addOption(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.optionChips.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
  }

  removeOption(option: string): void {
    const chipIndex = this.optionChips.indexOf(option);
    const selectedOptionIndex = this.selectedOptions.findIndex(
      (selectedOption) => {
        return `${selectedOption.nameEn} - ${selectedOption.nameAr}` === option;
      }
    );

    if (chipIndex >= 0) {
      this.optionChips.splice(chipIndex, 1);
    }

    if (selectedOptionIndex >= 0) {
      this.selectedOptions.splice(selectedOptionIndex, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.optionChips.push(event.option.viewValue);
    this.selectedOptions.push(event.option.value);
    this.optionSearch.nativeElement.value = "";
  }

  addDetail(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.details.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
  }
  removeDetail(detail: string): void {
    const index = this.details.indexOf(detail);

    if (index >= 0) {
      this.details.splice(index, 1);
    }
  }

  addFeature(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.features.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
  }
  removeFeature(feature: string) {
    const index = this.features.indexOf(feature);

    if (index >= 0) {
      this.features.splice(index, 1);
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.productEditorForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }
}
