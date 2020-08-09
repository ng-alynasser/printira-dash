import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, fromEvent } from "rxjs";
import {
  Option,
  SubCategory,
  Art,
  Product,
  CreateProductInput,
} from "src/app/common/generated-types";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductsService } from "../../products.service";
import { CategoriesService } from "../../../categories/category.service";
import { OptionsService } from "../../../options/options.service";
import { NotificationService } from "src/app/core/services/notification.service";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  tap,
} from "rxjs/operators";
import { ArtsService } from "../../../arts/arts.service";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MockupService } from "../../../mockups/mockup.service";
@AutoUnsubscribe()
@Component({
  templateUrl: "./product-adder.component.html",
  styleUrls: ["./product-adder.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProductAdderComponent implements OnInit, OnDestroy {
  productAdderForm: FormGroup;
  submitLoading: boolean;
  subCategories$: Observable<any[]>;
  arts$: Observable<any[]>;
  mockups$: Observable<any[]>;
  @ViewChild("subCategorySearch", { static: true })
  subCategorySearch: ElementRef;
  @ViewChild("artSearch", { static: true }) artSearch: ElementRef;
  @ViewChild("mockupSearch", { static: true }) mockupSearch: ElementRef;

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
  selectedOptions: Option[] = [];
  previewImage: any;

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
    private readonly mockupService: MockupService,
    private readonly categoriesService: CategoriesService,
    private readonly optionsService: OptionsService,
    private readonly artsService: ArtsService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit() {
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

    this.arts$ = fromEvent(this.artSearch.nativeElement, "keyup").pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => {
        return this.artsService.getAll(
          {},
          { searchKey: this.artSearch.nativeElement.value }
        );
      }),
      map((response) => response.data.arts)
    );

    this.mockups$ = fromEvent(this.mockupSearch.nativeElement, "keyup").pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => {
        return this.mockupService.getAll(
          {},
          { searchKey: this.mockupSearch.nativeElement.value }
        );
      }),
      map((response) => response.mockups)
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

  ngOnDestroy(): void {}

  private initProductForm(): void {
    this.productAdderForm = new FormGroup({
      subCategory: new FormControl(null, [Validators.required]),
      sku: new FormControl(null),
      nameAr: new FormControl(null, [Validators.required]),
      nameEn: new FormControl(null, [Validators.required]),
      descriptionAr: new FormControl(null),
      descriptionEn: new FormControl(null),
      thumbnails: new FormControl(null),
      stock: new FormControl(null),
      art: new FormControl(null, [Validators.required]),
      mockup: new FormControl(null, [Validators.required]),
      featured: new FormControl(true),
      url: new FormControl(""),
    });
  }

  uploadThumbnail(event: Event): void {
    const thumbnails = (event.target as HTMLInputElement).files[0];
    this.productAdderForm.patchValue({ thumbnails });
    this.productAdderForm.get("thumbnails").updateValueAndValidity();

    if (thumbnails) {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnails);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  submit(): void {
    this.productAdderForm.markAllAsTouched();
    if (this.productAdderForm.valid) {
      const {
        subCategory,
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        thumbnails,
        stock,
        art,
        mockup,
        featured,
        url,
      } = this.productAdderForm.value;

      const productInput: CreateProductInput = {
        subCategoryId: subCategory.id,
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        stock,
        thumbnails,
        featured,
        url,
        artId: art.id,
        mockupId: mockup.id,
        options: this.selectedOptions.length
          ? this.selectedOptions.map((option) => option.id)
          : null,
        details: this.details.length ? this.details : null,
        features: this.features.length ? this.features : null,
      };

      this.submitLoading = true;

      this.productsService.createProduct(productInput).subscribe({
        next: (response) => {
          this.submitLoading = false;
          if (response.success) {
            this.notify.success("Product has been created");
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
  }

  goBack(): void {
    this.router.navigate([".."], { relativeTo: this.route });
  }

  resetForm(): void {
    this.productAdderForm.reset();
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
    const control = this.productAdderForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }
}
