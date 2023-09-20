"use client";
import { FormEventHandler, useState } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const router = useRouter();
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (file) {
      const filename = `${uuidv4()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(filename, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (data) {
        setFile([]);
        router.push("/");
      }

      const filepath = data?.path;
    } else {
      toast("Error! Please add upload a valid image file");
    }
  };

  const handleFileSelected = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="h-screen grid place-content-center bg-white place-items-center">
      <form className="flex flex-col gap-10 w-[90%] lg:w-[600px] shadow-xl px-10 py-10">
        <h4 className="text-center">Upload</h4>

        <input type="file" name="image" onChange={handleFileSelected} />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-400 text-white hover:bg-blue-600 transition-all py-2 rounded-md"
          onClick={handleSubmit}
        >
          UPLOAD
        </button>

        <p>The images you upload will not show as they are stored in a special database to be used during new feature additions</p>
      </form>

      <ToastContainer />
    </div>
  );
}
