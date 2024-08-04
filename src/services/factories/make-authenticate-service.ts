import { PrismaOrgsRepo } from '@/repositories/prisma/prisma-orgs-repo'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
  const orgsRepo = new PrismaOrgsRepo()
  const service = new AuthenticateService(orgsRepo)

  return service
}
