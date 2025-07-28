"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Disable scroll on body (for stable layout)
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
    <div style={outerWrapperStyle}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2 style={headingStyle}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={loginButtonStyle}>
          Login
        </button>
      </form>
    </div>
  );
}

// === Styles ===

const outerWrapperStyle = {
  height: "100vh",
  width: "100vw",
  background: "linear-gradient(to right, #414b5f, #dde3ee)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  boxSizing: "border-box",
  overflow: "hidden", // prevent scroll-based shift
  fontFamily: "'Segoe UI', sans-serif",
};

const formStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.97)",
  padding: "32px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  width: "100%",
  maxWidth: "360px",
};

const headingStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "24px",
  textAlign: "center",
  color: "#1e2b4c",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px",
  color: "#333",
  backgroundColor: "#fff",
};

const loginButtonStyle = {
  backgroundColor: "#1e2b4c",
  color: "#fff",
  padding: "12px",
  width: "100%",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};
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
