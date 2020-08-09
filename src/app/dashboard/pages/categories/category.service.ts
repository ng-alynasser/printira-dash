import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  CategoriesGQL,
  SubCategoriesGQL,
  PaginatorInput,
  FilterCategoryInput_Board,
  CreateCategoryGQL,
  CreateSubCategoryGQL,
  CreateCategoryDto,
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
  UpdateCategoryDto,
  CategoryByIdGQL,
  SubCategoryByIdGQL,
  UpdateCategoryGQL,
  UpdateSubCategoryGQL,
} from "src/app/common/generated-types";

@Injectable({ providedIn: "root" })
export class CategoriesService {
  constructor(
    private readonly categoiresGQL: CategoriesGQL,
    private readonly subCategoriesGQL: SubCategoriesGQL,
    private readonly createMainCategoryGQL: CreateCategoryGQL,
    private readonly createSubCategoryGQL: CreateSubCategoryGQL,
    private readonly categoryByIdGQL: CategoryByIdGQL,
    private readonly subCategoryByIdGQL: SubCategoryByIdGQL,
    private readonly updateCategoryGQL: UpdateCategoryGQL,
    private readonly updateSubCategoryGQL: UpdateSubCategoryGQL
  ) {}

  getMainCategories(
    paginate: PaginatorInput,
    filter: FilterCategoryInput_Board,
    sort?: string
  ) {
    return this.categoiresGQL
      .watch({
        paginate,
        filter,
        sort,
      })
      .valueChanges.pipe(
        map((response) => response.data.categories_board.data)
      );
  }

  getSubcategories(
    paginate: PaginatorInput,
    filter: FilterCategoryInput_Board,
    sort?: string
  ) {
    return this.subCategoriesGQL
      .watch({
        paginate,
        filter,
        sort,
      })
      .valueChanges.pipe(
        map((response) => response.data.subCategories_board.data)
      );
  }

  getCategoryById(categoryId: string) {
    return this.categoryByIdGQL
      .watch({ categoryId })
      .valueChanges.pipe(
        map((response) => response.data.findCategoryById.category)
      );
  }

  updateCategory(categoryId: string, input: UpdateCategoryDto) {
    return this.updateCategoryGQL
      .mutate({ categoryId, input })
      .pipe(map((response) => response.data.updateCategory));
  }

  getSubCategoryById(subCategoryId: string) {
    return this.subCategoryByIdGQL
      .watch({ subCategoryId })
      .valueChanges.pipe(
        map((response) => response.data.findSubCategoryById.subcategory)
      );
  }

  updateSubCategory(categoryId: string, input: UpdateSubCategoryDto) {
    return this.updateSubCategoryGQL
      .mutate({ categoryId, input })
      .pipe(map((response) => response.data.updateSubCategory));
  }

  createMainCategory(input: CreateCategoryDto) {
    return this.createMainCategoryGQL
      .mutate({ input })
      .pipe(map((response) => response.data.createCategory));
  }

  createSubCategory(input: CreateSubCategoryDto) {
    return this.createSubCategoryGQL
      .mutate({ input })
      .pipe(map((response) => response.data.createSubCategory));
  }
}
