require "test_helper"

class ArticleTagTest < ActiveSupport::TestCase
  test "should belong to article" do
    article_tag = article_tags(:rails_article_rails_tag)
    assert_equal articles(:rails_article), article_tag.article
  end

  test "should belong to tag" do
    article_tag = article_tags(:rails_article_rails_tag)
    assert_equal tags(:rails), article_tag.tag
  end

  test "should not allow duplicate article-tag pairs" do
    duplicate = ArticleTag.new(
      article: articles(:rails_article),
      tag: tags(:rails)
    )
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:tag_id], "has already been added to this article"
  end

  test "should allow same tag on different articles" do
    article_tag = ArticleTag.new(
      article: articles(:react_article),
      tag: tags(:rails)
    )
    assert article_tag.valid?
  end
end
