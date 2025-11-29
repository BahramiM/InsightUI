import { CreatePostForm } from "@/features/posts/components/forms/CreatePostForm";

export default async function NewPost() {
  return (
    <div>
      <div className="my-8">New Post</div>
      <CreatePostForm />
    </div>
  );
}
