"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Sally from "@/app/images/sally.png"; // Assuming your login image is stored in the images folder
import Logo from "@/app/images/panasonic.jpg";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col px-10 bg-white max-md:px-5 relative z-10">
        <div className="flex items-center mb-8">
          <div className="mr-8">
            <Image src={Logo} alt="Logo" width={150} height={100} />
          </div>
        </div>
        <div className="self-center pr-30 mt-6 w-full max-w max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full"></div>
            <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
              <form
                className="flex flex-col text-base text-indigo-300 max-md:mt-10 relative z-10"
                onSubmit={handleSubmit}
              >
                <div className="justify-center items-start p-7 bg-indigo-50 rounded-lg max-md:px-5">
                  <label className="block mb-2">Email or Username</label>
                  <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col justify-between px-8 py-6 mt-8 bg-indigo-50 rounded-lg max-md:px-5">
                  <label className="block mb-2">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="self-end mt-2 text-sm text-zinc-400 z-10 relative">
                  <a href="#">Forgot password?</a>
                </div>
                <button
                  type="submit"
                  className="justify-center items-center mt-4 py-2 px-6 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10 relative"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-36 top-[35%] transform -translate-y-1/2 w-full z-0">
        <p className="text-4xl font-bold text-black">Sign in to</p>
      </div>
      <div className="absolute left-40 top-[45%] transform -translate-y-1/2 w-full z-0">
        <p className="text-3xl text-black">
          Change Model Part <br className="mb-2" />
          <span className="inline-block" style={{ marginTop: "0.5rem" }}>
            More simply
          </span>
        </p>
      </div>
      <div className="absolute left-[30%] transform -translate-y-1/2">
        <Image src={Sally} alt="Sally" width={200} height={300} />
      </div>
    </div>
  );
}

export default Login;
