import { EntityValidationError } from "../../../shared/domain/validators/validation.error";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo"
import { Category } from "../category.entity"

describe("Category Unit Tests", () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate")
  })
  test("should create a category with name and description", () => {

    // Arrange Act Assert
    let category = Category.create({
      name: "Movie"
    })
    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe("Movie")
    expect(category.description).toBeNull()
    expect(category.is_active).toBeTruthy()
    expect(category.created_at).toBeInstanceOf(Date)
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test("should create a category with all values", () => {

    const create_at = new Date()

    const category = new Category({
      name: "Movie 1",
      description: "Movie description",
      is_active: false,
      created_at: create_at
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe("Movie 1")
    expect(category.description).toBe("Movie description")
    expect(category.is_active).toBe(false)
    expect(category.created_at).toBeInstanceOf(Date)
  })

  test("should create a category with is_active", () => {
    const category = Category.create({
      name: "Movie",
      is_active: false
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe("Movie")
    expect(category.description).toBeFalsy()
    expect(category.is_active).toBe(false)
    expect(category.created_at).toBeInstanceOf(Date)
  })

  test("should create a category with is_active", () => {
    const category = Category.create({
      name: "Movie",
      is_active: true
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe("Movie")
    expect(category.description).toBeFalsy()
    expect(category.is_active).toBe(true)
    expect(category.created_at).toBeInstanceOf(Date)
  })

  test("should change name", () => {
    const category = Category.create({
      name: "Movie"
    })

    category.changeName("Other name")

    expect(category.name).toBe("Other name")
    expect(validateSpy).toHaveBeenCalledTimes(2)
  })

  test("should change description", () => {
    const category = Category.create({
      name: "Movie"
    })

    category.changeDescription("some description")
    expect(category.description).toBe("some description")
    expect(validateSpy).toHaveBeenCalledTimes(2)
  })

  test("should active a category", () => {
    const category = Category.create({
      name: "Filmes",
      is_active: false
    })

    category.activate()

    expect(category.is_active).toBeTruthy()
  })

  test("should disable a category", () => {
    const category = Category.create({
      name: "Filmes",
      is_active: true
    })

    category.desactivate()

    expect(category.is_active).toBeFalsy()
  })
})

describe("category_id field", () => {
  const arrange = [
    { category_id: null },
    { category_id: undefined },
    { category_id: new Uuid() }
  ]
  test.each(arrange)("id = %j", ({ category_id }) => {
    const category = new Category({
      name: "Movie",
      category_id: category_id as any,
    })
    expect(category.category_id).toBeInstanceOf(Uuid)

    if (category_id instanceof Uuid) {
      expect(category.category_id).toBe(category_id)
    }
  })
})

describe("Category Validator", () => {
  test("should return error validation when name is null", () => {
    expect(() => {
      Category.create({
        name: null
      })
    }).toThrow(
      new EntityValidationError({
        name: ["name is required"]
      })
    )
  })
})