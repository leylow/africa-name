// app/api/signup/route.ts
import { NextResponse } from 'next/server'
import * as bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma' // Adjust path if necessary

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return new NextResponse(JSON.stringify({ message: "Missing required fields." }), { status: 400 })
    }

    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: "User with this email already exists." }), { status: 409 })
    }

    // 2. Hash the password (CRITICAL STEP)
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Create the new user
    const newUser = await prisma.user.create({
      data: {
        email,
        fullName: name,
        password: hashedPassword, // Store the HASHED password
      },
      select: {
        id: true,
        email: true,
        fullName: true,
      },
    })

    return new NextResponse(JSON.stringify({ message: "User created successfully.", user: newUser }), { status: 201 })
  } catch (error) {
    console.error("Signup failed:", error)
    return new NextResponse(JSON.stringify({ message: "Internal Server Error during signup." }), { status: 500 })
  }
}