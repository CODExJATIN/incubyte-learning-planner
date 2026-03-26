require "test_helper"

class TagTest < ActiveSupport::TestCase
  test "should validate presence of name" do
    tag = Tag.new(name: nil)
    assert_not tag.valid?
    assert_includes tag.errors[:name], "can't be blank"
  end

  test "should validate uniqueness of name (case insensitive)" do
    Tag.create!(name: "uniquetag")
    duplicate = Tag.new(name: "UniqueTag")
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:name], "has already been taken"
  end

  test "should have many articles through article_tags" do
    rails_tag = tags(:rails)
    assert_respond_to rails_tag, :articles
    assert_includes rails_tag.articles, articles(:rails_article)
    assert_includes rails_tag.articles, articles(:testing_article)
  end

  test "should have many article_tags" do
    rails_tag = tags(:rails)
    assert_respond_to rails_tag, :article_tags
    assert rails_tag.article_tags.count >= 1
  end

  test "should destroy article_tags when tag is destroyed" do
    tag = tags(:rails)
    article_tag_count = tag.article_tags.count
    assert article_tag_count > 0

    assert_difference("ArticleTag.count", -article_tag_count) do
      tag.destroy
    end
  end

  test "should not destroy articles when tag is destroyed" do
    tag = tags(:rails)
    assert_no_difference("Article.count") do
      tag.destroy
    end
  end
end
