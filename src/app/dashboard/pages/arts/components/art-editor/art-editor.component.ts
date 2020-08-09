import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  UserTypeEnum,
  UpdateArtInput,
  Designer,
} from "src/app/common/generated-types";
import { Observable, fromEvent } from "rxjs";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/core/services/notification.service";
import { DesignersService } from "../../../designers/designers.service";
import { ProductsService } from "../../../products/products.service";
import { ArtsService } from "../../arts.service";
import {
  MatChipInputEvent,
  MatAutocompleteSelectedEvent,
} from "@angular/material";
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  map,
} from "rxjs/operators";

@AutoUnsubscribe()
@Component({
  templateUrl: "./art-editor.component.html",
  styleUrls: ["./art-editor.component.scss"],
})
export class ArtEditorComponent implements OnInit, OnDestroy {
  artEditorForm: FormGroup;
  loading = true;
  submitLoading: boolean;
  designers$: Observable<Designer[]>;
  previewImage: any;
  @ViewChild("productsSearch", { static: true }) productsSearch: ElementRef;
  @ViewChild("designerSearch", { static: true }) designerSearch: ElementRef;
  updatedArtId: string;
  /**
   * Properties for multiple select products
   */
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [COMMA, ENTER];
  selectedProducts: any[] = [];
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

  ngOnInit(): void {
    const artId = this.route.snapshot.paramMap.get("slug");
    this.artsService.getArtById(artId).subscribe((data) => {
      this.loading = false;
      this.updatedArtId = data.id;

      const { nameAr, nameEn, avatar, designer, products } = data;

      this.selectedProducts = products;

      this.artEditorForm.patchValue({
        nameAr,
        nameEn,
        avatar,
        designer,
      });
    });

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
    this.initArtForm();
  }

  ngOnDestroy(): void {
    this.initArtForm();
  }

  private initArtForm(): void {
    this.artEditorForm = new FormGroup(
      {
        nameAr: new FormControl(null, [Validators.required]),
        nameEn: new FormControl(null, [Validators.required]),
        avatar: new FormControl(null),
        newAvatar: new FormControl(null),
        designer: new FormControl(null, [Validators.required]),
      },
      {
        updateOn: "blur",
      }
    );
  }

  submit(): void {
    this.artEditorForm.markAllAsTouched();
    if (this.artEditorForm.valid) {
      const { nameAr, nameEn, newAvatar, designer } = this.artEditorForm.value;

      console.log(designer);
      const artInput: UpdateArtInput = {
        designerId: designer.id,
        nameAr,
        nameEn,
        avatar: newAvatar,
        products: this.selectedProducts.length
          ? this.selectedProducts.map((product) => product.id)
          : null,
      };

      if (!newAvatar) {
        delete artInput.avatar;
      }

      this.submitLoading = true;

      this.artsService.updateArt(this.updatedArtId, artInput).subscribe({
        next: (response) => {
          this.submitLoading = false;
          if (response.success) {
            this.notify.success("Art has been updated");
            this.router.navigate(["/dashboard/arts"]);
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
    this.artEditorForm.reset();
  }

  goBack(): void {
    this.router.navigate(["/dashboard/arts"]);
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
    this.artEditorForm.patchValue({ newAvatar: avatar });
    this.artEditorForm.get("newAvatar").updateValueAndValidity();

    if (avatar) {
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.artEditorForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }
}
