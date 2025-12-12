// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import * as bcrypt from 'bcryptjs' // Used for password comparison
import prisma from '@/lib/prisma' // Adjust path if necessary, but assumes your Prisma client is exported here

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null; 
        }

        // 1. Fetch user by email from the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }, 
        });

        if (!user) {
          // Email not found
          return null; 
        }

        // 2. Compare the passwords
        if (user.password) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password, // Plain text password from form
            user.password          // Hashed password from DB (assuming your schema maps the hash to this field)
          );

          if (isPasswordValid) {
            // SUCCESS: Return the user object (MUST NOT include the hashed password)
            return { 
              id: user.id, 
              name: user.fullName || user.email, // Use fullName for display
              email: user.email,
            };
          }
        }
        
        // FAILURE: Password invalid or hash missing
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  // Ensure NEXTAUTH_SECRET is set in .env.local
  // secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };