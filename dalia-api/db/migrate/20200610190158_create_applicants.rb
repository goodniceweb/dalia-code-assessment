class CreateApplicants < ActiveRecord::Migration[6.0]
  def change
    create_table :applicants do |t|
      t.references :website, null: false, foreign_key: true
      t.references :client, null: false, foreign_key: true
      t.string :email

      t.timestamps
    end
    add_index :applicants, [:email, :website_id, :client_id], unique: true
  end
end
