import { Pet, Prisma } from '@prisma/client'

export interface PetsRepo {
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
