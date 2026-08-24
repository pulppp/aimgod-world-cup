"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    creatorName: "",
    tiktokUsername: "",
    country: "",
    region: "",
    club: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Temporary storage until we connect a real database
    localStorage.setItem("aimgod-player", JSON.stringify(form));

    router.push("/matches");
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-yellow-400 font-bold tracking-widest">
            AIMGOD WORLD CUP
          </p>

          <h1 className="text-4xl font-black mt-3">
            ENTER THE WORLD CUP
          </h1>

          <p className="text-gray-400 mt-3">
            Create your competitor profile and represent your country.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
        >
          <div>
            <label className="block mb-2 font-semibold">
              Creator Name
            </label>

            <input
              name="creatorName"
              value={form.creatorName}
              onChange={handleChange}
              required
              placeholder="Creator X"
              className="w-full bg-black border border-zinc-700 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              TikTok Username
            </label>

            <input
              name="tiktokUsername"
              value={form.tiktokUsername}
              onChange={handleChange}
              required
              placeholder="@username"
              className="w-full bg-black border border-zinc-700 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Country
            </label>

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              required
              placeholder="Jamaica"
              className="w-full bg-black border border-zinc-700 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              League
            </label>

            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              required
              className="w-full bg-black border border-zinc-700 rounded-xl p-3"
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
            <label className="block mb-2 font-semibold">
              Club
            </label>

            <select
              name="club"
              value={form.club}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 rounded-xl p-3"
            >
              <option value="">Independent / No Club</option>
              <option value="third-eye">Third Eye FC</option>
              <option value="25-8-united">25/8 United</option>
              <option value="slickas">Slickas Momentum</option>
              <option value="aimgod-elite">AIMGOD Elite</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-black text-lg rounded-xl py-4 hover:scale-[1.02] transition"
          >
            ENTER AIMGOD
          </button>
        </form>
      </div>
    </main>
  );
}