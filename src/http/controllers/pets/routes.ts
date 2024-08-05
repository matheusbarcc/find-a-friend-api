import { FastifyInstance } from 'fastify'
import { createPet } from './create-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { fetchPetsWithFilters } from './fetch-pets-with-filters'
import { getPetDetails } from './get-pet-details'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, createPet)
  app.get('/pets', fetchPetsWithFilters)
  app.get('/pets/:petId', getPetDetails)
}
