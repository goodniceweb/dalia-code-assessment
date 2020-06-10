class CreateWebsites < ActiveRecord::Migration[6.0]
  def change
    create_table :websites do |t|
      t.references :client, null: false, foreign_key: true
      t.string :domain

      t.timestamps
    end
  end
end
