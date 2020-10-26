# Distribusi CMS

[![PyPI version](https://badge.fury.io/py/distribusi.svg)](https://badge.fury.io/py/distribusi)

`distribusi` is a content management system for the web that produces static
index pages based on folders in the filesystem. It is inspired by the automatic
index functions featured in several web servers. It works by traversing the
file system and directory hierarchy to automatically list all the files in the
directory and providing them with html classes and tags for easy styling.

## Requirements

While a Pip install will pull in Python dependencies, you might need system
dependencies. This package requires two underlying packages. Those are
`python-magic`, and `pillow`. Here are the installation documentation for those
packages:

* [github.com/threatstack/libmagic](https://github.com/threatstack/libmagic)
* [pillow.readthedocs.io](https://pillow.readthedocs.io/en/5.3.x/installation.html#external-libraries)

### Optional requirements

If you wish to use the `--caption` flag to add image captions read from EXIF comment metadata you will need a utility called `exiftool`.

You can install it via your package manager. For other options please consult the website: [https://www.sno.phy.queensu.ca/~phil/exiftool/](https://www.sno.phy.queensu.ca/~phil/exiftool/)


## Install It

```bash
$ export PATH=$PATH:$HOME/.local/bin
$ pip install --user distribusi
```

## Upgrade It

If you already have it, you can upgrade with:

```bash
$ pip install -U distribusi
```

## Use It

Get help with:

```bash
$ distribusi --help
```

Make a distribusi of your home folder:

```bash
$ distribusi -d ~/
```

You will find that you now have an `index.html` in every folder.

Create a quick gallery for the web:

```
$ distribusi -d /path/to/my/photos -t
```

This creates an `index.html` with `base64` encoded thumbnails.

Generate verbose output:

```
$ distribusi -v
```

Make an index of the archive page:

```
$ distribusi -d /var/www/archive/my_event -t -v
```

# ✌


## History

Distribusi was first conceptualized as a tool which supported a contribution by Dennis de Bel, Danny van der Kleij and Roel Roscam Abbing to the [ruru house](http://ruruhuis.nl/) organized by [Reinaart Vanhoe](http://vanhoe.org/) and the [ruangrupa](http://ruru.ruangrupa.org/) collective during 2016 Sonsbeek Biennale in Arnhem. During the biennale time the ruru house was a lively meeting place with a programme of discussions, workshops, lectures, culinary activities, performances, pop-up markets and even karaoke evenings, where curators and Arnhemmers met. 

The contribution consisted of setting up distribusi.ruruhuis.nl (distribusi is bahasa Indonesian for 'distribution') which was a website connected to a server in the space. Rather than a hidden administrative interface, the server was present and visible and an invitation was extended to visitors to use it to publish material online. This was done by inserting a USB-drive into any of the ports. The distribusi script would then turn the contents of that stick it into a website. Once the USB-drive was removed that website was no longer on-line. Over time distribusi.ruruhuis.nl hosted photos, books and movies. The website is now off-line but the tool that was used to make it is still used in Varia

## Change It

You'll need to get a copy of the repository and then do an [editable] install:

[editable]: https://setuptools.readthedocs.io/en/latest/setuptools.html#development-mode

```bash
$ git clone https://git.vvvvvvaria.org/varia/distribusi.git && cd distribusi
$ python3 -m venv .venv && source .venv/bin/activate
$ pip install -e .
```

You're then ready to make your changes and experiment with them.

## Release It

You'll need a [PyPi](https://pypi.org/) account and to be added as a maintainer.

Please ask around @ Varia for who has PyPi access.

```
$ pip install twine
$ make publish
```
