import { InvalidUuidError, Uuid } from "../uuid.vo"
import { v4 as uuidv4, validate as uuidValidate } from "uuid"

describe("Uuid Unit Tests", () => {

  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate")

  test("should throw error when uuid is invalid", () => {
    expect(() => {
      new Uuid("invalid-uuid")
    }).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled()
  })

  test("should create a valid uuid", () => {
    const uuid = new Uuid()

    expect(uuid.id).toBeDefined()
    expect(uuidValidate(uuid.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()

  })

  test("should accept a valid uuid", () => {
    const uuid = new Uuid("96c3dcf5-4a52-4626-861d-c9a7949cb051")
    expect(uuid.id).toBe("96c3dcf5-4a52-4626-861d-c9a7949cb051")
    expect(validateSpy).toHaveBeenCalled()
  })
})