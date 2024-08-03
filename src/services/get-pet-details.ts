import { Pet } from '@prisma/client'
import { PetsRepo } from '@/repositories/pets-repo'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetDetailsRequest {
  petId: string
}

interface GetPetDetailsResponse {
  pet: Pet
}

export class GetPetDetailsService {
  constructor(private petsRepo: PetsRepo) {}

  async execute({
    petId,
  }: GetPetDetailsRequest): Promise<GetPetDetailsResponse> {
    const pet = await this.petsRepo.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
