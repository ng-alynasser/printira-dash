import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Observable, fromEvent } from "rxjs";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  Option,
  SubCategory,
  UpdateProductInput,
} from "src/app/common/generated-types";
import { Router, ActivatedRoute } from "@angular/router";
import { MockupService } from "../../mockup.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { CategoriesService } from "../../../categories/category.service";
import { OptionsService } from "../../../options/options.service";
import {
  distinctUntilChanged,
  debounceTime,
  map,
  switchMap,
} from "rxjs/operators";
import {
  MatChipInputEvent,
  MatAutocompleteSelectedEvent,
} from "@angular/material";

@AutoUnsubscribe()
@Component({
  templateUrl: "./mockup-editor.component.html",
  styleUrls: ["./mockup-editor.component.scss"],
})
export class MockupEditorComponent implements OnInit, OnDestroy {
  mockupEditorForm: FormGroup;
  updateMockupId: string;
  loading = true;
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
  selectedOptions: any[] = [];

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
    const mockupId = this.route.snapshot.paramMap.get("slug");
    this.mockupService.getMockupById(mockupId).subscribe((data) => {
      this.loading = false;
      this.updateMockupId = data.id;

      const {
        subCategory,
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        thumbnails,
        options,
        details,
        features,
      } = data;

      this.selectedOptions = options;
      this.details = details;
      this.features = features;

      this.mockupEditorForm.patchValue({
        nameAr,
        nameEn,
        subCategory,
        sku,
        descriptionAr,
        descriptionEn,
        thumbnails: thumbnails ? thumbnails[0] : null,
      });
    });

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

  private initMockupForm(): void {
    this.mockupEditorForm = new FormGroup({
      subCategory: new FormControl(null, [Validators.required]),
      sku: new FormControl(null),
      nameAr: new FormControl(null, [Validators.required]),
      nameEn: new FormControl(null, [Validators.required]),
      descriptionAr: new FormControl(null),
      descriptionEn: new FormControl(null),
      thumbnails: new FormControl(null),
      newThumbnails: new FormControl(null),
    });
  }

  uploadThumbnail(event: Event): void {
    const thumbnails = (event.target as HTMLInputElement).files[0];
    this.mockupEditorForm.patchValue({ newThumbnails: thumbnails });
    this.mockupEditorForm.get("newThumbnails").updateValueAndValidity();

    if (thumbnails) {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnails);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  submit(): void {
    this.mockupEditorForm.markAllAsTouched();
    if (this.mockupEditorForm.valid) {
      const {
        subCategory,
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        newThumbnails,
      } = this.mockupEditorForm.value;

      const mockupInput: UpdateProductInput = {
        subCategoryId: subCategory.id,
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        url: "",
        thumbnails: newThumbnails,
        details: this.details.length ? this.details : null,
        features: this.features.length ? this.features : null,
        options: this.selectedOptions.length
          ? this.selectedOptions.map((option) => option.id)
          : null,
      };

      if (!newThumbnails) {
        delete mockupInput.thumbnails;
      }

      this.submitLoading = true;

      this.mockupService
        .updateMockUp(this.updateMockupId, mockupInput)
        .subscribe({
          next: (response) => {
            this.submitLoading = false;
            if (response.success) {
              this.notify.success("Mockup has been updated");
              this.router.navigate(["/dashboard/mockups"]);
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
    this.router.navigate(["/dashboard/mockups"]);
  }

  resetForm(): void {
    this.mockupEditorForm.reset();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.mockupEditorForm.controls[controlName];

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

  ngOnDestroy(): void {}
}
