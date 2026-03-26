require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  let(:article) { Article.create!(title: "Test Article", body: "Test Body") }

  describe "POST #create" do
    context "with valid params (HTML)" do
      it "creates a new comment and redirects to the article" do
        expect {
          post :create, params: {
            article_id: article.id,
            comment: {
              commenter: "Jatin",
              body: "Great article!"
            }
          }
        }.to change(article.comments, :count).by(1)

        expect(response).to redirect_to(article_path(article))
      end
    end

    context "with valid params (JSON)" do
      it "creates a comment and returns JSON response" do
        post :create,
             params: {
               article_id: article.id,
               comment: {
                 commenter: "Jatin",
                 body: "Nice post"
               }
             },
             format: :json

        expect(response).to have_http_status(:created)

        json = JSON.parse(response.body)

        expect(json["commenter"]).to eq("Jatin")
        expect(json["body"]).to eq("Nice post")
        expect(json["postId"]).to eq(article.id.to_s)
      end
    end
  end

  describe "DELETE #destroy" do
    let!(:comment) do
      article.comments.create!(
        commenter: "Jatin",
        body: "Test comment"
      )
    end

    context "HTML request" do
      it "deletes the comment and redirects to article" do
        expect {
          delete :destroy, params: {
            article_id: article.id,
            id: comment.id
          }
        }.to change(article.comments, :count).by(-1)

        expect(response).to redirect_to(article_path(article))
      end
    end

    context "JSON request" do
      it "deletes the comment and returns success message" do
        delete :destroy,
               params: {
                 article_id: article.id,
                 id: comment.id
               },
               format: :json

        expect(response).to have_http_status(:ok)

        json = JSON.parse(response.body)
        expect(json["message"]).to eq("Comment deleted successfully")
      end
    end
  end
end