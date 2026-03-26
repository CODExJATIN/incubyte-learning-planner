require "test_helper"

class CommentTest < ActiveSupport::TestCase
  test "should belong to article" do
    comment = comments(:first_comment)
    assert_equal articles(:rails_article), comment.article
  end

  test "should not be valid without an article" do
    comment = Comment.new(commenter: "Test", body: "Test comment")
    assert_not comment.valid?
  end
end
