import React from "react";

export async function loginAction(formData: FormData) {
  "use server";

  const { username, password } = Object.fromEntries(formData);

  const payload = JSON.stringify({ username, password });
  const response = await postLogin(payload as any);

  if (response?.token) {
    setCookie("authToken", JSON.stringify(response));
    redirect("/home");
  }
}

export async function Signup(formData: FormData) {
  return (
    <form className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-400">
      <main className="flex w-full justify-center bg-white dark:bg-gray-400 sm:items-start">
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold mb-4">Login</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label htmlFor="senha" className="block text-sm font-medium">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </form>
  );
}
