import { Component, OnInit, OnDestroy } from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import {
  User,
  UpdateVendorInput,
  UpdateUserInput,
} from "src/app/common/generated-types";
import { Router, ActivatedRoute } from "@angular/router";
import { VendorsService } from "../../vendors.service";
import { UsersService } from "../../../users/users.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { CustomValidators } from "src/app/shared/utils/custom-validators";
import { switchMap, finalize } from "rxjs/operators";
import { forkJoin } from "rxjs";

@AutoUnsubscribe()
@Component({
  templateUrl: "./vendors-editor.component.html",
  styleUrls: ["./vendors-editor.component.scss"],
})
export class VendorsEditorComponent implements OnInit, OnDestroy {
  vendorsEditorForm: FormGroup;
  updatedVendor: any;
  loading = true;
  submitLoading: boolean;
  vendorAddresses: FormArray;
  userAddresses: FormArray;
  previewImage: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly vendorsService: VendorsService,
    private readonly usersService: UsersService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get("slug");
    this.usersService.getUserById(userId).subscribe((data) => {
      this.updatedVendor = data;
      this.loading = false;
      const {
        fName,
        lName,
        email,
        phone,
        avatar,
        birthDate,
        addresses,
        activated,
        blocked,
        vendor,
      } = data;

      this.vendorsEditorForm.patchValue({
        fName,
        lName,
        email,
        phone: phone ? phone.slice(2) : null,
        birthDate: birthDate ? new Date(birthDate) : null,
        nameAr: vendor.nameAr,
        nameEn: vendor.nameEn,
        avatar,
        activated,
        blocked,
        vendorActivated: vendor.activated,
      });

      if (addresses) {
        this.userAddresses = this.vendorsEditorForm.get(
          "userAddresses"
        ) as FormArray;
        this.userAddresses.patchValue(
          addresses.map((userAddress) => {
            return new FormGroup({
              address: new FormControl(userAddress.address, [
                Validators.required,
              ]),
              suburb: new FormControl(userAddress.suburb),
              postalCode: new FormControl(userAddress.postalCode),
              city: new FormControl(userAddress.city),
              country: new FormControl(userAddress.country),
            });
          })
        );
      }

      if (vendor.addresses) {
        this.vendorAddresses = this.vendorsEditorForm.get(
          "vendorAddresses"
        ) as FormArray;
        this.vendorAddresses.patchValue(
          vendor.addresses.map((vendorAddress) => {
            return new FormGroup({
              address: new FormControl(vendorAddress.address, [
                Validators.required,
              ]),
              suburb: new FormControl(vendorAddress.suburb),
              postalCode: new FormControl(vendorAddress.postalCode),
              city: new FormControl(vendorAddress.city),
              country: new FormControl(vendorAddress.country),
            });
          })
        );
      }
    });

    this.initVendorForm();
  }

  ngOnDestroy(): void {}

  private initVendorForm(): void {
    this.vendorsEditorForm = new FormGroup(
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
        activated: new FormControl(true),
        vendorActivated: new FormControl(true),
        blocked: new FormControl(false),
        birthDate: new FormControl(null),
        phone: new FormControl(null, [Validators.required]),
        userAddresses: new FormArray([this.createAddress()]),
        vendorAddresses: new FormArray([this.createAddress()]),
        avatar: new FormControl(null),
        newAvatar: new FormControl(null),
      },
      {
        validators: [CustomValidators.phoneValidator],
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
    this.vendorAddresses = this.vendorsEditorForm.get(
      "vendorAddresses"
    ) as FormArray;
    this.vendorAddresses.push(this.createAddress());
  }

  addUserAddress(): void {
    this.userAddresses = this.vendorsEditorForm.get(
      "userAddresses"
    ) as FormArray;
    this.userAddresses.push(this.createAddress());
  }

  removeUserAddress(addressIndex: number): void {
    const userAddresses = this.vendorsEditorForm.get(
      "userAddresses"
    ) as FormArray;

    const { addressId } = userAddresses.at(addressIndex).value;
    if (addressId) {
      this.usersService.deleteAddress(addressId).subscribe({
        next: (response) => {
          if (response.success) {
            userAddresses.removeAt(addressIndex);
            this.notify.success("Address has been removed");
          } else {
            this.notify.info(response.message);
          }
        },
        error: () => this.notify.error("Something went wrong"),
      });
    } else {
      userAddresses.removeAt(addressIndex);
      this.notify.success("Address has been removed");
    }
  }

  removeVendorAddress(addressIndex: number): void {
    const vendorAddresses = this.vendorsEditorForm.get(
      "vendorAddresses"
    ) as FormArray;

    const { addressId } = vendorAddresses.at(addressIndex).value;
    if (addressId) {
      this.usersService.deleteAddress(addressId).subscribe({
        next: (response) => {
          if (response.success) {
            vendorAddresses.removeAt(addressIndex);
            this.notify.success("Address has been removed");
          } else {
            this.notify.info(response.message);
          }
        },
        error: (err) => {
          this.notify.error("Something went wrong");
        },
      });
    } else {
      vendorAddresses.removeAt(addressIndex);
      this.notify.success("Address has been removed");
    }
  }

  submit(): void {
    this.vendorsEditorForm.markAllAsTouched();
    const controls = this.vendorsEditorForm.controls;
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
        birthDate,
        phone,
        newAvatar,
        activated,
        blocked,
        vendorActivated,
        userAddresses,
        vendorAddresses,
      } = this.vendorsEditorForm.value;

      const vendorInput: UpdateVendorInput = {
        nameAr,
        nameEn,
        activated: vendorActivated,
      };

      const userInput: UpdateUserInput = {
        fName,
        lName,
        email,
        birthDate: birthDate ? new Date(birthDate).getTime() : null,
        phone: `+2${phone}`,
        avatar: newAvatar,
        activated,
        blocked,
      };

      if (!newAvatar) {
        delete userInput.avatar;
      }

      this.submitLoading = true;

      const updateUser$ = this.usersService.updateUser(
        this.updatedVendor.id,
        userInput
      );

      this.vendorsService
        .updateVendor(this.updatedVendor.vendor.id, vendorInput)
        .pipe(
          switchMap(() => {
            return forkJoin([
              this.vendorsService.updateVendorAddress(
                vendorAddresses,
                this.updatedVendor.vendor.id
              ),
              this.vendorsService.updateUserAddress(
                userAddresses,
                this.updatedVendor.id
              ),
              updateUser$,
            ]);
          }),
          finalize(() => (this.submitLoading = false))
        )
        .subscribe({
          next: (response) => {
            if (response.length > 0) {
              this.notify.success("Vendor has been updated");
              this.router.navigate(["/dashboard/vendors"]);
            }
          },
          error: () => this.notify.error("Something went wrong"),
        });
    }
  }

  goBack(): void {
    this.router.navigate(["/dashboard/vendors"]);
  }

  resetForm(): void {
    this.vendorsEditorForm.reset();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.vendorsEditorForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  uploadImage(event: Event): void {
    const image = (event.target as HTMLInputElement).files[0];
    this.vendorsEditorForm.patchValue({ newAvatar: image });
    this.vendorsEditorForm.get("newAvatar").updateValueAndValidity();

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }
}
