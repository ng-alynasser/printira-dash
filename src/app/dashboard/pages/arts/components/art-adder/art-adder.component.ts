import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Observable, fromEvent } from "rxjs";
import {
  Product,
  UserTypeEnum,
  CreateArtInput,
  Designer,
} from "src/app/common/generated-types";
import { Router, ActivatedRoute } from "@angular/router";
import { DesignersService } from "../../../designers/designers.service";
import { ProductsService } from "../../../products/products.service";
import { ArtsService } from "../../arts.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  tap,
} from "rxjs/operators";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { NotificationService } from "src/app/core/services/notification.service";

@AutoUnsubscribe()
@Component({
  templateUrl: "./art-adder.component.html",
  styleUrls: ["./art-adder.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ArtAdderComponent implements OnInit, OnDestroy {
  artAdderForm: FormGroup;
  submitLoading: boolean;
  designers$: Observable<Designer[]>;
  previewImage: any;
  @ViewChild("productsSearch", { static: true }) productsSearch: ElementRef;
  @ViewChild("designerSearch", { static: true }) designerSearch: ElementRef;

  /**
   * Properties for multiple select products
   */
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [COMMA, ENTER];
  selectedProducts: Product[] = [];
  filteredProducts$: Observable<any[]>;
  productChips: string[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notify: NotificationService,
    private readonly designersService: DesignersService,
    private readonly productsService: ProductsService,
    private readonly artsService: ArtsService
  ) { }

  ngOnInit() {
    this.initArtForm();
    this.filteredProducts$ = fromEvent(
      this.productsSearch.nativeElement,
      "keyup"
    ).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => {
        return this.productsService.getAll(
          {},
          { searchKey: this.productsSearch.nativeElement.value }
        );
      }),
      map((response) => response.data.products)
    );

    this.designers$ = fromEvent(
      this.designerSearch.nativeElement,
      "keyup"
    ).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => {
        return this.designersService.getAll(
          {},
          {
            searchKey: this.designerSearch.nativeElement.value,
          }
        );
      }),
      map((response) => {
        return response.designers;
      })
    );
  }

  ngOnDestroy(): void { }

  private initArtForm(): void {
    this.artAdderForm = new FormGroup(
      {
        nameAr: new FormControl(null, [Validators.required]),
        nameEn: new FormControl(null, [Validators.required]),
        avatar: new FormControl(null),
        designer: new FormControl(null, [Validators.required]),
      },
      {
        updateOn: "blur",
      }
    );
  }

  submit(): void {
    this.artAdderForm.markAllAsTouched();
    if (this.artAdderForm.valid) {
      const { nameAr, nameEn, avatar, designer } = this.artAdderForm.value;

      const artInput: CreateArtInput = {
        designerId: designer.id,
        nameAr,
        nameEn,
        avatar,
        products: this.selectedProducts.length
          ? this.selectedProducts.map((product) => product.id)
          : null,
      };

      this.submitLoading = true;

      this.artsService.createArt(artInput).subscribe({
        next: (response) => {
          this.submitLoading = false;
          if (response.success) {
            this.notify.success("Art has been created");
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

  resetForm(): void {
    this.artAdderForm.reset();
  }

  goBack(): void {
    this.router.navigate([".."], { relativeTo: this.route });
  }

  displayFnDesigners(designer: Designer): string {
    return designer ? `${designer.nameEn} - ${designer.nameAr}` : "";
  }

  addProduct(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value || "".trim()) {
      this.productChips.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
  }

  removeProduct(product: string): void {
    const chipIndex = this.productChips.indexOf(product);
    const selectedProductIndex = this.selectedProducts.findIndex(
      (selectedProduct) => {
        return (
          `${selectedProduct.nameEn} - ${selectedProduct.nameAr}` === product
        );
      }
    );

    if (chipIndex >= 0) {
      this.productChips.splice(chipIndex, 1);
    }

    if (selectedProductIndex >= 0) {
      this.selectedProducts.splice(selectedProductIndex, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.productChips.push(event.option.viewValue);
    this.selectedProducts.push(event.option.value);
    this.productsSearch.nativeElement.value = "";
  }

  uploadAvatar(event: Event): void {
    const avatar = (event.target as HTMLInputElement).files[0];
    this.artAdderForm.patchValue({ avatar });
    this.artAdderForm.get("avatar").updateValueAndValidity();

    if (avatar) {
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.artAdderForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }
}
