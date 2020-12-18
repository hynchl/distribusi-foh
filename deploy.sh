#!/bin/bash

echo "---> 'git fetch'"
git fetch
echo "---> 'git pull'"
git pull

echo "---> 'rm data/.ignore'"
rm data/.ignore
echo "---> 'cp test_data/.ignore data/'"
cp test_data/.ignore data/

echo "---> 'rm -r data/src'"
rm -r data/src
echo "---> 'cp -r test_data/src/ data/'"
cp -r test_data/src/ data/

echo "---> 'rm data/about.html'"
rm data/about.html
echo "---> 'cp test_data/about.html data/'"
cp test_data/about.html data/

echo "---> 'rm data/home.html'"
rm data/home.html
echo "---> 'cp test_data/home.html data/'"
cp test_data/home.html data/

echo "---> 'rm data/participants.html'"
rm data/participants.html
echo "---> 'cp test_data/participants.html data/'"
cp test_data/participants.html data/

echo "---> 'rm data/index.html'"
rm data/index.html
echo "---> 'cp test_data/index.html data/'"
cp test_data/index.html data/

echo "---> 'python distribusi/test.py -t -d ./data/'"
python distribusi/test.py -t -d ./data/
