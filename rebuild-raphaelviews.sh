#/bin/sh

echo "Rebuilding RaphaelViews"
bin/sc-build --dont-minify raphael_views/raphael_views
mkdir -p build
rm -rf build/static/raphael_views/raphael_views
cp -r tmp/build/static/raphael_views/raphael_views build/static/raphael_views/raphael_views
