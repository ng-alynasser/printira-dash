import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
  /** Upload custom scalar type */
  Upload: any;
};



export type OptionSet = {
  __typename?: 'OptionSet';
  id: Scalars['ID'];
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  type: OptionSetEnum;
  options?: Maybe<Array<Option>>;
};

/** Describes the types of option set */
export enum OptionSetEnum {
  SIZES = 'SIZES',
  MATERIALS = 'MATERIALS',
  FINISHINGS = 'FINISHINGS',
  COLORS = 'COLORS',
  OTHER = 'OTHER'
}

export type OptionPricing = {
  __typename?: 'OptionPricing';
  id: Scalars['ID'];
  price: Scalars['Float'];
  vendor: Vendor;
  activated: Scalars['Boolean'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  option: Option;
};

export type Option = {
  __typename?: 'Option';
  id: Scalars['ID'];
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  activated: Scalars['Boolean'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  prices?: Maybe<Array<OptionPricing>>;
  optionSet: OptionSet;
};

export type Designer = {
  __typename?: 'Designer';
  id: Scalars['ID'];
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
  rate?: Maybe<Scalars['Float']>;
  addresses?: Maybe<Array<Address>>;
  certificates?: Maybe<Array<Scalars['String']>>;
  user?: Maybe<User>;
  arts?: Maybe<Array<Art>>;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type Art = {
  __typename?: 'Art';
  id: Scalars['ID'];
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
  rate?: Maybe<Scalars['Float']>;
  avatar?: Maybe<Scalars['String']>;
  designer?: Maybe<Designer>;
  price?: Maybe<Scalars['Float']>;
  products?: Maybe<Array<Product>>;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  slug: Scalars['String'];
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  descriptionAr?: Maybe<Scalars['String']>;
  descriptionEn?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  activated: Scalars['Boolean'];
  vendor?: Maybe<Vendor>;
  subCategories?: Maybe<Array<SubCategory>>;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type SubCategory = {
  __typename?: 'SubCategory';
  id: Scalars['ID'];
  slug: Scalars['String'];
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  descriptionAr?: Maybe<Scalars['String']>;
  descriptionEn?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  activated: Scalars['Boolean'];
  category?: Maybe<Category>;
  products?: Maybe<Array<Product>>;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  sku?: Maybe<Scalars['String']>;
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  descriptionAr?: Maybe<Scalars['String']>;
  descriptionEn?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  views?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Array<Scalars['Int']>>;
  thumbnails?: Maybe<Array<Scalars['String']>>;
  details?: Maybe<Array<Scalars['String']>>;
  features?: Maybe<Array<Scalars['String']>>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Int']>;
  activated?: Maybe<Scalars['Boolean']>;
  options?: Maybe<Array<Option>>;
  rate?: Maybe<Scalars['Float']>;
  featured?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Array<Review>>;
  samplable?: Maybe<Scalars['Boolean']>;
  mockup: Product;
  products?: Maybe<Array<Product>>;
  subCategory: SubCategory;
  art?: Maybe<Art>;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  rate: Scalars['Int'];
  seen: Scalars['Int'];
  type: ReviewType;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  user: User;
  product?: Maybe<Product>;
  vendor?: Maybe<Vendor>;
};

/** Describes the type of the review */
export enum ReviewType {
  PRODUCT = 'PRODUCT',
  VENDOR = 'VENDOR'
}

export type Vendor = {
  __typename?: 'Vendor';
  id: Scalars['ID'];
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  activated?: Maybe<Scalars['Boolean']>;
  rate?: Maybe<Scalars['Float']>;
  addresses?: Maybe<Array<Address>>;
  reviews?: Maybe<Array<Review>>;
  user?: Maybe<User>;
  category?: Maybe<Category>;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['ID'];
  address: Scalars['String'];
  suburb?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  vendor?: Maybe<Vendor>;
  designer?: Maybe<Designer>;
};

export type UserSocialAccount = {
  __typename?: 'UserSocialAccount';
  id: Scalars['ID'];
  user?: Maybe<User>;
  provider: SocialProvidersEnum;
  providerId: Scalars['String'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export enum SocialProvidersEnum {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  GOOGLE = 'GOOGLE'
}

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  group: RolesGroupEnum;
  description?: Maybe<Scalars['String']>;
  permissions: Array<Scalars['String']>;
};

export enum RolesGroupEnum {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ACCOUNTANT = 'ACCOUNTANT',
  ORDER_REPRESENTATIVE = 'ORDER_REPRESENTATIVE',
  ORDER_MANAGER = 'ORDER_MANAGER',
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
  VENDOR = 'VENDOR',
  DESIGNER = 'DESIGNER'
}

export type VendorRequest = {
  __typename?: 'VendorRequest';
  changedAt?: Maybe<Scalars['Float']>;
  status: VendorRequestStatus;
};

export enum VendorRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export type DesignerRequest = {
  __typename?: 'DesignerRequest';
  changedAt?: Maybe<Scalars['Float']>;
  status: DesignerRequestStatus;
};

export enum DesignerRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  fName: Scalars['String'];
  lName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Timestamp']>;
  favLang: LangEnum;
  gender: GenderEnum;
  phone?: Maybe<Scalars['String']>;
  wallet: Scalars['Float'];
  slug: Scalars['String'];
  addresses?: Maybe<Array<Address>>;
  socialAccounts?: Maybe<Array<UserSocialAccount>>;
  type: UserTypeEnum;
  role?: Maybe<Role>;
  avatar?: Maybe<Scalars['String']>;
  reviews?: Maybe<Array<Review>>;
  resetPasswordCode?: Maybe<Scalars['String']>;
  resetPasswordCodeExpiry?: Maybe<Scalars['Float']>;
  vendor?: Maybe<Vendor>;
  designer?: Maybe<Designer>;
  vendorRequest?: Maybe<VendorRequest>;
  designerRequest?: Maybe<DesignerRequest>;
  isPhoneVerified: Scalars['Boolean'];
  isEmailVerified: Scalars['Boolean'];
  phoneVerificationCode?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  lastLoginAt: Scalars['Float'];
  phoneVerificationCodeExpiry?: Maybe<Scalars['Float']>;
  emailVerificationCode?: Maybe<Scalars['String']>;
  emailVerificationCodeExpiry?: Maybe<Scalars['Float']>;
  blocked?: Maybe<Scalars['Boolean']>;
  activated?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};


export enum LangEnum {
  EN = 'EN',
  AR = 'AR'
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum UserTypeEnum {
  USER = 'USER',
  VENDOR = 'VENDOR',
  DESIGNER = 'DESIGNER'
}

export type StaticValue = {
  __typename?: 'StaticValue';
  id: Scalars['ID'];
  slug: Scalars['String'];
  titleAr: Scalars['String'];
  titleEn: Scalars['String'];
  contentAr?: Maybe<Scalars['String']>;
  contentEn?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  activated: Scalars['Boolean'];
  static: Static;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type Static = {
  __typename?: 'Static';
  id: Scalars['ID'];
  key: StaticKeyEnum;
  values?: Maybe<Array<StaticValue>>;
  descriptionEn?: Maybe<Scalars['String']>;
  descriptionAr?: Maybe<Scalars['String']>;
};

/** Describes the key of the static content */
export enum StaticKeyEnum {
  ABOUT_US = 'ABOUT_US',
  ARTICLES = 'ARTICLES',
  TERMS = 'TERMS',
  FAQS = 'FAQS',
  SETTINGS = 'SETTINGS'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
  page: Scalars['Int'];
  limit: Scalars['Int'];
  hasNext: Scalars['Int'];
};

export type GqlUserResponse = {
  __typename?: 'GqlUserResponse';
  data?: Maybe<User>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlUsersPagination = {
  __typename?: 'GqlUsersPagination';
  items?: Maybe<Array<Maybe<User>>>;
  pageInfo: PageInfo;
};

export type GqlUsersResponse = {
  __typename?: 'GqlUsersResponse';
  data?: Maybe<GqlUsersPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlBooleanResponse = {
  __typename?: 'GqlBooleanResponse';
  data?: Maybe<Scalars['Boolean']>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlStringResponse = {
  __typename?: 'GqlStringResponse';
  data?: Maybe<Scalars['String']>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlAddressResponse = {
  __typename?: 'GqlAddressResponse';
  data?: Maybe<Address>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlAddresssPagination = {
  __typename?: 'GqlAddresssPagination';
  items?: Maybe<Array<Maybe<Address>>>;
  pageInfo: PageInfo;
};

export type GqlAddresssResponse = {
  __typename?: 'GqlAddresssResponse';
  data?: Maybe<GqlAddresssPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlVendorResponse = {
  __typename?: 'GqlVendorResponse';
  data?: Maybe<Vendor>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlVendorsPagination = {
  __typename?: 'GqlVendorsPagination';
  items?: Maybe<Array<Maybe<Vendor>>>;
  pageInfo: PageInfo;
};

export type GqlVendorsResponse = {
  __typename?: 'GqlVendorsResponse';
  data?: Maybe<GqlVendorsPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlProductResponse = {
  __typename?: 'GqlProductResponse';
  data?: Maybe<Product>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlProductsPagination = {
  __typename?: 'GqlProductsPagination';
  items?: Maybe<Array<Maybe<Product>>>;
  pageInfo: PageInfo;
};

export type GqlProductsResponse = {
  __typename?: 'GqlProductsResponse';
  data?: Maybe<GqlProductsPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  content: Scalars['String'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['Float'];
};

export type GqlRoleResponse = {
  __typename?: 'GqlRoleResponse';
  data?: Maybe<Role>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlRolesPagination = {
  __typename?: 'GqlRolesPagination';
  items?: Maybe<Array<Maybe<Role>>>;
  pageInfo: PageInfo;
};

export type GqlRolesResponse = {
  __typename?: 'GqlRolesResponse';
  data?: Maybe<GqlRolesPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlStringsPagination = {
  __typename?: 'GqlStringsPagination';
  items?: Maybe<Array<Maybe<Scalars['String']>>>;
  pageInfo: PageInfo;
};

export type GqlCategoryResponse = {
  __typename?: 'GqlCategoryResponse';
  data?: Maybe<Category>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlCategorysPagination = {
  __typename?: 'GqlCategorysPagination';
  items?: Maybe<Array<Maybe<Category>>>;
  pageInfo: PageInfo;
};

export type GqlCategorysResponse = {
  __typename?: 'GqlCategorysResponse';
  data?: Maybe<GqlCategorysPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlSubCategoryResponse = {
  __typename?: 'GqlSubCategoryResponse';
  data?: Maybe<SubCategory>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlSubCategorysPagination = {
  __typename?: 'GqlSubCategorysPagination';
  items?: Maybe<Array<Maybe<SubCategory>>>;
  pageInfo: PageInfo;
};

export type GqlSubCategorysResponse = {
  __typename?: 'GqlSubCategorysResponse';
  data?: Maybe<GqlSubCategorysPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlOptionResponse = {
  __typename?: 'GqlOptionResponse';
  data?: Maybe<Option>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlOptionsPagination = {
  __typename?: 'GqlOptionsPagination';
  items?: Maybe<Array<Maybe<Option>>>;
  pageInfo: PageInfo;
};

export type GqlOptionsResponse = {
  __typename?: 'GqlOptionsResponse';
  data?: Maybe<GqlOptionsPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlOptionPricingResponse = {
  __typename?: 'GqlOptionPricingResponse';
  data?: Maybe<OptionPricing>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlOptionSetResponse = {
  __typename?: 'GqlOptionSetResponse';
  data?: Maybe<OptionSet>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlOptionSetsPagination = {
  __typename?: 'GqlOptionSetsPagination';
  items?: Maybe<Array<Maybe<OptionSet>>>;
  pageInfo: PageInfo;
};

export type GqlOptionSetsResponse = {
  __typename?: 'GqlOptionSetsResponse';
  data?: Maybe<GqlOptionSetsPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlStaticValueResponse = {
  __typename?: 'GqlStaticValueResponse';
  data?: Maybe<StaticValue>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlStaticValuesPagination = {
  __typename?: 'GqlStaticValuesPagination';
  items?: Maybe<Array<Maybe<StaticValue>>>;
  pageInfo: PageInfo;
};

export type GqlStaticValuesResponse = {
  __typename?: 'GqlStaticValuesResponse';
  data?: Maybe<GqlStaticValuesPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlStaticsPagination = {
  __typename?: 'GqlStaticsPagination';
  items?: Maybe<Array<Maybe<Static>>>;
  pageInfo: PageInfo;
};

export type GqlStaticsResponse = {
  __typename?: 'GqlStaticsResponse';
  data?: Maybe<GqlStaticsPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlMessageResponse = {
  __typename?: 'GqlMessageResponse';
  data?: Maybe<Message>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlMessagesPagination = {
  __typename?: 'GqlMessagesPagination';
  items?: Maybe<Array<Maybe<Message>>>;
  pageInfo: PageInfo;
};

export type GqlMessagesResponse = {
  __typename?: 'GqlMessagesResponse';
  data?: Maybe<GqlMessagesPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlReviewResponse = {
  __typename?: 'GqlReviewResponse';
  data?: Maybe<Review>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlReviewsPagination = {
  __typename?: 'GqlReviewsPagination';
  items?: Maybe<Array<Maybe<Review>>>;
  pageInfo: PageInfo;
};

export type GqlReviewsResponse = {
  __typename?: 'GqlReviewsResponse';
  data?: Maybe<GqlReviewsPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlDesignerResponse = {
  __typename?: 'GqlDesignerResponse';
  data?: Maybe<Designer>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlDesignersPagination = {
  __typename?: 'GqlDesignersPagination';
  items?: Maybe<Array<Maybe<Designer>>>;
  pageInfo: PageInfo;
};

export type GqlDesignersResponse = {
  __typename?: 'GqlDesignersResponse';
  data?: Maybe<GqlDesignersPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlArtResponse = {
  __typename?: 'GqlArtResponse';
  data?: Maybe<Art>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type GqlArtsPagination = {
  __typename?: 'GqlArtsPagination';
  items?: Maybe<Array<Maybe<Art>>>;
  pageInfo: PageInfo;
};

export type GqlArtsResponse = {
  __typename?: 'GqlArtsResponse';
  data?: Maybe<GqlArtsPagination>;
  code: Scalars['Int'];
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  findUserById: GqlUserResponse;
  findUserByEmail: GqlUserResponse;
  findUserByPhone: GqlUserResponse;
  findUserBySlug: GqlUserResponse;
  users_board: GqlUsersResponse;
  userAddresses: GqlAddresssResponse;
  vendors_board: GqlVendorsResponse;
  findProductById: GqlProductResponse;
  findProductBySlug: GqlProductResponse;
  products: GqlProductsResponse;
  productsBySubCategory: GqlProductsResponse;
  products_board: GqlProductsResponse;
  productsBySubCategory_board: GqlProductsResponse;
  mockups: GqlProductsResponse;
  mockupsBySubCategory: GqlProductsResponse;
  mockups_board: GqlProductsResponse;
  mockupsBySubCategory_board: GqlProductsResponse;
  getCurrentUser: GqlUserResponse;
  findRoleById: GqlRoleResponse;
  roles_board: GqlRolesResponse;
  categories: GqlCategorysResponse;
  categories_board: GqlCategorysResponse;
  subCategories: GqlSubCategorysResponse;
  subCategories_board: GqlSubCategorysResponse;
  findCategoryById: GqlCategoryResponse;
  findSubCategoryById: GqlSubCategoryResponse;
  findCategoryBySlug: GqlCategoryResponse;
  findSubCategoryBySlug: GqlSubCategoryResponse;
  findOptionById: GqlOptionResponse;
  options_board: GqlOptionsResponse;
  optionSets_board: GqlOptionSetsResponse;
  optionSetByType: GqlOptionSetResponse;
  statics_board: GqlStaticsResponse;
  getStaticValuesByType: GqlStaticValuesResponse;
  getStaticValuesByType_board: GqlStaticValuesResponse;
  findStaticValueById: GqlStaticValueResponse;
  findStaticValueBySlug: GqlStaticValueResponse;
  messages: GqlMessagesResponse;
  findReviewById: GqlReviewResponse;
  findReviewsByProduct: GqlReviewsResponse;
  findReviewsByVendor: GqlReviewsResponse;
  reviews_board: GqlReviewsResponse;
  findDesignerById: GqlDesignerResponse;
  designers_board: GqlDesignersResponse;
  designers: GqlDesignersResponse;
  findArtById: GqlArtResponse;
  arts: GqlArtsResponse;
  artsByDesignerId: GqlArtsResponse;
  arts_board: GqlArtsResponse;
  artsByDesignerId_board: GqlArtsResponse;
};


export type QueryFindUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryFindUserByEmailArgs = {
  userEmail: Scalars['String'];
};


export type QueryFindUserByPhoneArgs = {
  userPhone: Scalars['String'];
};


export type QueryFindUserBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryUsers_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterUserInput_Board>;
};


export type QueryUserAddressesArgs = {
  userId: Scalars['String'];
};


export type QueryVendors_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterVendorInput_Board>;
};


export type QueryFindProductByIdArgs = {
  productId: Scalars['String'];
};


export type QueryFindProductBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryProductsArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterProductInput>;
};


export type QueryProductsBySubCategoryArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterProductInput>;
  subCategoryId: Scalars['String'];
};


export type QueryProducts_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterProductInput_Board>;
};


export type QueryProductsBySubCategory_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterProductInput_Board>;
  subCategoryId: Scalars['String'];
};


export type QueryMockupsArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterProductInput>;
};


export type QueryMockupsBySubCategoryArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterProductInput>;
  subCategoryId: Scalars['String'];
};


export type QueryMockups_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterProductInput_Board>;
};


export type QueryMockupsBySubCategory_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterProductInput_Board>;
  subCategoryId: Scalars['String'];
};


export type QueryFindRoleByIdArgs = {
  roleId: Scalars['String'];
};


export type QueryRoles_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<RoleFilterInput>;
};


export type QueryCategoriesArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterCategoryInput>;
};


export type QueryCategories_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterCategoryInput_Board>;
};


export type QuerySubCategoriesArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterCategoryInput>;
};


export type QuerySubCategories_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterCategoryInput_Board>;
};


export type QueryFindCategoryByIdArgs = {
  categoryId: Scalars['String'];
};


export type QueryFindSubCategoryByIdArgs = {
  subCategoryId: Scalars['String'];
};


export type QueryFindCategoryBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindSubCategoryBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindOptionByIdArgs = {
  optionId: Scalars['String'];
};


export type QueryOptions_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterOptionInput_Board>;
};


export type QueryOptionSets_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterOptionSetInput_Board>;
};


export type QueryOptionSetByTypeArgs = {
  type: Scalars['String'];
};


export type QueryStatics_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterStaticInput_Board>;
};


export type QueryGetStaticValuesByTypeArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterStaticValueInput>;
  input: StaticKeyInput;
};


export type QueryGetStaticValuesByType_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterStaticValueInput_Board>;
  input: StaticKeyInput;
};


export type QueryFindStaticValueByIdArgs = {
  staticValueId: Scalars['String'];
};


export type QueryFindStaticValueBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryMessagesArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterMessageInput>;
};


export type QueryFindReviewByIdArgs = {
  reviewId: Scalars['String'];
};


export type QueryFindReviewsByProductArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  productId: Scalars['String'];
};


export type QueryFindReviewsByVendorArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  vendorId: Scalars['String'];
};


export type QueryReviews_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterReviewInput>;
};


export type QueryFindDesignerByIdArgs = {
  designerId: Scalars['String'];
};


export type QueryDesigners_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterDesignerInput_Board>;
};


export type QueryDesignersArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterDesignerInput>;
};


export type QueryFindArtByIdArgs = {
  artId: Scalars['String'];
};


export type QueryArtsArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterArtInput>;
};


export type QueryArtsByDesignerIdArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterArtInput>;
  designerId: Scalars['String'];
};


export type QueryArts_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterArtInput_Board>;
};


export type QueryArtsByDesignerId_BoardArgs = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterArtInput_Board>;
  designerId: Scalars['String'];
};

export type PaginatorInput = {
  page?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Float']>;
};

export type FilterUserInput_Board = {
  searchKey?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
  type?: Maybe<UserTypeEnum>;
};

export type FilterVendorInput_Board = {
  searchKey?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
};

export type FilterProductInput = {
  searchKey?: Maybe<Scalars['String']>;
};

export type FilterProductInput_Board = {
  searchKey?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
};

export type RoleFilterInput = {
  group?: Maybe<Scalars['String']>;
};

export type FilterCategoryInput = {
  searchKey?: Maybe<Scalars['String']>;
};

export type FilterCategoryInput_Board = {
  searchKey?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
};

export type FilterOptionInput_Board = {
  searchKey?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
};

export type FilterOptionSetInput_Board = {
  searchKey?: Maybe<Scalars['String']>;
};

export type FilterStaticInput_Board = {
  key?: Maybe<StaticKeyEnum>;
};

export type FilterStaticValueInput = {
  searchKey?: Maybe<Scalars['String']>;
};

export type StaticKeyInput = {
  key: StaticKeyEnum;
};

export type FilterStaticValueInput_Board = {
  searchKey?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
};

export type FilterMessageInput = {
  searchKey?: Maybe<Scalars['String']>;
};

export type FilterReviewInput = {
  searchKey?: Maybe<Scalars['String']>;
  type?: Maybe<ReviewType>;
};

export type FilterDesignerInput_Board = {
  searchKey?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
};

export type FilterDesignerInput = {
  searchKey?: Maybe<Scalars['String']>;
};

export type FilterArtInput = {
  searchKey?: Maybe<Scalars['String']>;
};

export type FilterArtInput_Board = {
  searchKey?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUserProfile_board: GqlUserResponse;
  updateUserProfile: GqlUserResponse;
  updateUserPassword: GqlUserResponse;
  addUserAddress: GqlAddressResponse;
  updateUserAddress: GqlAddressResponse;
  deleteUserAddress: GqlAddressResponse;
  approveVendorRequest_board: GqlUserResponse;
  approveDesignerRequest_board: GqlUserResponse;
  updateVendor: GqlVendorResponse;
  createProduct: GqlProductResponse;
  createMockup: GqlProductResponse;
  updateProduct: GqlProductResponse;
  updateMockup: GqlProductResponse;
  deleteProduct: GqlProductResponse;
  deleteMockup: GqlProductResponse;
  uploadFile: GqlStringResponse;
  login: GqlUserResponse;
  registerAsUser: GqlUserResponse;
  registerAsVendor: GqlUserResponse;
  registerAsDesigner: GqlUserResponse;
  seed: GqlBooleanResponse;
  updateRolePermissions: GqlRoleResponse;
  createCategory: GqlCategoryResponse;
  createSubCategory: GqlSubCategoryResponse;
  updateCategory: GqlCategoryResponse;
  updateSubCategory: GqlSubCategoryResponse;
  deleteCategory: GqlCategoryResponse;
  deleteSubCategory: GqlSubCategoryResponse;
  createOption: GqlOptionResponse;
  updateOption: GqlOptionResponse;
  createOptionPricing: GqlOptionPricingResponse;
  createOptionPricing_board: GqlOptionPricingResponse;
  updateOptionPricing: GqlOptionPricingResponse;
  updateOptionPricing_board: GqlOptionPricingResponse;
  createStaticValue: GqlStaticValueResponse;
  updateStaticValue: GqlStaticValueResponse;
  deleteStaticValue: GqlStaticValueResponse;
  createMessage: GqlMessageResponse;
  createReview: GqlReviewResponse;
  deleteReview: GqlReviewResponse;
  updateDesigner: GqlDesignerResponse;
  createArt: GqlArtResponse;
  updateArt: GqlArtResponse;
  deleteArt: GqlArtResponse;
};


export type MutationUpdateUserProfile_BoardArgs = {
  userId: Scalars['String'];
  input: UpdateUserInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPasswordDto;
};


export type MutationAddUserAddressArgs = {
  input: CreateAddressInput;
};


export type MutationUpdateUserAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationDeleteUserAddressArgs = {
  addressId: Scalars['String'];
};


export type MutationApproveVendorRequest_BoardArgs = {
  userId: Scalars['String'];
};


export type MutationApproveDesignerRequest_BoardArgs = {
  userId: Scalars['String'];
};


export type MutationUpdateVendorArgs = {
  vendorId: Scalars['String'];
  input: UpdateVendorInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateMockupArgs = {
  input: CreateMockupInput;
};


export type MutationUpdateProductArgs = {
  productId: Scalars['String'];
  input: UpdateProductInput;
};


export type MutationUpdateMockupArgs = {
  mockupId: Scalars['String'];
  input: UpdateProductInput;
};


export type MutationDeleteProductArgs = {
  productId: Scalars['String'];
};


export type MutationDeleteMockupArgs = {
  mockupId: Scalars['String'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
  model: FileModelEnum;
};


export type MutationLoginArgs = {
  input: EmailPasswordLoginInput;
};


export type MutationRegisterAsUserArgs = {
  input: RegisterAsUserInput;
};


export type MutationRegisterAsVendorArgs = {
  input: RegisterAsVendorInput;
};


export type MutationRegisterAsDesignerArgs = {
  input: RegisterAsDesignerInput;
};


export type MutationUpdateRolePermissionsArgs = {
  input: UpdateRoleInput;
  roleId: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryDto;
};


export type MutationCreateSubCategoryArgs = {
  input: CreateSubCategoryDto;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['String'];
  input: UpdateCategoryDto;
};


export type MutationUpdateSubCategoryArgs = {
  categoryId: Scalars['String'];
  input: UpdateSubCategoryDto;
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['String'];
};


export type MutationDeleteSubCategoryArgs = {
  subCategoryId: Scalars['String'];
};


export type MutationCreateOptionArgs = {
  input: CreateOptionInput;
};


export type MutationUpdateOptionArgs = {
  optionId: Scalars['String'];
  input: UpdateOptionInput;
};


export type MutationCreateOptionPricingArgs = {
  input: CreateOptionPricingInput;
};


export type MutationCreateOptionPricing_BoardArgs = {
  input: CreateOptionPricingInput_Board;
};


export type MutationUpdateOptionPricingArgs = {
  input: UpdateOptionPricingInput;
};


export type MutationUpdateOptionPricing_BoardArgs = {
  input: UpdateOptionPricingInput_Board;
};


export type MutationCreateStaticValueArgs = {
  input: CreateStaticValueInput;
};


export type MutationUpdateStaticValueArgs = {
  input: UpdateStaticValueInput;
};


export type MutationDeleteStaticValueArgs = {
  staticValueId: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationDeleteReviewArgs = {
  reviewId: Scalars['String'];
};


export type MutationUpdateDesignerArgs = {
  designerId: Scalars['String'];
  input: UpdateDesignerInput;
};


export type MutationCreateArtArgs = {
  input: CreateArtInput;
};


export type MutationUpdateArtArgs = {
  artId: Scalars['String'];
  input: UpdateArtInput;
};


export type MutationDeleteArtArgs = {
  artId: Scalars['String'];
};

export type UpdateUserInput = {
  fName?: Maybe<Scalars['String']>;
  lName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Timestamp']>;
  phone?: Maybe<Scalars['String']>;
  type?: Maybe<UserTypeEnum>;
  roleId?: Maybe<Scalars['ID']>;
  avatar?: Maybe<Scalars['Upload']>;
  favLang?: Maybe<LangEnum>;
  gender?: Maybe<GenderEnum>;
  activated?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
};


export type UpdateUserPasswordDto = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type CreateAddressInput = {
  address: Scalars['String'];
  suburb?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
  vendorId?: Maybe<Scalars['ID']>;
};

export type UpdateAddressInput = {
  addressId: Scalars['ID'];
  address?: Maybe<Scalars['String']>;
  suburb?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};

export type UpdateVendorInput = {
  nameAr: Scalars['String'];
  nameEn?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
};

export type CreateProductInput = {
  subCategoryId: Scalars['ID'];
  sku?: Maybe<Scalars['String']>;
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  descriptionAr?: Maybe<Scalars['String']>;
  descriptionEn?: Maybe<Scalars['String']>;
  thumbnails?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  stock?: Maybe<Scalars['Int']>;
  artId: Scalars['ID'];
  mockupId: Scalars['ID'];
  featured?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  details?: Maybe<Array<Scalars['String']>>;
  features?: Maybe<Array<Scalars['String']>>;
  options?: Maybe<Array<Scalars['ID']>>;
};

export type CreateMockupInput = {
  subCategoryId: Scalars['ID'];
  sku?: Maybe<Scalars['String']>;
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  descriptionAr?: Maybe<Scalars['String']>;
  descriptionEn?: Maybe<Scalars['String']>;
  thumbnails?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  details?: Maybe<Array<Scalars['String']>>;
  features?: Maybe<Array<Scalars['String']>>;
  options?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateProductInput = {
  subCategoryId?: Maybe<Scalars['ID']>;
  sku?: Maybe<Scalars['String']>;
  nameAr?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
  descriptionAr?: Maybe<Scalars['String']>;
  descriptionEn?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  thumbnails?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  weight?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Int']>;
  activated?: Maybe<Scalars['Boolean']>;
  featured?: Maybe<Scalars['Boolean']>;
  details?: Maybe<Array<Scalars['String']>>;
  features?: Maybe<Array<Scalars['String']>>;
  options?: Maybe<Array<Scalars['ID']>>;
};

export enum FileModelEnum {
  USERS = 'USERS',
  PRODUCTS = 'PRODUCTS',
  SAMPLES = 'SAMPLES',
  CERTIFICATES = 'CERTIFICATES',
  ARTS = 'ARTS',
  CATEGORIES = 'CATEGORIES',
  SUB_CATEGORIES = 'SUB_CATEGORIES',
  OPTIONS = 'OPTIONS',
  STATICS = 'STATICS'
}

export type EmailPasswordLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  favLang?: Maybe<LangEnum>;
};

export type RegisterAsUserInput = {
  fName: Scalars['String'];
  lName: Scalars['String'];
  email: Scalars['String'];
  birthDate?: Maybe<Scalars['Float']>;
  phone: Scalars['String'];
  password: Scalars['String'];
  roleId?: Maybe<Scalars['ID']>;
  avatar?: Maybe<Scalars['Upload']>;
  favLang?: Maybe<LangEnum>;
  gender?: Maybe<GenderEnum>;
};

export type RegisterAsVendorInput = {
  fName: Scalars['String'];
  lName: Scalars['String'];
  email: Scalars['String'];
  birthDate?: Maybe<Scalars['Float']>;
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  avatar?: Maybe<Scalars['Upload']>;
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
};

export type RegisterAsDesignerInput = {
  fName: Scalars['String'];
  lName: Scalars['String'];
  email: Scalars['String'];
  birthDate?: Maybe<Scalars['Float']>;
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  avatar?: Maybe<Scalars['Upload']>;
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  certificates?: Maybe<Array<Maybe<Scalars['Upload']>>>;
  bio?: Maybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  description?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Scalars['String']>>;
};

export type CreateCategoryDto = {
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  descriptionAr?: Maybe<Scalars['String']>;
  descriptionEn?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['Upload']>;
  activated?: Maybe<Scalars['Boolean']>;
  vendorId?: Maybe<Scalars['ID']>;
};

export type CreateSubCategoryDto = {
  categoryId: Scalars['ID'];
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  descriptionAr?: Maybe<Scalars['String']>;
  descriptionEn?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['Upload']>;
  activated?: Maybe<Scalars['Boolean']>;
};

export type UpdateCategoryDto = {
  nameAr?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
  descriptionAr?: Maybe<Scalars['String']>;
  descriptionEn?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['Upload']>;
  activated?: Maybe<Scalars['Boolean']>;
  vendorId?: Maybe<Scalars['ID']>;
};

export type UpdateSubCategoryDto = {
  categoryId: Scalars['ID'];
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  descriptionAr?: Maybe<Scalars['String']>;
  descriptionEn?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['Upload']>;
  activated?: Maybe<Scalars['Boolean']>;
};

export type CreateOptionInput = {
  optionSetId: Scalars['ID'];
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  activated?: Maybe<Scalars['Boolean']>;
  thumbnail?: Maybe<Scalars['Upload']>;
};

export type UpdateOptionInput = {
  optionSetId?: Maybe<Scalars['ID']>;
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  activated?: Maybe<Scalars['Boolean']>;
  thumbnail?: Maybe<Scalars['Upload']>;
};

export type CreateOptionPricingInput = {
  optionId: Scalars['ID'];
  price: Scalars['Float'];
};

export type CreateOptionPricingInput_Board = {
  optionId: Scalars['ID'];
  price: Scalars['Float'];
  vendorId: Scalars['ID'];
};

export type UpdateOptionPricingInput = {
  optionPricingId: Scalars['ID'];
  price: Scalars['Float'];
};

export type UpdateOptionPricingInput_Board = {
  optionPricingId: Scalars['ID'];
  price: Scalars['Float'];
  vendorId: Scalars['ID'];
};

export type CreateStaticValueInput = {
  staticId: Scalars['ID'];
  titleAr: Scalars['String'];
  titleEn: Scalars['String'];
  contentAr?: Maybe<Scalars['String']>;
  contentEn?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
  thumbnail?: Maybe<Scalars['Upload']>;
};

export type UpdateStaticValueInput = {
  staticValueId: Scalars['ID'];
  titleAr?: Maybe<Scalars['String']>;
  titleEn?: Maybe<Scalars['String']>;
  contentAr?: Maybe<Scalars['String']>;
  contentEn?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
  thumbnail?: Maybe<Scalars['Upload']>;
};

export type CreateMessageInput = {
  content: Scalars['String'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
};

export type CreateReviewInput = {
  productId?: Maybe<Scalars['ID']>;
  vendorId?: Maybe<Scalars['ID']>;
  type?: Maybe<ReviewType>;
  message?: Maybe<Scalars['String']>;
  rate: Scalars['Int'];
};

export type UpdateDesignerInput = {
  nameAr: Scalars['String'];
  nameEn?: Maybe<Scalars['String']>;
  activated?: Maybe<Scalars['Boolean']>;
  certificates?: Maybe<Array<Scalars['Upload']>>;
  bio?: Maybe<Scalars['String']>;
};

export type CreateArtInput = {
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  designerId?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<Scalars['ID']>>;
  avatar?: Maybe<Scalars['Upload']>;
};

export type UpdateArtInput = {
  nameAr: Scalars['String'];
  nameEn: Scalars['String'];
  designerId?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<Scalars['ID']>>;
  avatar?: Maybe<Scalars['Upload']>;
};

export type CreateAddressMutationVariables = {
  input: CreateAddressInput;
};


export type CreateAddressMutation = (
  { __typename?: 'Mutation' }
  & { addUserAddress: (
    { __typename?: 'GqlAddressResponse' }
    & Pick<GqlAddressResponse, 'code' | 'success' | 'message'>
  ) }
);

export type DeleteAddressMutationVariables = {
  addressId: Scalars['String'];
};


export type DeleteAddressMutation = (
  { __typename?: 'Mutation' }
  & { deleteUserAddress: (
    { __typename?: 'GqlAddressResponse' }
    & Pick<GqlAddressResponse, 'code' | 'success' | 'message'>
  ) }
);

export type UpdateAddressMutationVariables = {
  input: UpdateAddressInput;
};


export type UpdateAddressMutation = (
  { __typename?: 'Mutation' }
  & { updateUserAddress: (
    { __typename?: 'GqlAddressResponse' }
    & Pick<GqlAddressResponse, 'success' | 'message' | 'code'>
  ) }
);

export type AddressFragment = (
  { __typename?: 'Address' }
  & Pick<Address, 'id' | 'address' | 'suburb' | 'postalCode' | 'city' | 'country'>
);

export type ArtsQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterArtInput_Board>;
};


export type ArtsQuery = (
  { __typename?: 'Query' }
  & { arts_board: (
    { __typename?: 'GqlArtsResponse' }
    & Pick<GqlArtsResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlArtsPagination' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ), arts?: Maybe<Array<Maybe<(
        { __typename?: 'Art' }
        & { designer?: Maybe<(
          { __typename?: 'Designer' }
          & { user?: Maybe<(
            { __typename?: 'User' }
            & UserFragment
          )> }
          & DesignerFragment
        )>, products?: Maybe<Array<(
          { __typename?: 'Product' }
          & ProductFragment
        )>> }
        & ArtFragment
      )>>> }
    )> }
  ) }
);

export type ArtByIdQueryVariables = {
  artId: Scalars['String'];
};


export type ArtByIdQuery = (
  { __typename?: 'Query' }
  & { findArtById: (
    { __typename?: 'GqlArtResponse' }
    & Pick<GqlArtResponse, 'code' | 'message' | 'success'>
    & { art?: Maybe<(
      { __typename?: 'Art' }
      & { designer?: Maybe<(
        { __typename?: 'Designer' }
        & { user?: Maybe<(
          { __typename?: 'User' }
          & UserFragment
        )> }
        & DesignerFragment
      )>, products?: Maybe<Array<(
        { __typename?: 'Product' }
        & ProductFragment
      )>> }
      & ArtFragment
    )> }
  ) }
);

export type CreateArtMutationVariables = {
  input: CreateArtInput;
};


export type CreateArtMutation = (
  { __typename?: 'Mutation' }
  & { createArt: (
    { __typename?: 'GqlArtResponse' }
    & Pick<GqlArtResponse, 'code' | 'success' | 'message'>
  ) }
);

export type UpdateArtMutationVariables = {
  artId: Scalars['String'];
  input: UpdateArtInput;
};


export type UpdateArtMutation = (
  { __typename?: 'Mutation' }
  & { updateArt: (
    { __typename?: 'GqlArtResponse' }
    & Pick<GqlArtResponse, 'code' | 'success' | 'message'>
  ) }
);

export type ArtFragment = (
  { __typename?: 'Art' }
  & Pick<Art, 'id' | 'nameAr' | 'nameEn' | 'verified' | 'rate' | 'avatar' | 'price' | 'createdAt' | 'updatedAt'>
);

export type CategoriesQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterCategoryInput_Board>;
};


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories_board: (
    { __typename?: 'GqlCategorysResponse' }
    & Pick<GqlCategorysResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlCategorysPagination' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ), categories?: Maybe<Array<Maybe<(
        { __typename?: 'Category' }
        & { subCategories?: Maybe<Array<(
          { __typename?: 'SubCategory' }
          & SubCategoryFragment
        )>> }
        & CategoryFragment
      )>>> }
    )> }
  ) }
);

