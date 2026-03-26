class CategoriesController < ApplicationController
  before_action :set_category, only: %i[ show update destroy ]

  # GET /categories
  # Returns all categories as a tree structure
  def index
    @categories = Category.includes(:subcategories, :parent).all

    if params[:roots_only] == "true"
      @categories = @categories.where(parent_id: nil)
    end

    render json: @categories.map { |c| category_as_json(c) }
  end

  # GET /categories/1
  def show
    render json: category_as_json(@category, include_articles: true)
  end

  # POST /categories
  def create
    @category = Category.new(category_params)

    if @category.save
      render json: category_as_json(@category), status: :created
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories/1
  def update
    if @category.update(category_params)
      render json: category_as_json(@category), status: :ok
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1
  def destroy
    @category.destroy!
    render json: { message: "Category deleted successfully" }, status: :ok
  end

  # GET /categories/1/tree
  # Returns the full subtree of a category
  def tree
    @category = Category.find(params[:id])
    render json: category_tree_json(@category)
  end

  private
    def set_category
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name, :parent_id)
    end

    def category_as_json(category, include_articles: false)
      json = {
        id: category.id.to_s,
        name: category.name,
        parent_id: category.parent_id&.to_s,
        parent_name: category.parent&.name,
        path: category.path,
        is_root: category.root?,
        is_leaf: category.leaf?,
        subcategories_count: category.subcategories.size
      }

      if include_articles
        json[:articles] = category.articles.includes(:tags, :user).map do |a|
          { id: a.id.to_s, title: a.title }
        end
      end

      json
    end

    def category_tree_json(category)
      {
        id: category.id.to_s,
        name: category.name,
        children: category.subcategories.map { |child| category_tree_json(child) }
      }
    end
end
