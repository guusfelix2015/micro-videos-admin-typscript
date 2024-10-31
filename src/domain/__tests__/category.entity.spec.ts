import { Category } from "../category.entity"

describe("Category Unit Tests", () => {
  test("shoul create a category with name and description", () => {
    // Arrange Act Assert
    let category = Category.create({
      name: "Movie"
    })
    expect(category.category_id).toBeUndefined()
    expect(category.name).toBe("Movie")
    expect(category.description).toBeNull()
    expect(category.is_active).toBeTruthy()
    expect(category.created_at).toBeInstanceOf(Date)
  })

  test("should create a category with all values", () => {

    const create_at = new Date()

    const category = new Category({
      name: "Movie 1",
      description: "Movie description",
      is_active: false,
      created_at: create_at
    })

    expect(category.category_id).toBeUndefined()
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

    expect(category.category_id).toBeUndefined()
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

    expect(category.category_id).toBeUndefined()
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
  })

  test("should change description", () => {
    const category = Category.create({
      name: "Movie"
    })

    category.changeDescription("some description")
    expect(category.description).toBe("some description")
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