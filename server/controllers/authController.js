import { registerUserSchema, loginUserSchema } from "../validators/authValidators.js"; 
import { getUserByEmail, createUser, validateUserPassword } from "../services/authServices.js";
import { createAccessToken, createRefeshToken, verifyAccessToken , verifyRefreshToken} from "../services/tokenServices.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export const registerUser = async (req, res) => {
  const parse =  registerUserSchema.safeParse(req.body)
  if(!parse.success) {
    return res.status(400).json({message:parse.error.errors[0].message })
  }

  const {name, email, password} = parse.data

 try {
  
   const existingUser = await  getUserByEmail(email)
  if(existingUser) {
    return res.status(400).json({message: "Email already registerd"})
  }

  const user = await  createUser({name, email, password})
  if(!user) {
    return res.status(500).json({message: "Failed to create user"})
  }
  return res.status(201).json({message: 'User Registerd Successfully', user: {id:user.id, email}})

 } catch (error) {
  console.log(error)
  return res.status(500).json({message: "Something went wrong"})
 }

}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export const loginUser = async (req, res) => {
  const parse = loginUserSchema.safeParse(req.body)

  if(!parse.success) {
    return res.status(500).json({message: parse.error.errors[0].message})
  }

  const {email, password} = parse.data

  try {
  
    // Check User 
    const user = await getUserByEmail(email)
    if(!user || !(await validateUserPassword(user.password, password)) ) {
      return res.status(401).json({message: "Invalid Email or Password no user"})
    }



    const accessTokenPayload = {
      id: user.id,
      email:user.email,
      role: user.role
    }
    // create access token
    const accessToken =  createAccessToken(accessTokenPayload)

    // create refresh token 
    const refreshToken =  createRefeshToken({id: user.id})

    // set base cookie options
    const  baseCookie = {
      httpOnly: true,
      secure: true
    }

    // set cookie 
    res.cookie("access_token", accessToken,{...baseCookie, maxAge: 15 * 60 * 1000})
    res.cookie("refresh_token", refreshToken, {...baseCookie, maxAge: 7 * 24 * 60 * 60 * 1000})

    res.status(200).json({message: "Login Successful ", user: { accessTokenPayload}})
  } catch (error) {
    console.log(error)
  }


}



/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export const logoutUser = async (req, res) => {
try {
      res.clearCookie("access_token")
    res.clearCookie("refresh_token")
    req.user = null;
    console.log(req.user)
    return res.status(200).json({message: "Logout Successful"})

} catch (error) {
  console.log(error)
  return res.status(500).json({message: "Something went wrong during logout"})
}

   
}