#!/bin/bash

# Ultra wild west single binary compiling
# https://github.com/linkedin/shiv

shiv --output-file=distribusi.pyz \
     --site-packages=.venv/lib/python3.7/site-packages/ \
     --entry-point=distribusi.cli.cli_entrypoint \
     --python="/usr/bin/env python3" \
     --compressed \
     --compile-pyc \
     .
