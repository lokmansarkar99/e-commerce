import {  getUserById } from '../services/authServices.js'
import {deleteOfUser, getAllOfUsers, hashPassword, updateUser} from '../services/userServices.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */



export const userProfile = async (req,res, next) => {
if(!req.user) {
    return res.status(500).json({message: "User Not Found"})
}
    
    const userId = req.user.id


    const user = await getUserById(userId)

    const {id, name, email, role} = user

    try {
        res.json({user: {id, name, email, role}})
    } catch (error) {
        console.log(error)
    }

    next()

}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */


export const updateUserProfile = async (req, res, next ) => {
    try {
        const currentUserMail = req.user.email
        const {name, password} = req.body

        const hashedPassword = await hashPassword(password)
        
        

    


        const updatedUser =await  updateUser(currentUserMail, name, hashedPassword)
        

        res.send(updatedUser.name)


    } catch (error) {
        console.log(error)
    }

    next()

}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllUsers = async (req, res, next) => {

    try {
        const allUsers = await getAllOfUsers()
        res.status(200).json({allUsers:allUsers})
    } catch (error) {
        console.log(error)
    }

    next()
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const deleteUser = async (req, res, next) => {
    
try {
        const userId = Number(req.params.id)

        if(!userId) {
            return res.status(400).json({message: "User ID is required"})
        }
    const deletedUser = await deleteOfUser(userId)
    if(!deletedUser) {
        return res.status(404).json({message: "User not found"})
    }
    res.status(200).json({message: "User deleted successfully ", user: {id: deletedUser.id , name:  deletedUser.name, email: deletedUser.email }})



} catch (error) {
    console.log(error)
}

next()

}

