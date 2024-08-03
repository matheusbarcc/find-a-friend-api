import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepo } from '../pets-repo'

export class InMemoryPetsRepo implements PetsRepo {
  public items: Pet[] = []

  async fetchByOrgIds(orgIds: string[], page: number) {
    return this.items
      .filter((item) => orgIds.includes(item.org_id))
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency: data.independency,
      environment: data.environment,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
