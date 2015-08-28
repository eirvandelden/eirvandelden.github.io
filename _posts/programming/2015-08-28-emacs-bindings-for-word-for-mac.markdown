---
layout: post
title: "Emacs Bindings for Word for Mac"
modified:
categories: programming
description: 'How to enable Emacs shortcuts in MS Word for Mac'
tags: [tips]
image:
  feature:
  credit:
  creditlink:
comments:
share:
date: 2015-08-28T13:29:28+02:00
---

I use Readline bindings (also known as E-Macs binding) on a daily basis. 

They are supported in all Cocoa applications. They’ve been there for ages and I’ve used them since day one. Even some non-cocoa applications support them, though not all. Recently that was Microsoft Word 2011 for Mac.
After some researching, I’ve found out how to make keyboard shortcuts in MS Word, so I can use Word, just like I expect. Here’s how:

In MS Word 2011 for Mac go to:

- `Tools` > `Customize Keyboard`
- Select `All Commands` under `Categories:`
- Select the command under `Commands:`. 
- Press the keyboard shortcut in the `Press new keyboard shortcut` box
- Click the `Assign` button

The commands I use are:

- **Ctrl+e** `EndOfLine`
- **Ctrl+a** `StartOfLine`
- **Ctrl+p** `LineUp`
- **Ctrl+n** `LineDown`
- **Ctrl+b** `CharLeft`
- **Ctrl+f** `CharRight`
- **Ctrl+k** `DeleteToEndOfLine` (as a macro)
- **Ctrl+k** `TransposeCharacters` (as a macro)

Two of my favourite commands are missing as default commands:
- `DeleteToEndOfLine` to delete the rest of the line and,
- `TransposeCharacters` transposing two characters. 

We have to implement them as macro’s, which follow the same steps as above (just replace Categories with Macro’s). Here are the macros:

{% highlight vbnet %}
Sub TransposeCharacters()
    Selection.MoveLeft Unit:=wd Character, Count:=1, _
      Extend:= wdExtend
    Selection.Cut
    Selection.MoveRight Unit:= wdCharacter, Count:=1
    Selection.Paste
    Selection.MoveLeft Unit:= wdCharacter, Count:=1
End Sub
{% endhighlight %}

{% highlight vbnet %}
Sub DeleteToEndOfLine()
  Selection.MoveEnd Unit:= wdLine
  If Selection.Characters.Last = vbCr Then
    Selection.MoveEnd Unit:= wdCharacter, Count:=-1
  End If
  Selection.Text = ""
End Sub
{% endhighlight %}
