import ValidatorRules from "../../shared/domain/validators/validators-rules";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { CategoryValidatorFactory } from "./category.validator";

export type CategoryConstructorProps = {
  category_id?: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
}

export type CreateCategoryCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
}

export class Category {
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  // isso é o que cria o objeto, o que vai ser passado pra ele
  constructor(props: CategoryConstructorProps) {
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  // Factory method
  static create(props: CreateCategoryCreateCommand): Category {
    return new Category(props)
  }

  changeName(name: string) {
    ValidatorRules.values(name, "name").required().string().maxLength(255)
    this.name = name
  }

  changeDescription(description: string) {
    this.description = description
  }

  activate() {
    this.is_active = true
  }

  desactivate() {
    this.is_active = false
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create()
    return validator.validate(entity)
  }

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      create_at: this.created_at
    }
  }

}