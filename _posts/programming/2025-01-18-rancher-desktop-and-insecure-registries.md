---
title: Pushing to insecure registries with Rancher Desktop
date: 2025-01-18
layout: post
categories: developing
---

On my mac I use [Rancher Desktop](https://rancherdesktop.io/) as my Docker Engine. Its open source and the Apache license means I can use it for free, personally and for work.

However, I ran into an issue when I tried to push an image to a private registry. The error message was:

```
The push refers to repository [MY_PRIVATE_REPOSITORY_URL/MY_CONTAINER]
Get "https://MY_PRIVATE_REPOSITORY/v2/": http: server gave HTTP response to HTTPS client
```

This is because the registry is using HTTP instead of HTTPS. This is a security risk, but I'm running this registry internally and I'm not too worried about it. I just want to push my image to a self-hosted registry.

`jandubois` and `pavel-kalmykov` on the [Rancher Desktop Github discussion](https://github.com/rancher-sandbox/rancher-desktop/discussions/1477) solved this issue for us. The solution is to add the insecure registry to the Docker Engine configuration. We do this is follows:

1. Connect to the lima VM by running

```
$ LIMA_HOME="$HOME/Library/Application Support/rancher-desktop/lima" "/Applications/Rancher Desktop.app/Contents/Resources/resources/darwin/lima/bin/limactl" shell 0
```

2. Edit the Docker Engine configuration by running `sudo vi /etc/docker/daemon.json`
3. Add the insecure registry to the configuration file. For example:

```json
{
  "insecure-registries": ["MY_PRIVATE_REPOSITORY"]
}
```

4. Save the file and restart the Docker Engine by running `sudo systemctl restart docker`
5. [OPTIONAL] You might want to restart Rancher Desktop app as well.

Now you can push your images to your internally hosted registry. 🎉

_Note: There is no way to persist this change between reboots_
