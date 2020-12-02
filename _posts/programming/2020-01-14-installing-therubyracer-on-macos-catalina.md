---
title: Installing therubyracer on macOS Catalina
date: 2020-01-14
layout: post
categories: developing
---

Source: [libv8 fails to build on Catalina 10.15 #282](https://github.com/rubyjs/libv8/issues/282#issuecomment-568538097)

Another one of those troublesome gems, here is my definite guide to installing `therubyracer`, along with an older v8 from brew.

    env \
      CXX=clang++ \
      GYPFLAGS=-Dmac_deployment_target=10.9 \
    gem install libv8 --version 3.16.14.19
