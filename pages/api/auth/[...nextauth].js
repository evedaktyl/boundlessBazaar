import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "db";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          const email = credentials.email;
          const pass = credentials.password;

          const dbUser = await prisma.users.findFirst({
            where: { email: email}
          });
    
          if (dbUser && dbUser.password_hash == pass) {
            // Any object returned will be saved in `user` property of the JWT
            console.log(dbUser);
            return dbUser;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
      }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // ...add more providers here
  ],
  session: {
    strategy:"jwt"
  },
  // callbacks: {
  //   async session({ session, token }) {
  //     // Send properties to the client, like an access_token and user id from a provider.
  //     session.user = token.user
  //     return session
  //   },
  //   // async jwt({ token, user }) {
  //   //   // Persist the OAuth access_token and or the user id to the token right after signin
  //   //   user && (token.user = user)
  //   //   return token
  //   // }
  // },
  callbacks: {
    jwt: async ({ token, user }) => {
        user && (token.user = user)
        return token
    },
    session: async ({ session, token }) => {
        session.user = token.user
        return session
    }
},
  pages: {
    signIn: "/auth/signIn",
    signOut:"/auth/SignOut"
  }
}

export default NextAuth(authOptions)