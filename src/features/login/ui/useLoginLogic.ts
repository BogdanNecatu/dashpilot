import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchAllUsers } from "@/entities/user/service/service";
import { useUserStore } from "@/entities/user/store/useUserStore";

export function useLoginLogic() {
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
        err instanceof Error
          ? "MISSING SECRET KEY"
          : "Unexpected configuration error."
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await checkSecret();

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
          setError(
            err instanceof Error
              ? "Login succeeded but user fetch failed: " + err.message
              : "Unexpected error loading users after login."
          );
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
        err instanceof Error ? err.message : "Unexpected error during login."
      );
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    loading,
    handleSubmit,
  };
}
