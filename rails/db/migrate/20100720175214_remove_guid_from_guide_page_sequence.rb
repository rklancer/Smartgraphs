class RemoveGuidFromGuidePageSequence < ActiveRecord::Migration
  def self.up
    remove_column :guide_page_sequences, :guid
  end

  def self.down
    add_column :guide_page_sequences, :guid, :string
  end
end