export type CategoryByIdQueryVariables = {
  categoryId: Scalars['String'];
};


export type CategoryByIdQuery = (
  { __typename?: 'Query' }
  & { findCategoryById: (
    { __typename?: 'GqlCategoryResponse' }
    & Pick<GqlCategoryResponse, 'code' | 'success' | 'message'>
    & { category?: Maybe<(
      { __typename?: 'Category' }
      & { subCategories?: Maybe<Array<(
        { __typename?: 'SubCategory' }
        & SubCategoryFragment
      )>>, vendor?: Maybe<(
        { __typename?: 'Vendor' }
        & VendorFragment
      )> }
      & CategoryFragment
    )> }
  ) }
);

export type SubCategoryByIdQueryVariables = {
  subCategoryId: Scalars['String'];
};


export type SubCategoryByIdQuery = (
  { __typename?: 'Query' }
  & { findSubCategoryById: (
    { __typename?: 'GqlSubCategoryResponse' }
    & Pick<GqlSubCategoryResponse, 'code' | 'success' | 'message'>
    & { subcategory?: Maybe<(
      { __typename?: 'SubCategory' }
      & { category?: Maybe<(
        { __typename?: 'Category' }
        & CategoryFragment
      )>, products?: Maybe<Array<(
        { __typename?: 'Product' }
        & ProductFragment
      )>> }
      & SubCategoryFragment
    )> }
  ) }
);

