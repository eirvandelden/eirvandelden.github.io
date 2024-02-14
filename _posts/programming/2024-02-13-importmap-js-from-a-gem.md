---
title: Import JS files from a Gem, `using importmap-rails`
date: 2024-02-13
layout: post
categories: developing
---

Rails has been going through a lot of changes throughout the years, especially the frontend. Where once Sprockets was "good" enough, we eventually needed a Javascript Runtime to compile our Javascript. Fast forward another few years and now we are back in a simpeler time: loading Javascript files directly from the server to the browser, no build required. It works and it is awesome!

However; `importmap-rails` is still young and documentation can sometimes be lacking. I've seen [several](https://discuss.rubyonrails.org/t/how-to-use-importmaps-in-a-gem/84816) [questions](https://stackoverflow.com/questions/69635552/how-to-set-up-importmap-rails-in-rails-7-engine) about including JS from a gem to your rails app, but no guide on how to do this. Let's change that right now!

## Acknowledgements

This solution could not have been possible without an [answer on StackOverflow by Alex](https://stackoverflow.com/a/72855705/2814830). His explanation is the missing guide for importmap-rails and I strongly suggest anyone wanting to use the `importmap-rails` gem to read that post first. Alex not only explains how to use it, but how to think about importmaps and how to debug issue.
Another great resource is [another answer by Alex](https://stackoverflow.com/a/72095996/2814830) on how to configure your gem to add the importmap configuration to a rails app.

🙏Thank you Alex!

## Premise

To get your JS to be importable in your application, we need to tackle two things:

1. Your JS files need to be **accessible in the asset pipeline**. Assuming you do not need or require building, we can use `propshaft` in the rails application.
  * If you do need to build/compile your JS, you'll have to configure that separately  in your gem and configure your target directory to be in `app/assets`
2. Configure the importmap so you have **a name to reference the files**. As a bonus, we will configure that in _the gem_ which gets added to your local importmap configuration during initialization.

Note: I _did not_ find a way to get `pin_all_from` to work. So we will add all files using single pins. Feel free to [open a PR](https://github.com/eirvandelden/gem_with_importmappable_js/pulls) if you _do_ know how to make it work. I'll update this guide and acknowledge your work!

In this tutorial we will call refer to the gem that holds the JS as "MyGem" or "my_gem" and the Rails application is called "ExampleBlog" or "example_blog". Change those names to your own gems name accordingly.

I added a gem and example Rails application on Github to showcase how an implementation works:
- Gem: https://github.com/eirvandelden/gem_with_importmappable_js
- Rails application importing JS from gem: https://github.com/eirvandelden/example-railsapp-importmap-from-gem

Clone both repositories, do a bundle install and run the server. You should see a "hi, i'm your engine" on the root page and "Hello world!" in your browser console, which are defined in `my_gem/app/assets/javascripts/my_gem/index.js` and `my_gem/app/assets/javascripts/hello.js` respectively.

## Step 1: Making your JS files available in the Asset pipeline

First we make sure your gems' JS is available in the asset pipeline of the rails application. I'm going to assume you are using [Propshaft](https://github.com/rails/propshaft) as it is the easiest, no-nonsense, and new way to include assets. If you need but a bundle/compile/build step you can replace it with [jsbundling-rails](https://github.com/rails/jsbundling-rails).

1. Put the js you want to be import-able in `app/assets/javascripts/my_gem`.
    * This is either the code you write OR the result from your buildstep. Or both 😄
    * It is not necessary to use a `my_gem` subdirectory, but it is always smart to keep it in a separate namespace to prevent clashes.
    * In the example gem, we will add a `my_gem/index.js` and exported class `my_gem/hello.js`
```js
// my_gem/app/assets/javascripts/my_gem/index.js
import Hello from "my_gem/hello"

Hello.speak();

document.querySelector("h1").innerText = "hi, i'm your engine";
```

```js
// my_gem/app/assets/javascripts/my_gem/hello.js
export default class Hello {
  static speak() {
    console.log("Hello world!")
  }
}
export { Hello }
```
2. Configure MyGem to add its JS files to the precompile step of ExampleBlog:
```ruby
# my_gem/lib/engine/engine.rb
module MyGem
  class Engine < Rails::Engine
    initializer "my_gem assets precompile" do |app|
      app.config.assets.precompile += %w[my_gem/**/*.js]
    end
  end
end
```

If you haven't already, add your gem to the `Gemfile` of your application and do a bundle install.

Because we are using Propshaft, we can verify if the new files are available:
```console
$  cd example_blog/
$  bin/rails assets:reveal
application.css
my_gem/hello.js
my_gem/index.js
[…]
```

🥳Succes! Now we have files we can link to using importmapping!

## Step 2: Configuring the importmap

Now we can use `importmap-rails` to define names, used in the `import "NAME"` part in your application JS, that will link to our actual digested files, as [explained by Alex](https://stackoverflow.com/a/72855705/2814830).

1. Configure importmap. Include _all files_ you will eventually need.
```rb
# example_blog/config/importmap.rb
pin "my_gem_js", to: "my_gem/index.js"
pin "my_gem/hello", to: "my_gem/hello.js"
```
Note: I've created an `index.js` that will include all our Javascript files, but also contains custom code. It is mapped to `my_gem_js` just as an example, `my_gem/index` or `my_gem` would make more sense.

Note: Within ExampleBlog there is no `import {Hello} from "my_gem/hello"` code, but we do need to pin `my_gem/hello`. That is because `index.js` has that code. If we do not pin `my_gem/hello`, index.js would try to include hello.js and fail to find it.

2. Add the import to ExampleBlog javascript
```js
// app/javascript/application.js
import "my_gem_js"
```

Start your rails app and open it in the browser. Your `h1` tag should have the content "hi, i'm your engine" and the browser console should display `Hello world!`.

### Tip: Verifying the importmap

If the browser is not finding your files, you can run `bin/importmap json` to find all names mapped to files:
```console
$  cd example_blog/
$  bin/importmap json
{
  "imports": {
    "my_gem_js": "/assets/my_gem/index-50e988041f565dfbf53ac38a0ccd6c1bf8b721c4.js",
    "my_gem/hello": "/assets/my_gem/hello-2fbe1d3bc2853188e5a9b67ce12261422b473f44.js",
    "application": "/assets/application-8549a06fc70d18edfd515853eaaf03cc8f7f9bda.js",
    "@hotwired/turbo-rails": "/assets/turbo.min-496b16c15ea6189e995b71b67a2a26b8d8e456ee.js",
    "@hotwired/stimulus": "/assets/stimulus.min-4b1e420eb07f8afa5ce3620fe38b5e2d411bc3ec.js",
    "@hotwired/stimulus-loading": "/assets/stimulus-loading-1fc53fe7a488db9281d2ff88509e8f45d6119ee4.js",
    "controllers/application": "/assets/controllers/application-3affb3895ffcb21cd10ed1f10e8b2588be20737e.js",
    "controllers": "/assets/controllers/index-c3f5d3c4338f2b176f827bf13076b107f0e7766a.js"
  }
}
```

Way easier to verify than running a server 😊

### Optional: Configuring the importmap from your gem

If you are only including a few files, or are in complete control of both gem and rails application, this should suffice. However, we can configure the gem to add the importmap configuration to the rails application. This is a cleaner solution: the gem is responsible for configuration and the rails application only has to import JS.

1. Move the pins we made in `example_blog/config/importmap.rb` to `my_gem/config/importmap.rb`
```ruby
# my_gem/config/importmap.rb
pin "my_gem_js", to: "my_gem/index.js"
pin "my_gem/hello", to: "my_gem/hello.js"
```
2. Include `importmap-rails` as a dependency of your gem
```ruby
# my_gem.gemspec
Gem::Specification.new do |spec|
  # …
  spec.add_dependency "importmap-rails"
end
```
3. Add another initializer to include MyGem's importmap in the rails application

```ruby
# my_gem/lib/engine/engine.rb
require "rails/engine"
require "importmap-rails"

module MyGem
  class Engine < Rails::Engine
    isolate_namespace MyGem

    initializer "my_gem.importmap", before: "importmap" do |app|
      # NOTE: this will add pins from this engine to the main app
      # https://github.com/rails/importmap-rails#composing-import-maps
      app.config.importmap.paths << root.join("config/importmap.rb")

      # NOTE: something about cache; I did not look into it.
      # https://github.com/rails/importmap-rails#sweeping-the-cache-in-development-and-test
      app.config.importmap.cache_sweepers << root.join("app/assets/javascripts")
    end

    initializer "my_gem assets precompile" do |app|
      app.config.assets.precompile += %w[my_gem/**/*.js]
    end
  end

  Gem.loaded_specs["my_gem"].dependencies.each do |d|
    require d.name
  end
end
```

That is it! Verify by running `bin/importmap json` in ExampleBlog or by re-starting the rails server, it all should work. Happy coding!
