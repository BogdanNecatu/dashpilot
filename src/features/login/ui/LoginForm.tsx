"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEye as Eye, FaEyeSlash as EyeSlash } from "react-icons/fa";

const EyeIcon = Eye as unknown as React.FC<{ className?: string }>;
const EyeSlashIcon = EyeSlash as unknown as React.FC<{ className?: string }>;

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 border border-gray-200 dark:border-white/10 rounded-lg space-y-6"
    >
      <h2 className="text-xl font-semibold text-center">Sign in</h2>

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
          className="px-3 py-2 border rounded outline-none border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
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
          className="px-3 py-2 pr-10 border rounded outline-none border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
        />
        <span
          className="absolute right-3 top-10 cursor-pointer text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
        </span>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 transition"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