export type UpdateCategoryMutationVariables = {
  categoryId: Scalars['String'];
  input: UpdateCategoryDto;
};


export type UpdateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateCategory: (
    { __typename?: 'GqlCategoryResponse' }
    & Pick<GqlCategoryResponse, 'code' | 'success' | 'message'>
  ) }
);

export type UpdateSubCategoryMutationVariables = {
  categoryId: Scalars['String'];
  input: UpdateSubCategoryDto;
};


export type UpdateSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateSubCategory: (
    { __typename?: 'GqlSubCategoryResponse' }
    & Pick<GqlSubCategoryResponse, 'code' | 'success' | 'message'>
  ) }
);

export type SubCategoriesQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterCategoryInput_Board>;
};


export type SubCategoriesQuery = (
  { __typename?: 'Query' }
  & { subCategories_board: (
    { __typename?: 'GqlSubCategorysResponse' }
    & Pick<GqlSubCategorysResponse, 'success' | 'code' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlSubCategorysPagination' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ), subCategories?: Maybe<Array<Maybe<(
        { __typename?: 'SubCategory' }
        & { products?: Maybe<Array<(
          { __typename?: 'Product' }
          & ProductFragment
        )>>, category?: Maybe<(
          { __typename?: 'Category' }
          & CategoryFragment
        )> }
        & SubCategoryFragment
      )>>> }
    )> }
  ) }
);

