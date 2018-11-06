class User < ApplicationRecord
    has_many :movies, dependent: :destroy
    has_many :tv_shows, dependent: :destroy
end
