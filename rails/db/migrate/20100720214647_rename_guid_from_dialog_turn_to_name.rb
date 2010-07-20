class RenameGuidFromDialogTurnToName < ActiveRecord::Migration
  def self.up
    rename_column :dialog_turns, :guid, :name
  end

  def self.down
    rename_column :dialog_turns, :name, :guid
  end
end
