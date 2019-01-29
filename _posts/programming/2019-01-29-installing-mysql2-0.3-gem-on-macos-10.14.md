---
layout: post
title: Installing mysql2 0.3 gem on older rubies on macos 10.14 "Mojave"
date: 2019-01-29T11:48:29+02:00
categories: developing
---

If you have a project where you have:
  * Rails 4.0 and no easy way of upgrading to Rails 4.2.2
  * Ruby 2.0 and no easy way of upgrading to Ruby 2.3 or later
  * MySQL database, with mysql2 gem
  * MacOS 10.14 or later

Then you are stuck using `mysql2 -v 0.3.x` branch, which does not natively build anymore. To "fix" this, we have to install MySQL5.7 and point bundler to the mysql config file:

    brew install mysql@5.7
    brew info mysql@5.7 (take note of the install direcotry)
    bundle config build.mysql2 --with-mysql-config=/usr/local/Cellar/mysql\@5.7/5.7.24/bin/mysql_config
    bundle install

Now fix that bug and tell your client that we have maintenance to do and upgrade to Rails 4.2.2 or higher and gain a free speed improvement by upgrading to Ruby 2.3.
