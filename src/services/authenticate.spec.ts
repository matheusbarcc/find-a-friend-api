import { OrgsRepo } from '../repositories/orgs-repo'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepo } from '@/repositories/in-memory/in-memory-orgs-repo'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepo: OrgsRepo
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    orgsRepo = new InMemoryOrgsRepo()
    sut = new AuthenticateService(orgsRepo)
  })

  it('should be able to authenticate', async () => {
    await orgsRepo.create({
      name: 'Happy Tails Animal Rescue',
      author_name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password_hash: await hash('123', 6),
      whatsapp: '+1234567890',
      cep: '12345-678',
      number: '123',
      street: 'Main Street',
      neighborhood: 'Downtown',
      city: 'Anytown',
      state: 'CA',
      latitude: 34.052235,
      longitude: -118.243683,
    })

    const { org } = await sut.execute({
      email: 'jane.doe@example.com',
      password: '123',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'jane.doe@example.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepo.create({
      name: 'Happy Tails Animal Rescue',
      author_name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password_hash: await hash('123', 6),
      whatsapp: '+1234567890',
      cep: '12345-678',
      number: '123',
      street: 'Main Street',
      neighborhood: 'Downtown',
      city: 'Anytown',
      state: 'CA',
      latitude: 34.052235,
      longitude: -118.243683,
    })

    await expect(() =>
      sut.execute({
        email: 'jane.doe@example.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
