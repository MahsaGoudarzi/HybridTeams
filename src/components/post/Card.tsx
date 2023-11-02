import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import HButton from "@/components/HButton";

export default function Post(props: any) {
  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const randomNumber = getRandomNumber(1, 4);
  return (
    <div className="bg-gray-900 shadow-md border border-gray-200 rounded-lg mb-5 inline-grid">
      <div>
        <Image
          src={`https://flowbite.com/docs/images/blog/image-${randomNumber}.jpg`}
          alt="Template"
          width={400}
          height={200}
          loading="lazy"
          className="min-h-[200px] max-h-[200px] w-full object-cover rounded-t-lg"
        />

        <div className="p-5">
          <h5 className="text-gray-200 font-bold text-xl tracking-tight mb-2">
            {props.title}
          </h5>

          <p className="font-normal text-gray-700 mb-3">{props.body}</p>
        </div>
      </div>

      <Link href={`/posts/${props?.id}`} className="px-5 pb-5 self-end">
        <HButton bgCustom="bg-pink-100" textColorCustom="text-gray-600">
          Read more
        </HButton>
      </Link>
    </div>
  );
}
