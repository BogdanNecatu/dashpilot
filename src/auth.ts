// auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";

export const auth = () => getServerSession(authOptions);
