import { PrismaPetsRepo } from '@/repositories/prisma/prisma-pets-repo'
import { CreatePetService } from '../create-pet'

export function makeCreatePetService() {
  const petsRepo = new PrismaPetsRepo()
  const service = new CreatePetService(petsRepo)

  return service
}
