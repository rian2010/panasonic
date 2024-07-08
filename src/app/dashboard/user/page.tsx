"use client"

import ManageUser from "@/app/components/ui/manageUser";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const User: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return; // Do nothing while loading
    }

    if (status === 'unauthenticated') {
      signIn(); // Redirects to the login page
    } else if (session?.user.role !== 'admin') {
      router.push('/unauthorized'); // Redirect if the user does not have the right role
    }
  }, [status, session, router]);

  if (status === 'loading' || status === 'unauthenticated' || (status === 'authenticated' && session?.user.role !== 'admin')) {
    return <p>Loading...</p>; // Show a loading message while redirecting
  }

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="bg-[#3E3B64] p-4 rounded-lg">
        <ManageUser />
      </div>
    </div>
  );
};

export default User;

