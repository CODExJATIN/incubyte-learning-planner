class Article < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :category, optional: true

  has_many :comments, dependent: :destroy
  has_many :article_tags, dependent: :destroy
  has_many :tags, through: :article_tags

  validates :title, presence: true
  validates :body, presence: true

  # Scopes for search
  scope :search_by_title, ->(query) { where("title ILIKE ?", "%#{query}%") }
  scope :search_by_content, ->(query) { where("body ILIKE ?", "%#{query}%") }
  scope :search_by_tag, ->(tag_name) {
    joins(:tags).where("tags.name ILIKE ?", "%#{tag_name}%")
  }
  scope :search, ->(query) {
    left_joins(:tags)
      .where("articles.title ILIKE :q OR articles.body ILIKE :q OR tags.name ILIKE :q", q: "%#{query}%")
      .distinct
  }
end
