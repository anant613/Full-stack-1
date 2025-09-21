"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { motion } from "framer-motion";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl border border-blue-500/40 bg-black/70 p-8 shadow-[0_0_25px_rgba(59,130,246,0.5)] backdrop-blur-xl"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 text-center text-4xl font-extrabold tracking-wide text-blue-400"
        >
          🚀 LOGIN
        </motion.h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-blue-500/30 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-blue-500/30 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />

          {error && (
            <p className="text-center text-sm text-red-400 animate-pulse">
              {error}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #3b82f6" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white transition hover:bg-blue-700"
          >
            Login
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-gray-400">OR</div>

        {/* Google Login */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #ef4444" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signIn("google")}
          className="w-full rounded-lg bg-red-500 px-4 py-2 font-bold text-white transition hover:bg-red-600"
        >
          Sign in with Google
        </motion.button>

        {/* Register link */}
        <div className="mt-6 text-center text-gray-400">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-400 hover:underline hover:text-blue-300 transition"
          >
            Register
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
