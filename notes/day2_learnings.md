# Ruby on Rails Fundamentals : Learning Notes

## Overview
In this exercise, I followed the Rails Getting Started tutorial and built a simple **Blog application** using Ruby on Rails. The application supports **Articles and Comments** with full CRUD functionality and demonstrates Rails MVC architecture, RESTful routing, and ActiveRecord associations.

---

# 1. Rails MVC Architecture

Rails follows the **MVC (Model–View–Controller)** design pattern.

```

Browser Request
↓
Routes
↓
Controller
↓
Model (ActiveRecord)
↓
View (ERB Template)
↓
HTML Response

````

### Model
Handles database logic and business rules.

Example:

```ruby
class Article < ApplicationRecord
  has_many :comments
end
````

### View

Responsible for displaying data to the user using **ERB templates**.

Example:

```erb
<h1><%= @article.title %></h1>
<p><%= @article.body %></p>
```

### Controller

Handles requests, interacts with models, and renders views.

Example:

```ruby
def show
  @article = Article.find(params[:id])
end
```

---

# 2. Rails Conventions

Rails emphasizes **Convention over Configuration**, meaning developers follow standard patterns instead of manually configuring everything.

Examples:

| Convention      | Example               |
| --------------- | --------------------- |
| Controller name | `ArticlesController`  |
| Model name      | `Article`             |
| Table name      | `articles`            |
| View folder     | `app/views/articles/` |

---

# 3. RESTful Routing

Rails follows REST principles for mapping URLs to controller actions.

| HTTP Method | Route              | Controller Action | Purpose                |
| ----------- | ------------------ | ----------------- | ---------------------- |
| GET         | /articles          | index             | List all articles      |
| GET         | /articles/:id      | show              | View article           |
| GET         | /articles/new      | new               | Form to create article |
| POST        | /articles          | create            | Create article         |
| GET         | /articles/:id/edit | edit              | Edit form              |
| PATCH       | /articles/:id      | update            | Update article         |
| DELETE      | /articles/:id      | destroy           | Delete article         |

Routes are defined in:

```
config/routes.rb
```

Example:

```ruby
resources :articles
```

---

# 4. Active Record (ORM)

ActiveRecord is Rails' **Object Relational Mapping (ORM)** system.

It connects Ruby objects to database tables.

Example:

```ruby
Article.create(title: "Hello", body: "First post")
```

Equivalent SQL:

```
INSERT INTO articles (title, body)
```

ActiveRecord automatically handles:

* database queries
* relationships
* validations
* migrations

---

# 5. Database Migrations

Migrations allow version control of database schema.

Example migration:

```ruby
class CreateArticles < ActiveRecord::Migration[8.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
```

Run migration:

```
bin/rails db:migrate
```

---

# 6. Generators

Rails provides generators to quickly create files.

Example:

```
bin/rails generate scaffold Article title:string body:text
```

This generates:

* Model
* Controller
* Views
* Routes
* Migration
* Tests

---

# 7. CRUD Operations

CRUD stands for:

| Operation | Rails Action |
| --------- | ------------ |
| Create    | create       |
| Read      | index, show  |
| Update    | update       |
| Delete    | destroy      |

Example controller:

```ruby
def create
  @article = Article.new(article_params)
  @article.save
end
```

---

# 8. ActiveRecord Associations

In this project:

```
Article → has many Comments
Comment → belongs to Article
```

### Article Model

```ruby
class Article < ApplicationRecord
  has_many :comments, dependent: :destroy
end
```

### Comment Model

```ruby
class Comment < ApplicationRecord
  belongs_to :article
end
```

This creates a **one-to-many relationship**.

Example query:

```ruby
article.comments
```

---

# 9. Nested Resources

Comments belong to articles, so routes are nested.

Example:

```ruby
resources :articles do
  resources :comments
end
```

Generated route example:

```
POST /articles/:article_id/comments
```

---

# 10. Strong Parameters

Rails protects against **mass assignment vulnerabilities** using strong parameters.

Example:

```ruby
def comment_params
  params.require(:comment).permit(:commenter, :body)
end
```

This ensures only allowed attributes are accepted.

---

# 11. ERB Templates

Rails views use **Embedded Ruby (ERB)**.

Example:

```erb
<%= @article.title %>
```

Loop example:

```erb
<% @article.comments.each do |comment| %>
  <p><%= comment.body %></p>
<% end %>
```

---

# 12. Comment Creation Flow

```
User submits comment form
        ↓
POST /articles/:id/comments
        ↓
CommentsController#create
        ↓
Comment saved in database
        ↓
Redirect to article page
```

Controller example:

```ruby
def create
  @article = Article.find(params[:article_id])
  @comment = @article.comments.create(comment_params)
  redirect_to article_path(@article)
end
```

---

# 13. Rails Commands Used

Create Rails app:

```
rails new blog -d postgresql
```

Run server:

```
bin/rails server
```

Generate scaffold:

```
bin/rails generate scaffold Article title:string body:text
```

Run migration:

```
bin/rails db:migrate
```

Rails console:

```
bin/rails console
```

---

# 14. Git Workflow

Commit example:

```
git add .
git commit -m "feat: implement articles CRUD"
```

Push:

```
git push
```

---

# 15. Key Concepts Learned

* Rails MVC architecture
* RESTful routing
* ActiveRecord ORM
* Database migrations
* CRUD operations
* One-to-many associations
* Nested resources
* ERB templates
* Strong parameters
* Rails generators

---

# Outcome

Successfully built a **Rails Blog application** that supports:

* Article CRUD operations
* Comment creation and deletion
* Article–Comment association
* RESTful routing
* PostgreSQL database integration

This exercise demonstrated the **core conventions and architecture of Ruby on Rails**.