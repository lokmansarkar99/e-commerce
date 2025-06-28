import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const connectDB  = async  ()  => {
    try {
        await prisma.$connect();
        console.log("Database connected Successfully  ")

    } catch (error) {
        console.log("Failed to connect database" , error)
        process.exit(1)
    }
}

export default prisma;