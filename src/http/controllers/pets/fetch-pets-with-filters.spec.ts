import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

describe('Fetch pets with filters (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets with filters', async () => {
    await prisma.org.createMany({
      data: [
        {
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
        {
          id: 'org-02',
          name: 'New Friend',
          author_name: 'John Doe',
          email: 'john.doe@example.com',
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
        },
      ],
    })

    await prisma.pet.createMany({
      data: [
        {
          name: 'Buddy',
          about:
            'Friendly and energetic dog who loves to play fetch and go for walks.',
          age: 'Cub',
          size: 'Small',
          energy_level: 'High',
          independency: 'Moderate',
          environment: 'Wide Environment',
          org_id: 'org-01',
        },
        {
          name: 'Rex',
          about:
            'Friendly and energetic dog who loves to play fetch and go for walks.',
          age: 'Young',
          size: 'Medium',
          energy_level: 'High',
          independency: 'Moderate',
          environment: 'Wide Environment',
          org_id: 'org-02',
        },
      ],
    })

    const response = await request(app.server)
      .get('/pets')
      .query({
        state: 'SC',
        city: 'Florianópolis',
        age: 'Cub',
        size: null,
        energy_level: null,
        independency: null,
        environment: null,
        page: 1,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Buddy',
      }),
    ])
  })
})