export type CreateCategoryMutationVariables = {
  input: CreateCategoryDto;
};


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory: (
    { __typename?: 'GqlCategoryResponse' }
    & Pick<GqlCategoryResponse, 'success' | 'code' | 'message'>
  ) }
);

export type CreateSubCategoryMutationVariables = {
  input: CreateSubCategoryDto;
};


export type CreateSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createSubCategory: (
    { __typename?: 'GqlSubCategoryResponse' }
    & Pick<GqlSubCategoryResponse, 'success' | 'code' | 'message'>
  ) }
);

export type CategoryFragment = (
  { __typename?: 'Category' }
  & Pick<Category, 'id' | 'slug' | 'nameAr' | 'nameEn' | 'descriptionAr' | 'descriptionEn' | 'thumbnail' | 'activated' | 'createdAt' | 'updatedAt'>
);

export type SubCategoryFragment = (
  { __typename?: 'SubCategory' }
  & Pick<SubCategory, 'id' | 'slug' | 'nameAr' | 'nameEn' | 'descriptionAr' | 'descriptionEn' | 'thumbnail' | 'activated' | 'createdAt' | 'updatedAt'>
);

export type RegisterAsDesignerMutationVariables = {
  input: RegisterAsDesignerInput;
};


export type RegisterAsDesignerMutation = (
  { __typename?: 'Mutation' }
  & { registerAsDesigner: (
    { __typename?: 'GqlUserResponse' }
    & Pick<GqlUserResponse, 'code' | 'success' | 'message'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & { designer?: Maybe<(
        { __typename?: 'Designer' }
        & DesignerFragment
      )> }
      & UserFragment
    )> }
  ) }
);

export type DesignersQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterDesignerInput_Board>;
};


export type DesignersQuery = (
  { __typename?: 'Query' }
  & { designers_board: (
    { __typename?: 'GqlDesignersResponse' }
    & { data?: Maybe<(
      { __typename?: 'GqlDesignersPagination' }
      & { designers?: Maybe<Array<Maybe<(
        { __typename?: 'Designer' }
        & { user?: Maybe<(
          { __typename?: 'User' }
          & UserFragment
        )> }
        & DesignerFragment
      )>>>, pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ) }
    )> }
  ) }
);

export type DesignerByIdQueryVariables = {
  designerId: Scalars['String'];
};


export type DesignerByIdQuery = (
  { __typename?: 'Query' }
  & { findDesignerById: (
    { __typename?: 'GqlDesignerResponse' }
    & Pick<GqlDesignerResponse, 'code' | 'success' | 'message'>
    & { designer?: Maybe<(
      { __typename?: 'Designer' }
      & { addresses?: Maybe<Array<(
        { __typename?: 'Address' }
        & AddressFragment
      )>>, user?: Maybe<(
        { __typename?: 'User' }
        & { addresses?: Maybe<Array<(
          { __typename?: 'Address' }
          & AddressFragment
        )>> }
        & UserFragment
      )> }
      & DesignerFragment
    )> }
  ) }
);

export type UpdateDesignerMutationVariables = {
  designerId: Scalars['String'];
  input: UpdateDesignerInput;
};


export type UpdateDesignerMutation = (
  { __typename?: 'Mutation' }
  & { updateDesigner: (
    { __typename?: 'GqlDesignerResponse' }
    & Pick<GqlDesignerResponse, 'code' | 'success' | 'message'>
    & { designer?: Maybe<(
      { __typename?: 'Designer' }
      & { addresses?: Maybe<Array<(
        { __typename?: 'Address' }
        & AddressFragment
      )>>, user?: Maybe<(
        { __typename?: 'User' }
        & UserFragment
      )> }
      & DesignerFragment
    )> }
  ) }
);

export type DesignerFragment = (
  { __typename?: 'Designer' }
  & Pick<Designer, 'id' | 'nameAr' | 'nameEn' | 'activated' | 'rate' | 'bio' | 'certificates' | 'createdAt' | 'updatedAt'>
);

export type DesignerRequestFragment = (
  { __typename?: 'DesignerRequest' }
  & Pick<DesignerRequest, 'changedAt' | 'status'>
);

export type MessagesQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterMessageInput>;
};


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: (
    { __typename?: 'GqlMessagesResponse' }
    & Pick<GqlMessagesResponse, 'message' | 'code' | 'success'>
    & { data?: Maybe<(
      { __typename?: 'GqlMessagesPagination' }
      & { messages?: Maybe<Array<Maybe<(
        { __typename?: 'Message' }
        & MessageFragment
      )>>> }
    )> }
  ) }
);

export type MessageFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'content' | 'name' | 'email' | 'phone' | 'address' | 'createdAt'>
);

export type MockupsQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterProductInput_Board>;
};


export type MockupsQuery = (
  { __typename?: 'Query' }
  & { mockups_board: (
    { __typename?: 'GqlProductsResponse' }
    & Pick<GqlProductsResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlProductsPagination' }
      & { mockups?: Maybe<Array<Maybe<(
        { __typename?: 'Product' }
        & { options?: Maybe<Array<(
          { __typename?: 'Option' }
          & OptionFragment
        )>>, reviews?: Maybe<Array<(
          { __typename?: 'Review' }
          & ReviewFragment
        )>>, subCategory: (
          { __typename?: 'SubCategory' }
          & SubCategoryFragment
        ) }
        & ProductFragment
      )>>>, pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ) }
    )> }
  ) }
);

export type MockupByIdQueryVariables = {
  productId: Scalars['String'];
};


export type MockupByIdQuery = (
  { __typename?: 'Query' }
  & { findProductById: (
    { __typename?: 'GqlProductResponse' }
    & Pick<GqlProductResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'Product' }
      & { options?: Maybe<Array<(
        { __typename?: 'Option' }
        & { optionSet: (
          { __typename?: 'OptionSet' }
          & OptionSetFragment
        ), prices?: Maybe<Array<(
          { __typename?: 'OptionPricing' }
          & OptionPricingFragment
        )>> }
        & OptionFragment
      )>>, subCategory: (
        { __typename?: 'SubCategory' }
        & SubCategoryFragment
      ), products?: Maybe<Array<(
        { __typename?: 'Product' }
        & ProductFragment
      )>> }
      & ProductFragment
    )> }
  ) }
);

export type CreateMockupMutationVariables = {
  input: CreateMockupInput;
};


export type CreateMockupMutation = (
  { __typename?: 'Mutation' }
  & { createMockup: (
    { __typename?: 'GqlProductResponse' }
    & Pick<GqlProductResponse, 'code' | 'success' | 'message'>
  ) }
);

export type UpdateMockupMutationVariables = {
  mockupId: Scalars['String'];
  input: UpdateProductInput;
};


export type UpdateMockupMutation = (
  { __typename?: 'Mutation' }
  & { updateMockup: (
    { __typename?: 'GqlProductResponse' }
    & Pick<GqlProductResponse, 'code' | 'success' | 'message'>
  ) }
);

export type OptionPricingFragment = (
  { __typename?: 'OptionPricing' }
  & Pick<OptionPricing, 'price' | 'activated' | 'createdAt' | 'updatedAt'>
);

export type OptionSetsQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterOptionSetInput_Board>;
};


export type OptionSetsQuery = (
  { __typename?: 'Query' }
  & { optionSets_board: (
    { __typename?: 'GqlOptionSetsResponse' }
    & Pick<GqlOptionSetsResponse, 'success' | 'code' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlOptionSetsPagination' }
      & { optionSets?: Maybe<Array<Maybe<(
        { __typename?: 'OptionSet' }
        & { options?: Maybe<Array<(
          { __typename?: 'Option' }
          & { prices?: Maybe<Array<(
            { __typename?: 'OptionPricing' }
            & OptionPricingFragment
          )>> }
          & OptionFragment
        )>> }
        & OptionSetFragment
      )>>>, pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ) }
    )> }
  ) }
);

export type OptionSetFragment = (
  { __typename?: 'OptionSet' }
  & Pick<OptionSet, 'id' | 'nameAr' | 'nameEn' | 'type'>
);

export type OptionsQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterOptionInput_Board>;
};


export type OptionsQuery = (
  { __typename?: 'Query' }
  & { options_board: (
    { __typename?: 'GqlOptionsResponse' }
    & Pick<GqlOptionsResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlOptionsPagination' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ), options?: Maybe<Array<Maybe<(
        { __typename?: 'Option' }
        & { prices?: Maybe<Array<(
          { __typename?: 'OptionPricing' }
          & OptionPricingFragment
        )>>, optionSet: (
          { __typename?: 'OptionSet' }
          & OptionSetFragment
        ) }
        & OptionFragment
      )>>> }
    )> }
  ) }
);

export type OptionByIdQueryVariables = {
  optionId: Scalars['String'];
};


export type OptionByIdQuery = (
  { __typename?: 'Query' }
  & { findOptionById: (
    { __typename?: 'GqlOptionResponse' }
    & Pick<GqlOptionResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'Option' }
      & { optionSet: (
        { __typename?: 'OptionSet' }
        & OptionSetFragment
      ) }
      & OptionFragment
    )> }
  ) }
);

export type CreateOptionMutationVariables = {
  input: CreateOptionInput;
};


