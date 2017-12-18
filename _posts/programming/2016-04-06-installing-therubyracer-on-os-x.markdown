---
title: Installing therubyracer on OS X
date: 2016-04-06T17:43:09+02:00
layout: post
categories: developing
---

Another one of those troublesome gems, here is my definite guide to installing `therubyracer`, along with an older v8 from brew.

    brew tap homebrew/versions
    brew install v8-315

    bundle config build.therubyracer --with-v8-dir=/usr/local/opt/v8-315
    bundle config build.libv8 --with-v8-dir=/usr/local/opt/v8-315

    bundle install

**Note** If you only need `libv8`, see [my post about installing libv8 on OS X]({% post_url /programming/2016-04-06-installing-libv8-on-os-x %})
