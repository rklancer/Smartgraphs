class CreateDialogTurns < ActiveRecord::Migration
  def self.up
    create_table :dialog_turns do |t|
      t.string :guid
      t.text :beforeText
      t.string :responseTemplate_id
      t.string :responseVerifier_id
      t.text :afterText
      t.string :nextTurnButtonTitle
      t.string :nextTurnForNominalResponse_id
      t.string :nextTurnForIncorrectResponse_id
      t.boolean :isLastTurn
      t.boolean :shouldAutoAdvance

      t.timestamps
    end
  end

  def self.down
    drop_table :dialog_turns
  end
end
