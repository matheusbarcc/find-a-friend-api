import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import request from 'supertest'

const prisma = new PrismaClient()

export async function createAndAuthOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
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
    },
  })

  const authResponse = await request(app.server).post('/auth').send({
    email: 'jane.doe@example.com',
    password: '123',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
