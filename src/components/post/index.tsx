import { useState, useEffect } from "react";
import Image from "next/image";
import Router from "next/router";
import HLoading from "@/components/HLoading";
import IconEdit from "@/components/icon/Edit";
import IconDelete from "@/components/icon/Delete";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PostData } from "@/type/post";
import { useRouter } from "next/router";
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [laodedPost, setLaodedPost] = useState<PostData | null>(null);
  useEffect(() => {
    if (id) {
      fetch(`${publicRuntimeConfig.BASE_URL}/posts/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data: PostData) => {
          setIsLoading(false);
          setLaodedPost(data);
        })
        .catch((error) => {
          console.error("Error loading post:", error);
          setIsLoading(false);
        });
    }
  }, [id]);

  const deletePostHandler = () => {
    if (laodedPost) {
      fetch(`${publicRuntimeConfig.BASE_URL}/posts/${laodedPost?.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 200) {
            window.alert("Post deleted successfully");
            Router.replace("/posts");
          } else {
            console.error("Failed to delete post");
          }
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };

  if (!id) {
    return null;
  }

  if (isLoading) {
    return (
      <div>
        <HLoading />
      </div>
    );
  }

  if (laodedPost) {
    return (
      <div className="overflox-x-hidden">
        <div className="xl:min-h-[400px] min-h-[300px]">
          <Image
            src="https://flowbite.com/docs/images/blog/image-1.jpg"
            alt="Template"
            width={900}
            height={300}
            className=" w-full xl:min-h-[400px] min-h-[300px] xl:max-h-[400px] max-h-[300px] object-cover rounded-lg"
          />
        </div>

        <div className="bg-gray-900 -mt-32 relative z-10 p-10 rounded-lg shadow-lg shadow-gray-800 w-[80%] mx-auto ">
          <div className=" flex justify-between">
            <h5 className="text-white font-bold text-2xl tracking-tight mb-8">
              {laodedPost.title}
            </h5>
            
            {status === "authenticated" && (
              <div className="flex gap-3">
                <Link href={`/posts/update/${laodedPost.id}`}>
                  <IconEdit></IconEdit>
                </Link>

                <div
                  className="cursor-pointer"
                  onClick={() => deletePostHandler()}
                >
                  <IconDelete></IconDelete>
                </div>
              </div>
            )}
          </div>

          <p className="font-normal text-gray-300 mb-3">
            {Array(11)
              .fill(laodedPost.body)
              .map((content, index) => (
                <span key={index}>{content}</span>
              ))}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Post not found</h1>
    </div>
  );
}
