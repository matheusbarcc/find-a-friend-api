import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
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

    const response = await request(app.server).post('/auth').send({
      email: 'jane.doe@example.com',
      password: '123',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
