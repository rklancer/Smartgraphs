class CreateDialogTurnStaticAnnotationJoinTable < ActiveRecord::Migration
  def self.up
    create_table :dialog_turns_static_annotations, :id => false do  |t| 
      t.integer :dialog_turn_id  
      t.integer :static_annotation_id  
    end 
  end

  def self.down
    drop_table :dialog_turns_static_annotations 
  end
end
