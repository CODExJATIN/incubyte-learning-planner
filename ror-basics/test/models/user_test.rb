require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should have many articles" do
    user = users(:alice)
    assert_respond_to user, :articles
    assert_includes user.articles, articles(:rails_article)
  end

  test "should validate presence of email" do
    user = User.new(email: nil, password: "password123")
    assert_not user.valid?
    assert_includes user.errors[:email], "can't be blank"
  end

  test "should validate uniqueness of email" do
    user = User.new(email: users(:alice).email, password: "password123")
    assert_not user.valid?
    assert_includes user.errors[:email], "has already been taken"
  end

  test "should nullify articles when user is destroyed" do
    user = users(:alice)
    article = articles(:rails_article)
    assert_equal user, article.user

    user.destroy
    article.reload
    assert_nil article.user_id
  end
end
