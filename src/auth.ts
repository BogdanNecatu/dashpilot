// auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/api/auth";

export const auth = () => getServerSession(authOptions);
