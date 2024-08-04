import { Prisma, PrismaClient } from '@prisma/client'
import { fetchWithFiltersQuery, PetsRepo } from './../pets-repo'

const prisma = new PrismaClient()

export class PrismaPetsRepo implements PetsRepo {
  async fetchWithFilters(query: fetchWithFiltersQuery, page: number) {
    const { orgIds, age, energy_level, size, independency, environment } = query

    const petsFiltered = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgIds,
        },
        AND: [
          age ? { age } : {},
          energy_level ? { energy_level } : {},
          size ? { size } : {},
          independency ? { independency } : {},
          environment ? { environment } : {},
        ],
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return petsFiltered
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
