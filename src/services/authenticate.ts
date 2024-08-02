import { Org } from '@prisma/client'
import { OrgsRepo } from '@/repositories/orgs-repo'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  org: Org
}

export class AuthenticateService {
  constructor(private orgsRepo: OrgsRepo) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const org = await this.orgsRepo.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordExists = await compare(password, org.password_hash)

    if (!doesPasswordExists) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
