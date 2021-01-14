# -*- coding: utf-8 -*- 

# This template is used for generating the list of event
# Each folders should be diplayed as `div` with className 'row_event'
# Please refer `event/events_sample.html`

html_head_events = """
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>환대의 조각들 Fragments of Hospitality</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="/src/style/common.css" />
    <link rel="stylesheet" type="text/css" href="/src/style/event.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="/src/scripts/mobileScroll.js"></script>
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

  <div id="contents">
    <div id="about_wrapper">
"""

html_footer_events = """
    </div>
  </div>


</div>
</body>
</html>
"""
