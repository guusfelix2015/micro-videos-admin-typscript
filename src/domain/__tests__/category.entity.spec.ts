import { Category } from "../category.entity"

describe("Category Unit Tests", () => {
  test("shoul create a category with name and description", () => {
    // Arrange Act Assert
    let category = new Category({
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

    expect(category.name).toBe("Movie 1")
    expect(category.description).toBe("Movie description")
    expect(category.is_active).toBe(false)
    expect(category.created_at).toBeInstanceOf(Date)
  })
})