import { OrgsRepo } from '../repositories/orgs-repo'
import { RegisterService } from './register'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepo } from '@/repositories/in-memory/in-memory-orgs-repo'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepo: OrgsRepo
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    orgsRepo = new InMemoryOrgsRepo()
    sut = new RegisterService(orgsRepo)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'Happy Tails Animal Rescue',
      author_name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: '123',
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

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Happy Tails Animal Rescue',
      author_name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: '123',
      whatsapp: '+1234567890',
      cep: '12345-678',
      number: '1234',
      street: 'Main Street',
      neighborhood: 'Downtown',
      city: 'Anytown',
      state: 'CA',
      latitude: 34.052235,
      longitude: -118.243683,
    })

    const isPasswordHashed = await compare('123', org.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should be not able to register with same email twice', async () => {
    const email = 'jane.doe@example.com'

    await sut.execute({
      name: 'Happy Tails Animal Rescue',
      author_name: 'Jane Doe',
      email,
      password: '123',
      whatsapp: '+1234567890',
      cep: '12345-678',
      number: '1234',
      street: 'Main Street',
      neighborhood: 'Downtown',
      city: 'Anytown',
      state: 'CA',
      latitude: 34.052235,
      longitude: -118.243683,
    })

    await expect(() =>
      sut.execute({
        name: 'Happy Tails Animal Rescue',
        author_name: 'Jane Doe',
        email,
        password: '123',
        whatsapp: '+1234567890',
        cep: '12345-678',
        number: '1234',
        street: 'Main Street',
        neighborhood: 'Downtown',
        city: 'Anytown',
        state: 'CA',
        latitude: 34.052235,
        longitude: -118.243683,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
