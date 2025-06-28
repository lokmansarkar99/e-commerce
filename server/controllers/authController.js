import { registerUserSchema, loginUserSchema } from "../validators/authValidators.js"; 
import { getUserByEmail, createUser, validateUserPassword } from "../services/authServices.js";
import { createAccessToken, createRefeshToken, verifyAccessToken , verifyRefreshToken} from "../services/tokenServices.js";

const cookieOptins = {
httpOnly : true,
secure: true
}


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