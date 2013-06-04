#/bin/sh

echo "Building Smartgraphs"
bin/sc-build -vcr --dont-minify smartgraphs
mkdir -p build
cp -r tmp/build/static build
rm -f build/static/smartgraphs/en/current; ln -s `bin/sc-build-number smartgraphs` build/static/smartgraphs/en/current
rm -f build/index.html; ln -s static/smartgraphs/en/current/index.html build/index.html
