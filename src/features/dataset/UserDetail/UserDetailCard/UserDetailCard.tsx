"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "@/entities/user/types";

type Props = {
  user: User;
};

export default function UserDetailCard({ user }: Props) {
  const fallbackImage = `https://randomuser.me/api/portraits/${
    user.gender === "male" ? "men" : "women"
  }/${user.id % 100}.jpg`;

  return (
    <>
      <div
        className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl 
      border-2 border-blue-500 
      shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.06)] 
      dark:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(255,255,255,0.05)]
      px-4 sm:px-6 md:px-8 py-6 mt-6 space-y-6 overflow-hidden transition-all duration-300"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 min-h-[160px]">
          <Image
            src={fallbackImage}
            alt={`${user.firstName} ${user.lastName}`}
            width={160}
            height={160}
            priority
            className="rounded-full object-cover border-4 border-blue-500 shadow-xl shrink-0"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500 dark:text-gray-300 break-all">
              {user.email}
            </p>
            <p className="text-gray-500 dark:text-gray-300">{`Phone: ${user.phone}`}</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-zinc-700 dark:text-zinc-200">
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
      {/* Go back button */}
      <div className="text-center pt-4">
        <Link
          href="/dataset"
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go back to dataset
        </Link>
      </div>
    </>
  );
}
