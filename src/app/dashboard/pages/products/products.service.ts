import { Injectable } from "@angular/core";
import {
  ProductsGQL,
  ProductsBySubCategoryGQL,
  ProductByIdGQL,
  CreateProductGQL,
  PaginatorInput,
  FilterProductInput_Board,
  CreateProductInput,
  UpdateProductGQL,
  UpdateProductInput,
} from "src/app/common/generated-types";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(
    private readonly productsGQL: ProductsGQL,
    private readonly productsBySubCategoryGQL: ProductsBySubCategoryGQL,
    private readonly productByIdGQL: ProductByIdGQL,
    private readonly createProductGQL: CreateProductGQL,
    private readonly updateProductGQL: UpdateProductGQL
  ) {}

  getAll(
    paginate: PaginatorInput,
    filter: FilterProductInput_Board,
    sort?: string
  ) {
    return this.productsGQL
      .watch({ sort, filter, paginate })
      .valueChanges.pipe(map((response) => response.data.products_board));
  }

  productById(productId: string) {
    return this.productByIdGQL
      .watch({ productId })
      .valueChanges.pipe(map((response) => response.data.findProductById.data));
  }

  productsBySubCategory(subCategoryId: string) {
    return this.productsBySubCategoryGQL
      .watch({ subCategoryId })
      .valueChanges.pipe(
        map((response) => response.data.productsBySubCategory_board)
      );
  }

  createProduct(input: CreateProductInput) {
    return this.createProductGQL
      .mutate({ input })
      .pipe(map((response) => response.data.createProduct));
  }

  updateProduct(productId: string, input: UpdateProductInput) {
    return this.updateProductGQL
      .mutate({ productId, input })
      .pipe(map((response) => response.data.updateProduct));
  }
}
