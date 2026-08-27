"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "../../utils/supabase/client";

export default function JoinPage() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    creatorName: "",
    tiktokUsername: "",
    email: "",
    password: "",
    country: "",
    region: "",
    club: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/matches`,
        data: {
          creator_name: form.creatorName,
          tiktok_username: form.tiktokUsername,
          country: form.country,
          region: form.region,
          club: form.club,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      setMessage(
        "AIMGOD account created. Check your email and click the verification link to activate your account."
      );
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-xl">
        <div className="mb-10 text-center">
          <p className="font-bold tracking-widest text-yellow-400">
            AIMGOD WORLD CUP
          </p>

          <h1 className="mt-3 text-4xl font-black">
            ENTER THE WORLD CUP
          </h1>

          <p className="mt-3 text-gray-400">
            Create your AIMGOD account and competitor profile.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <div>
            <label className="mb-2 block font-semibold">
              Creator Name
            </label>

            <input
              name="creatorName"
              value={form.creatorName}
              onChange={handleChange}
              required
              placeholder="Creator X"
              className="w-full rounded-xl border border-zinc-700 bg-black p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              TikTok Username
            </label>

            <input
              name="tiktokUsername"
              value={form.tiktokUsername}
              onChange={handleChange}
              required
              placeholder="@username"
              className="w-full rounded-xl border border-zinc-700 bg-black p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-700 bg-black p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="Minimum 8 characters"
              className="w-full rounded-xl border border-zinc-700 bg-black p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Country
            </label>

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              required
              placeholder="Jamaica"
              className="w-full rounded-xl border border-zinc-700 bg-black p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              League
            </label>

            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-zinc-700 bg-black p-3"
            >
              <option value="">Choose league</option>
              <option value="caribbean">Caribbean</option>
              <option value="north-america">North America</option>
              <option value="south-america">South America</option>
              <option value="europe">Europe</option>
              <option value="africa">Africa</option>
              <option value="asia">Asia</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Club
            </label>

            <select
              name="club"
              value={form.club}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-black p-3"
            >
              <option value="">Independent / No Club</option>
              <option value="third-eye">Third Eye FC</option>
              <option value="25-8-united">25/8 United</option>
              <option value="slickas">Slickas Momentum</option>
              <option value="aimgod-elite">AIMGOD Elite</option>
            </select>
          </div>

          {message && (
            <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm text-yellow-200">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-yellow-400 py-4 text-lg font-black text-black transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "CREATING ACCOUNT..." : "ENTER AIMGOD"}
          </button>
        </form>
      </div>
    </main>
  );
}