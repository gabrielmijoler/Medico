import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/config/nextAuth";
import environment from "@/config/env";

// Constantes ficam no topo (substitui o constructor)
const BASE_URL = environment.NEXT_PUBLIC_API_BASE_URL;

// --- Função Auxiliar (Privada, não exportada) ---
// Substitui o método "private fetchData"
async function customFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const session = await getServerSession(authOptions);

  const headers = new Headers(
    options.headers || { "Content-Type": "application/json" }
  );

  if (session?.authTokens.accessToken) {
    headers.append("Authorization", session.authTokens.accessToken);
  }

  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        redirect("/login"); // Ou "/unauthorized"
      }

      // Tenta ler o erro do JSON, se falhar, usa o status text
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Erro ${response.status}: ${response.statusText}`
      );
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Erro na chamada ${url}:`, error);
    throw error;
  }
}

// --- Funções Públicas (A "Interface") ---
// Aqui exportamos um objeto para agrupar, ou você pode exportar funcão por função

export const api = {
  get: async <T>(url: string) => {
    return customFetch<T>(url, { method: "GET" });
  },

  post: async <T>(url: string, body: unknown) => {
    return customFetch<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  put: async <T>(url: string, body: unknown) => {
    return customFetch<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete: async <T>(url: string) => {
    return customFetch<T>(url, { method: "DELETE" });
  },
};
