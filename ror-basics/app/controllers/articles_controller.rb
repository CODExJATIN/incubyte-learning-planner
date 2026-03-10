class ArticlesController < ApplicationController
  before_action :set_article, only: %i[ show edit update destroy ]

  # GET /articles or /articles.json
  def index
    @articles = Article.all.includes(:comments)
    render json: @articles.map { |a| article_as_json(a) }
  end

  # GET /articles/1 or /articles/1.json
  def show
    render json: article_as_json(@article)
  end

  # GET /articles/new
  def new
    @article = Article.new
  end

  # GET /articles/1/edit
  def edit
  end

  # POST /articles or /articles.json
  def create
    @article = Article.new(article_params)

    respond_to do |format|
      if @article.save
        format.html { redirect_to @article, notice: "Article was successfully created." }
        format.json { render json: article_as_json(@article), status: :created }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /articles/1 or /articles/1.json
  def update
    respond_to do |format|
      if @article.update(article_params)
        format.html { redirect_to @article, notice: "Article was successfully updated.", status: :see_other }
        format.json { render json: article_as_json(@article), status: :ok }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/1 or /articles/1.json
  def destroy
    @article.destroy!

    respond_to do |format|
      format.html { redirect_to articles_path, notice: "Article was successfully destroyed.", status: :see_other }
      format.json { render json: { message: "Article deleted successfully" }, status: :ok }
    end
  end

  private
    def set_article
      @article = Article.find(params[:id])
    end

    def article_params
      params.require(:article).permit(:title, :body)
    end

    # Serialize an article with its comments mapped to the frontend's Comment shape.
    # The frontend uses `id` as String and `postId` instead of Rails' `article_id`.
    def article_as_json(article)
      {
        id: article.id.to_s,
        title: article.title,
        body: article.body,
        comments: article.comments.map do |c|
          {
            id: c.id.to_s,
            commenter: c.commenter,
            body: c.body,
            postId: c.article_id.to_s
          }
        end
      }
    end
end
