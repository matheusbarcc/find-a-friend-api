import { Pet } from '@prisma/client'
import { PetsRepo } from '@/repositories/pets-repo'
import { OrgsRepo } from '@/repositories/orgs-repo'

interface FetchPetsWithFiltersRequest {
  state: string
  city: string
  age: string | null
  energy_level: string | null
  size: string | null
  independency: string | null
  environment: string | null
  page: number
}

interface FetchPetsWithFiltersResponse {
  pets: Pet[]
}

export class FetchPetsWithFiltersService {
  constructor(
    private petsRepo: PetsRepo,
    private orgsRepo: OrgsRepo,
  ) {}

  async execute({
    state,
    city,
    age,
    energy_level,
    size,
    independency,
    environment,
    page,
  }: FetchPetsWithFiltersRequest): Promise<FetchPetsWithFiltersResponse> {
    const orgIds = await this.orgsRepo.fetchIdsByCity({
      state,
      city,
    })

    const pets = await this.petsRepo.fetchWithFilters(
      {
        orgIds,
        age,
        energy_level,
        size,
        independency,
        environment,
      },
      page,
    )

    return {
      pets,
    }
  }
}
