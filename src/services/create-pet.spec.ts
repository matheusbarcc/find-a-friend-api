import { beforeEach, describe, expect, it } from 'vitest'
import { PetsRepo } from '@/repositories/pets-repo'
import { CreatePetService } from './create-pet'
import { InMemoryPetsRepo } from '@/repositories/in-memory/in-memory-pets-repo'

let petsRepo: PetsRepo
let sut: CreatePetService

describe('Create Pet Service', () => {
  beforeEach(() => {
    petsRepo = new InMemoryPetsRepo()
    sut = new CreatePetService(petsRepo)
  })

  it('should be able to create a new pet', async () => {
    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })
})
