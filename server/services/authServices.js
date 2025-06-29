import prisma from "../controllers/prismaController.js";
import argon2 from 'argon2'

export const getUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {email}
        
    })

    return user
}


export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {id}
    })
    await console.log(user)
    return user
}


export const createUser = async ({name, email, password}) => {
    const hashedPassword =await argon2.hash(password)

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    await console.log(newUser)
    return newUser
}


export const validateUserPassword = async (hashedPassword, plainPassword ) => {
    return await argon2.verify(hashedPassword, plainPassword)
}



