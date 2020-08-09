import { Injectable } from "@angular/core";
import {
  PaginatorInput,
  FilterUserInput_Board,
  UsersGQL,
  UserByEmailGQL,
  UserByPhoneGQL,
  UserByIdGQL,
  UpdateUserGQL,
  RegisterAsUserGQL,
  CreateAddressGQL,
  DeleteAddressGQL,
  RegisterAsUserInput,
  Address,
  UpdateUserInput,
  UpdateAddressGQL,
  UpdateAddressInput,
  CreateAddressInput,
} from "src/app/common/generated-types";
import { map } from "rxjs/operators";
import { forkJoin } from "rxjs";

@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(
    private readonly usersGQL: UsersGQL,
    private readonly userByEmailGQL: UserByEmailGQL,
    private readonly userByPhoneGQL: UserByPhoneGQL,
    private readonly userByIdGQL: UserByIdGQL,
    private readonly registerAsUserGQL: RegisterAsUserGQL,
    private readonly updateUserGQL: UpdateUserGQL,
    private readonly createAddressGQL: CreateAddressGQL,
    private readonly updateAddressGQL: UpdateAddressGQL,
    private readonly deleteAddressGQL: DeleteAddressGQL
  ) {}

  getAll(
    paginate: PaginatorInput,
    filter: FilterUserInput_Board,
    sort?: string
  ) {
    return this.usersGQL
      .watch({ sort, filter, paginate })
      .valueChanges.pipe(map((response) => response.data.users_board.data));
  }

  getUserById(userId: string) {
    return this.userByIdGQL
      .watch({ userId })
      .valueChanges.pipe(map((response) => response.data.findUserById.user));
  }

  getUserByEmail(userEmail: string) {
    return this.userByEmailGQL
      .watch({ userEmail })
      .valueChanges.pipe(map((response) => response.data.findUserByEmail.user));
  }

  getUserByPhone(userPhone: string) {
    return this.userByPhoneGQL
      .watch({ userPhone })
      .valueChanges.pipe(map((response) => response.data.findUserByPhone.user));
  }

  registerAsUser(input: RegisterAsUserInput) {
    return this.registerAsUserGQL
      .mutate({ input })
      .pipe(map((response) => response.data.registerAsUser));
  }

  updateUser(userId: string, input: UpdateUserInput) {
    return this.updateUserGQL
      .mutate({ userId, input })
      .pipe(map((response) => response.data.updateUserProfile_board));
  }

  createAddress(addresses: Address[], userId: string) {
    const addressesInput = addresses.map((address) => ({
      ...address,
      userId,
    }));

    const createAddresses$ = addressesInput.map((input) => {
      return this.createAddressGQL
        .mutate({ input })
        .pipe(map((response) => response.data.addUserAddress));
    });

    return forkJoin([...createAddresses$]);
  }

  updateAddress(addresses: UpdateAddressInput[], userId: string) {
    const updateAddress$ = addresses.map((address) => {
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

    return forkJoin([...updateAddress$]);
  }

  deleteAddress(addressId: string) {
    return this.deleteAddressGQL
      .mutate({ addressId })
      .pipe(map((response) => response.data.deleteUserAddress));
  }
}
