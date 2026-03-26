class ArticlesController < ApplicationController
  before_action :set_article, only: %i[ show edit update destroy ]

  # GET /articles or /articles.json
  # Supports pagination (?page=1&per_page=10) and search (?q=search_term)
  def index
    @articles = Article.includes(:comments, :tags, :user, :category)

    # Search functionality
    if params[:q].present?
      @articles = @articles.search(params[:q])
    end

    # Filter by category
    if params[:category_id].present?
      @articles = @articles.where(category_id: params[:category_id])
    end

    # Filter by tag
    if params[:tag].present?
      @articles = @articles.joins(:tags).where("tags.name ILIKE ?", "%#{params[:tag]}%").distinct
    end

    # Pagination
    @articles = @articles.page(params[:page]).per(params[:per_page] || 10)

    render json: {
      articles: @articles.map { |a| article_as_json(a) },
      pagination: {
        current_page: @articles.current_page,
        total_pages: @articles.total_pages,
        total_count: @articles.total_count,
        per_page: @articles.limit_value
      }
    }
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

    # Handle tag_names param: find or create tags and assign them
    if params[:article][:tag_names].present?
      tag_names = params[:article][:tag_names]
      tag_names = tag_names.split(",").map(&:strip) if tag_names.is_a?(String)
      @article.tags = tag_names.map { |name| Tag.find_or_create_by!(name: name.downcase) }
    end

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
    # Handle tag_names param
    if params[:article][:tag_names].present?
      tag_names = params[:article][:tag_names]
      tag_names = tag_names.split(",").map(&:strip) if tag_names.is_a?(String)
      @article.tags = tag_names.map { |name| Tag.find_or_create_by!(name: name.downcase) }
    end

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
      @article = Article.includes(:comments, :tags, :user, :category).find(params[:id])
    end

    def article_params
      params.require(:article).permit(:title, :body, :user_id, :category_id)
    end

    # Serialize an article with all associations
    def article_as_json(article)
      {
        id: article.id.to_s,
        title: article.title,
        body: article.body,
        user: article.user ? { id: article.user.id.to_s, email: article.user.email } : nil,
        category: article.category ? { id: article.category.id.to_s, name: article.category.name } : nil,
        tags: article.tags.map { |t| { id: t.id.to_s, name: t.name } },
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
