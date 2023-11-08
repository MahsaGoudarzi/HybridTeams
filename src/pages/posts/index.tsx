import { useState, useEffect } from "react";
import { FormEvent } from "react";
import Link from "next/link";
import PostCard from "@/components/post/Card";
import HButton from "@/components/HButton";
import HLoading from "@/components/HLoading";
import { PostData } from "@/type/post";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${publicRuntimeConfig.BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setLoadedPosts(data);
        setIsLoading(false);
      });
  }, []);

  const filteredPosts = loadedPosts.filter((post: PostData) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event: FormEvent<HTMLFormElement>) => {
    setSearchQuery((event.target as HTMLInputElement).value);
  };

  if (isLoading) return <HLoading />;
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold text-pink-500">Posts Page</h1>

        <div className="flex gap-4">
          <Link href="/posts/create">
            <HButton primary>Add New Post</HButton>
          </Link>
        </div>
      </div>

      <input
        required
        type="text"
        className="bg-gray-50 border my-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search posts"
        value={searchQuery}
        onChange={()=>{handleSearchInputChange}}
      />

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 flex-wrap">
        {filteredPosts.map((post: PostData) => (
          <Link
            className="inline-grid"
            key={post.id}
            href={`/posts/${post.id}`}
          >
            <PostCard id={post.id} title={post.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}
