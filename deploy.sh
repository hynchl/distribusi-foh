#!/bin/bash

#monitoring each command invokations (on)
set -x

git fetch
git pull

rm data/.ignore
cp test_data/.ignore data/

rm -r data/src
cp -r test_data/src/ data/

rm data/about.html
cp test_data/about.html data/

rm data/home.html
cp test_data/home.html data/

rm data/participants.html
cp test_data/participants.html data/

rm data/index.html
cp test_data/index.html data/

rm data/events/list.html
cp test_data/events/list.html data/events/

python distribusi/test.py -t -d ./data/

#monitoring each command invokations (off)
set +x
