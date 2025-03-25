import jwt from 'jsonwebtoken'


//Set Token 15 Min
export const generateAccessToken = (user: { id: number; username: string }) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15M'})
}

//Set Token 7 Days
export const generateRefreshToken = (user: { id: number; username: string }) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d'})
}


//Check Token
export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as { id: number; username: string}
}