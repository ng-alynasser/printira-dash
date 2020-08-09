import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, fromEvent } from "rxjs";
import {
  SubCategory,
  Option,
  CreateMockupInput,
} from "src/app/common/generated-types";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/core/services/notification.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { CategoriesService } from "../../../categories/category.service";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  tap,
} from "rxjs/operators";
import { OptionsService } from "../../../options/options.service";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MockupService } from "../../mockup.service";

@AutoUnsubscribe()
@Component({
  templateUrl: "./mockup-adder.component.html",
  styleUrls: ["./mockup-adder.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MockupAdderComponent implements OnInit, OnDestroy {
  mockupAdderForm: FormGroup;
  submitLoading: boolean;
  subCategories$: Observable<any[]>;
  @ViewChild("subCategorySearch", { static: true })
  subCategorySearch: ElementRef;
  previewImage: any;

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

  /**
   * Properties for multiple input of features and details
   */
  addOnBlur = true;
  details: string[] = [];
  features: string[] = [];
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly mockupService: MockupService,
    private readonly notify: NotificationService,
    private readonly categoriesService: CategoriesService,
    private readonly optionsService: OptionsService
  ) {}

  ngOnInit(): void {
    this.initMockupForm();
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

  ngOnDestroy(): void {}

  private initMockupForm(): void {
    this.mockupAdderForm = new FormGroup({
      subCategory: new FormControl(null, [Validators.required]),
      sku: new FormControl(null),
      nameAr: new FormControl(null, [Validators.required]),
      nameEn: new FormControl(null, [Validators.required]),
      descriptionAr: new FormControl(null),
      descriptionEn: new FormControl(null),
      thumbnails: new FormControl(null),
    });
  }

  uploadThumbnail(event: Event): void {
    const thumbnails = (event.target as HTMLInputElement).files[0];
    this.mockupAdderForm.patchValue({ thumbnails });
    this.mockupAdderForm.get("thumbnails").updateValueAndValidity();

    if (thumbnails) {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnails);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  submit(): void {
    this.mockupAdderForm.markAllAsTouched();
    if (this.mockupAdderForm.valid) {
      const {
        subCategory,
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        thumbnails,
      } = this.mockupAdderForm.value;

      const mockupInput: CreateMockupInput = {
        subCategoryId: subCategory.id,
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        thumbnails,
        details: this.details.length ? this.details : null,
        features: this.features.length ? this.features : null,
        options: this.selectedOptions.length
          ? this.selectedOptions.map((option) => option.id)
          : null,
      };

      this.submitLoading = true;

      this.mockupService.createMockup(mockupInput).subscribe({
        next: (response) => {
          this.submitLoading = false;
          if (response.success) {
            this.notify.success("Mockup has been created");
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
    this.mockupAdderForm.reset();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.mockupAdderForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  displaySubCategoryFn(subCategory: SubCategory): string {
    return subCategory ? `${subCategory.nameEn} - ${subCategory.nameAr}` : "";
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
}
