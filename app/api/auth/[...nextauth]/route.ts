

// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import * as bcrypt from 'bcryptjs'
import prisma from '../../../../lib/prisma'


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
          return null; 
        }

        // 2. Compare the passwords
        if (user.password) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordValid) {
            // SUCCESS: Return the user object (MUST include the database ID)
            // The structure returned here is passed to the 'jwt' callback.
            return { 
              id: user.id, // <--- CRITICAL: Pass the database ID here
              name: user.name || user.email, 
              email: user.email,
            };
          }
        }
        
        // FAILURE
        return null;
      }
    })
  ],
  callbacks: {
    // 1. JWT Callback: Add the user's ID to the JWT token
    async jwt({ token, user }) {
      if (user) {
        // 'user' is the object returned from the 'authorize' function above.
        token.id = user.id; // Attach the database ID to the token
      }
      return token;
    },
    
    // 2. Session Callback: Add the ID from the JWT token to the session object
    async session({ session, token }) {
      if (token.id) {
        // Attach the ID from the token (which came from the database) to the session object
        session.user.id = token.id as string; // <--- CRITICAL: ID is now available in session.user.id
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  // secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

// NOTE: You may need to extend the NextAuth types if session.user.id gives a TypeScript error.
// See the instruction below.