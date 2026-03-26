class TagsController < ApplicationController
  before_action :set_tag, only: %i[ show update destroy ]

  # GET /tags
  def index
    @tags = Tag.all.order(:name)

    # Optionally include article counts
    if params[:with_counts] == "true"
      @tags = Tag.left_joins(:article_tags)
                 .select("tags.*, COUNT(article_tags.id) AS articles_count")
                 .group("tags.id")
                 .order(:name)
    end

    render json: @tags.map { |t| tag_as_json(t) }
  end

  # GET /tags/1
  def show
    render json: tag_as_json(@tag, include_articles: true)
  end

  # POST /tags
  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render json: tag_as_json(@tag), status: :created
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tags/1
  def update
    if @tag.update(tag_params)
      render json: tag_as_json(@tag), status: :ok
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tags/1
  def destroy
    @tag.destroy!
    render json: { message: "Tag deleted successfully" }, status: :ok
  end

  private
    def set_tag
      @tag = Tag.find(params[:id])
    end

    def tag_params
      params.require(:tag).permit(:name)
    end

    def tag_as_json(tag, include_articles: false)
      json = {
        id: tag.id.to_s,
        name: tag.name,
        articles_count: tag.respond_to?(:articles_count) ? tag.articles_count : tag.articles.count
      }

      if include_articles
        json[:articles] = tag.articles.includes(:user, :category).map do |a|
          { id: a.id.to_s, title: a.title }
        end
      end

      json
    end
end
