import { AuthOptions, User } from "next-auth";
import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";



export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Full Name", required: true },
        phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials: any) {
        try {
          // Perform validation and user authentication logic here
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const existingUser = await db.user.findFirst({
            where: {
              number: credentials.phone
            }
          });

          if (existingUser) {
            const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
            if (passwordValidation) {
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.number
              };
            }
            return null;
          }

          // Create new user if not exists
          const newUser = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
              name: credentials.name,
              Balance: {
                create: {
                  amount: 0,
                  locked: 0
                }
              }
            }
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.number
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      }
    })
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }:any) {
      // Update session with user ID from token
      session.user.id = token.sub as string; // Assuming token.sub is string
      return session;
    }
  }
};