export type CreateOptionMutation = (
  { __typename?: 'Mutation' }
  & { createOption: (
    { __typename?: 'GqlOptionResponse' }
    & Pick<GqlOptionResponse, 'message' | 'code' | 'success'>
  ) }
);

export type UpdateOptionMutationVariables = {
  optionId: Scalars['String'];
  input: UpdateOptionInput;
};


export type UpdateOptionMutation = (
  { __typename?: 'Mutation' }
  & { updateOption: (
    { __typename?: 'GqlOptionResponse' }
    & Pick<GqlOptionResponse, 'message' | 'success' | 'code'>
  ) }
);

export type OptionFragment = (
  { __typename?: 'Option' }
  & Pick<Option, 'id' | 'nameAr' | 'nameEn' | 'thumbnail' | 'activated' | 'createdAt' | 'updatedAt'>
);

export type ProductsQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterProductInput_Board>;
};


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products_board: (
    { __typename?: 'GqlProductsResponse' }
    & Pick<GqlProductsResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlProductsPagination' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ), products?: Maybe<Array<Maybe<(
        { __typename?: 'Product' }
        & { options?: Maybe<Array<(
          { __typename?: 'Option' }
          & { optionSet: (
            { __typename?: 'OptionSet' }
            & OptionSetFragment
          ), prices?: Maybe<Array<(
            { __typename?: 'OptionPricing' }
            & OptionPricingFragment
          )>> }
          & OptionFragment
        )>>, reviews?: Maybe<Array<(
          { __typename?: 'Review' }
          & ReviewFragment
        )>>, subCategory: (
          { __typename?: 'SubCategory' }
          & SubCategoryFragment
        ), mockup: (
          { __typename?: 'Product' }
          & ProductFragment
        ), products?: Maybe<Array<(
          { __typename?: 'Product' }
          & ProductFragment
        )>>, art?: Maybe<(
          { __typename?: 'Art' }
          & ArtFragment
        )> }
        & ProductFragment
      )>>> }
    )> }
  ) }
);

export type ProductsBySubCategoryQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterProductInput_Board>;
  subCategoryId: Scalars['String'];
};


export type ProductsBySubCategoryQuery = (
  { __typename?: 'Query' }
  & { productsBySubCategory_board: (
    { __typename?: 'GqlProductsResponse' }
    & Pick<GqlProductsResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlProductsPagination' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ), products?: Maybe<Array<Maybe<(
        { __typename?: 'Product' }
        & { options?: Maybe<Array<(
          { __typename?: 'Option' }
          & { optionSet: (
            { __typename?: 'OptionSet' }
            & OptionSetFragment
          ), prices?: Maybe<Array<(
            { __typename?: 'OptionPricing' }
            & OptionPricingFragment
          )>> }
          & OptionFragment
        )>>, reviews?: Maybe<Array<(
          { __typename?: 'Review' }
          & ReviewFragment
        )>>, subCategory: (
          { __typename?: 'SubCategory' }
          & SubCategoryFragment
        ) }
        & ProductFragment
      )>>> }
    )> }
  ) }
);

export type ProductByIdQueryVariables = {
  productId: Scalars['String'];
};


export type ProductByIdQuery = (
  { __typename?: 'Query' }
  & { findProductById: (
    { __typename?: 'GqlProductResponse' }
    & Pick<GqlProductResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'Product' }
      & { options?: Maybe<Array<(
        { __typename?: 'Option' }
        & { optionSet: (
          { __typename?: 'OptionSet' }
          & OptionSetFragment
        ), prices?: Maybe<Array<(
          { __typename?: 'OptionPricing' }
          & OptionPricingFragment
        )>> }
        & OptionFragment
      )>>, reviews?: Maybe<Array<(
        { __typename?: 'Review' }
        & ReviewFragment
      )>>, subCategory: (
        { __typename?: 'SubCategory' }
        & SubCategoryFragment
      ), mockup: (
        { __typename?: 'Product' }
        & ProductFragment
      ), products?: Maybe<Array<(
        { __typename?: 'Product' }
        & ProductFragment
      )>>, art?: Maybe<(
        { __typename?: 'Art' }
        & ArtFragment
      )> }
      & ProductFragment
    )> }
  ) }
);

export type CreateProductMutationVariables = {
  input: CreateProductInput;
};


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'GqlProductResponse' }
    & Pick<GqlProductResponse, 'code' | 'success' | 'message'>
  ) }
);

export type UpdateProductMutationVariables = {
  productId: Scalars['String'];
  input: UpdateProductInput;
};


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { updateProduct: (
    { __typename?: 'GqlProductResponse' }
    & Pick<GqlProductResponse, 'code' | 'success' | 'message'>
  ) }
);

export type ProductFragment = (
  { __typename?: 'Product' }
  & Pick<Product, 'id' | 'sku' | 'nameAr' | 'nameEn' | 'descriptionAr' | 'descriptionEn' | 'slug' | 'url' | 'views' | 'quantity' | 'thumbnails' | 'details' | 'features' | 'price' | 'weight' | 'stock' | 'activated' | 'rate' | 'featured' | 'samplable' | 'createdAt' | 'updatedAt'>
);

export type ReviewsQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterReviewInput>;
};


export type ReviewsQuery = (
  { __typename?: 'Query' }
  & { reviews_board: (
    { __typename?: 'GqlReviewsResponse' }
    & Pick<GqlReviewsResponse, 'success' | 'message' | 'code'>
    & { data?: Maybe<(
      { __typename?: 'GqlReviewsPagination' }
      & { reviews?: Maybe<Array<Maybe<(
        { __typename?: 'Review' }
        & { user: (
          { __typename?: 'User' }
          & UserFragment
        ), product?: Maybe<(
          { __typename?: 'Product' }
          & ProductFragment
        )>, vendor?: Maybe<(
          { __typename?: 'Vendor' }
          & VendorFragment
        )> }
        & ReviewFragment
      )>>>, pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ) }
    )> }
  ) }
);

export type DeleteReviewMutationVariables = {
  reviewId: Scalars['String'];
};


export type DeleteReviewMutation = (
  { __typename?: 'Mutation' }
  & { deleteReview: (
    { __typename?: 'GqlReviewResponse' }
    & Pick<GqlReviewResponse, 'code' | 'success' | 'message'>
  ) }
);

export type ReviewFragment = (
  { __typename?: 'Review' }
  & Pick<Review, 'id' | 'message' | 'rate' | 'seen' | 'type' | 'createdAt' | 'updatedAt'>
);

export type RolesQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<RoleFilterInput>;
};


export type RolesQuery = (
  { __typename?: 'Query' }
  & { roles_board: (
    { __typename?: 'GqlRolesResponse' }
    & Pick<GqlRolesResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlRolesPagination' }
      & { roles?: Maybe<Array<Maybe<(
        { __typename?: 'Role' }
        & RoleFragment
      )>>>, pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ) }
    )> }
  ) }
);

export type UpdatePermissionsMutationVariables = {
  input: UpdateRoleInput;
  roleId: Scalars['String'];
};


export type UpdatePermissionsMutation = (
  { __typename?: 'Mutation' }
  & { updateRolePermissions: (
    { __typename?: 'GqlRoleResponse' }
    & Pick<GqlRoleResponse, 'code' | 'success' | 'message'>
  ) }
);

export type RoleByIdQueryVariables = {
  roleId: Scalars['String'];
};


export type RoleByIdQuery = (
  { __typename?: 'Query' }
  & { findRoleById: (
    { __typename?: 'GqlRoleResponse' }
    & Pick<GqlRoleResponse, 'code' | 'success' | 'message'>
    & { role?: Maybe<(
      { __typename?: 'Role' }
      & RoleFragment
    )> }
  ) }
);

export type RoleFragment = (
  { __typename?: 'Role' }
  & Pick<Role, 'id' | 'group' | 'description' | 'permissions'>
);

export type UserSocialAccountFragment = (
  { __typename?: 'UserSocialAccount' }
  & Pick<UserSocialAccount, 'id' | 'provider' | 'providerId' | 'createdAt' | 'updatedAt'>
);

export type StaticsQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterStaticInput_Board>;
};


export type StaticsQuery = (
  { __typename?: 'Query' }
  & { statics_board: (
    { __typename?: 'GqlStaticsResponse' }
    & Pick<GqlStaticsResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlStaticsPagination' }
      & { statics?: Maybe<Array<Maybe<(
        { __typename?: 'Static' }
        & { values?: Maybe<Array<(
          { __typename?: 'StaticValue' }
          & StaticValueFragment
        )>> }
        & StaticFragment
      )>>>, pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ) }
    )> }
  ) }
);

export type StaticValuesByTypeQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterStaticValueInput_Board>;
  input: StaticKeyInput;
};


export type StaticValuesByTypeQuery = (
  { __typename?: 'Query' }
  & { getStaticValuesByType_board: (
    { __typename?: 'GqlStaticValuesResponse' }
    & Pick<GqlStaticValuesResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlStaticValuesPagination' }
      & { staticValues?: Maybe<Array<Maybe<(
        { __typename?: 'StaticValue' }
        & { static: (
          { __typename?: 'Static' }
          & StaticFragment
        ) }
        & StaticValueFragment
      )>>>, pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ) }
    )> }
  ) }
);

export type StaticValueByIdQueryVariables = {
  staticValueId: Scalars['String'];
};


export type StaticValueByIdQuery = (
  { __typename?: 'Query' }
  & { findStaticValueById: (
    { __typename?: 'GqlStaticValueResponse' }
    & Pick<GqlStaticValueResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'StaticValue' }
      & { static: (
        { __typename?: 'Static' }
        & StaticFragment
      ) }
      & StaticValueFragment
    )> }
  ) }
);

export type CreateStaticValueMutationVariables = {
  input: CreateStaticValueInput;
};


export type CreateStaticValueMutation = (
  { __typename?: 'Mutation' }
  & { createStaticValue: (
    { __typename?: 'GqlStaticValueResponse' }
    & Pick<GqlStaticValueResponse, 'code' | 'success' | 'message'>
  ) }
);

export type UpdateStaticValueMutationVariables = {
  input: UpdateStaticValueInput;
};


export type UpdateStaticValueMutation = (
  { __typename?: 'Mutation' }
  & { updateStaticValue: (
    { __typename?: 'GqlStaticValueResponse' }
    & Pick<GqlStaticValueResponse, 'code' | 'message' | 'success'>
  ) }
);

export type StaticFragment = (
  { __typename?: 'Static' }
  & Pick<Static, 'id' | 'key' | 'descriptionAr' | 'descriptionEn'>
);

export type StaticValueFragment = (
  { __typename?: 'StaticValue' }
  & Pick<StaticValue, 'id' | 'slug' | 'titleAr' | 'titleEn' | 'contentAr' | 'contentEn' | 'thumbnail' | 'activated' | 'createdAt' | 'updatedAt'>
);

export type GetCurrentUserQueryVariables = {};


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser: (
    { __typename?: 'GqlUserResponse' }
    & Pick<GqlUserResponse, 'code' | 'success' | 'message'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & { role?: Maybe<(
        { __typename?: 'Role' }
        & RoleFragment
      )> }
      & UserFragment
    )> }
  ) }
);

export type UserByIdQueryVariables = {
  userId: Scalars['String'];
};


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { findUserById: (
    { __typename?: 'GqlUserResponse' }
    & Pick<GqlUserResponse, 'code' | 'message' | 'success'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & { addresses?: Maybe<Array<(
        { __typename?: 'Address' }
        & AddressFragment
      )>>, role?: Maybe<(
        { __typename?: 'Role' }
        & RoleFragment
      )>, reviews?: Maybe<Array<(
        { __typename?: 'Review' }
        & ReviewFragment
      )>>, vendor?: Maybe<(
        { __typename?: 'Vendor' }
        & { addresses?: Maybe<Array<(
          { __typename?: 'Address' }
          & AddressFragment
        )>> }
        & VendorFragment
      )>, designer?: Maybe<(
        { __typename?: 'Designer' }
        & DesignerFragment
      )> }
      & UserFragment
    )> }
  ) }
);

export type LoginMutationVariables = {
  input: EmailPasswordLoginInput;
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'GqlUserResponse' }
    & Pick<GqlUserResponse, 'code' | 'success' | 'message'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & { role?: Maybe<(
        { __typename?: 'Role' }
        & RoleFragment
      )>, vendor?: Maybe<(
        { __typename?: 'Vendor' }
        & VendorFragment
      )>, designer?: Maybe<(
        { __typename?: 'Designer' }
        & DesignerFragment
      )> }
      & UserFragment
    )> }
  ) }
);

