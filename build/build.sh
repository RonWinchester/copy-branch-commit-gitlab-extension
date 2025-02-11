#!/bin/sh

DOC_FILES="./README.md"
IMG_FILES="./src/icons/extension.png"

# Strip subdirectories for Chrome manifest
sed 's/src\/.*\///g' ./manifest.json > temp-chrome-manifest.json

# Strip subdirectories for Firefox manifest
sed 's/src\/.*\///g' ./manifest-ff.json > temp-ff-manifest.json

# Fix update url for Chrome manifest
sed 's/updates\.xml/src\/updates\/updates\.xml/g' ./temp-chrome-manifest.json | tee | tee ./temp-chrome-manifest.json

# Fix update url for Firefox manifest
sed 's/updates\.json/src\/updates\/updates\.json/g' ./temp-ff-manifest.json | tee | tee ./temp-ff-manifest.json

# Strip subdirectories for popup html file
sed 's/\.\.\/js\///g' ./src/html/popup.html > temp-popup.html

HTML_FILES="temp-popup.html"
JS_FILES="./src/js/contentScript.js"
GEN_FILES="$JS_FILES $HTML_FILES $DOC_FILES $IMG_FILES"
CH_FILES="$GEN_FILES temp-chrome-manifest.json ./src/updates/updates.xml"
FF_FILES="$GEN_FILES temp-ff-manifest.json ./src/updates/updates.json ./src/icons/extension-dark.png"

NAME="output/extension"

# Remove existing files
rm -f $NAME.crx $NAME.xpi

# Generate Chrome .crx extension package
7zz a -tzip -mx9 $NAME.crx $CH_FILES
7zz rn $NAME.crx temp-chrome-manifest.json manifest.json temp-popup.html popup.html

# Generate Firefox .xpi extension package (firefox manifest)
7zz a -tzip -mx9 $NAME.xpi $FF_FILES
7zz rn $NAME.xpi temp-ff-manifest.json manifest.json temp-popup.html popup.html

# Remove temp files
echo "\nDeleting temp files..."
rm -v temp-chrome-manifest.json temp-ff-manifest.json temp-popup.html