# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_smartgraphs_session',
  :secret      => '9b9ab002a43a3b7fdf14e80abb1916cedc302e2eafb40bd957374e1fdd6d71ed57a1b060ed7d31e81ecaaaf631ed68317181816e1351cfa96dcc525323561bb8'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
