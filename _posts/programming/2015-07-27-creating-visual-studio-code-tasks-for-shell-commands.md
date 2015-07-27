---
layout: post
title: "Creating Visual Studio Code Tasks for Shell Commands"
modified:
categories: programming
excerpt:
tags: []
image:
  feature: vscode.png
date: 2015-07-27T12:35:40+01:00
---

I’ve been using [Visual Studio Code](https://code.visualstudio.com) ever since it has been released and it quickly became my new favourite code editor. One of it’s cool features is that I can create tasks, like a test or build task, that you can start with a keyboard shortcut, right from your code.

When working on Rails Apps, I like to have three things side-by-side; my code, my test and the test output (for that single test).
Visual Studio Code’s tasks feature is advertised for just such a way of working, but the documentation is quite lacking on how to set this up.

Luckily [Hurelu on StackOverflow](http://stackoverflow.com/a/30419250/2814830) figured this out for us. Here is how:

 * Press cmd+shift+p and select “Configure Task Runner"
 * Replace the contents with the following:

```
{
  "command": "bundle",
  "args": ["exec"],
  "tasks": [
    {
      "suppressTaskName": true,
      "taskName": "rspec",
      "args": [ "rspec", "${file}" ]
    },
    {
      "suppressTaskName": true,
      "taskName": "foreman start",
      "args": [ "foreman", "start"],
      "isBuildCommand": true
    }
  ]
}
```

 * Open an RSpec test and press cmd+shift+t to run your test for the currently selected RSpec test and see the output!
 * You can run cmd+shift+b to start your server using foreman. Take note that only 1 task may be running at a time.

This tasks.json file uses bundler to run your commands. When configuring this tasks file, Visual Studio Code runs the commands as follows:

    $ command args tasks-args tasks-taskName

Which is a different order than I expected. The suppressTaskName option doesn’t send the taskName as an argument, so we can use the arguments for our task to call RSpec or Cucumber in the correct order.

Happy Coding!