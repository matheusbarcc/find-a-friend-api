import { Org, Prisma } from '@prisma/client'

export interface fetchByCityParams {
  state: string
  city: string
}

export interface OrgsRepo {
  fetchIdsByCity(params: fetchByCityParams): Promise<string[]>
  findByEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
