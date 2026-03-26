# db/seeds.rb
# Seed data for blog app with relationships

puts "Cleaning database..."
ArticleTag.destroy_all
Comment.destroy_all
Article.destroy_all
Tag.destroy_all
Category.destroy_all
User.destroy_all

puts "Creating users..."
user1 = User.create!(email: "alice@example.com", password: "password123")
user2 = User.create!(email: "bob@example.com", password: "password123")
user3 = User.create!(email: "charlie@example.com", password: "password123")

puts "Creating category tree..."
tech = Category.create!(name: "Technology")
programming = Category.create!(name: "Programming", parent: tech)
ruby_cat = Category.create!(name: "Ruby", parent: programming)
javascript_cat = Category.create!(name: "JavaScript", parent: programming)
devops = Category.create!(name: "DevOps", parent: tech)

lifestyle = Category.create!(name: "Lifestyle")
travel = Category.create!(name: "Travel", parent: lifestyle)
food = Category.create!(name: "Food", parent: lifestyle)

puts "Creating tags..."
tags = %w[rails ruby javascript react testing api database docker devops beginner advanced].map do |name|
  Tag.create!(name: name)
end

puts "Creating articles with associations..."
articles_data = [
  {
    title: "Getting Started with Ruby on Rails",
    body: "Ruby on Rails is a powerful web framework that follows convention over configuration...",
    user: user1,
    category: ruby_cat,
    tag_names: %w[rails ruby beginner]
  },
  {
    title: "Advanced Active Record Queries",
    body: "Active Record provides a rich API for querying your database. Let's explore joins, includes, and more...",
    user: user1,
    category: ruby_cat,
    tag_names: %w[rails ruby database advanced]
  },
  {
    title: "React Fundamentals",
    body: "React is a JavaScript library for building user interfaces. Components are the building blocks...",
    user: user2,
    category: javascript_cat,
    tag_names: %w[javascript react beginner]
  },
  {
    title: "Building RESTful APIs with Rails",
    body: "REST is an architectural style for designing networked applications. Rails makes it easy to build APIs...",
    user: user2,
    category: ruby_cat,
    tag_names: %w[rails ruby api]
  },
  {
    title: "Docker for Developers",
    body: "Docker allows you to package applications and their dependencies into containers...",
    user: user3,
    category: devops,
    tag_names: %w[docker devops beginner]
  },
  {
    title: "Testing Rails Applications",
    body: "A comprehensive guide to testing your Rails applications with Minitest and RSpec...",
    user: user1,
    category: ruby_cat,
    tag_names: %w[rails ruby testing]
  },
  {
    title: "JavaScript ES6+ Features",
    body: "ES6 introduced many new features like arrow functions, destructuring, and template literals...",
    user: user3,
    category: javascript_cat,
    tag_names: %w[javascript beginner]
  },
  {
    title: "Database Design Best Practices",
    body: "Good database design is crucial for application performance. Learn about normalization, indexing...",
    user: user2,
    category: programming,
    tag_names: %w[database advanced]
  }
]

articles_data.each do |data|
  article = Article.create!(
    title: data[:title],
    body: data[:body],
    user: data[:user],
    category: data[:category]
  )
  data[:tag_names].each do |tag_name|
    tag = Tag.find_by!(name: tag_name)
    ArticleTag.create!(article: article, tag: tag)
  end
end

puts "Creating comments..."
Article.all.each do |article|
  rand(1..3).times do
    Comment.create!(
      article: article,
      commenter: ["Alice", "Bob", "Charlie", "Guest"].sample,
      body: [
        "Great article! Very informative.",
        "Thanks for sharing this.",
        "I learned a lot from this post.",
        "Could you explain more about this topic?",
        "Well written and easy to follow."
      ].sample
    )
  end
end

puts "Seed complete!"
puts "  Users: #{User.count}"
puts "  Categories: #{Category.count}"
puts "  Tags: #{Tag.count}"
puts "  Articles: #{Article.count}"
puts "  ArticleTags: #{ArticleTag.count}"
puts "  Comments: #{Comment.count}"
