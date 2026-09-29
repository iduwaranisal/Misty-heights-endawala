"use client";

import { useState, useTransition } from "react";
import { adminLogin } from "@/actions/bookings";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await adminLogin(username, password);
      if (result.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-[#0a2a18] to-emerald-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 mb-4">
            <Lock className="w-8 h-8 text-emerald-300" />
          </div>
          <h1 className="text-2xl font-bold text-white">Misty Heights Admin</h1>
          <p className="text-emerald-300/70 text-sm mt-1">Endawala · Sinharaja Forest</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Admin username"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-emerald-300/50 text-xs mt-6">
          Restricted access · Misty Heights Endawala Management
        </p>
      </div>
    </div>
  );
}
