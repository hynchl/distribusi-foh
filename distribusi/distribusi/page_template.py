# -*- coding: utf-8 -*-
html_head = """
<!DOCTYPE html>
<html>
  <head>
    <title>환대의 조각들 Fragments of Hospitality</title>
    <!-- Generated with distribusi https://git.vvvvvvaria.org/varia/distribusi -->
    <meta name="generator" content="distribusi" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    %s
    <link rel="stylesheet" type="text/css" href="/src/style/common.css" />
    <link rel="stylesheet" type="text/css" href="./style.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="/src/scripts/mobileScroll.js"></script>
    <script src="./main.js"></script>
  </head>
  <body>
<div>
  <div id="menu">
    <div id="logo_wrapper" class="svg_wrapper">
      <a href="/">
      <img id="logo_foh"src="/src/img/logo.svg" alt="환대의 조각 로고">
    </a>
    </div>

    <span id="to_about">
      <a href="/about.html">
        ABOUT
      </a>
      </span>
    <span id="to_fragments">
      <a href="/participants.html">
        FRAGMENTS
      </a>
      </span>
    <span id="to_timeline">
      <a href="#">
        TIMELINE
      </a>
      </span>
  </div>

  <div id="margin">
    <!-- to avoid overlapping -->
  </div>

  <div id="wrapper_author">
    <div id="fragment_wrapper">
    </div>
    <div id="introduction">
    </div>
  </div>

  <div id="archive_exit" style="display:none;"></div>
  <div id="archive">
    <button id="archive_button">ARCHIVE
      <!-- <img id="icon_archive_more" src="src/img/icon_timeline.svg" alt=""> -->
    </button>
    <div id="archive_list">
    </div>
  </div>

  <div id="contents">
    <div id="frags">
"""

html_footer = """
    </div>
  </div>
</div>
<script src="/src/scripts/updateIntroduction.js"></script>
<script src="/src/scripts/updateArchive.js"></script>
<script src="/src/scripts/hashEvent.js"></script>
<script src="/src/scripts/mobileArchiveEvent.js"></script>
</body>
</html>
"""
