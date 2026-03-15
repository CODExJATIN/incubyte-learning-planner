require "rails_helper"

RSpec.describe "Authentication", type: :request do
  describe "POST /signup" do
    it "creates a user" do
      expect {
        post "/signup", params: {
          email: "test@example.com",
          password: "password123",
          password_confirmation: "password123"
        }
      }.to change(User, :count).by(1)

      expect(response).to have_http_status(:created)
    end
  end

  describe "POST /login" do
    let!(:user) do
        User.create!(
            email: "test@example.com",
            password: "password123",
            password_confirmation: "password123"
        )
    end

    it "returns a JWT token when credentials are valid" do
        post "/login", params: {
            email: "test@example.com",
            password: "password123"
        }

        expect(response).to have_http_status(:ok)

        json = JSON.parse(response.body)

        expect(json["token"]).not_to be_nil
        end
    end

    describe "GET /profile" do
        let(:user) { User.create!(email: "test@example.com", password: "password123", password_confirmation: "password123") }
        let(:token) { JsonWebToken.encode({user_id: user.id}) }

        it "returns the user profile when token is valid" do
            get "/profile", headers: { "Authorization" => "Bearer #{token}" }

            expect(response).to have_http_status(:ok)

            json = JSON.parse(response.body)

            expect(json["id"]).to eq(user.id)
            expect(json["email"]).to eq(user.email)
        end
    end

    it "returns unauthorized when token is invalid" do
        get "/profile", headers: { "Authorization" => "Bearer invalid_token" }

        expect(response).to have_http_status(:unauthorized)
    end
end