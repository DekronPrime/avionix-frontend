"use client";
import { useAuth } from "../context/AuthContext";

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-foreground p-3 flex flex-col gap-4 flex-1 justify-start items-center">
      <h1 className="font-orbitron text-3xl font-bold">My Profile Page</h1>
      {user && (
        <div className="inline-flex items-center gap-2">
          <p className="text-lg font-semibold font-inter">
            Hello, @{user?.username ? user.username : "Unknown"}
          </p>
          <span
            className={`text-xl text-white p-2 rounded-lg font-ptSerif font-bold ${
              user?.role === "ADMIN"
                ? "bg-danger"
                : user?.role === "CREW"
                ? "bg-warning"
                : "bg-success"
            }`}
          >
            {user?.role}
          </span>
        </div>
      )}
    </div>
  );
};
