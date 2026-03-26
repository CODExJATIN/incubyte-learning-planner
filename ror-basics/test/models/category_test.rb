require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  # === Validations ===

  test "should validate presence of name" do
    category = Category.new(name: nil)
    assert_not category.valid?
    assert_includes category.errors[:name], "can't be blank"
  end

  test "should save valid category" do
    category = Category.new(name: "New Category")
    assert category.valid?
  end

  # === Self-Referential Associations ===

  test "should belong to parent category (optional)" do
    programming = categories(:programming)
    assert_equal categories(:technology), programming.parent
  end

  test "root category should have no parent" do
    technology = categories(:technology)
    assert_nil technology.parent
  end

  test "should have many subcategories" do
    technology = categories(:technology)
    assert_includes technology.subcategories, categories(:programming)
  end

  test "programming should have ruby and javascript as subcategories" do
    programming = categories(:programming)
    assert_includes programming.subcategories, categories(:ruby_lang)
    assert_includes programming.subcategories, categories(:javascript_lang)
  end

  # === Tree Navigation Methods ===

  test "ancestors should return all ancestors up to root" do
    ruby = categories(:ruby_lang)
    ancestors = ruby.ancestors
    assert_equal 2, ancestors.length
    assert_equal categories(:programming), ancestors.first
    assert_equal categories(:technology), ancestors.last
  end

  test "ancestors of root should be empty" do
    technology = categories(:technology)
    assert_empty technology.ancestors
  end

  test "path should return full path from root to node" do
    ruby = categories(:ruby_lang)
    assert_equal "Technology > Programming > Ruby", ruby.path
  end

  test "path of root should be just the name" do
    technology = categories(:technology)
    assert_equal "Technology", technology.path
  end

  test "descendants should return all nested children" do
    technology = categories(:technology)
    descendants = technology.descendants
    names = descendants.map(&:name)
    assert_includes names, "Programming"
    assert_includes names, "Ruby"
    assert_includes names, "JavaScript"
  end

  test "descendants of leaf should be empty" do
    ruby = categories(:ruby_lang)
    assert_empty ruby.descendants
  end

  test "root? should return true for root categories" do
    assert categories(:technology).root?
    assert categories(:lifestyle).root?
  end

  test "root? should return false for child categories" do
    assert_not categories(:programming).root?
    assert_not categories(:ruby_lang).root?
  end

  test "leaf? should return true for leaf categories" do
    assert categories(:ruby_lang).leaf?
    assert categories(:javascript_lang).leaf?
  end

  test "leaf? should return false for parent categories" do
    assert_not categories(:technology).leaf?
    assert_not categories(:programming).leaf?
  end

  # === Article Association ===

  test "should have many articles" do
    ruby = categories(:ruby_lang)
    assert_includes ruby.articles, articles(:rails_article)
  end

  test "should nullify articles when category is destroyed" do
    ruby = categories(:ruby_lang)
    article = articles(:rails_article)
    assert_equal ruby, article.category

    ruby.destroy
    article.reload
    assert_nil article.category_id
  end

  # === Subcategory Behavior on Destroy ===

  test "should nullify subcategories parent_id when category is destroyed" do
    programming = categories(:programming)
    ruby = categories(:ruby_lang)

    programming.destroy
    ruby.reload
    assert_nil ruby.parent_id
  end
end
