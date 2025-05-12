"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEye as Eye, FaEyeSlash as EyeSlash } from "react-icons/fa";
import { fetchAllUsers } from "@/entities/user/service/service";
import { useUserStore } from "@/entities/user/store/useUserStore";

const EyeIcon = Eye as unknown as React.FC<{ className?: string }>;
const EyeSlashIcon = EyeSlash as unknown as React.FC<{ className?: string }>;

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    setUsers,
    setLoading: setStoreLoading,
    setError: setStoreError,
  } = useUserStore();

  const checkSecret = async () => {
    try {
      const res = await fetch("/api/auth/check-secret");
      if (!res.ok) {
        const data = await res.json();
        if (data.error === "MISSING_SECRET") {
          throw new Error("MISSING_SECRET");
        }
      }
    } catch (err) {
      throw new Error(
        err instanceof Error ? "MISSING SECRET KEY": "Unexpected configuration error."
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await checkSecret()

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        try {
          setStoreLoading(true);
          setStoreError(null);
          const { users, total } = await fetchAllUsers();
          setUsers(users, total, 1, 20);
          router.push("/dashboard");
        } catch (err) {
          if (err instanceof Error) {
          setError("Login succeeded but user fetch failed: " + err.message);
        } else {
          setError("Unexpected error loading users after login.");
        }
        } finally {
          setStoreLoading(false);
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError(
        err instanceof Error
          ? err.message
          : "Unexpected error during login."
      );
    }
  };

  return (
    <div className="flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-6 border-2 border-gray-300 dark:border-white/20 rounded-xl shadow-lg space-y-6 bg-white dark:bg-zinc-900"
      >
        <h2 className="text-2xl font-bold text-center text-foreground">
          Sign in
        </h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border rounded outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 pr-10 border rounded outline-none border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 transition"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
