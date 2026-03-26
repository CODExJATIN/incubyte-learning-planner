require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  # === Validations ===

  test "should validate presence of title" do
    article = Article.new(body: "Some body")
    assert_not article.valid?
    assert_includes article.errors[:title], "can't be blank"
  end

  test "should validate presence of body" do
    article = Article.new(title: "Some title")
    assert_not article.valid?
    assert_includes article.errors[:body], "can't be blank"
  end

  test "should save valid article" do
    article = Article.new(title: "Test", body: "Test body")
    assert article.valid?
  end

  # === Associations ===

  test "should belong to user (optional)" do
    article = articles(:rails_article)
    assert_equal users(:alice), article.user
  end

  test "should belong to category (optional)" do
    article = articles(:rails_article)
    assert_equal categories(:ruby_lang), article.category
  end

  test "should have many comments" do
    article = articles(:rails_article)
    assert_respond_to article, :comments
    assert article.comments.count >= 1
  end

  test "should destroy comments when article is destroyed" do
    article = articles(:rails_article)
    comment_count = article.comments.count
    assert comment_count > 0

    assert_difference("Comment.count", -comment_count) do
      article.destroy
    end
  end

  test "should have many tags through article_tags" do
    article = articles(:rails_article)
    assert_respond_to article, :tags
    assert_includes article.tags, tags(:rails)
    assert_includes article.tags, tags(:ruby)
  end

  test "should have many article_tags" do
    article = articles(:rails_article)
    assert_respond_to article, :article_tags
    assert article.article_tags.count >= 1
  end

  test "should destroy article_tags when article is destroyed" do
    article = articles(:rails_article)
    article_tag_count = article.article_tags.count
    assert article_tag_count > 0

    assert_difference("ArticleTag.count", -article_tag_count) do
      article.destroy
    end
  end

  # === Search Scopes ===

  test "search_by_title should find articles by title" do
    results = Article.search_by_title("Rails")
    assert_includes results, articles(:rails_article)
    assert_not_includes results, articles(:react_article)
  end

  test "search_by_title should be case insensitive" do
    results = Article.search_by_title("rails")
    assert_includes results, articles(:rails_article)
  end

  test "search_by_content should find articles by body" do
    results = Article.search_by_content("JavaScript library")
    assert_includes results, articles(:react_article)
    assert_not_includes results, articles(:rails_article)
  end

  test "search_by_tag should find articles by tag name" do
    results = Article.search_by_tag("rails")
    assert_includes results, articles(:rails_article)
    assert_includes results, articles(:testing_article)
    assert_not_includes results, articles(:react_article)
  end

  test "search scope should find across title, body and tags" do
    # Search by title
    results = Article.search("Rails")
    assert_includes results, articles(:rails_article)

    # Search by body content
    results = Article.search("JavaScript library")
    assert_includes results, articles(:react_article)

    # Search by tag name
    results = Article.search("testing")
    assert_includes results, articles(:testing_article)
  end

  test "search scope should return distinct results" do
    # An article matching both title and tag should appear only once
    results = Article.search("rails")
    assert_equal results.count, results.uniq.count
  end

  # === N+1 Query Optimization ===

  test "should eager load associations with includes" do
    # This tests that includes works without errors
    articles = Article.includes(:comments, :tags, :user, :category).all
    assert articles.any?

    # Access associations to ensure they're loaded
    articles.each do |article|
      article.comments.to_a
      article.tags.to_a
      article.user
      article.category
    end
  end
end
