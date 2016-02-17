class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :title, null: false;
      t.string :body;
      t.boolean :done, default: false, null: false;
      t.timestamps null: false
    end
    add_index :todos, :title;
  end
end
