ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Load fixtures in a specific order to respect foreign key constraints.
    # PostgreSQL 16+ requires SUPERUSER to disable referential integrity,
    # so we load fixtures in dependency order instead.
    fixtures :users, :categories, :tags, :articles, :comments, :article_tags

    # Add more helper methods to be used by all tests here...
  end
end
