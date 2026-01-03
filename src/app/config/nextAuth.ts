import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import environment from "@env";

type TRefreshTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
};

const nextAuthOptions: NextAuthOptions = {
  secret: environment.AUTH_SECRET,
  providers: [
    Keycloak({
      clientId: environment.AUTH_KEYCLOAK_ID,
      clientSecret: environment.AUTH_KEYCLOAK_SECRET,
      issuer: environment.AUTH_KEYCLOAK_ISSUER,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: environment.AUTH_SESSION_MAX_LIFETIME * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      let username = "";
      let document = "";
      if (account?.access_token) {
        const decodedToken = jwtDecode<{
          preferred_username: string;
          document: string;
        }>(account.access_token);
        username = decodedToken?.preferred_username;
        document = decodedToken?.document ?? "";
      }
      if (account) {
        token.user = {
          id: user.id,
          name: user.name ?? "",
          email: user.email ?? "",
          document,
          username,
          avatarUrl: user.image ?? null,
          emailVerified: user.emailVerified,
        };

        token.authTokens = {
          idToken: account.id_token ?? "",
          accessToken: account.access_token ?? "",
          refreshToken: account.refresh_token ?? "",
          expiresAt: (account.expires_at ?? 0) * 1000,
        };

        return token;
      }

      if (Date.now() > token.authTokens.expiresAt) {
        try {
          const response = await fetch(
            `${environment.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                client_id: environment.AUTH_KEYCLOAK_ID,
                client_secret: environment.AUTH_KEYCLOAK_SECRET,
                grant_type: "refresh_token",
                refresh_token: token.authTokens.refreshToken,
              }),
              method: "POST",
            }
          );

          const tokensOrError: unknown = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as TRefreshTokenResponse;

          return {
            ...token,
            authTokens: {
              ...token.authTokens,
              accessToken: newTokens.access_token,
              refreshToken: newTokens.refresh_token,
              expiresAt: Date.now() + newTokens.expires_in * 1000,
            },
          } as JWT;
        } catch (e) {
          console.error("Error refreshing access_token", e);
          token.error = "RefreshTokenError";
          return token;
        }
      }
      return token;
    },
    session({ session, token }) {
      session.user = {
        id: token.user.id,
        name: token.user.name,
        email: token.user.email,
        document: token.user?.document,
        username: token.user.username,
        avatarUrl: token.user.avatarUrl,
        emailVerified: Boolean(token.user.emailVerified),
      };

      session.authTokens = {
        idToken: token.authTokens.idToken,
        accessToken: token.authTokens.accessToken,
        refreshToken: token.authTokens.refreshToken,
        expiresAt: token.authTokens.expiresAt,
      };

      if (token.error) {
        session.error = token.error;
      }

      return session;
    },
  },
  events: {
    signOut: async (options: { session?: Session; token?: JWT | null }) => {
      const token = options.token;

      if (token?.user) {
        const issuerUrl = environment.AUTH_KEYCLOAK_ISSUER;

        try {
          await axios.get(`${issuerUrl}/protocol/openid-connect/logout`, {
            params: { id_token_hint: token.authTokens.idToken },
          });
        } catch {
          Promise.reject(() => "Error logout keycloak");
        }
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: false,
};

export default nextAuthOptions;
