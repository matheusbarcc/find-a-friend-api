import { Org, Prisma } from '@prisma/client'

export interface OrgsRepo {
  findByEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
