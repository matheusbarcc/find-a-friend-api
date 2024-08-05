import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeGetPetDetailsService } from '@/services/factories/make-get-pet-details-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetDetailsParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = getPetDetailsParamsSchema.parse(request.params)

  const getPetDetailsService = makeGetPetDetailsService()

  try {
    const { pet } = await getPetDetailsService.execute({
      petId,
    })

    return reply.status(200).send({
      pet,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
