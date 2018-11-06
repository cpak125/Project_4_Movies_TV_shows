class Api::TvShowsController < ApplicationController

def index
    @user = User.find(params[:user_id])
    @tv_shows = @user.tv_shows
    render json: @tv_shows
end

def show
    @tv_show = TvShow.find(params[:id])
    @user = @tv_show.user
    render json: @tv_show
end

def create
    @user = User.find(params[:user_id])
    @tv_show = @user.tv_shows.create!(tv_show_params)
    @tv_shows = @user.tv_shows
    render json: @tv_shows
end

def destroy
    @tv_show = TvShow.find(params[:id]).destroy
    render json: 200
end

private
def tv_show_params
    params.require(:tv_show).permit(:title, :genre, :first_air_date, :overview, :networks, :number_of_seasons, :number_of_episodes, :status, :img_url)
end

end
