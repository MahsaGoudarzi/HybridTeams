import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <p className="mb-6 text-lg font-semibold">
          ⚠️ Unfortunately, The API which you delivered to me, has error 500,
          and due to the lack of time, I went with some mock, hope it works well
          for you
        </p>

        <p className="text-sm text-gray-500 mb-1">
          This is home page which it has nothing to show 🥱
        </p>

        <p className="text-sm text-gray-300 mb-2">
          Would you like to see more?
        </p>

        <p>
          Click on
          <Link href="/posts" className="text-pink-600 font-bold px-3 bg-pink-100 rounded-full opacity-90 mx-1">
            Me
          </Link>
        </p>
      </div>
    </>
  );
}
