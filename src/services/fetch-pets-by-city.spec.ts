import { beforeEach, describe, expect, it } from 'vitest'
import { PetsRepo } from '@/repositories/pets-repo'
import { InMemoryPetsRepo } from '@/repositories/in-memory/in-memory-pets-repo'
import { OrgsRepo } from '@/repositories/orgs-repo'
import { InMemoryOrgsRepo } from '@/repositories/in-memory/in-memory-orgs-repo'
import { FetchPetsByCityService } from './fetch-pets-by-city'
import { hash } from 'bcryptjs'

let orgsRepo: OrgsRepo
let petsRepo: PetsRepo
let sut: FetchPetsByCityService

describe('Fetch Pets By City Service', () => {
  beforeEach(() => {
    orgsRepo = new InMemoryOrgsRepo()
    petsRepo = new InMemoryPetsRepo()
    sut = new FetchPetsByCityService(petsRepo, orgsRepo)
  })

  it('should be able to fetch pets by city', async () => {
    await orgsRepo.create({
      id: 'org-01',
      name: 'Happy Tails Animal Rescue',
      author_name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password_hash: await hash('123', 6),
      whatsapp: '+1234567890',
      cep: '12345-678',
      number: '123',
      street: 'Main Street',
      neighborhood: 'Downtown',
      city: 'Florianópolis',
      state: 'SC',
      latitude: 34.052235,
      longitude: -118.243683,
    })

    await orgsRepo.create({
      id: 'org-02',
      name: 'Friendly Pets',
      author_name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password_hash: await hash('123', 6),
      whatsapp: '+1234567890',
      cep: '12345-678',
      number: '123',
      street: 'Main Street',
      neighborhood: 'Downtown',
      city: 'São Paulo',
      state: 'SP',
      latitude: 34.052235,
      longitude: -118.243683,
    })

    await petsRepo.create({
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

    await petsRepo.create({
      name: 'Rex',
      about:
        'Friendly and energetic dog who loves to play fetch and go for walks.',
      age: 'Young',
      size: 'Medium',
      energy_level: 'High',
      independency: 'Moderate',
      environment: 'Wide Environment',
      org_id: 'org-02',
    })

    const { pets } = await sut.execute({
      state: 'SC',
      city: 'Florianópolis',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Buddy',
      }),
    ])
  })

  it('should be able to fetch paginated pets by city', async () => {
    await orgsRepo.create({
      id: 'org-01',
      name: 'Happy Tails Animal Rescue',
      author_name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password_hash: await hash('123', 6),
      whatsapp: '+1234567890',
      cep: '12345-678',
      number: '123',
      street: 'Main Street',
      neighborhood: 'Downtown',
      city: 'Florianópolis',
      state: 'SC',
      latitude: 34.052235,
      longitude: -118.243683,
    })

    await orgsRepo.create({
      id: 'org-02',
      name: 'Friendly Pets',
      author_name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password_hash: await hash('123', 6),
      whatsapp: '+1234567890',
      cep: '12345-678',
      number: '123',
      street: 'Main Street',
      neighborhood: 'Downtown',
      city: 'São Paulo',
      state: 'SP',
      latitude: 34.052235,
      longitude: -118.243683,
    })

    for (let i = 1; i <= 22; i++) {
      await petsRepo.create({
        name: `Dog-${i}`,
        about:
          'Friendly and energetic dog who loves to play fetch and go for walks.',
        age: 'Young',
        size: 'Medium',
        energy_level: 'High',
        independency: 'Moderate',
        environment: 'Wide Environment',
        org_id: 'org-01',
      })
    }

    const { pets } = await sut.execute({
      state: 'SC',
      city: 'Florianópolis',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Dog-21',
      }),
      expect.objectContaining({
        name: 'Dog-22',
      }),
    ])
  })
})
