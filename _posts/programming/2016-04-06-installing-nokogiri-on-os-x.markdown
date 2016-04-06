---
layout: post
title: Installing Nokogiri on OS X
date: 2016-04-06T17:29:55+02:00
categories: programming
---

If you are developing Rails or Ruby applications, you probably have to install nokogiri at some point.
On Mac OS X, this is always a hassle. One that I keep forgetting.

So to stop forgetting, this is my definite guide to installing Nokogiri!

    brew install xml2
    bundle config build.nokogiri --use-system-libraries --with-xml2-include=/usr/local/opt/libxml2/include/libxml2
    bundle install

Enjoy!