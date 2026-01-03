const environment = {
  AUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "",
  AUTH_SESSION_MAX_LIFETIME: Number(
    process.env.AUTH_SESSION_MAX_LIFETIME ?? 24,
  ),
  AUTH_KEYCLOAK_ID: process.env.AUTH_KEYCLOAK_ID ?? "",
  AUTH_KEYCLOAK_SECRET: process.env.AUTH_KEYCLOAK_SECRET ?? "",
  AUTH_KEYCLOAK_ISSUER: process.env.AUTH_KEYCLOAK_ISSUER ?? "",
  MULTI_ACCESS_URL: process.env.MULTI_ACCESS_URL ?? "",
  NEXT_PUBLIC_API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL ?? "",
  NEXT_PUBLIC_API_TIMEOUT: Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 10000),
  NEXT_PUBLIC_COMPANY_ID: process.env.NEXT_PUBLIC_COMPANY_ID ?? "",
  VERSION: process.env.version,
};

export default environment;
