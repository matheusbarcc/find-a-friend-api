import { Pet } from '@prisma/client'
import { PetsRepo } from '@/repositories/pets-repo'
import { OrgsRepo } from '@/repositories/orgs-repo'

interface FetchPetsByCityRequest {
  state: string
  city: string
  page: number
}

interface FetchPetsByCityResponse {
  pets: Pet[]
}

export class FetchPetsByCityService {
  constructor(
    private petsRepo: PetsRepo,
    private orgsRepo: OrgsRepo,
  ) {}

  async execute({
    state,
    city,
    page,
  }: FetchPetsByCityRequest): Promise<FetchPetsByCityResponse> {
    const orgIds = await this.orgsRepo.fetchIdsByCity({
      state,
      city,
    })

    const pets = await this.petsRepo.fetchByOrgIds(orgIds, page)

    return {
      pets,
    }
  }
}
