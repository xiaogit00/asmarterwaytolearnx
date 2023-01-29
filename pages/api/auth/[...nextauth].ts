import NextAuth, {NextAuthOptions} from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
          })
    ],
    adapter: MongoDBAdapter(clientPromise, {
      databaseName: 'flashcards'
    }),
    callbacks: {
      async session({ session, token, user }) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        console.log("TOken within JWC callback is: ", token)
        if (user) {
          token.id = user.id;
        }
        if (account) {
          token.accessToken = account.access_token;
        }
        
        return token;
      },
    },
    secret: process.env.SECRET
}


export default NextAuth(authOptions);