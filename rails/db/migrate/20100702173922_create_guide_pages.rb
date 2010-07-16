class CreateGuidePages < ActiveRecord::Migration
  def self.up
    create_table :guide_pages do |t|
      t.string :guide_page_sequence_id
      t.integer :index
      t.string :title
      t.text :introText
      t.string :firstDialogTurn_id
      t.string :dataSeries_id
      t.string :axes_id
      t.boolean :sensorAppletShouldBeEnabled
      t.boolean :shoulDdShowImage

      t.timestamps
    end
  end

  def self.down
    drop_table :guide_pages
  end
end
