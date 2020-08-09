import { Injectable } from "@angular/core";
import {
  RegisterAsVendorGQL,
  CreateAddressGQL,
  PaginatorInput,
  RegisterAsVendorInput,
  UpdateVendorInput,
  UpdateVendorGQL,
  VendorsGqlGQL,
  CreateAddressInput,
  DeleteAddressGQL,
  UpdateAddressGQL,
  UpdateAddressInput,
  FilterVendorInput_Board,
} from "src/app/common/generated-types";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class VendorsService {
  constructor(
    private readonly vendorsGQL: VendorsGqlGQL,
    private readonly registerAsVendorGQL: RegisterAsVendorGQL,
    private readonly updateVendorGQL: UpdateVendorGQL,
    private readonly createAddressGQL: CreateAddressGQL,
    private readonly updateAddressGQL: UpdateAddressGQL,
    private readonly deleteAddressGQL: DeleteAddressGQL
  ) {}

  getAll(
    paginate?: PaginatorInput,
    filter?: FilterVendorInput_Board,
    sort?: string
  ) {
    return this.vendorsGQL
      .watch({ sort, filter, paginate })
      .valueChanges.pipe(map((response) => response.data.vendors_board.data));
  }

  registerAsVendor(input: RegisterAsVendorInput) {
    return this.registerAsVendorGQL
      .mutate({ input })
      .pipe(map((response) => response.data.registerAsVendor));
  }

  updateVendor(vendorId: string, input: UpdateVendorInput) {
    return this.updateVendorGQL
      .mutate({ vendorId, input })
      .pipe(map((response) => response.data.updateVendor));
  }

  createVendorAddress(vendorId: string, input: CreateAddressInput) {
    return this.createAddressGQL
      .mutate({ input: { ...input, vendorId } })
      .pipe(map((response) => response.data.addUserAddress));
  }

  createUserAddress(userId: string, input: CreateAddressInput) {
    return this.createAddressGQL
      .mutate({ input: { ...input, userId } })
      .pipe(map((response) => response.data.addUserAddress));
  }

  deleteAddress(addressId: string) {
    return this.deleteAddressGQL
      .mutate({ addressId })
      .pipe(map((response) => response.data.deleteUserAddress));
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

  updateVendorAddress(addresses: UpdateAddressInput[], vendorId: string) {
    const updateVendorAddresses$ = addresses.map((address) => {
      if (address.addressId) {
        return this.updateAddressGQL.mutate({ input: address }).pipe(
          map((response) => {
            return response.data.updateUserAddress;
          })
        );
      } else {
        const input: CreateAddressInput = {
          vendorId,
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

    return forkJoin([...updateVendorAddresses$]);
  }
}
