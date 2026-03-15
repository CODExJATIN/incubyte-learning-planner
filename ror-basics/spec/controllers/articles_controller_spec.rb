require 'rails_helper'

describe ArticlesController, type: :controller do
  context "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to have_http_status(:ok)
    end
  end

  context "GET #show" do
    it "returns a success response" do
      article = Article.create!(title: "Test Article", body: "Test Body")
      get :show, params: { id: article.id }
      expect(response).to have_http_status(:ok)
    end
  end

  context "POST #create" do
    it "creates a new article" do
      expect {
        post :create, params: { article: { title: "Test Article", body: "Test Body" } }
      }.to change(Article, :count).by(1)
      expect(response).to redirect_to(article_path(Article.last))
    end

    it "does not create an article with invalid parameters" do
      expect {
        post :create, params: { article: { title: "", body: "Test Body" } }
      }.to change(Article, :count).by(0)
    end
  end

  context "PUT #update" do
    it "updates an article" do
      article = Article.create!(title: "Test Article", body: "Test Body")
      put :update, params: { id: article.id, article: { title: "Updated Article" } }
      article.reload
      expect(article.title).to eq("Updated Article")
      expect(response).to redirect_to(article_path(article))
    end

    it "does not update an article with invalid parameters" do
      article = Article.create!(title: "Test Article", body: "Test Body")
      put :update, params: { id: article.id, article: { title: "" } }
      article.reload
      expect(article.title).to eq("Test Article")
    end
  end

  context "DELETE #destroy" do
    it "deletes an article" do
      article = Article.create!(title: "Test Article", body: "Test Body")
      expect{
        delete :destroy, params: { id: article.id }
    }.to change(Article, :count).by(-1)
      expect(response).to redirect_to(articles_path)
    end
  end
end