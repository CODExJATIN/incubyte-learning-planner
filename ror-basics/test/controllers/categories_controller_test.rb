require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @category = categories(:technology)
  end

  # === Index ===

  test "should get index" do
    get categories_url, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    assert json.is_a?(Array)
    assert json.length >= 1
  end

  test "should filter root categories only" do
    get categories_url, params: { roots_only: "true" }, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    json.each do |category|
      assert_nil category["parent_id"]
      assert category["is_root"]
    end
  end

  test "should include tree metadata in index" do
    get categories_url, as: :json
    json = JSON.parse(response.body)

    category = json.find { |c| c["name"] == "Technology" }
    assert_not_nil category
    assert category.key?("is_root")
    assert category.key?("is_leaf")
    assert category.key?("path")
    assert category.key?("subcategories_count")
  end

  # === Show ===

  test "should show category with articles" do
    ruby = categories(:ruby_lang)
    get category_url(ruby), as: :json
    assert_response :success

    json = JSON.parse(response.body)
    assert_equal "Ruby", json["name"]
    assert json.key?("articles")
    assert json["articles"].is_a?(Array)
  end

  # === Create ===

  test "should create root category" do
    assert_difference("Category.count") do
      post categories_url, params: {
        category: { name: "Science" }
      }, as: :json
    end

    assert_response :created
    json = JSON.parse(response.body)
    assert_equal "Science", json["name"]
    assert json["is_root"]
  end

  test "should create child category" do
    assert_difference("Category.count") do
      post categories_url, params: {
        category: { name: "Python", parent_id: categories(:programming).id }
      }, as: :json
    end

    assert_response :created
    json = JSON.parse(response.body)
    assert_equal categories(:programming).id.to_s, json["parent_id"]
  end

  test "should not create category without name" do
    assert_no_difference("Category.count") do
      post categories_url, params: {
        category: { name: "" }
      }, as: :json
    end

    assert_response :unprocessable_entity
  end

  # === Update ===

  test "should update category" do
    patch category_url(@category), params: {
      category: { name: "Tech" }
    }, as: :json

    assert_response :ok
    @category.reload
    assert_equal "Tech", @category.name
  end

  test "should update category parent" do
    ruby = categories(:ruby_lang)
    patch category_url(ruby), params: {
      category: { parent_id: categories(:technology).id }
    }, as: :json

    assert_response :ok
    ruby.reload
    assert_equal categories(:technology), ruby.parent
  end

  # === Destroy ===

  test "should destroy category" do
    # Create a leaf category for safe deletion
    leaf = Category.create!(name: "Temporary")

    assert_difference("Category.count", -1) do
      delete category_url(leaf), as: :json
    end

    assert_response :ok
  end

  # === Tree ===

  test "should get category tree" do
    get tree_category_url(@category), as: :json
    assert_response :success

    json = JSON.parse(response.body)
    assert_equal "Technology", json["name"]
    assert json.key?("children")
    assert json["children"].is_a?(Array)

    # Programming should be a child
    programming = json["children"].find { |c| c["name"] == "Programming" }
    assert_not_nil programming

    # Ruby should be a grandchild
    ruby = programming["children"].find { |c| c["name"] == "Ruby" }
    assert_not_nil ruby
  end
end
