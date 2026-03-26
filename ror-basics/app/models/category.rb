class Category < ApplicationRecord
  # Self-referential association for tree structure
  belongs_to :parent, class_name: "Category", optional: true
  has_many :subcategories, class_name: "Category", foreign_key: "parent_id", dependent: :nullify

  has_many :articles, dependent: :nullify

  validates :name, presence: true

  # Returns all ancestors up to the root
  def ancestors
    node = self
    ancestors_list = []
    while node.parent
      ancestors_list << node.parent
      node = node.parent
    end
    ancestors_list
  end

  # Returns the full path from root to this category
  def path
    (ancestors.reverse << self).map(&:name).join(" > ")
  end

  # Recursively returns all descendants
  def descendants
    subcategories.flat_map { |child| [ child ] + child.descendants }
  end

  # Check if this is a root category
  def root?
    parent_id.nil?
  end

  # Check if this is a leaf category (no children)
  def leaf?
    subcategories.empty?
  end
end
