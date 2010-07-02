class StaticAnnotations < ActiveRecord::Base
  has_and_belongs_to_many :dialog_turns
end
