import React, { useEffect } from "react";

type User = {
  id: number;
  name: string;
  age: number;
  gender: string;
  occupation: string;
  salary: number;
  placeOfBirth: string;
};

/*
TODO 5: WHY IS PLACE OF BIRTH NOT GETTING RENDERED


- THERE IS NO PLACE OF BIRTH IN THE API RESPONSE
- DONE
*/

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="border border-white/20 rounded-lg p-4 bg-[#1a1a1a] shadow-md text-white w-full">
      <p className="text-xl font-semibold mb-2">{user.name}</p>
      <div className="text-sm space-y-1">
        <p>
          <span className="font-medium text-gray-400">Age:</span> {user.age}
        </p>
        <p>
          <span className="font-medium text-gray-400">Gender:</span>{" "}
          {user.gender}
        </p>
        <p>
          <span className="font-medium text-gray-400">Occupation:</span>{" "}
          {user.occupation}
        </p>
        <p>
          <span className="font-medium text-gray-400">Salary:</span> ₹
          {user.salary.toLocaleString()}
        </p>
        <p>
          <span className="font-medium text-gray-400">Place of Birth:</span>{" "}
          {user.placeOfBirth}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
