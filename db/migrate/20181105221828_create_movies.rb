class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.integer :movie_id
      t.string :title
      t.string :genre
      t.string :release_date
      t.string :overview
      t.string :poster_path
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
