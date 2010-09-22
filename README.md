# Project:   Smartgraphs
## Copyright: ©2010 Concord Consortium

## To install:

`git clone git://github.com/rklancer/Smartgraphs.git
cd Smartgraphs`

### Update Ruby and RVM if needed:

`rvm update && rvm reload
rvm install 1.9.2`

### Create a Smartgraphs gemset and set RVM to use it if you (a) just cloned the repo or (b) updated your Ruby version:

`rvm gemset create Smartgraphs
rvm gemset import
echo "rvm use 1.9.2@Smartgraphs" > .rvmrc`


### Import/update the project dependencies via `git submodule`

`mkdir -p frameworks
git submodule update --init --recursive`

### Start the development server and visit the Smartgraphs app in your web browser

`sc-server -v`

(do subsequent work in a new Terminal window)

### To see test results:

to use TestRunner, open http://localhost:4020/sproutcore/tests
to visit all tests directly, open http://localhost:4020/static/smartgraphs/en/current/tests.html


## Miscellaneous reference:

### Build to the rails/public directory with:
sc-build -c --buildroot="[FULL_PATH_BECAUSE_RELATIVE_PATHS_DO_NOT_WORK_IN_ABBOT_YET]/smartgraphs-rails/public"

### Get the latest build number like this:
sc-build-number smartgraphs

### Then make the symbolic link to the English version of latest build like this:
cd ../smartgraphs-rails/public
rm sc.html
ln -s static/smartgraphs/en/[ the sc-build-number ]/index.html sc.html
