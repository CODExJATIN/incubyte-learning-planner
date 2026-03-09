import { Comment } from "@/app/types/Comment";

export default function CommentList({ comments }: { comments: Comment[] }) {
    if (!comments || comments.length === 0) {
        return <p className="p-4 text-gray-500">No comments yet.</p>;
    }

    return (
        <div className="p-4 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Comments</h2>
            {comments.map((comment) => (
                <div key={comment.id} className="border p-3 rounded-md">
                    <p className="font-medium">{comment.commenter}</p>
                    <p className="text-gray-600">{comment.body}</p>
                </div>
            ))}
        </div>
    );
}
