class AddUserIdToArticles < ActiveRecord::Migration[8.1]
  def change
    add_reference :articles, :user, null: true
  end
end
