import { Boxes } from "@/components/ui/interactive-bg-boxes";
import { cn } from "@/lib/utils";
import { ProfileGallery } from "./components/profile-gallery";
import Navbar from "@/components/navbar";

import { getSession, getUserDetails } from "@/lib/supabase-server";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function ProfilePage() {
  const [session, userDetails] = await Promise.all([
    getSession(),
    getUserDetails(),
  ]);

  const user = session?.user;

  return (
    <div className="h-screen max-h-screen w-full flex flex-col md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="absolute -top-40 left-0 md:left-72 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10  w-full pt-20 md:top-40">
        <Link href="/">
          <button className="h-7 w-7 mb-4 group inline-flex items-center justify-center rounded-full border border-slate-50 border-opacity-10 bg-slate-50 bg-opacity-10">
            <ResetIcon className="w-3 h-3 text-white opacity-50 group-hover:opacity-100 transition duration-200" />
          </button>
        </Link>
        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Your Spotlights
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg md:ml-2">
          Scroll to browse your spotlights. Click on a spotlight to view it.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg py-32 w-full h-full">
        <div className="w-full md:h-[800px] overflow-x-hidden scrollbar-hide">
          <ProfileGallery />
        </div>
      </div>
    </div>
  );
}
