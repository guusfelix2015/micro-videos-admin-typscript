import { ISearchableRepository } from "../../shared/domain/repository/repository-interface";
import { SearchParams } from "../../shared/domain/repository/search-params";
import { SearchResult } from "../../shared/domain/repository/search-result";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { Category } from "./category.entity";

export type CategoryFiler = string;

export class CategorySearchParams extends SearchParams<CategoryFiler> { }

export class CategorySearchResult extends SearchResult<Category> { }

export interface ICategoryRepository
  extends ISearchableRepository<
    Category,
    Uuid,
    CategoryFiler,
    CategorySearchParams
  > { }