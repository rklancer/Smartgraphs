class StaticAnnotation < ActiveRecord::Base
  has_and_belongs_to_many :dialog_turns
end

# == Schema Information
#
# Table name: static_annotations
#
#  id              :integer         not null, primary key
#  guid            :string(255)
#  annotation_type :string(255)
#  points_id       :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

