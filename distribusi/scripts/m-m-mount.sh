#!/bin/bash

# distribusi automounter!
# requires usbmount

if grep -qs '/media/usb' /proc/mounts; then
    grep '/media/usb' | while read -r line;
    do
        figlet "$line"
    done
fi
