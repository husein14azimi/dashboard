import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Extra fields from Google's profile that we keep in the session cookie.
export type GoogleExtras = {
  id?: string;
  givenName?: string;
  familyName?: string;
  emailVerified?: boolean;
  locale?: string;
  workspaceDomain?: string;
  scopes?: string;
};

declare module "next-auth" {
  interface Session {
    google?: GoogleExtras;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    google?: GoogleExtras;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Reads AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET automatically.
  providers: [Google({ authorization: { params: { prompt: "select_account" } } })],
  session: { strategy: "jwt" }, // no database needed
  pages: { signIn: "/", error: "/" },
  callbacks: {
    jwt({ token, account, profile }) {
      // `account` and `profile` exist only on the sign-in request.
      if (account && profile) {
        const p = profile as Record<string, unknown>;
        token.google = {
          id: p.sub as string | undefined,
          givenName: p.given_name as string | undefined,
          familyName: p.family_name as string | undefined,
          emailVerified: p.email_verified as boolean | undefined,
          locale: p.locale as string | undefined,
          workspaceDomain: p.hd as string | undefined,
          scopes: account.scope,
        };
      }
      return token;
    },
    session({ session, token }) {
      session.google = token.google;
      return session;
    },
  },
});
