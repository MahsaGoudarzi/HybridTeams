import { useRouter } from "next/router";
import Post from "@/components/post";
export default function SinglePostPage(props: any) {
  const router = useRouter();
  const { id } = router.query;

  return <Post/>;
}
