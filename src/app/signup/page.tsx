import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen grid place-content-center bg-white place-items-center">
      <form className="flex flex-col gap-10 w-[600px] shadow-xl px-10 py-10">
        <h4 className="text-center">Signup</h4>

        <input
          type="email"
          placeholder="Enter your email address"
          className="border transition-all border-blue-200 outline-blue-500 h-10 rounded-sm p-3"
        />


        <input
          type="text"
          placeholder="Enter a unique username"
          className="border transition-all border-blue-200 outline-blue-500 h-10 rounded-sm p-3"
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="border transition-all border-blue-200 outline-blue-500 h-10 rounded-sm p-3"
        />


        <input
          type="password"
          placeholder="Confirm password. Password again"
          className="border transition-all border-blue-200 h-10 outline-blue-500 rounded-sm p-3"
        />

        <button
          type="submit"
          className="bg-blue-400 text-white hover:bg-blue-600 transition-all py-2 rounded-md"
        >
          SIGNUP
        </button>

        <p className="text-center">Already have an account? <Link href="/login" className="text-blue-500 hover:text-blue-900">Login</Link></p>
      </form>
    </div>
  );
}
