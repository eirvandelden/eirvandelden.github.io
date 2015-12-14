---
layout: post
title: "Installing Gitolite on an OS X Server"
categories: developing
tags: ['git']
date: 2012-08-08
---
Despite having very simple installation instruction, I’ve been fighting with installing Gitolite every single time I’ve tried. Here I present a short summary in the steps needed to install Gitolite on Mac OS X, an amalgamation of the sources linked below.

Gitolite requires a (local) account on the server, with SSH access. Using a network account (created through Server.app) is certainly possible, the easiest way is to simply create a local account (with password!) and give it ssh access. Administrator privileges not advised.

- Make a local user called ‘git’
- Go to Sharing > Remote login and add the git user
- Create an SSH key on the machine that will be used to administer gitolite (workstation) and copy that key to the server
-    ssh git@server: mkdir ~/.ssh/
-    scp key.pub git@server: ~/.ssh/authorized_keys
- Run the following commands as the git user (use login git):
-            git clone git://github.com/sitaramc/gitolite
-            gitolite/install
-This installs gitolite into /Users/git/gitolite/src/gitolite
- Create a symbolic link to the gitolite folder:
-     ln -s /Users/git/gitolite/src/gitolite* /usr/bin (or to /usr/local/bin)
- Either relog or open a new terminal window
-            gitolite setup -pk YourName.pub

Editing the configuration can now be done from the workstation by running the following command:
-           git clone git@host:gitolite-admin

To allow for password-less login to the server, do the following:
-          cat ~/.ssh/id_dsa.pub | ssh user@remotehost 'cat >> ~/.ssh/authorized_keys'
To confirm do:
-            ssh user@remotehost.com

Creating an ssh alias:
Add the following to ~/.ssh/config on your workstation:

-  Host alias
-  User git
-  Hostname server.address
-  Port 22
-  IdentityFile ~/.ssh/id_rsa


Sources:

- Gitolite readme: https://github.com/sitaramc/gitolite
- Passwordless SSH:
