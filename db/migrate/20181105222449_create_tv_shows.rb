class CreateTvShows < ActiveRecord::Migration[5.2]
  def change
    create_table :tv_shows do |t|
      t.integer :tv_id
      t.string :name
      t.string :first_air_date
      t.string :overview
      t.string :poster_path
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
