class ProfilesController < ApplicationController
    before_action :authenticate_user

    def show
        render json: {
            id: current_user.id,
            email: current_user.email,
            created_at: current_user.created_at,
            updated_at: current_user.updated_at
        }, status: :ok
    end
end
