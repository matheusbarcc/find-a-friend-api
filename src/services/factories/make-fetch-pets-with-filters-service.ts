import { PrismaPetsRepo } from '@/repositories/prisma/prisma-pets-repo'
import { PrismaOrgsRepo } from '@/repositories/prisma/prisma-orgs-repo'
import { FetchPetsWithFiltersService } from '../fetch-pets-with-filters'

export function makeFetchPetsWithFiltersService() {
  const petsRepo = new PrismaPetsRepo()
  const orgsRepo = new PrismaOrgsRepo()
  const service = new FetchPetsWithFiltersService(petsRepo, orgsRepo)

  return service
}
