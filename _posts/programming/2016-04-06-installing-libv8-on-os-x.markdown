---
layout: post
title: Installing libv8 on OS X
date: 2016-04-06T17:43:29+02:00
categories: developing
---

Another one of those troublesome gems, here is my definite guide to installing `libv8` with the default v8 engine on OS X

    bundle config build.libv8 --with-system-v8
    bundle install

**Note** If you also need `therubyracer`, see [my post about installing therubyracer on OS X]({% post_url 2016-04-06-installing-therubyracer-on-os-x %})