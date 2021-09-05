#!/bin/bash

#set minimal required path
export PATH=$PATH:$HOME/.local/bin

#load pyenv of 'nextcloud' user
export PYENV_ROOT="/home/nextcloud/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init --path)"
fi
eval "$(pyenv virtualenv-init -)"

#load env for the proj. 'distribusi-foh'
pyenv shell distribusi-foh

#change directory
cd /home/nextcloud/distribusi-foh

#start to watch.. (with thumbnailing)
# python distribusi/test.py -t -d ./data/
# while inotifywait -e modify,move,create,delete,close_write -r ./data/ ; do
#   python distribusi/test.py -t -d ./data/
# done

#start to watch.. (without thumbnailing)
python distribusi/test.py -d ./data/
while inotifywait -e modify,move,create,delete,close_write -r ./data/ ; do
  python distribusi/test.py -d ./data/
done
