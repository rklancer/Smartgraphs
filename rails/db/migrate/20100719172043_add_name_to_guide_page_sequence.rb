class AddNameToGuidePageSequence < ActiveRecord::Migration
  def self.up
    add_column :guide_page_sequences, :name, :string
  end

  def self.down
    remove_column :guide_page_sequences, :name
  end
end
