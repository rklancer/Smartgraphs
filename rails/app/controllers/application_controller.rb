# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password

  #Adjust JSON communication
  #Sproutcore uses the field guid for objects ids, but Rails calls this field id.
  #You have two options on how to convert between these naming conventions:
  #Option 1: Adjust Rails JSON output
  #To customize the JSON output of an object, write a json_for_activity protected method in TasksController (app/controllers/activities_controller.rb): 
  #Put the conversion method here so all controllers can use it
  def sproutcore_json(record)
    hash = record.as_json(:except => [:id, :created_at, :updated_at])
    
    hash[:guid] = polymorphic_path(record)
    
    associations = record.class.reflect_on_all_associations
    
    associations.each do |association|
      records = case association.macro
      when :has_many, :has_and_belongs_to_many
        record.send(association.name).to_a
      when :has_one, :belongs_to
        record.send(association.name)
      end

      unless records.nil?
        if records.is_a?(Enumerable)
          hash[association.name] = records.map { |r| polymorphic_path(r) } 
        else
          hash[association.name] = polymorphic_path(records)
        end
      end
    end
    
    hash
  end

end
