import { Org, Prisma } from '@prisma/client'
import { fetchByCityParams, OrgsRepo } from '../orgs-repo'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepo implements OrgsRepo {
  public items: Org[] = []

  async fetchIdsByCity(params: fetchByCityParams) {
    const orgs = this.items.filter(
      (item) => item.state === params.state && item.city === params.city,
    )

    return orgs.map((org) => org.id)
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      cep: data.cep,
      number: data.number,
      street: data.state,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
