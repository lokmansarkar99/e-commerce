import prisma from '../controllers/prismaController.js'
import argon2 from 'argon2'



export const hashPassword = async (password) => {
const hashedPassword = await argon2.hash(password)
return hashedPassword
}


export const updateUser = async (currentUserMail, name, hashedPassword) => {
          const updatedUser = await  prisma.user.update({
            where: {
                email:currentUserMail
            },
            data: {
                name,
                password: hashedPassword
                
            }
        })

        return updatedUser
        
}




export const getAllOfUsers = async () => {
    const allUsers = await prisma.user.findMany()

    return allUsers
}

export const deleteOfUser = async (userId) => {
    const deletedUser = await prisma.user.delete({
        where:{
            id:userId
        }
    })

    return deletedUser
}