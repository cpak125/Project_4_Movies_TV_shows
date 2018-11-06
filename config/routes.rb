Rails.application.routes.draw do
  namespace :api do
    resources :users do
      resources :movies
      resources :tv_shows
    end
  end
end
