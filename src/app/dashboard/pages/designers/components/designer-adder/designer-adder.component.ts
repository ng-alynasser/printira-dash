import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/core/services/notification.service";
import { CustomValidators } from "src/app/shared/utils/custom-validators";
import { tap, switchMap, catchError, finalize } from "rxjs/operators";
import { RegisterAsDesignerInput } from "src/app/common/generated-types";
import { DesignersService } from "../../designers.service";
import { forkJoin, of } from "rxjs";

@Component({
  templateUrl: "./designer-adder.component.html",
  styleUrls: ["./designer-adder.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DesignerAdderComponent implements OnInit, OnDestroy {
  designersAdderForm: FormGroup;
  submitLoading: boolean;
  userAddresses: FormArray;
  previewImage: any;
  previewCertificate: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly designersService: DesignersService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.initDesignerForm();
  }

  ngOnDestroy(): void {}

  private initDesignerForm(): void {
    this.designersAdderForm = new FormGroup(
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
        password: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(320),
          ])
        ),
        confirmPassword: new FormControl(null, Validators.required),
        birthDate: new FormControl(null),
        phone: new FormControl(null, Validators.required),
        avatar: new FormControl(null),
        nameAr: new FormControl(null, Validators.required),
        nameEn: new FormControl(null, Validators.required),
        certificates: new FormControl(null),
        userAddresses: new FormArray([this.createAddress()]),
        bio: new FormControl(null),
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
      address: new FormControl(null, Validators.required),
      suburb: new FormControl(null),
      postalCode: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
    });
  }

  addUserAddress(): void {
    this.userAddresses = this.designersAdderForm.get(
      "userAddresses"
    ) as FormArray;
    this.userAddresses.push(this.createAddress());
  }

  removeUserAddress(addressIndex: number): void {
    const userAddresses = this.designersAdderForm.get(
      "userAddresses"
    ) as FormArray;

    const { addressId } = userAddresses.at(addressIndex).value;
    if (addressId) {
      this.designersService.deleteAddress(addressId).subscribe({
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

  submit(): void {
    this.designersAdderForm.markAllAsTouched();
    const controls = this.designersAdderForm.controls;
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
        birthDate,
        avatar,
        phone,
        userAddresses,
        nameAr,
        nameEn,
        certificates,
        bio,
      } = this.designersAdderForm.value;

      const designerInput: RegisterAsDesignerInput = {
        fName,
        lName,
        email,
        password,
        birthDate: new Date(birthDate).getTime(),
        phone: `+2${phone}`,
        avatar,
        nameAr,
        nameEn,
        certificates,
        bio,
      };

      const createDesigner$ = this.designersService.registerAsDesigner(
        designerInput
      );
      const createUserAddress$ = (userId: string) => {
        if (userAddresses) {
          return forkJoin([
            ...userAddresses.map((userAddress) => {
              return this.designersService.createUserAddress(
                userId,
                userAddress
              );
            }),
          ]);
        }
      };

      this.submitLoading = true;

      createDesigner$
        .pipe(
          switchMap((response) => {
            if (response.success) {
              return createUserAddress$(response.user.id);
            } else {
              return of(response);
            }
          }),
          catchError(() => of(null)),
          finalize(() => (this.submitLoading = false))
        )
        .subscribe({
          next: (response) => {
            if (response[0].success) {
              this.notify.success("Designer has been created");
              this.router.navigate([".."], { relativeTo: this.route });
            } else {
              this.notify.info(response[0].message);
            }
          },
          error: () => this.notify.error("Something went wrong"),
        });
    }
  }

  goBack(): void {
    this.router.navigate([".."], { relativeTo: this.route });
  }

  resetForm(): void {
    this.designersAdderForm.reset();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.designersAdderForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  uploadImage(event: Event): void {
    const image = (event.target as HTMLInputElement).files[0];
    this.designersAdderForm.patchValue({ avatar: image });
    this.designersAdderForm.get("avatar").updateValueAndValidity();

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    }
  }

  uploadCertificate(event: Event): void {
    const certificate = (event.target as HTMLInputElement).files[0];
    this.designersAdderForm.patchValue({ certificates: certificate });
    this.designersAdderForm.get("certificates").updateValueAndValidity();

    if (certificate) {
      const reader = new FileReader();
      reader.readAsDataURL(certificate);
      reader.onload = () => {
        this.previewCertificate = reader.result;
      };
    }
  }
}
