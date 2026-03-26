class CreateComments < ActiveRecord::Migration[8.1]
  def change
    create_table :comments do |t|
      t.string :commenter
      t.text :body
      t.references :article, null: false

      t.timestamps
    end
  end
end
