import { OrgsRepo } from '@/repositories/orgs-repo'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterServiceRequest {
  name: string
  author_name: string
  email: string
  password: string
  whatsapp: string
  cep: string
  number: string
  street: string
  neighborhood: string
  city: string
  state: string
  latitude: number
  longitude: number
}

interface RegisterServiceResponse {
  org: Org
}

export class RegisterService {
  constructor(private orgsRepo: OrgsRepo) {}

  async execute({
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
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepo.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepo.create({
      name,
      author_name,
      email,
      password_hash,
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

    return {
      org,
    }
  }
}
