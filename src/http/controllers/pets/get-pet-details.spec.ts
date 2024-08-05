import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

describe('Get Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    await prisma.org.create({
      data: {
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
      },
    })

    const pet = await prisma.pet.create({
      data: {
        name: 'Buddy',
        about:
          'Friendly and energetic dog who loves to play fetch and go for walks.',
        age: 'Young',
        size: 'Medium',
        energy_level: 'High',
        independency: 'Moderate',
        environment: 'Wide Environment',
        org_id: 'org-01',
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
  })
})
