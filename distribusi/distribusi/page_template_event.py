# -*- coding: utf-8 -*-

# This template is used for generating each event pages
# Please refer `event/0000/events_sample.html`

html_head_event = """
<!DOCTYPE html>
<html>
  <head>

    <!-- EVENTS TEMPLATE -->

    <title>환대의 조각들 Fragments of Hospitality</title>
    <!-- Generated with distribusi https://git.vvvvvvaria.org/varia/distribusi -->
    <meta name="generator" content="distribusi" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    %s
    <link rel="stylesheet" type="text/css" href="/src/style/common.css" />
    <link rel="stylesheet" type="text/css" href="/src/style/event.css" />
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

    <div id="timeline_icon_wrapper" class="svg_wrapper">
      <a href="/events/list.html">
      <img id="about_icon"src="/src/img/events_events-back.svg" alt="구름 모양 타임라인 버튼">
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
      <a href="/events/list.html">
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
    <div id="event_description">
      <div id="event_title">
        <!-- this part will be load dynamically -->
      </div>
      <div id="event_date">
        <!-- this part will be load dynamically -->
      </div>
      <div id="event_details">
        <!-- this part will be load dynamically -->
      </div>
    </div>
  </div>

  <div id="contents">
    <div id="frags">
"""

html_footer_event = """
    </div>
  </div>
</div>
  <script src="/src/scripts/updateEventDescription.js"></script>
</body>
</html>
"""
