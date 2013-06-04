#/bin/sh

echo "Rebuilding Smartgraphs"
bin/sc-build --dont-minify smartgraphs
mkdir -p build
rm -rf build/static/smartgraphs
cp -r tmp/build/static/smartgraphs build/static/smartgraphs
rm -f build/static/smartgraphs/en/current
ln -s `bin/sc-build-number smartgraphs` build/static/smartgraphs/en/current
rm -f build/index.html
ln -s static/smartgraphs/en/current/index.html build/index.html
