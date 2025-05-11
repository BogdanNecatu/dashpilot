"use client";

import Image from "next/image";
import { User } from "@/entities/user/types";

type Props = {
  user: User;
};

export default function UserDetailCard({ user }: Props) {
  const fallbackImage = `https://randomuser.me/api/portraits/${
    user.gender === "male" ? "men" : "women"
  }/${user.id % 100}.jpg`;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-8 mt-10 space-y-6">
      <div className="flex items-center gap-6">
        <Image
          src={fallbackImage}
          alt={`${user.firstName} ${user.lastName}`}
          width={112}
          height={112}
          priority
          className="rounded-full object-cover border-4 border-blue-500 shadow"
        />
        <div>
          <h2 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
          <p className="text-gray-500 dark:text-gray-300">
            Phone: {user.phone}
          </p>
        </div>
      </div>

      {/* Company */}
      <div>
        <h3 className="font-semibold text-lg text-zinc-800 dark:text-white">
          Company
        </h3>
        <p className="text-zinc-600 dark:text-zinc-300">
          {user.company?.title} at {user.company?.name}
        </p>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-semibold text-lg text-zinc-800 dark:text-white">
          Location
        </h3>
        <p className="text-zinc-600 dark:text-zinc-300">
          {user.address?.address}, {user.address?.city},{" "}
          {user.address?.stateCode}
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-zinc-700 dark:text-zinc-200">
        <div>
          <span className="font-medium">Age:</span> {user.age}
        </div>
        <div>
          <span className="font-medium">Birth:</span> {user.birthDate}
        </div>
        <div>
          <span className="font-medium">Gender:</span> {user.gender}
        </div>
        <div>
          <span className="font-medium">Height:</span> {user.height} cm
        </div>
        <div>
          <span className="font-medium">Weight:</span> {user.weight} kg
        </div>
        <div>
          <span className="font-medium">Eye Color:</span> {user.eyeColor}
        </div>
        <div>
          <span className="font-medium">Hair:</span> {user.hair?.color} /{" "}
          {user.hair?.type}
        </div>
        <div>
          <span className="font-medium">Blood Group:</span> {user.bloodGroup}
        </div>
      </div>
    </div>
  );
}
