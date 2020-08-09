import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import {
  Designer,
  UpdateDesignerInput,
  UpdateUserInput,
} from "src/app/common/generated-types";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/core/services/notification.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { DesignersService } from "../../designers.service";
import { switchMap, finalize } from "rxjs/operators";
import { UsersService } from "../../../users/users.service";
import { forkJoin } from "rxjs";

@AutoUnsubscribe()
@Component({
  templateUrl: "./designer-editor.component.html",
  styleUrls: ["./designer-editor.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DesignerEditorComponent implements OnInit, OnDestroy {
  designerEditorForm: FormGroup;
  updatedDesigner: Designer;
  loading = true;
  submitLoading: boolean;
  userAddresses: FormArray;
  previewCertificate: any;
  previewImage: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly designerService: DesignersService,
    private readonly userService: UsersService,
    private readonly notify: NotificationService
  ) {}

  ngOnInit(): void {
    const designerId = this.route.snapshot.paramMap.get("slug");
    this.designerService.getDesignerById(designerId).subscribe((data) => {
      this.updatedDesigner = data;
      this.loading = false;
      const { nameAr, nameEn, certificates, bio, user, activated } = data;
      this.designerEditorForm.patchValue({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        phone: user.phone ? user.phone.slice(2) : null,
        birthDate: user.birthDate ? new Date(user.birthDate) : null,
        avatar: user.avatar,
        activated: user.activated,
        blocked: user.blocked,
        designerActivated: activated,
        nameAr,
        nameEn,
        certificates: certificates ? certificates[0] : null,
        bio,
      });

      if (user.addresses) {
        this.userAddresses = this.designerEditorForm.get(
          "userAddresses"
        ) as FormArray;
        this.userAddresses.patchValue(
          user.addresses.map((userAddress) => {
            return new FormGroup({
              address: new FormControl(
                userAddress.address,
                Validators.required
              ),
              suburb: new FormControl(userAddress.suburb),
              postalCode: new FormControl(userAddress.postalCode),
              city: new FormControl(userAddress.city),
              country: new FormControl(userAddress.country),
            });
          })
        );
      }
    });

    this.initDesignerForm();
  }

  ngOnDestroy(): void {}

  private initDesignerForm(): void {
    this.designerEditorForm = new FormGroup(
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
        birthDate: new FormControl(null),
        phone: new FormControl(null, [Validators.required]),
        avatar: new FormControl(null),
        newAvatar: new FormControl(null),
        activated: new FormControl(true),
        blocked: new FormControl(false),
        designerActivated: new FormControl(false),
        nameAr: new FormControl(null, [Validators.required]),
        nameEn: new FormControl(null, [Validators.required]),
        certificates: new FormControl(null),
        newCertificate: new FormControl(null),
        userAddresses: new FormArray([this.createAddress()]),
        bio: new FormControl(null),
      },
      {
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

  addUserAddress(): void {
    this.userAddresses = this.designerEditorForm.get(
      "userAddresses"
    ) as FormArray;
    this.userAddresses.push(this.createAddress());
  }

  removeUserAddress(addressIndex: number): void {
    const userAddresses = this.designerEditorForm.get(
      "userAddresses"
    ) as FormArray;

    const { addressId } = userAddresses.at(addressIndex).value;
    if (addressId) {
      this.designerService.deleteAddress(addressId).subscribe({
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
    this.designerEditorForm.markAllAsTouched();
    const controls = this.designerEditorForm.controls;
    const invalidControls = [];
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }
    if (!invalidControls.length && !this.submitLoading) {
      const {
        nameAr,
        nameEn,
        newCertificate,
        bio,
        fName,
        lName,
        email,
        birthDate,
        phone,
        activated,
        blocked,
        designerActivated,
        newAvatar,
        userAddresses,
      } = this.designerEditorForm.value;

      const designerInput: UpdateDesignerInput = {
        nameAr,
        nameEn,
        certificates: newCertificate,
        bio,
        activated: designerActivated,
      };

      if (!newCertificate) {
        delete designerInput.certificates;
      }

      const userInput: UpdateUserInput = {
        fName,
        lName,
        email,
        birthDate: birthDate ? new Date(birthDate).getTime() : null,
        phone: `+2${phone}`,
        avatar: newAvatar,
        blocked,
        activated,
      };

      if (!newAvatar) {
        delete userInput.avatar;
      }

      this.submitLoading = true;

      const updateUser$ = this.userService.updateUser(
        this.updatedDesigner.user.id,
        userInput
      );

      this.designerService
        .updateDesigner(this.updatedDesigner.id, designerInput)
        .pipe(
          switchMap(() => {
            return forkJoin([
              this.designerService.updateUserAddress(
                userAddresses,
                this.updatedDesigner.user.id
              ),
              updateUser$,
            ]);
          }),
          finalize(() => (this.submitLoading = false))
        )
        .subscribe({
          next: (response) => {
            if (response.length > 0) {
              this.notify.success("Designer has been updated");
              this.router.navigate(["/dashboard/designers"]);
            }
          },
          error: () => this.notify.error("Something went wrong"),
        });
    }
  }

  goBack(): void {
    this.router.navigate(["/dashboard/designers"]);
  }

  resetForm(): void {
    this.designerEditorForm.reset();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.designerEditorForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }

  uploadImage(event: Event): void {
    const image = (event.target as HTMLInputElement).files[0];
    this.designerEditorForm.patchValue({ newAvatar: image });
    this.designerEditorForm.get("newAvatar").updateValueAndValidity();

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
    this.designerEditorForm.patchValue({ newCertificate: certificate });
    this.designerEditorForm.get("newCertificate").updateValueAndValidity();

    if (certificate) {
      const reader = new FileReader();
      reader.readAsDataURL(certificate);
      reader.onload = () => {
        this.previewCertificate = reader.result;
      };
    }
  }
}
