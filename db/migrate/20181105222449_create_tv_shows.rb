class CreateTvShows < ActiveRecord::Migration[5.2]
  def change
    create_table :tv_shows do |t|
      t.integer :tv_id
      t.string :title
      t.string :genre
      t.string :first_air_date
      t.string :overview
      t.string :networks
      t.integer :number_of_seasons
      t.integer :number_of_episodes
      t.string :status
      t.string :poster_path
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
