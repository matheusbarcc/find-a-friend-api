import { Pet } from '@prisma/client'
import { PetsRepo } from '@/repositories/pets-repo'

interface CreatePetRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  independency: string
  environment: string
  org_id: string
}

interface CreatePetResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(private petsRepo: PetsRepo) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    independency,
    environment,
    org_id,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const pet = await this.petsRepo.create({
      name,
      about,
      age,
      size,
      energy_level,
      independency,
      environment,
      org_id,
    })

    return {
      pet,
    }
  }
}
