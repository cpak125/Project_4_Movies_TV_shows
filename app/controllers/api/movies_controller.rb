class Api::MoviesController < ApplicationController

def index
    @user = User.find(params[:user_id])
    @movies = @user.movies
    render json: @movies
end

def show
    @movie = Movie.find(params[:id])
    @user = @movie.user
    render json: @movie
end

def create
    @user = User.find(params[:user_id])
    @movie = @user.movies.create!(movie_params)
    @movies = @user.movies
    render json: @movies
end

def destroy
    @movie = Movie.find(params[:id]).destroy
    render json: 200
end

private
def movie_params
    params.require(:movie).permit(:title, :genre, :release_date, :overview, :img_url)
end

end