export type UsersQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterUserInput_Board>;
};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users_board: (
    { __typename?: 'GqlUsersResponse' }
    & Pick<GqlUsersResponse, 'code' | 'success' | 'message'>
    & { data?: Maybe<(
      { __typename?: 'GqlUsersPagination' }
      & { pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ), users?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & { role?: Maybe<(
          { __typename?: 'Role' }
          & RoleFragment
        )>, vendor?: Maybe<(
          { __typename?: 'Vendor' }
          & VendorFragment
        )>, designer?: Maybe<(
          { __typename?: 'Designer' }
          & DesignerFragment
        )> }
        & UserFragment
      )>>> }
    )> }
  ) }
);

export type UserByEmailQueryVariables = {
  userEmail: Scalars['String'];
};


export type UserByEmailQuery = (
  { __typename?: 'Query' }
  & { findUserByEmail: (
    { __typename?: 'GqlUserResponse' }
    & Pick<GqlUserResponse, 'code' | 'success' | 'message'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type UserByPhoneQueryVariables = {
  userPhone: Scalars['String'];
};


export type UserByPhoneQuery = (
  { __typename?: 'Query' }
  & { findUserByPhone: (
    { __typename?: 'GqlUserResponse' }
    & Pick<GqlUserResponse, 'code' | 'success' | 'message'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type RegisterAsUserMutationVariables = {
  input: RegisterAsUserInput;
};


export type RegisterAsUserMutation = (
  { __typename?: 'Mutation' }
  & { registerAsUser: (
    { __typename?: 'GqlUserResponse' }
    & Pick<GqlUserResponse, 'code' | 'success' | 'message'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type UpdateUserMutationVariables = {
  userId: Scalars['String'];
  input: UpdateUserInput;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUserProfile_board: (
    { __typename?: 'GqlUserResponse' }
    & Pick<GqlUserResponse, 'code' | 'success' | 'message'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'fName' | 'lName' | 'email' | 'birthDate' | 'favLang' | 'gender' | 'phone' | 'wallet' | 'slug' | 'type' | 'avatar' | 'resetPasswordCode' | 'resetPasswordCodeExpiry' | 'isPhoneVerified' | 'isEmailVerified' | 'phoneVerificationCode' | 'token' | 'lastLoginAt' | 'phoneVerificationCodeExpiry' | 'emailVerificationCode' | 'emailVerificationCodeExpiry' | 'blocked' | 'activated' | 'createdAt' | 'updatedAt'>
);

export type PageInfoFragment = (
  { __typename?: 'PageInfo' }
  & Pick<PageInfo, 'totalCount' | 'totalPages' | 'limit' | 'hasNext'>
);

export type VendorsGqlQueryVariables = {
  sort?: Maybe<Scalars['String']>;
  paginate?: Maybe<PaginatorInput>;
  filter?: Maybe<FilterVendorInput_Board>;
};


export type VendorsGqlQuery = (
  { __typename?: 'Query' }
  & { vendors_board: (
    { __typename?: 'GqlVendorsResponse' }
    & { data?: Maybe<(
      { __typename?: 'GqlVendorsPagination' }
      & { vendors?: Maybe<Array<Maybe<(
        { __typename?: 'Vendor' }
        & { user?: Maybe<(
          { __typename?: 'User' }
          & UserFragment
        )>, addresses?: Maybe<Array<(
          { __typename?: 'Address' }
          & AddressFragment
        )>> }
        & VendorFragment
      )>>>, pageInfo: (
        { __typename?: 'PageInfo' }
        & PageInfoFragment
      ) }
    )> }
  ) }
);

export type RegisterAsVendorMutationVariables = {
  input: RegisterAsVendorInput;
};


export type RegisterAsVendorMutation = (
  { __typename?: 'Mutation' }
  & { registerAsVendor: (
    { __typename?: 'GqlUserResponse' }
    & Pick<GqlUserResponse, 'code' | 'success' | 'message'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & { vendor?: Maybe<(
        { __typename?: 'Vendor' }
        & VendorFragment
      )> }
      & UserFragment
    )> }
  ) }
);

export type UpdateVendorMutationVariables = {
  vendorId: Scalars['String'];
  input: UpdateVendorInput;
};


export type UpdateVendorMutation = (
  { __typename?: 'Mutation' }
  & { updateVendor: (
    { __typename?: 'GqlVendorResponse' }
    & Pick<GqlVendorResponse, 'message' | 'code' | 'success'>
    & { vendor?: Maybe<(
      { __typename?: 'Vendor' }
      & { user?: Maybe<(
        { __typename?: 'User' }
        & UserFragment
      )>, addresses?: Maybe<Array<(
        { __typename?: 'Address' }
        & AddressFragment
      )>> }
      & VendorFragment
    )> }
  ) }
);

export type VendorFragment = (
  { __typename?: 'Vendor' }
  & Pick<Vendor, 'id' | 'nameAr' | 'nameEn' | 'activated' | 'rate' | 'createdAt' | 'updatedAt'>
);

export type VendorRequestFragment = (
  { __typename?: 'VendorRequest' }
  & Pick<VendorRequest, 'changedAt' | 'status'>
);

export const AddressFragmentDoc = gql`
    fragment Address on Address {
  id
  address
  suburb
  postalCode
  city
  country
}
    `;
export const ArtFragmentDoc = gql`
    fragment Art on Art {
  id
  nameAr
  nameEn
  verified
  rate
  avatar
  price
  createdAt
  updatedAt
}
    `;
export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  id
  slug
  nameAr
  nameEn
  descriptionAr
  descriptionEn
  thumbnail
  activated
  createdAt
  updatedAt
}
    `;
export const SubCategoryFragmentDoc = gql`
    fragment SubCategory on SubCategory {
  id
  slug
  nameAr
  nameEn
  descriptionAr
  descriptionEn
  thumbnail
  activated
  createdAt
  updatedAt
}
    `;
export const DesignerFragmentDoc = gql`
    fragment Designer on Designer {
  id
  nameAr
  nameEn
  activated
  rate
  bio
  certificates
  createdAt
  updatedAt
}
    `;
export const DesignerRequestFragmentDoc = gql`
    fragment DesignerRequest on DesignerRequest {
  changedAt
  status
}
    `;
export const MessageFragmentDoc = gql`
    fragment Message on Message {
  id
  content
  name
  email
  phone
  address
  createdAt
}
    `;
export const OptionPricingFragmentDoc = gql`
    fragment OptionPricing on OptionPricing {
  price
  activated
  createdAt
  updatedAt
}
    `;
export const OptionSetFragmentDoc = gql`
    fragment OptionSet on OptionSet {
  id
  nameAr
  nameEn
  type
}
    `;
export const OptionFragmentDoc = gql`
    fragment Option on Option {
  id
  nameAr
  nameEn
  thumbnail
  activated
  createdAt
  updatedAt
}
    `;
export const ProductFragmentDoc = gql`
    fragment Product on Product {
  id
  sku
  nameAr
  nameEn
  descriptionAr
  descriptionEn
  slug
  url
  views
  quantity
  thumbnails
  details
  features
  price
  weight
  stock
  activated
  rate
  featured
  samplable
  createdAt
  updatedAt
}
    `;
export const ReviewFragmentDoc = gql`
    fragment Review on Review {
  id
  message
  rate
  seen
  type
  createdAt
  updatedAt
}
    `;
export const RoleFragmentDoc = gql`
    fragment Role on Role {
  id
  group
  description
  permissions
}
    `;
export const UserSocialAccountFragmentDoc = gql`
    fragment UserSocialAccount on UserSocialAccount {
  id
  provider
  providerId
  createdAt
  updatedAt
}
    `;
export const StaticFragmentDoc = gql`
    fragment Static on Static {
  id
  key
  descriptionAr
  descriptionEn
}
    `;
export const StaticValueFragmentDoc = gql`
    fragment StaticValue on StaticValue {
  id
  slug
  titleAr
  titleEn
  contentAr
  contentEn
  thumbnail
  activated
  createdAt
  updatedAt
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  fName
  lName
  email
  birthDate
  favLang
  gender
  phone
  wallet
  slug
  type
  avatar
  resetPasswordCode
  resetPasswordCodeExpiry
  isPhoneVerified
  isEmailVerified
  phoneVerificationCode
  token
  lastLoginAt
  phoneVerificationCodeExpiry
  emailVerificationCode
  emailVerificationCodeExpiry
  blocked
  activated
  createdAt
  updatedAt
}
    `;
export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  totalCount
  totalPages
  limit
  hasNext
}
    `;
export const VendorFragmentDoc = gql`
    fragment Vendor on Vendor {
  id
  nameAr
  nameEn
  activated
  rate
  createdAt
  updatedAt
}
    `;
export const VendorRequestFragmentDoc = gql`
    fragment VendorRequest on VendorRequest {
  changedAt
  status
}
    `;
export const CreateAddressDocument = gql`
    mutation CreateAddress($input: CreateAddressInput!) {
  addUserAddress(input: $input) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAddressGQL extends Apollo.Mutation<CreateAddressMutation, CreateAddressMutationVariables> {
    document = CreateAddressDocument;
    
  }
export const DeleteAddressDocument = gql`
    mutation DeleteAddress($addressId: String!) {
  deleteUserAddress(addressId: $addressId) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAddressGQL extends Apollo.Mutation<DeleteAddressMutation, DeleteAddressMutationVariables> {
    document = DeleteAddressDocument;
    
  }
export const UpdateAddressDocument = gql`
    mutation UpdateAddress($input: UpdateAddressInput!) {
  updateUserAddress(input: $input) {
    success
    message
    code
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAddressGQL extends Apollo.Mutation<UpdateAddressMutation, UpdateAddressMutationVariables> {
    document = UpdateAddressDocument;
    
  }
export const ArtsDocument = gql`
    query Arts($sort: String, $paginate: PaginatorInput, $filter: FilterArtInput_board) {
  arts_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      pageInfo {
        ...PageInfo
      }
      arts: items {
        ...Art
        designer {
          ...Designer
          user {
            ...User
          }
        }
        products {
          ...Product
        }
      }
    }
    code
    success
    message
  }
}
    ${PageInfoFragmentDoc}
${ArtFragmentDoc}
${DesignerFragmentDoc}
${UserFragmentDoc}
${ProductFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ArtsGQL extends Apollo.Query<ArtsQuery, ArtsQueryVariables> {
    document = ArtsDocument;
    
  }
export const ArtByIdDocument = gql`
    query ArtById($artId: String!) {
  findArtById(artId: $artId) {
    art: data {
      ...Art
      designer {
        ...Designer
        user {
          ...User
        }
      }
      products {
        ...Product
      }
    }
    code
    message
    success
  }
}
    ${ArtFragmentDoc}
${DesignerFragmentDoc}
${UserFragmentDoc}
${ProductFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ArtByIdGQL extends Apollo.Query<ArtByIdQuery, ArtByIdQueryVariables> {
    document = ArtByIdDocument;
    
  }
export const CreateArtDocument = gql`
    mutation CreateArt($input: CreateArtInput!) {
  createArt(input: $input) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateArtGQL extends Apollo.Mutation<CreateArtMutation, CreateArtMutationVariables> {
    document = CreateArtDocument;
    
  }
export const UpdateArtDocument = gql`
    mutation UpdateArt($artId: String!, $input: UpdateArtInput!) {
  updateArt(artId: $artId, input: $input) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateArtGQL extends Apollo.Mutation<UpdateArtMutation, UpdateArtMutationVariables> {
    document = UpdateArtDocument;
    
  }
export const CategoriesDocument = gql`
    query Categories($sort: String, $paginate: PaginatorInput, $filter: FilterCategoryInput_board) {
  categories_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      pageInfo {
        ...PageInfo
      }
      categories: items {
        ...Category
        subCategories {
          ...SubCategory
        }
      }
    }
    code
    success
    message
  }
}
    ${PageInfoFragmentDoc}
${CategoryFragmentDoc}
${SubCategoryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CategoriesGQL extends Apollo.Query<CategoriesQuery, CategoriesQueryVariables> {
    document = CategoriesDocument;
    
  }
export const CategoryByIdDocument = gql`
    query CategoryById($categoryId: String!) {
  findCategoryById(categoryId: $categoryId) {
    category: data {
      ...Category
      subCategories {
        ...SubCategory
      }
      vendor {
        ...Vendor
      }
    }
    code
    success
    message
  }
}
    ${CategoryFragmentDoc}
${SubCategoryFragmentDoc}
${VendorFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CategoryByIdGQL extends Apollo.Query<CategoryByIdQuery, CategoryByIdQueryVariables> {
    document = CategoryByIdDocument;
    
  }
export const SubCategoryByIdDocument = gql`
    query SubCategoryById($subCategoryId: String!) {
  findSubCategoryById(subCategoryId: $subCategoryId) {
    subcategory: data {
      ...SubCategory
      category {
        ...Category
      }
      products {
        ...Product
      }
    }
    code
    success
    message
  }
}
    ${SubCategoryFragmentDoc}
${CategoryFragmentDoc}
${ProductFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SubCategoryByIdGQL extends Apollo.Query<SubCategoryByIdQuery, SubCategoryByIdQueryVariables> {
    document = SubCategoryByIdDocument;
    
  }
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($categoryId: String!, $input: UpdateCategoryDto!) {
  updateCategory(categoryId: $categoryId, input: $input) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCategoryGQL extends Apollo.Mutation<UpdateCategoryMutation, UpdateCategoryMutationVariables> {
    document = UpdateCategoryDocument;
    
  }
export const UpdateSubCategoryDocument = gql`
    mutation UpdateSubCategory($categoryId: String!, $input: UpdateSubCategoryDto!) {
  updateSubCategory(categoryId: $categoryId, input: $input) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSubCategoryGQL extends Apollo.Mutation<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables> {
    document = UpdateSubCategoryDocument;
    
  }
export const SubCategoriesDocument = gql`
    query SubCategories($sort: String, $paginate: PaginatorInput, $filter: FilterCategoryInput_board) {
  subCategories_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      pageInfo {
        ...PageInfo
      }
      subCategories: items {
        ...SubCategory
        products {
          ...Product
        }
        category {
          ...Category
        }
      }
    }
    success
    code
    message
  }
}
    ${PageInfoFragmentDoc}
${SubCategoryFragmentDoc}
${ProductFragmentDoc}
${CategoryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SubCategoriesGQL extends Apollo.Query<SubCategoriesQuery, SubCategoriesQueryVariables> {
    document = SubCategoriesDocument;
    
  }
export const CreateCategoryDocument = gql`
    mutation CreateCategory($input: CreateCategoryDto!) {
  createCategory(input: $input) {
    success
    code
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCategoryGQL extends Apollo.Mutation<CreateCategoryMutation, CreateCategoryMutationVariables> {
    document = CreateCategoryDocument;
    
  }
export const CreateSubCategoryDocument = gql`
    mutation CreateSubCategory($input: CreateSubCategoryDto!) {
  createSubCategory(input: $input) {
    success
    code
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSubCategoryGQL extends Apollo.Mutation<CreateSubCategoryMutation, CreateSubCategoryMutationVariables> {
    document = CreateSubCategoryDocument;
    
  }
export const RegisterAsDesignerDocument = gql`
    mutation RegisterAsDesigner($input: RegisterAsDesignerInput!) {
  registerAsDesigner(input: $input) {
    user: data {
      ...User
      designer {
        ...Designer
      }
    }
    code
    success
    message
  }
}
    ${UserFragmentDoc}
${DesignerFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterAsDesignerGQL extends Apollo.Mutation<RegisterAsDesignerMutation, RegisterAsDesignerMutationVariables> {
    document = RegisterAsDesignerDocument;
    
  }
export const DesignersDocument = gql`
    query Designers($sort: String, $paginate: PaginatorInput, $filter: FilterDesignerInput_board) {
  designers_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      designers: items {
        ...Designer
        user {
          ...User
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
}
    ${DesignerFragmentDoc}
${UserFragmentDoc}
${PageInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DesignersGQL extends Apollo.Query<DesignersQuery, DesignersQueryVariables> {
    document = DesignersDocument;
    
  }
export const DesignerByIdDocument = gql`
    query DesignerById($designerId: String!) {
  findDesignerById(designerId: $designerId) {
    designer: data {
      ...Designer
      addresses {
        ...Address
      }
      user {
        ...User
        addresses {
          ...Address
        }
      }
    }
    code
    success
    message
  }
}
    ${DesignerFragmentDoc}
${AddressFragmentDoc}
${UserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DesignerByIdGQL extends Apollo.Query<DesignerByIdQuery, DesignerByIdQueryVariables> {
    document = DesignerByIdDocument;
    
  }
export const UpdateDesignerDocument = gql`
    mutation UpdateDesigner($designerId: String!, $input: UpdateDesignerInput!) {
  updateDesigner(designerId: $designerId, input: $input) {
    designer: data {
      ...Designer
      addresses {
        ...Address
      }
      user {
        ...User
      }
    }
    code
    success
    message
  }
}
    ${DesignerFragmentDoc}
${AddressFragmentDoc}
${UserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateDesignerGQL extends Apollo.Mutation<UpdateDesignerMutation, UpdateDesignerMutationVariables> {
    document = UpdateDesignerDocument;
    
  }
export const MessagesDocument = gql`
    query Messages($sort: String, $paginate: PaginatorInput, $filter: FilterMessageInput) {
  messages(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      messages: items {
        ...Message
      }
    }
    message
    code
    success
  }
}
    ${MessageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MessagesGQL extends Apollo.Query<MessagesQuery, MessagesQueryVariables> {
    document = MessagesDocument;
    
  }
export const MockupsDocument = gql`
    query Mockups($sort: String, $paginate: PaginatorInput, $filter: FilterProductInput_board) {
  mockups_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      mockups: items {
        ...Product
        options {
          ...Option
        }
        reviews {
          ...Review
        }
        subCategory {
          ...SubCategory
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
    code
    success
    message
  }
}
    ${ProductFragmentDoc}
${OptionFragmentDoc}
${ReviewFragmentDoc}
${SubCategoryFragmentDoc}
${PageInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MockupsGQL extends Apollo.Query<MockupsQuery, MockupsQueryVariables> {
    document = MockupsDocument;
    
  }
export const MockupByIdDocument = gql`
    query MockupById($productId: String!) {
  findProductById(productId: $productId) {
    data {
      ...Product
      options {
        ...Option
        optionSet {
          ...OptionSet
        }
        prices {
          ...OptionPricing
        }
      }
      subCategory {
        ...SubCategory
      }
      products {
        ...Product
      }
    }
    code
    success
    message
  }
}
    ${ProductFragmentDoc}
${OptionFragmentDoc}
${OptionSetFragmentDoc}
${OptionPricingFragmentDoc}
${SubCategoryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MockupByIdGQL extends Apollo.Query<MockupByIdQuery, MockupByIdQueryVariables> {
    document = MockupByIdDocument;
    
  }
export const CreateMockupDocument = gql`
    mutation CreateMockup($input: CreateMockupInput!) {
  createMockup(input: $input) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateMockupGQL extends Apollo.Mutation<CreateMockupMutation, CreateMockupMutationVariables> {
    document = CreateMockupDocument;
    
  }
export const UpdateMockupDocument = gql`
    mutation UpdateMockup($mockupId: String!, $input: UpdateProductInput!) {
  updateMockup(mockupId: $mockupId, input: $input) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateMockupGQL extends Apollo.Mutation<UpdateMockupMutation, UpdateMockupMutationVariables> {
    document = UpdateMockupDocument;
    
  }
export const OptionSetsDocument = gql`
    query OptionSets($sort: String, $paginate: PaginatorInput, $filter: FilterOptionSetInput_board) {
  optionSets_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      optionSets: items {
        ...OptionSet
        options {
          ...Option
          prices {
            ...OptionPricing
          }
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
    success
    code
    message
  }
}
    ${OptionSetFragmentDoc}
${OptionFragmentDoc}
${OptionPricingFragmentDoc}
${PageInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class OptionSetsGQL extends Apollo.Query<OptionSetsQuery, OptionSetsQueryVariables> {
    document = OptionSetsDocument;
    
  }
export const OptionsDocument = gql`
    query Options($sort: String, $paginate: PaginatorInput, $filter: FilterOptionInput_board) {
  options_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      pageInfo {
        ...PageInfo
      }
      options: items {
        ...Option
        prices {
          ...OptionPricing
        }
        optionSet {
          ...OptionSet
        }
      }
    }
    code
    success
    message
  }
}
    ${PageInfoFragmentDoc}
${OptionFragmentDoc}
${OptionPricingFragmentDoc}
${OptionSetFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class OptionsGQL extends Apollo.Query<OptionsQuery, OptionsQueryVariables> {
    document = OptionsDocument;
    
  }
export const OptionByIdDocument = gql`
    query OptionById($optionId: String!) {
  findOptionById(optionId: $optionId) {
    data {
      ...Option
      optionSet {
        ...OptionSet
      }
    }
    code
    success
    message
  }
}
    ${OptionFragmentDoc}
${OptionSetFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class OptionByIdGQL extends Apollo.Query<OptionByIdQuery, OptionByIdQueryVariables> {
    document = OptionByIdDocument;
    
  }
export const CreateOptionDocument = gql`
    mutation CreateOption($input: CreateOptionInput!) {
  createOption(input: $input) {
    message
    code
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOptionGQL extends Apollo.Mutation<CreateOptionMutation, CreateOptionMutationVariables> {
    document = CreateOptionDocument;
    
  }
export const UpdateOptionDocument = gql`
    mutation UpdateOption($optionId: String!, $input: UpdateOptionInput!) {
  updateOption(optionId: $optionId, input: $input) {
    message
    success
    code
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOptionGQL extends Apollo.Mutation<UpdateOptionMutation, UpdateOptionMutationVariables> {
    document = UpdateOptionDocument;
    
  }
export const ProductsDocument = gql`
    query Products($sort: String, $paginate: PaginatorInput, $filter: FilterProductInput_board) {
  products_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      pageInfo {
        ...PageInfo
      }
      products: items {
        ...Product
        options {
          ...Option
          optionSet {
            ...OptionSet
          }
          prices {
            ...OptionPricing
          }
        }
        reviews {
          ...Review
        }
        subCategory {
          ...SubCategory
        }
        mockup {
          ...Product
        }
        products {
          ...Product
        }
        art {
          ...Art
        }
      }
    }
    code
    success
    message
  }
}
    ${PageInfoFragmentDoc}
${ProductFragmentDoc}
${OptionFragmentDoc}
${OptionSetFragmentDoc}
${OptionPricingFragmentDoc}
${ReviewFragmentDoc}
${SubCategoryFragmentDoc}
${ArtFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProductsGQL extends Apollo.Query<ProductsQuery, ProductsQueryVariables> {
    document = ProductsDocument;
    
  }
export const ProductsBySubCategoryDocument = gql`
    query ProductsBySubCategory($sort: String, $paginate: PaginatorInput, $filter: FilterProductInput_board, $subCategoryId: String!) {
  productsBySubCategory_board(sort: $sort, paginate: $paginate, filter: $filter, subCategoryId: $subCategoryId) {
    data {
      pageInfo {
        ...PageInfo
      }
      products: items {
        ...Product
        options {
          ...Option
          optionSet {
            ...OptionSet
          }
          prices {
            ...OptionPricing
          }
        }
        reviews {
          ...Review
        }
        subCategory {
          ...SubCategory
        }
      }
    }
    code
    success
    message
  }
}
    ${PageInfoFragmentDoc}
${ProductFragmentDoc}
${OptionFragmentDoc}
${OptionSetFragmentDoc}
${OptionPricingFragmentDoc}
${ReviewFragmentDoc}
${SubCategoryFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProductsBySubCategoryGQL extends Apollo.Query<ProductsBySubCategoryQuery, ProductsBySubCategoryQueryVariables> {
    document = ProductsBySubCategoryDocument;
    
  }
export const ProductByIdDocument = gql`
    query ProductById($productId: String!) {
  findProductById(productId: $productId) {
    data {
      ...Product
      options {
        ...Option
        optionSet {
          ...OptionSet
        }
        prices {
          ...OptionPricing
        }
      }
      reviews {
        ...Review
      }
      subCategory {
        ...SubCategory
      }
      mockup {
        ...Product
      }
      products {
        ...Product
      }
      art {
        ...Art
      }
    }
    code
    success
    message
  }
}
    ${ProductFragmentDoc}
${OptionFragmentDoc}
${OptionSetFragmentDoc}
${OptionPricingFragmentDoc}
${ReviewFragmentDoc}
${SubCategoryFragmentDoc}
${ArtFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProductByIdGQL extends Apollo.Query<ProductByIdQuery, ProductByIdQueryVariables> {
    document = ProductByIdDocument;
    
  }
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateProductGQL extends Apollo.Mutation<CreateProductMutation, CreateProductMutationVariables> {
    document = CreateProductDocument;
    
  }
export const UpdateProductDocument = gql`
    mutation UpdateProduct($productId: String!, $input: UpdateProductInput!) {
  updateProduct(productId: $productId, input: $input) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateProductGQL extends Apollo.Mutation<UpdateProductMutation, UpdateProductMutationVariables> {
    document = UpdateProductDocument;
    
  }
export const ReviewsDocument = gql`
    query Reviews($sort: String, $paginate: PaginatorInput, $filter: FilterReviewInput) {
  reviews_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      reviews: items {
        ...Review
        user {
          ...User
        }
        product {
          ...Product
        }
        vendor {
          ...Vendor
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
    success
    message
    code
  }
}
    ${ReviewFragmentDoc}
${UserFragmentDoc}
${ProductFragmentDoc}
${VendorFragmentDoc}
${PageInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ReviewsGQL extends Apollo.Query<ReviewsQuery, ReviewsQueryVariables> {
    document = ReviewsDocument;
    
  }
export const DeleteReviewDocument = gql`
    mutation DeleteReview($reviewId: String!) {
  deleteReview(reviewId: $reviewId) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteReviewGQL extends Apollo.Mutation<DeleteReviewMutation, DeleteReviewMutationVariables> {
    document = DeleteReviewDocument;
    
  }
export const RolesDocument = gql`
    query Roles($sort: String, $paginate: PaginatorInput, $filter: RoleFilterInput) {
  roles_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      roles: items {
        ...Role
      }
      pageInfo {
        ...PageInfo
      }
    }
    code
    success
    message
  }
}
    ${RoleFragmentDoc}
${PageInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RolesGQL extends Apollo.Query<RolesQuery, RolesQueryVariables> {
    document = RolesDocument;
    
  }
export const UpdatePermissionsDocument = gql`
    mutation UpdatePermissions($input: UpdateRoleInput!, $roleId: String!) {
  updateRolePermissions(input: $input, roleId: $roleId) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePermissionsGQL extends Apollo.Mutation<UpdatePermissionsMutation, UpdatePermissionsMutationVariables> {
    document = UpdatePermissionsDocument;
    
  }
export const RoleByIdDocument = gql`
    query RoleById($roleId: String!) {
  findRoleById(roleId: $roleId) {
    role: data {
      ...Role
    }
    code
    success
    message
  }
}
    ${RoleFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleByIdGQL extends Apollo.Query<RoleByIdQuery, RoleByIdQueryVariables> {
    document = RoleByIdDocument;
    
  }
export const StaticsDocument = gql`
    query Statics($sort: String, $paginate: PaginatorInput, $filter: FilterStaticInput_board) {
  statics_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      statics: items {
        ...Static
        values {
          ...StaticValue
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
    code
    success
    message
  }
}
    ${StaticFragmentDoc}
${StaticValueFragmentDoc}
${PageInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class StaticsGQL extends Apollo.Query<StaticsQuery, StaticsQueryVariables> {
    document = StaticsDocument;
    
  }
export const StaticValuesByTypeDocument = gql`
    query StaticValuesByType($sort: String, $paginate: PaginatorInput, $filter: FilterStaticValueInput_board, $input: staticKeyInput!) {
  getStaticValuesByType_board(sort: $sort, paginate: $paginate, filter: $filter, input: $input) {
    data {
      staticValues: items {
        ...StaticValue
        static {
          ...Static
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
    code
    success
    message
  }
}
    ${StaticValueFragmentDoc}
${StaticFragmentDoc}
${PageInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class StaticValuesByTypeGQL extends Apollo.Query<StaticValuesByTypeQuery, StaticValuesByTypeQueryVariables> {
    document = StaticValuesByTypeDocument;
    
  }
export const StaticValueByIdDocument = gql`
    query StaticValueById($staticValueId: String!) {
  findStaticValueById(staticValueId: $staticValueId) {
    data {
      ...StaticValue
      static {
        ...Static
      }
    }
    code
    success
    message
  }
}
    ${StaticValueFragmentDoc}
${StaticFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class StaticValueByIdGQL extends Apollo.Query<StaticValueByIdQuery, StaticValueByIdQueryVariables> {
    document = StaticValueByIdDocument;
    
  }
export const CreateStaticValueDocument = gql`
    mutation CreateStaticValue($input: CreateStaticValueInput!) {
  createStaticValue(input: $input) {
    code
    success
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateStaticValueGQL extends Apollo.Mutation<CreateStaticValueMutation, CreateStaticValueMutationVariables> {
    document = CreateStaticValueDocument;
    
  }
export const UpdateStaticValueDocument = gql`
    mutation UpdateStaticValue($input: UpdateStaticValueInput!) {
  updateStaticValue(input: $input) {
    code
    message
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateStaticValueGQL extends Apollo.Mutation<UpdateStaticValueMutation, UpdateStaticValueMutationVariables> {
    document = UpdateStaticValueDocument;
    
  }
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    user: data {
      ...User
      role {
        ...Role
      }
    }
    code
    success
    message
  }
}
    ${UserFragmentDoc}
${RoleFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCurrentUserGQL extends Apollo.Query<GetCurrentUserQuery, GetCurrentUserQueryVariables> {
    document = GetCurrentUserDocument;
    
  }
export const UserByIdDocument = gql`
    query UserById($userId: String!) {
  findUserById(userId: $userId) {
    user: data {
      ...User
      addresses {
        ...Address
      }
      role {
        ...Role
      }
      reviews {
        ...Review
      }
      vendor {
        ...Vendor
        addresses {
          ...Address
        }
      }
      designer {
        ...Designer
      }
    }
    code
    message
    success
  }
}
    ${UserFragmentDoc}
${AddressFragmentDoc}
${RoleFragmentDoc}
${ReviewFragmentDoc}
${VendorFragmentDoc}
${DesignerFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserByIdGQL extends Apollo.Query<UserByIdQuery, UserByIdQueryVariables> {
    document = UserByIdDocument;
    
  }
export const LoginDocument = gql`
    mutation Login($input: EmailPasswordLoginInput!) {
  login(input: $input) {
    user: data {
      ...User
      role {
        ...Role
      }
      vendor {
        ...Vendor
      }
      designer {
        ...Designer
      }
    }
    code
    success
    message
  }
}
    ${UserFragmentDoc}
${RoleFragmentDoc}
${VendorFragmentDoc}
${DesignerFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
  }
export const UsersDocument = gql`
    query Users($sort: String, $paginate: PaginatorInput, $filter: FilterUserInput_board) {
  users_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      pageInfo {
        ...PageInfo
      }
      users: items {
        ...User
        role {
          ...Role
        }
        vendor {
          ...Vendor
        }
        designer {
          ...Designer
        }
      }
    }
    code
    success
    message
  }
}
    ${PageInfoFragmentDoc}
${UserFragmentDoc}
${RoleFragmentDoc}
${VendorFragmentDoc}
${DesignerFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    document = UsersDocument;
    
  }
export const UserByEmailDocument = gql`
    query UserByEmail($userEmail: String!) {
  findUserByEmail(userEmail: $userEmail) {
    user: data {
      ...User
    }
    code
    success
    message
  }
}
    ${UserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserByEmailGQL extends Apollo.Query<UserByEmailQuery, UserByEmailQueryVariables> {
    document = UserByEmailDocument;
    
  }
export const UserByPhoneDocument = gql`
    query UserByPhone($userPhone: String!) {
  findUserByPhone(userPhone: $userPhone) {
    user: data {
      ...User
    }
    code
    success
    message
  }
}
    ${UserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserByPhoneGQL extends Apollo.Query<UserByPhoneQuery, UserByPhoneQueryVariables> {
    document = UserByPhoneDocument;
    
  }
export const RegisterAsUserDocument = gql`
    mutation RegisterAsUser($input: RegisterAsUserInput!) {
  registerAsUser(input: $input) {
    user: data {
      ...User
    }
    code
    success
    message
  }
}
    ${UserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterAsUserGQL extends Apollo.Mutation<RegisterAsUserMutation, RegisterAsUserMutationVariables> {
    document = RegisterAsUserDocument;
    
  }
export const UpdateUserDocument = gql`
    mutation UpdateUser($userId: String!, $input: UpdateUserInput!) {
  updateUserProfile_board(userId: $userId, input: $input) {
    user: data {
      ...User
    }
    code
    success
    message
  }
}
    ${UserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;
    
  }
export const VendorsGqlDocument = gql`
    query VendorsGQL($sort: String, $paginate: PaginatorInput, $filter: FilterVendorInput_board) {
  vendors_board(sort: $sort, paginate: $paginate, filter: $filter) {
    data {
      vendors: items {
        ...Vendor
        user {
          ...User
        }
        addresses {
          ...Address
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
}
    ${VendorFragmentDoc}
${UserFragmentDoc}
${AddressFragmentDoc}
${PageInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class VendorsGqlGQL extends Apollo.Query<VendorsGqlQuery, VendorsGqlQueryVariables> {
    document = VendorsGqlDocument;
    
  }
export const RegisterAsVendorDocument = gql`
    mutation RegisterAsVendor($input: RegisterAsVendorInput!) {
  registerAsVendor(input: $input) {
    user: data {
      ...User
      vendor {
        ...Vendor
      }
    }
    code
    success
    message
  }
}
    ${UserFragmentDoc}
${VendorFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterAsVendorGQL extends Apollo.Mutation<RegisterAsVendorMutation, RegisterAsVendorMutationVariables> {
    document = RegisterAsVendorDocument;
    
  }
export const UpdateVendorDocument = gql`
    mutation UpdateVendor($vendorId: String!, $input: UpdateVendorInput!) {
  updateVendor(vendorId: $vendorId, input: $input) {
    vendor: data {
      ...Vendor
      user {
        ...User
      }
      addresses {
        ...Address
      }
    }
    message
    code
    success
  }
}
    ${VendorFragmentDoc}
${UserFragmentDoc}
${AddressFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateVendorGQL extends Apollo.Mutation<UpdateVendorMutation, UpdateVendorMutationVariables> {
    document = UpdateVendorDocument;
    
  }
export const namedOperations = {
  Query: {
    Arts: 'Arts',
    ArtById: 'ArtById',
    Categories: 'Categories',
    CategoryById: 'CategoryById',
    SubCategoryById: 'SubCategoryById',
    SubCategories: 'SubCategories',
    Designers: 'Designers',
    DesignerById: 'DesignerById',
    Messages: 'Messages',
    Mockups: 'Mockups',
    MockupById: 'MockupById',
    OptionSets: 'OptionSets',
    Options: 'Options',
    OptionById: 'OptionById',
    Products: 'Products',
    ProductsBySubCategory: 'ProductsBySubCategory',
    ProductById: 'ProductById',
    Reviews: 'Reviews',
    Roles: 'Roles',
    RoleById: 'RoleById',
    Statics: 'Statics',
    StaticValuesByType: 'StaticValuesByType',
    StaticValueById: 'StaticValueById',
    GetCurrentUser: 'GetCurrentUser',
    UserById: 'UserById',
    Users: 'Users',
    UserByEmail: 'UserByEmail',
    UserByPhone: 'UserByPhone',
    VendorsGQL: 'VendorsGQL'
  },
  Mutation: {
    CreateAddress: 'CreateAddress',
    DeleteAddress: 'DeleteAddress',
    UpdateAddress: 'UpdateAddress',
    CreateArt: 'CreateArt',
    UpdateArt: 'UpdateArt',
    UpdateCategory: 'UpdateCategory',
    UpdateSubCategory: 'UpdateSubCategory',
    CreateCategory: 'CreateCategory',
    CreateSubCategory: 'CreateSubCategory',
    RegisterAsDesigner: 'RegisterAsDesigner',
    UpdateDesigner: 'UpdateDesigner',
    CreateMockup: 'CreateMockup',
    UpdateMockup: 'UpdateMockup',
    CreateOption: 'CreateOption',
    UpdateOption: 'UpdateOption',
    CreateProduct: 'CreateProduct',
    UpdateProduct: 'UpdateProduct',
    DeleteReview: 'DeleteReview',
    UpdatePermissions: 'UpdatePermissions',
    CreateStaticValue: 'CreateStaticValue',
    UpdateStaticValue: 'UpdateStaticValue',
    Login: 'Login',
    RegisterAsUser: 'RegisterAsUser',
    UpdateUser: 'UpdateUser',
    RegisterAsVendor: 'RegisterAsVendor',
    UpdateVendor: 'UpdateVendor'
  },
  Fragment: {
    Address: 'Address',
    Art: 'Art',
    Category: 'Category',
    SubCategory: 'SubCategory',
    Designer: 'Designer',
    DesignerRequest: 'DesignerRequest',
    Message: 'Message',
    OptionPricing: 'OptionPricing',
    OptionSet: 'OptionSet',
    Option: 'Option',
    Product: 'Product',
    Review: 'Review',
    Role: 'Role',
    UserSocialAccount: 'UserSocialAccount',
    Static: 'Static',
    StaticValue: 'StaticValue',
    User: 'User',
    PageInfo: 'PageInfo',
    Vendor: 'Vendor',
    VendorRequest: 'VendorRequest'
  }
}