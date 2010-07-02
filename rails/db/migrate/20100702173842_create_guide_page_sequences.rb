class CreateGuidePageSequences < ActiveRecord::Migration
  def self.up
    create_table :guide_page_sequences do |t|
      t.string :guid

      t.timestamps
    end
  end

  def self.down
    drop_table :guide_page_sequences
  end
end
