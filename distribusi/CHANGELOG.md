# Changelog

The changelog was only added at version 0.0.4.

## 0.0.9

- Fix thumbnail generation (thanks @dickreckard!)
- Adjust formatting for usage output

## 0.0.8

- Allow to ignore hidden directories with `--no-hidden`
- Files and directories are now sorted during distribusification.
- Allow to append `index.html` to the menu items with `--menu-with-index`

## 0.0.7

Let's think a bit about safety and robustness:

- distribusi only overwrites (or removes) indexes that have been created by distribusi itself
- override the above behaviour with `--force`
- `--exclude` now allows you to exclude folder names from being listed, this behaviour is not influenced by `--force`

And also some refactoring and niceties:

- Distribusi only prints when called with `--verbose`
- Restyled `--verbose` output
- Generated indexes can be removed with `--remove-indexes`
- .html and .txt files are now expanded and included as snippets in the index file
- code rewrite for clarity
- HTML output is more precisely styleable

## 0.0.6

Woops, we missed that one.

## 0.0.5

- Use loose bounds for dependencies
- Don't call exiftools on every execution
- If `PILLOW` can't thumbnail an image it is included as a link instead

## 0.0.4

- Add captions from EXIF metadata
- Custom stylesheet usage
- Ability to hide filenames
