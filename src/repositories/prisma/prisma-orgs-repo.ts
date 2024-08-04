import { Prisma, PrismaClient } from '@prisma/client'
import { fetchByCityParams, OrgsRepo } from '../orgs-repo'

const prisma = new PrismaClient()

export class PrismaOrgsRepo implements OrgsRepo {
  async fetchIdsByCity(params: fetchByCityParams) {
    const orgs = await prisma.org.findMany({
      where: {
        state: params.state,
        city: params.city,
      },
    })

    return orgs.map((org) => org.id)
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
