require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @article = articles(:rails_article)
  end

  # === Index with Pagination ===

  test "should get index with pagination" do
    get articles_url, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    assert json.key?("articles")
    assert json.key?("pagination")
    assert json["pagination"]["current_page"] == 1
    assert json["pagination"]["per_page"] == 10
    assert json["pagination"]["total_count"].is_a?(Integer)
    assert json["pagination"]["total_pages"].is_a?(Integer)
  end

  test "should paginate with custom page and per_page" do
    get articles_url, params: { page: 1, per_page: 2 }, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    assert json["pagination"]["per_page"] == 2
    assert json["articles"].length <= 2
  end

  test "should return empty articles for out of range page" do
    get articles_url, params: { page: 999 }, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    assert_equal [], json["articles"]
  end

  # === Index with Search ===

  test "should search articles by title" do
    get articles_url, params: { q: "Rails" }, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    titles = json["articles"].map { |a| a["title"] }
    assert_includes titles, "Getting Started with Rails"
    assert_not_includes titles, "React Fundamentals"
  end

  test "should search articles by body content" do
    get articles_url, params: { q: "JavaScript library" }, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    titles = json["articles"].map { |a| a["title"] }
    assert_includes titles, "React Fundamentals"
  end

  test "should search articles by tag name" do
    get articles_url, params: { q: "testing" }, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    titles = json["articles"].map { |a| a["title"] }
    assert_includes titles, "Testing Best Practices"
  end

  test "should filter articles by category" do
    get articles_url, params: { category_id: categories(:ruby_lang).id }, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    json["articles"].each do |article|
      assert_equal categories(:ruby_lang).id.to_s, article["category"]["id"]
    end
  end

  test "should filter articles by tag" do
    get articles_url, params: { tag: "rails" }, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    assert json["articles"].length >= 1

    json["articles"].each do |article|
      tag_names = article["tags"].map { |t| t["name"] }
      assert tag_names.any? { |n| n.downcase.include?("rails") }
    end
  end

  # === Show ===

  test "should show article with all associations" do
    get article_url(@article), as: :json
    assert_response :success

    json = JSON.parse(response.body)
    assert_equal @article.title, json["title"]
    assert_equal @article.body, json["body"]
    assert json.key?("user")
    assert json.key?("category")
    assert json.key?("tags")
    assert json.key?("comments")
    assert json["tags"].is_a?(Array)
    assert json["comments"].is_a?(Array)
  end

  # === Create ===

  test "should create article" do
    assert_difference("Article.count") do
      post articles_url, params: {
        article: { title: "New Article", body: "New body", user_id: users(:alice).id }
      }, as: :json
    end

    assert_response :created
  end

  test "should create article with tags" do
    assert_difference("Article.count", 1) do
      assert_difference("ArticleTag.count", 3) do
        post articles_url, params: {
          article: {
            title: "Tagged Article",
            body: "Body with tags",
            tag_names: "rails,ruby,beginner"
          }
        }, as: :json
      end
    end

    assert_response :created
    json = JSON.parse(response.body)
    tag_names = json["tags"].map { |t| t["name"] }
    assert_includes tag_names, "rails"
    assert_includes tag_names, "ruby"
    assert_includes tag_names, "beginner"
  end

  test "should not create article without title" do
    assert_no_difference("Article.count") do
      post articles_url, params: {
        article: { title: "", body: "Body" }
      }, as: :json
    end

    assert_response :unprocessable_entity
  end

  # === Update ===

  test "should update article" do
    patch article_url(@article), params: {
      article: { title: "Updated Title" }
    }, as: :json

    assert_response :ok
    @article.reload
    assert_equal "Updated Title", @article.title
  end

  test "should update article tags" do
    patch article_url(@article), params: {
      article: { tag_names: "javascript,testing" }
    }, as: :json

    assert_response :ok
    json = JSON.parse(response.body)
    tag_names = json["tags"].map { |t| t["name"] }
    assert_includes tag_names, "javascript"
    assert_includes tag_names, "testing"
  end

  # === Destroy ===

  test "should destroy article" do
    assert_difference("Article.count", -1) do
      delete article_url(@article), as: :json
    end

    assert_response :ok
  end

  # === Eager Loading / N+1 ===

  test "index should include user data" do
    get articles_url, as: :json
    json = JSON.parse(response.body)

    article_with_user = json["articles"].find { |a| a["user"].present? }
    assert_not_nil article_with_user
    assert article_with_user["user"].key?("email")
  end

  test "index should include category data" do
    get articles_url, as: :json
    json = JSON.parse(response.body)

    article_with_category = json["articles"].find { |a| a["category"].present? }
    assert_not_nil article_with_category
    assert article_with_category["category"].key?("name")
  end

  test "index should include tags data" do
    get articles_url, as: :json
    json = JSON.parse(response.body)

    article_with_tags = json["articles"].find { |a| a["tags"].any? }
    assert_not_nil article_with_tags
    assert article_with_tags["tags"].first.key?("name")
  end
end
