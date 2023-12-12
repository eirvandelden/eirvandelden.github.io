---
title: Redis defaults when installed via brew
date: 2022-06-28
layout: post
categories: developing
---

Default `redis.conf` location: `/opt/homebrew/etc/redis.conf`

Lookup directory where redis dump file is created:
```
🐿  redis-cli
127.0.0.1:6379> config get dir
1) "dir"
2) "/opt/homebrew/var/db/redis"
127.0.0.1:6379>
```

So the default dump file is: `/opt/homebrew/var/db/redis/dump.rdb`
