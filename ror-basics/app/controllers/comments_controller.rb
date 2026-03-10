class CommentsController < ApplicationController
  before_action :set_article

  # POST /articles/:article_id/comments
  def create
    @comment = @article.comments.new(comment_params)

    respond_to do |format|
      if @comment.save
        format.html { redirect_to article_path(@article) }
        format.json { render json: comment_as_json(@comment), status: :created }
      else
        format.html { redirect_to article_path(@article) }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/:article_id/comments/:id
  def destroy
    @comment = @article.comments.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to article_path(@article) }
      format.json { render json: { message: "Comment deleted successfully" }, status: :ok }
    end
  end

  private
    def set_article
      @article = Article.find(params[:article_id])
    end

    def comment_params
      params.require(:comment).permit(:commenter, :body)
    end

    # Map Rails comment fields to the shape the Next.js frontend expects.
    # The frontend uses `postId` instead of `article_id`.
    def comment_as_json(comment)
      {
        id: comment.id.to_s,
        commenter: comment.commenter,
        body: comment.body,
        postId: comment.article_id.to_s
      }
    end
end
