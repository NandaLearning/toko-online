import React, { useState } from "react";
import { updatePassword, updateEmail } from "firebase/auth";
import { auth } from "../Utils/firebase-config";
import Navigasi from "../Components/Navigasi";

export default function Edit() {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEdit = async () => {
    try {
      if (newEmail) {
        await updateEmail(auth.currentUser, newEmail);
      }
      if (newPassword) {
        await updatePassword(auth.currentUser, newPassword);
      }
      // Redirect to profile or another page after successful edit
    } catch (error) {
      console.error("Edit error:", error);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div>
        <Navigasi />
      </div>

      <div className="justify-center items-center grid mt-20">
        <div className="flex justify-center items-center">
          <img src="profile.png" className="w-32" alt="" />
        </div>
        <input
          type="text"
          placeholder="New Email"
          className="mt-10 bg-white w-52 h-7 border border-gray-400"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="bg-white w-52 h-7 mt-10 border border-gray-400"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <button
            className="font-bold ml-4 text-xl border mt-5 border-gray-400 bg-green-500 text-white w-20 h-10 rounded-lg hover-bg-black duration-200"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}
