class CreateStaticAnnotations < ActiveRecord::Migration
  def self.up
    create_table :static_annotations do |t|
      t.string :guid
      t.string :annotation_type
      t.string :points_id

      t.timestamps
    end
  end

  def self.down
    drop_table :static_annotations
  end
end
