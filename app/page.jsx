"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";

export default function LoginPage() {
  const { push } = useRouter();
  const [formData, setFormdata] = useState({
    username: "admin",
    password: "admin",
  });

  const login = async (payload) => {
    const { data } = await axios.post("/api/auth/login", payload);
    return data;
  };

  const { mutate } = useMutation(login, {
    onSuccess: (data) => {
      alert(data?.message);

      push("/people");
    },

    onError: (error) => {
      alert(error?.message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      username: formData.username,
      password: formData.password,
    };

    mutate(payload);
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Login To Starwars Character App
      </h1>
      <div className="max-w-md w-full px-6">
        <form
          onSubmit={handleSubmit}
          className="p-4 space-y-4 border-2 rounded-md p-2"
        >
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={(e) =>
                setFormdata((prev) => ({ ...prev, username: e.target.value }))
              }
              value={formData?.username}
              className="w-full bg-gray-100 focus:bg-white rounded border-2 focus:border-blue-500 p-2"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData?.password}
              onChange={(e) =>
                setFormdata((prev) => ({ ...prev, password: e.target.value }))
              }
              required
              className="w-full bg-gray-100 focus:bg-white rounded border-2 focus:border-blue-500 p-2"
            />
            <p className="text-red-600 text-sm font-bold">
              *Use admin as Username and Password
            </p>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
