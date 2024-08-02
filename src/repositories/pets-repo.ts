import { Pet, Prisma } from '@prisma/client'

export interface PetsRepo {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
