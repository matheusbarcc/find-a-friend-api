import { beforeEach, describe, expect, it } from 'vitest'
import { PetsRepo } from '@/repositories/pets-repo'
import { InMemoryPetsRepo } from '@/repositories/in-memory/in-memory-pets-repo'
import { GetPetDetailsService } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepo: PetsRepo
let sut: GetPetDetailsService

describe('Get Pet Details Service', () => {
  beforeEach(() => {
    petsRepo = new InMemoryPetsRepo()
    sut = new GetPetDetailsService(petsRepo)
  })

  it('should be able to get pet details', async () => {
    await petsRepo.create({
      id: 'pet-01',
      name: 'Buddy',
      about:
        'Friendly and energetic dog who loves to play fetch and go for walks.',
      age: 'Young',
      size: 'Medium',
      energy_level: 'High',
      independency: 'Moderate',
      environment: 'Wide Environment',
      org_id: 'org-01',
    })

    const { pet } = await sut.execute({
      petId: 'pet-01',
    })

    expect(pet.name).toEqual('Buddy')
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
