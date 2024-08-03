import { Pet, Prisma } from '@prisma/client'

export interface PetsRepo {
  fetchByOrgIds(orgIds: string[], page: number): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
