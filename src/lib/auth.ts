import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import * as jwt_decode from "jwt-decode"

export async function comparePasswords(
  plainTextPassword: string,
  hashedDbPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hashedDbPassword)
}

export function verifyJWT(token: string): void {
  jwt.verify(token, process.env.JWT_SECRET as string)
}

export function createJWT({
  username,
  id,
}: {
  username: string
  id: string
}): string {
  return jwt.sign({ username, id }, process.env.JWT_SECRET as string)
}

const saltRounds = 10

export async function hashPassword(plainTextPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(plainTextPassword, salt)
}

export function decodeJWT(token: string): { id: string; username: string } {
  return jwt_decode.default(token) as { id: string; username: string }
}
