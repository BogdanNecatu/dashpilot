"use client";

import { User } from "@/entities/user/types";
import UserDetailCard from "../UserDetailCard/UserDetailCard";

type Props = {
  user: User;
};

export default function UserDetail({ user }: Props) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <UserDetailCard user={user} />
      </div>
    </section>
  );
}
