import { PrismaPetsRepo } from '@/repositories/prisma/prisma-pets-repo'
import { GetPetDetailsService } from '../get-pet-details'

export function makeGetPetDetailsService() {
  const petsRepo = new PrismaPetsRepo()
  const service = new GetPetDetailsService(petsRepo)

  return service
}
