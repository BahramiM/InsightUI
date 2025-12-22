import TitleBar from "@/components/shared/TitleBar/TitleBar";
import { CreatePostForm } from "@/features/posts/components/forms/CreatePostForm";

export default async function NewPost() {
  return (
    <div>
      <TitleBar title="New Post" />
      <CreatePostForm />
    </div>
  );
}
