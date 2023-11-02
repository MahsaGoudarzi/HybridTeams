import { useState, useEffect } from "react";
import HButton from "@/components/HButton";
import { PostData } from "@/type/post";
import { FormEvent } from "react";
import { useRouter } from "next/router";
import HLoading from "@/components/HLoading";
type SuccessState = boolean | undefined | null;
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
export default function EditForm(props: any) {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  
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

          setTitle(data.title);
          setBody(data.body);
        })
        .catch((error) => {
          console.error("Error loading post:", error);
          setIsLoading(false);
        });
    }
  }, [id]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSuccess, setIsSuccess] = useState<SuccessState>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      title,
      body,
    };

    try {
      const response = await fetch(
        `${publicRuntimeConfig.BASE_URL}/posts/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(postData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.error("Error creating a new post.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) return <HLoading />;
  return (
    <div>
      {isSuccess === false ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-bold">Ops, Error !</span> Something went wrong,
          try again please!
        </div>
      ) : (
        isSuccess === true && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-bold">Success !</span> You updated your form
            successfully
          </div>
        )
      )}

      <h1 className="text-xl text-gray-400 mb-4">Edit post</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title:
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Body:
          </label>

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>

        <div>
          <HButton bgCustom="bg-blue-400" type="submit">
            Submit
          </HButton>
        </div>
      </form>
    </div>
  );
}
