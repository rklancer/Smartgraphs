class DialogTurn < ActiveRecord::Base
  has_and_belongs_to_many :static_annotations
end
