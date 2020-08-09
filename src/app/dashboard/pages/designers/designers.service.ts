import { Injectable } from "@angular/core";
import {
  DesignersGQL,
  UserByEmailGQL,
  RegisterAsDesignerGQL,
  CreateAddressGQL,
  DeleteAddressGQL,
  PaginatorInput,
  FilterUserInput_Board,
  RegisterAsDesignerInput,
  Address,
  UserTypeEnum,
  DesignerByIdGQL,
  UpdateDesignerGQL,
  UpdateDesignerInput,
  CreateAddressInput,
  UpdateAddressInput,
  UpdateAddressGQL,
  FilterDesignerInput_Board,
} from "src/app/common/generated-types";
import { map } from "rxjs/operators";
import { forkJoin } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DesignersService {
  constructor(
    private readonly designersGQL: DesignersGQL,
    private readonly userByEmailGQL: UserByEmailGQL,
    private readonly designerByIdGQL: DesignerByIdGQL,
    private readonly updateDesignerGQL: UpdateDesignerGQL,
    private readonly registerAsDesignerGQL: RegisterAsDesignerGQL,
    private readonly createAddressGQL: CreateAddressGQL,
    private readonly updateAddressGQL: UpdateAddressGQL,
    private readonly deleteAddressGQL: DeleteAddressGQL
  ) {}

  getAll(
    paginate: PaginatorInput,
    filter: FilterDesignerInput_Board,
    sort?: string
  ) {
    return this.designersGQL
      .watch({
        sort,
        filter,
        paginate,
      })
      .valueChanges.pipe(
        map((response) => {
          return response.data.designers_board.data;
        })
      );
  }

  getUserByEmail(userEmail: string) {
    return this.userByEmailGQL
      .watch({ userEmail })
      .valueChanges.pipe(map((response) => response.data.findUserByEmail.user));
  }

  registerAsDesigner(input: RegisterAsDesignerInput) {
    return this.registerAsDesignerGQL
      .mutate({ input })
      .pipe(map((response) => response.data.registerAsDesigner));
  }

  getDesignerById(designerId: string) {
    return this.designerByIdGQL
      .watch({ designerId })
      .valueChanges.pipe(
        map((response) => response.data.findDesignerById.designer)
      );
  }

  updateDesigner(designerId: string, input: UpdateDesignerInput) {
    return this.updateDesignerGQL
      .mutate({ designerId, input })
      .pipe(map((response) => response.data.updateDesigner));
  }

  createUserAddress(userId: string, input: CreateAddressInput) {
    return this.createAddressGQL
      .mutate({ input: { ...input, userId } })
      .pipe(map((response) => response.data.addUserAddress));
  }

  updateUserAddress(addresses: UpdateAddressInput[], userId: string) {
    const updateUserAddresses$ = addresses.map((address) => {
      if (address.addressId) {
        return this.updateAddressGQL.mutate({ input: address }).pipe(
          map((response) => {
            return response.data.updateUserAddress;
          })
        );
      } else {
        const input: CreateAddressInput = {
          userId,
          address: address.address,
          country: address.country,
          city: address.city,
          suburb: address.suburb,
          postalCode: address.postalCode,
        };
        return this.createAddressGQL.mutate({ input }).pipe(
          map((response) => {
            return response.data.addUserAddress;
          })
        );
      }
    });

    return forkJoin([...updateUserAddresses$]);
  }

  deleteAddress(addressId: string) {
    return this.deleteAddressGQL
      .mutate({ addressId })
      .pipe(map((response) => response.data.deleteUserAddress));
  }
}
