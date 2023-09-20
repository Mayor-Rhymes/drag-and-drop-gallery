import { ImagePlus } from "lucide-react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";


export default function Navbar() {

  const {isSignedIn} = useUser();
  return (
    <nav className="flex h-[70px] items-center px-3 bg-black text-white z-50 fixed w-full top-0 left-0">
      <h4 className="grow text-xl cursor-pointer">Gallery View</h4>

      <ul className="list-none flex grow-[2] justify-evenly cursor-pointer">
        <li className="delay-200 duration-300 ease-in-out hover:scale-125">
          Home
        </li>
        <li className="delay-200 duration-300 ease-in-out hover:scale-125">
          <Link href="/upload"><ImagePlus /></Link>
        </li>
        <li className="delay-200 duration-300 ease-in-out hover:scale-125">
          {isSignedIn ? <UserButton afterSignOutUrl="/"/> : <Link href="/login">Login/Signup</Link>}
        </li>
      </ul>
    </nav>
  );
}
