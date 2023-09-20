'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {


  const router = useRouter();
  

  
  return (
    <div className="h-screen grid place-content-center bg-white place-items-center">
      <form className="flex flex-col gap-10 w-[600px] shadow-xl px-20 py-10">
        <h4 className="text-center">Login</h4>

        <input
          type="email"
          placeholder="Enter your email address"
          className="border transition-all border-blue-200 outline-blue-500 h-10 rounded-sm p-3"
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="border transition-all border-blue-200 outline-blue-500 h-10 rounded-sm p-3"
        />

        <button
          type="submit"
          className="bg-blue-400 text-white hover:bg-blue-600 transition-all py-2 rounded-md"
        >
          LOGIN
        </button>

        <p className="text-center">Don't have an account? <Link href="/signup" className="text-blue-500 hover:text-blue-900">Sign up</Link></p>
      </form>
    </div>
  );
}
