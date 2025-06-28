import jwt from 'jsonwebtoken'

const ACCESS_SECERT = process.env.ACCESS_SECERT
const REFRESH_SECRET = process.env.REFRESH_SECRET

export const createAccessToken =  (payload) => {
    const accessToken = jwt.sign(payload, ACCESS_SECERT, {expiresIn: '15m'})
    return accessToken
}

export  const createRefeshToken = (payload) => {
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {expiresIn: '7d'})
    return refreshToken
}


export const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_SECERT)
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET)
}
