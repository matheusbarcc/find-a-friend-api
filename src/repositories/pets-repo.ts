import { Pet, Prisma } from '@prisma/client'

export interface fetchWithFiltersQuery {
  orgIds: string[]
  age: string | null
  energy_level: string | null
  size: string | null
  independency: string | null
  environment: string | null
}
export interface PetsRepo {
  fetchWithFilters(query: fetchWithFiltersQuery, page: number): Promise<Pet[]>
  fetchByOrgIds(orgIds: string[], page: number): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
