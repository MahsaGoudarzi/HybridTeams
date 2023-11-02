import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mg@mg.co" },
        password: { label: "Password", type: "password", placeholder: "1234" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email !== "mg@gm.co" && password !== "1234") return null;
        return { id: "11", name: "MG", email: "mg@mg.co" };
      },
    }),
  ],
};
export default NextAuth(authOptions);
