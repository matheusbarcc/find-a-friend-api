import { OrgAlreadyExistsError } from '@/services/errors/org-already-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    password: z.string(),
    whatsapp: z.string(),
    cep: z.string(),
    number: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const {
    name,
    author_name,
    email,
    password,
    whatsapp,
    cep,
    number,
    street,
    neighborhood,
    city,
    state,
    latitude,
    longitude,
  } = registerBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterService()

    await registerService.execute({
      name,
      author_name,
      email,
      password,
      whatsapp,
      cep,
      number,
      street,
      neighborhood,
      city,
      state,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
