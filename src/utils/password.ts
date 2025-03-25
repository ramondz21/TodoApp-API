import bcrypt from 'bcrypt'

//Change password to random code
export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

//Check password same as hashed
export const comparePassword = async (password: string, hashed: string) => {
    return await bcrypt.compare(password, hashed)
}