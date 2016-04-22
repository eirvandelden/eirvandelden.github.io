---
layout: post
title: Find the process running on a specific port on OS X
date: 2016-04-06T18:29:00+02:00
category: developing
---

Every now and then, a process is using a port. You can find which process is using a port by running:

    lsof -i :[PORT]

The output also returns the `process id`, so you can quickly kill it (`kill -9 ID`).

Happy coding!