import { Component, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { UsersService } from "../../users.service";
import { tap, map, switchMap, catchError, finalize } from "rxjs/operators";
import { CustomValidators } from "src/app/shared/utils/custom-validators";
import {
  Role,
  RolesGroupEnum,
  UpdateUserInput,
} from "src/app/common/generated-types";
import { RolesService } from "../../../roles/roles.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { Observable, of } from "rxjs";
@AutoUnsubscribe()
@Component({
  selector: "app-users-editor",
  templateUrl: "users-editor.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class UsersEditorComponent implements OnInit, OnDestroy {
  readonly GENDERS = ["MALE", "FEMALE"];
  usersEditorForm: FormGroup;
  updatedUser: any;
  loading = true;
  submitLoading: boolean;
  roles$: Observable<Role[]>;
  addresses: FormArray;
  previewImage: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get("slug");
    this.usersService.getUserById(userId).subscribe((data) => {
      this.updatedUser = data;
      this.loading = false;

      const {
        fName,
        lName,
        email,
        gender,
        birthDate,
        addresses,
        phone,
        avatar,
        role,
        activated,
        blocked,
      } = data;

      this.usersEditorForm.patchValue({
        fName,
        lName,
        email,
        gender,
        birthDate: birthDate ? new Date(birthDate) : null,
        avatar,
        activated,
        blocked,
        phone: phone.slice(2),
        roleId: role ? role.id : null,
      });

      if (addresses) {
        this.addresses = this.usersEditorForm.get("addresses") as FormArray;
        this.addresses.patchValue(
          addresses.map((address) => {
            return new FormGroup({
              addressId: new FormControl(address.id),
              address: new FormControl(address.address, [Validators.required]),
              suburb: new FormControl(address.suburb),
              postalCode: new FormControl(address.postalCode),
              city: new FormControl(address.city),
              country: new FormControl(address.country),
            });
          })
        );
      }
    });

    this.roles$ = this.rolesService.getAll().pipe(
      map(({ roles }) => {
        const designerIndex = roles.findIndex(
          (role) => role.group === RolesGroupEnum.DESIGNER
        );
        roles.splice(designerIndex, 1);

        const vendorIndex = roles.findIndex(
          (role) => role.group === RolesGroupEnum.VENDOR
        );
        roles.splice(vendorIndex, 1);

        return roles;
      })
    );

    this.initUserForm();
  }

  ngOnDestroy(): void {}

  private initUserForm(): void {
    this.usersEditorForm = new FormGroup(
      {
        fName: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(26),
          Validators.pattern(/^[a-z0-9]+$/i),
        ]),
        lName: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(26),
          Validators.pattern(/^[a-z0-9]+$/i),
        ]),
        email: new FormControl(null),
        gender: new FormControl(null),
        birthDate: new FormControl(null),
        phone: new FormControl(null, [Validators.required]),
        roleId: new FormControl(null),
        activated: new FormControl(true),
        blocked: new FormControl(false),
        avatar: new FormControl(null),
        addresses: new FormArray([this.createAddress()]),
        newAvatar: new FormControl(null),
      },
      {
        validators: [CustomValidators.phoneValidator],
        updateOn: "blur",
      }
    );
  }

  goBack(): void {
    this.router.navigateByUrl("/dashboard/users", {
      relativeTo: this.route,
    });
  }

  resetForm(): void {
    this.usersEditorForm.reset();
  }

  uploadImage(event: Event): void {
    const image = (event.target as HTMLInputElement).files[0];
    this.usersEditorForm.patchValue({ newAvatar: image });
    this.usersEditorForm.get("newAvatar").updateValueAndValidity();

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  submit(): void {
    this.usersEditorForm.markAllAsTouched();
    const controls = this.usersEditorForm.controls;
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
        email,
        gender,
        birthDate,
        phone,
        roleId,
        newAvatar,
        addresses,
        activated,
        blocked,
      } = this.usersEditorForm.value;

      const userInput: UpdateUserInput = {
        fName,
        lName,
        email,
        gender,
        roleId,
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

      this.usersService
        .updateUser(this.updatedUser.id, userInput)
        .pipe(
          switchMap((response) => {
            if (response.success) {
              return this.usersService.updateAddress(
                addresses,
                response.user.id
              );
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
              this.notify.success("User has been updated");
              this.router.navigate(["/dashboard/users"]);
            } else {
              this.notify.info(response.message);
            }
          },
          error: () => this.notify.error("Something went wrong"),
        });
    }
  }

  createAddress(): FormGroup {
    return new FormGroup({
      addressId: new FormControl(null),
      address: new FormControl(null, [Validators.required]),
      suburb: new FormControl(null),
      postalCode: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
    });
  }

  addAddress(): void {
    this.addresses = this.usersEditorForm.get("addresses") as FormArray;
    this.addresses.push(this.createAddress());
  }

  removeAddress(addressIndex: number): void {
    const addresses = this.usersEditorForm.get("addresses") as FormArray;

    const { addressId } = addresses.at(addressIndex).value;
    if (addressId) {
      this.usersService.deleteAddress(addressId).subscribe({
        next: (response) => {
          if (response.success) {
            addresses.removeAt(addressIndex);
            this.notify.success("Address has been removed");
          } else {
            this.notify.info(response.message);
          }
        },
        error: (err) => this.notify.error("Something went wrong"),
      });
    } else {
      addresses.removeAt(addressIndex);
      this.notify.success("Address has been removed");
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.usersEditorForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }
}
