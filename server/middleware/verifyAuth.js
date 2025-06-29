import { createAccessToken, verifyAccessToken,verifyRefreshToken  } from "../services/tokenServices.js";
import { getUserById } from "../services/authServices.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */


export const verifyAuth = async (req, res, next) => {

    const accessToken = req.cookies.access_token
    const refreshToken = req.cookies.refresh_token

    // access token check
    try {
        if(accessToken) {
            const decoded =  verifyAccessToken(accessToken)
            req.user =  decoded
            console.log("User from access token ", req.user)
            return next()
        }

    } catch (error) {
        console.log(error)
    }

// check refresh token

try {
    if(refreshToken) {

        const decoded = verifyRefreshToken(refreshToken)
        const user = await getUserById(decoded.id)
        if(!user) {
            req.user = null
            return next()
        }
        // if user exist , create a new access token
        const newAccessToken = createAccessToken({
            id: user.id,
            email: user.email,
            role: user.role
        })

        // set cookie
        res.cookie("access_token", newAccessToken, {httpOnly: true, secure: true, maxAge: 15 * 60 * 1000})

        // set user in req
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        console.log("User from refresh token ", req.user)

        return next()

    }
} catch (error) {
        console.warn('Refresh token invalid or expired:', err.message);
      req.user = null;
      console.log("User if null ", req.user)
      return next();


}

req.user = null
return next()




}