class AddCategoryIdToArticles < ActiveRecord::Migration[8.1]
  def change
    add_reference :articles, :category, null: true
  end
end
