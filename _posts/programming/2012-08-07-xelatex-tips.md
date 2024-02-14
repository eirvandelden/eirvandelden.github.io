---
layout: post
title: "XeLaTeX Tips"
categories: developing
tags: [latex]
date: 2012-08-07
---

Here are a collection tricks and options for working with (Xe)LaTeX.

Compiling

- Add the '-no-pdf' to speed up the first compile of XeLaTeX
- Run 'latexmk -c' afterwards to delete all auxiliary files
- Use the 'draft' documentclass option to prevent images loading and use 'final' when finished
- Add the '-file-line-error' to show compiler style errors
- To prevent the interactive error mode to activate, run using either '-interaction=nonstopmode' (to try to build a PDF anyway), '-interaction=batchmode' or '-halt-on-error' (when bug  fixing)

Bibliographies

- To create the bibliographies, run 'bibtex filename.aux' on each auxiliary file

Miscellaneous

- Run texdoc to get documentation on a command
- Use 'texcount filename.tex' to get a word count
- To strip a file from all latex command use ‘detex filename.tex’
- To automate everything from building a tex file, use "latexmk -pdf -e '$pdflatex=q/xelatex %O %S/' foo.tex" (this uses xelatex)
