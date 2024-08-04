import { PrismaOrgsRepo } from '@/repositories/prisma/prisma-orgs-repo'
import { RegisterService } from '../register'

export function makeRegisterService() {
  const orgsRepo = new PrismaOrgsRepo()
  const service = new RegisterService(orgsRepo)

  return service
}
