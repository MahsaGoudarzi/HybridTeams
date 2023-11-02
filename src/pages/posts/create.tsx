import PostCreate from "@/components/post/Create";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function CreatePostPage(props: any) {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <PostCreate />
      </div>
    );
  } else {
    return (
      <div className="flex h-full w-full justify-center text-center align-middle">
        You should
        <span className="text-blue-400 mx-2 cursor-pointer font-bold" onClick={() => signIn()}>Login</span>
        to access to this page
      </div>
    );
  }
}
