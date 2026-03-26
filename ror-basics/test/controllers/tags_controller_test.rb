require "test_helper"

class TagsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tag = tags(:rails)
  end

  # === Index ===

  test "should get index" do
    get tags_url, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    assert json.is_a?(Array)
    assert json.length >= 1
  end

  test "should get index with article counts" do
    get tags_url, params: { with_counts: "true" }, as: :json
    assert_response :success

    json = JSON.parse(response.body)
    rails_tag = json.find { |t| t["name"] == "rails" }
    assert_not_nil rails_tag
    assert rails_tag["articles_count"] >= 1
  end

  # === Show ===

  test "should show tag with articles" do
    get tag_url(@tag), as: :json
    assert_response :success

    json = JSON.parse(response.body)
    assert_equal "rails", json["name"]
    assert json.key?("articles")
    assert json["articles"].is_a?(Array)
    assert json["articles"].length >= 1
  end

  # === Create ===

  test "should create tag" do
    assert_difference("Tag.count") do
      post tags_url, params: { tag: { name: "newtag" } }, as: :json
    end

    assert_response :created
    json = JSON.parse(response.body)
    assert_equal "newtag", json["name"]
  end

  test "should not create duplicate tag" do
    assert_no_difference("Tag.count") do
      post tags_url, params: { tag: { name: "rails" } }, as: :json
    end

    assert_response :unprocessable_entity
  end

  test "should not create tag without name" do
    assert_no_difference("Tag.count") do
      post tags_url, params: { tag: { name: "" } }, as: :json
    end

    assert_response :unprocessable_entity
  end

  # === Update ===

  test "should update tag" do
    patch tag_url(@tag), params: {
      tag: { name: "rails-framework" }
    }, as: :json

    assert_response :ok
    @tag.reload
    assert_equal "rails-framework", @tag.name
  end

  # === Destroy ===

  test "should destroy tag" do
    tag = Tag.create!(name: "disposable")

    assert_difference("Tag.count", -1) do
      delete tag_url(tag), as: :json
    end

    assert_response :ok
  end
end
