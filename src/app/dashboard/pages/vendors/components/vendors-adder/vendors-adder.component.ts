import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { VendorsService } from "../../vendors.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { CustomValidators } from "src/app/shared/utils/custom-validators";
import { RegisterAsVendorInput } from "src/app/common/generated-types";
import { switchMap, catchError, finalize } from "rxjs/operators";
import { of, forkJoin } from "rxjs";
import { NotificationService } from "src/app/core/services/notification.service";

@AutoUnsubscribe()
@Component({
  templateUrl: "./vendors-adder.component.html",
  styleUrls: ["./vendors-adder.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VendorsAdderComponent implements OnInit, OnDestroy {
  readonly GENDERS = ["MALE", "FEMALE"];
  vendorsAdderForm: FormGroup;
  submitLoading: boolean;
  userAddresses: FormArray;
  vendorAddresses: FormArray;
  previewImage: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly vendorsService: VendorsService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initVendorForm();
  }

  ngOnDestroy(): void {}

  private initVendorForm(): void {
    this.vendorsAdderForm = new FormGroup(
      {
        fName: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(26),
            Validators.pattern(/^[a-z0-9]+$/i),
          ])
        ),
        lName: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(26),
            Validators.pattern(/^[a-z0-9]+$/i),
          ])
        ),
        nameAr: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(26),
          ])
        ),
        nameEn: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(26),
          ])
        ),
        email: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320),
          ])
        ),
        password: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(320),
          ])
        ),
        confirmPassword: new FormControl(null, [Validators.required]),
        birthDate: new FormControl(null),
        phone: new FormControl(null, [Validators.required]),
        avatar: new FormControl(null),
        userAddresses: new FormArray([this.createAddress()]),
        vendorAddresses: new FormArray([this.createAddress()]),
      },
      {
        validators: [CustomValidators.passwordMatchValidator],
        updateOn: "blur",
      }
    );
  }

  createAddress(): FormGroup {
    return new FormGroup({
      address: new FormControl(null, [Validators.required]),
      suburb: new FormControl(null),
      postalCode: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
    });
  }

  addVendorAddress(): void {
    this.vendorAddresses = this.vendorsAdderForm.get(
      "vendorAddresses"
    ) as FormArray;
    this.vendorAddresses.push(this.createAddress());
  }

  addUserAddress(): void {
    this.userAddresses = this.vendorsAdderForm.get(
      "userAddresses"
    ) as FormArray;
    this.userAddresses.push(this.createAddress());
  }

  removeUserAddress(addressIndex: number): void {
    const userAddresses = this.vendorsAdderForm.get(
      "userAddresses"
    ) as FormArray;

    const { addressId } = userAddresses.at(addressIndex).value;
    if (addressId) {
      this.vendorsService.deleteAddress(addressId).subscribe({
        next: (response) => {
          if (response.success) {
            userAddresses.removeAt(addressIndex);
            this.notificationService.success("Address has been removed");
          } else {
            this.notificationService.info(response.message);
          }
        },
        error: () => this.notificationService.error("Something went wrong"),
      });
    } else {
      userAddresses.removeAt(addressIndex);
      this.notificationService.success("Address has been removed");
    }
  }

  removeVendorAddress(addressIndex: number): void {
    const vendorAddresses = this.vendorsAdderForm.get(
      "vendorAddresses"
    ) as FormArray;
    const { addressId } = vendorAddresses.at(addressIndex).value;
    if (addressId) {
      this.vendorsService.deleteAddress(addressId).subscribe({
        next: (response) => {
          if (response.success) {
            vendorAddresses.removeAt(addressIndex);
            this.notificationService.success("Address has been removed");
          } else {
            this.notificationService.info(response.message);
          }
        },
        error: (err) => this.notificationService.error("Something went wrong"),
      });
    } else {
      vendorAddresses.removeAt(addressIndex);
      this.notificationService.success("Address has been removed");
    }
  }

  submit() {
    this.vendorsAdderForm.markAllAsTouched();
    const controls = this.vendorsAdderForm.controls;
    const invalidControls = [];
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }

    if (!invalidControls.length && !this.submitLoading) {
      const {
        fName,
        lName,
        nameAr,
        nameEn,
        email,
        password,
        birthDate,
        phone,
        userAddresses,
        vendorAddresses,
        avatar,
      } = this.vendorsAdderForm.value;

      const vendorInput: RegisterAsVendorInput = {
        fName,
        lName,
        email,
        password,
        nameAr,
        nameEn,
        avatar,
        birthDate: new Date(birthDate).getTime(),
        phone: `+2${phone}`,
      };

      const createVendor$ = this.vendorsService.registerAsVendor(vendorInput);
      const createUserAddress$ = (userId: string) => {
        if (userAddresses) {
          return forkJoin([
            ...userAddresses.map((userAddress) => {
              return this.vendorsService.createUserAddress(userId, userAddress);
            }),
          ]);
        }
      };

      const createVendorAddress$ = (vendorId: string) => {
        if (vendorAddresses) {
          return forkJoin([
            ...vendorAddresses.map((vendorAddress) => {
              return this.vendorsService.createVendorAddress(
                vendorId,
                vendorAddress
              );
            }),
          ]);
        }
      };

      this.submitLoading = true;

      createVendor$
        .pipe(
          switchMap((response) => {
            if (response.success) {
              return forkJoin([
                createVendorAddress$(response.user.vendor.id),
                createUserAddress$(response.user.id),
              ]);
            } else {
              return of(response);
            }
          }),
          catchError(() => of(null)),
          finalize(() => (this.submitLoading = false))
        )
        .subscribe({
          next: (response) => {
            if (response.length > 0) {
              this.notificationService.success("Vendor has been created");
              this.router.navigate([".."], { relativeTo: this.route });
            } else {
              this.notificationService.info(response.message);
            }
          },
          error: () => this.notificationService.error("Something went wrong"),
        });
    }
  }

  goBack(): void {
    this.router.navigate([".."], { relativeTo: this.route });
  }

  resetForm(): void {
    this.vendorsAdderForm.reset();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.vendorsAdderForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  uploadImage(event: Event): void {
    const image = (event.target as HTMLInputElement).files[0];
    this.vendorsAdderForm.patchValue({ avatar: image });
    this.vendorsAdderForm.get("avatar").updateValueAndValidity();

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }
}
