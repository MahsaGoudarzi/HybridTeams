import { useState } from "react";
import HButton from "@/components/HButton";
import { FormEvent } from "react";
import getConfig from 'next/config';
type SuccessState = boolean | undefined | null;
const { publicRuntimeConfig } = getConfig();
export default function CreateForm() {
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
        `${publicRuntimeConfig.BASE_URL}/posts`,
        {
          method: "POST",
          body: JSON.stringify(postData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setIsSuccess(true);
      } else {
        console.error("Error creating a new post.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            <span className="font-bold">Success !</span> You submitted your form
            successfully
          </div>
        )
      )}

      <h1 className="text-xl text-gray-400 mb-4">Create a New Post</h1>

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
