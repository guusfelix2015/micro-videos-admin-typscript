import { Entity } from "../../domain/entity";
import { NotFoundError } from "../../domain/errors/not-found.error";
import { Uuid } from "../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityContructor = {
  entity_id?: Uuid;
  name: string;
  price: number;
}

class StubyEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityContructor) {
    super();
    this.entity_id = props.entity_id || new Uuid;
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price
    }
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubyEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubyEntity {
    return StubyEntity
  }

}
describe("InMemoryRepository Unit Test", () => {
  let repo: StubInMemoryRepository

  beforeEach(() => {
    repo = new StubInMemoryRepository()
  })

  test("should insert a new entity", async () => {
    const entity = new StubyEntity({
      entity_id: new Uuid(),
      name: "Test",
      price: 100
    })

    await repo.insert(entity)

    expect(repo.items.length).toBe(1)
    expect(repo.items[0]).toBe(entity)
  })

  test("should bulk insert entities", async () => {
    const entities = [
      new StubyEntity({
        entity_id: new Uuid(),
        name: "Test",
        price: 100
      }),
      new StubyEntity({
        entity_id: new Uuid(),
        name: "Test",
        price: 100
      })
    ]

    await repo.bulkInsert(entities)
    expect(repo.items.length).toBe(2)
    expect(repo.items[0]).toBe(entities[0])
    expect(repo.items[1]).toBe(entities[1])
  })

  test("should return all entities", async () => {
    const entity = new StubyEntity({ name: "name value", price: 5 })
    await repo.insert(entity)

    const entities = await repo.findAll()

    expect(entities).toStrictEqual([entity])
  })

  test("should throws error when on update when entity not found", async () => {
    const entity = new StubyEntity({ name: "name value", price: 5 })

    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id, StubyEntity)
    )
  })

  test("should updates an entity", async () => {
    const entity = new StubyEntity({ name: "name value", price: 5 })

    await repo.insert(entity)

    const entityUpdated = new StubyEntity({
      entity_id: entity.entity_id,
      name: "updated",
      price: 1
    })

    await repo.update(entityUpdated)

    expect(entityUpdated.toJSON()).toStrictEqual(
      repo.items[0].toJSON()
    )
  })

  test("should throws error on delete when entity not found", async () => {
    const uuid = new Uuid()

    await expect(repo.delete(uuid)).rejects.toThrow(
      new NotFoundError(uuid.id, StubyEntity)
    )

    await expect(
      repo.delete(new Uuid("92e7c2e0-9e3b-4389-9a20-42dcde458c77"))
    ).rejects.toThrow(
      new NotFoundError("92e7c2e0-9e3b-4389-9a20-42dcde458c77", StubyEntity)
    )
  })

  test("should deletes an entity", async () => {
    const entity = new StubyEntity({ name: "name value", price: 5 })

    await repo.insert(entity)

    await repo.delete(entity.entity_id)
    expect(repo.items).toHaveLength(0)

    await repo.insert(entity)
    await repo.delete(entity.entity_id)
    expect(repo.items).toHaveLength(0)

  })
})