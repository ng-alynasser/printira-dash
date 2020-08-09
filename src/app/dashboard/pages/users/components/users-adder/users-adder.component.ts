import { Component, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { Observable, of } from "rxjs";
import { CustomValidators } from "src/app/shared/utils/custom-validators";
import { map, switchMap, catchError, finalize } from "rxjs/operators";
import { UsersService } from "../../users.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { NotificationService } from "src/app/core/services/notification.service";
import {
  Role,
  RegisterAsUserInput,
  RolesGroupEnum,
} from "src/app/common/generated-types";
import { RolesService } from "../../../roles/roles.service";
@AutoUnsubscribe()
@Component({
  selector: "app-users-adder",
  templateUrl: "users-adder.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class UsersAdderComponent implements OnInit, OnDestroy {
  readonly GENDERS = ["MALE", "FEMALE"];

  usersAdderForm: FormGroup;
  submitLoading: boolean;
  roles$: Observable<Role[]>;
  addresses: FormArray;
  previewImage: any;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initUserForm();
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
  }

  ngOnDestroy(): void {}

  private initUserForm(): void {
    this.usersAdderForm = new FormGroup(
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
        email: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320),
          ])
        ),
        gender: new FormControl("MALE"),
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
        roleId: new FormControl(null),
        avatar: new FormControl(null),
        addresses: new FormArray([this.createAddress()]),
      },
      {
        validators: [
          CustomValidators.passwordMatchValidator,
          CustomValidators.phoneValidator,
        ],
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

  addAddress(): void {
    this.addresses = this.usersAdderForm.get("addresses") as FormArray;
    this.addresses.push(this.createAddress());
  }

  removeAddress(addressIndex: number): void {
    const addresses = this.usersAdderForm.get("addresses") as FormArray;

    const { addressId } = addresses.at(addressIndex).value;
    if (addressId) {
      this.usersService.deleteAddress(addressId).subscribe({
        next: (response) => {
          if (response.success) {
            addresses.removeAt(addressIndex);
            this.notificationService.success("Address has been removed");
          } else {
            this.notificationService.info(response.message);
          }
        },
        error: () => this.notificationService.error("Something went wrong"),
      });
    } else {
      addresses.removeAt(addressIndex);
      this.notificationService.success("Address has been removed");
    }
  }

  submit() {
    this.usersAdderForm.markAllAsTouched();
    const controls = this.usersAdderForm.controls;
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
        password,
        roleId,
        birthDate,
        avatar,
        phone,
        gender,
        addresses,
      } = this.usersAdderForm.value;

      const userInput: RegisterAsUserInput = {
        fName,
        lName,
        email,
        password,
        roleId,
        gender,
        avatar,
        birthDate: new Date(birthDate).getTime(),
        phone: `+2${phone}`,
      };

      const createUser$ = this.usersService.registerAsUser(userInput);
      const createAddress$ = (userId: string) => {
        return this.usersService.createAddress(addresses, userId);
      };

      this.submitLoading = true;

      createUser$
        .pipe(
          switchMap((response) => {
            if (response.success) {
              return createAddress$(response.user.id);
            } else {
              return of(response);
            }
          }),
          catchError((err) => of(null)),
          finalize(() => (this.submitLoading = false))
        )
        .subscribe({
          next: (response) => {
            if (response.length > 0) {
              this.notificationService.success("User has been created");
              this.router.navigate([".."], { relativeTo: this.activatedRoute });
            } else {
              this.notificationService.info(response.message);
            }
          },
          error: () => this.notificationService.error("Something went wrong"),
        });
    }
  }

  goBack(): void {
    this.router.navigate([".."], { relativeTo: this.activatedRoute });
  }

  resetForm(): void {
    this.usersAdderForm.reset();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.usersAdderForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  uploadImage(event: Event): void {
    const image = (event.target as HTMLInputElement).files[0];
    this.usersAdderForm.patchValue({ avatar: image });
    this.usersAdderForm.get("avatar").updateValueAndValidity();

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }
}
