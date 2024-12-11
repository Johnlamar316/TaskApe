import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="mb-6 w-full max-w-md cursor-grab overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-dark-secondary">
      {user.profilePictureUrl && (
        <Image
          src={`https://taskape-s3-images.s3.eu-west-2.amazonaws.com/p1.jpeg`}
          alt="profile picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
