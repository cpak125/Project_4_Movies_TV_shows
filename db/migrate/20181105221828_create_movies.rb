class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :genre
      t.string :release_date
      t.string :overview
      t.string :img_url
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
