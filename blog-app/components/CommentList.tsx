import { Comment } from "@/app/types/Comment";

export default function CommentList({ comments }: { comments: Comment[] }) {
    if (!comments || comments.length === 0) {
        return (
            <div className="mt-8 text-center py-8">
                <p className="text-text-muted">No comments yet. Be the first to share your thoughts!</p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
                Comments ({comments.length})
            </h2>
            <div className="space-y-3">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-surface border border-border rounded-lg p-4 hover:border-border-focus/30 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center">
                                <span className="text-xs font-semibold text-primary">
                                    {comment.commenter.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-sm font-medium text-text-primary">
                                {comment.commenter}
                            </span>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed pl-9">
                            {comment.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
