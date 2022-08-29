import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          // base url
          const baseUrl = "https://dashcommerce.click68.com/";
          const response = await fetch(baseUrl + "api/login", {
            method: "POST",
            body: JSON.stringify({
              UserName: credentials?.UserName,
              Password: credentials?.Password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log("data __");
          console.log(data);

          if (data?.status === true) {
            // returning token to set in session
            return {
              ...data?.description,
            };
          }

          throw new Error("invalid username or password");
        } catch (err) {
          console.error("err");
          console.error(err.toString());
          throw new Error(err.toString());
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    // called after successful signin
    jwt: async ({ token, user }) => {
      if (user) {
        token = user;
      }
      return token;
    },
    // called whenever session is checked
    session: async ({ session, token }) => {
      session.user = token;
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url?.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    jwt: true,
  },
  pages: {
    // signIn: "/auth/login",
  },
});
