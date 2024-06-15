import { loginUser } from "@/services/auth/authService";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async (credentials): Promise<any> => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const response = await loginUser(email, password);
          const user = response.data.user;
          const token = response.data.token;

          if (user) {
            return { ...user, access_token: token };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error: any) {
          throw new Error(
            error.response?.data?.message || "Invalid credentials"
          );
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.role = user.role;
        token.email = user.email;
        token.username = user.username;
        token.profileImg = user.profileImg;
        token._id = user._id;
      }
      return token;
    },

    async session({ session, token, user }) {
      if (session.user) {
        session.user.email = token.email!;
        session.user._id = token._id;
        session.user.access_token = token.access_token;
        session.user.username = token.username;
        session.user.profileImg = token.profileImg;
      }

      return session;
    },
  },
};
