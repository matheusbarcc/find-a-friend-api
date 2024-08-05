import { makeFetchPetsWithFiltersService } from '@/services/factories/make-fetch-pets-with-filters-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPetsWithFilters(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsWithFiltersBodySchema = z.object({
    state: z.string(),
    city: z.string(),
    age: z.string().nullable(),
    energy_level: z.string().nullable(),
    size: z.string().nullable(),
    independency: z.string().nullable(),
    environment: z.string().nullable(),
    page: z.coerce.number().default(1),
  })

  const {
    city,
    state,
    age,
    size,
    energy_level,
    independency,
    environment,
    page,
  } = fetchPetsWithFiltersBodySchema.parse(request.query)

  const fetchPetsWithFiltersService = makeFetchPetsWithFiltersService()

  const { pets } = await fetchPetsWithFiltersService.execute({
    city,
    state,
    age,
    size,
    energy_level,
    independency,
    environment,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}
