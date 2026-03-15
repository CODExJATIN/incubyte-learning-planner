class SessionsController < ApplicationController
    def create
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
            render json: {message:"Login successfull"}, status: :ok
        else
            render json: {error:"Invalid email or password"}, status: :unauthorized
        end
    end
end
