import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independency: z.string(),
    environment: z.string(),
  })

  const { name, about, age, size, energy_level, independency, environment } =
    createPetBodySchema.parse(request.body)

  const createPetService = makeCreatePetService()

  await createPetService.execute({
    name,
    about,
    age,
    size,
    energy_level,
    independency,
    environment,
    org_id: request.user.sub,
  })

  return reply.status(201).send()
}
