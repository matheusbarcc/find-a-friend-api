import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthOrg } from '@/utils/create-and-auth-org'

describe('Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Buddy',
        about:
          'Friendly and energetic dog who loves to play fetch and go for walks.',
        age: 'Young',
        size: 'Medium',
        energy_level: 'High',
        independency: 'Moderate',
        environment: 'Wide Environment',
      })

    expect(response.statusCode).toEqual(201)
  })
})
