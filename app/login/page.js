"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-[#414b5f] to-[#dde3ee] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white/95 p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-[#1e2b4c] mb-6">
          Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e2b4c]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e2b4c]"
        />
        <button
          type="submit"
          className="w-full bg-[#1e2b4c] text-white py-3 rounded-md font-semibold hover:bg-[#152034] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
