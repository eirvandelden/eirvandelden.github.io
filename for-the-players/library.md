---
layout: two-col
title: "📚Library"
categories: dungeons-and-dragons
tags: [5e, 4e]
published: true
dnd_theme: true
---

These are Dungeons & Dragons books & accessories that I own. If we play at my place, they are at your disposal.

<div data-controller="library">

<div class="book-filters">
  <button class="book-filter-btn active" data-library-target="filterBtn" data-action="click->library#filter" data-filter="all">All</button>
  <button class="book-filter-btn" data-library-target="filterBtn" data-action="click->library#filter" data-filter="5e">5e</button>
  <button class="book-filter-btn" data-library-target="filterBtn" data-action="click->library#filter" data-filter="4e">4e</button>
  <button class="book-filter-btn" data-library-target="filterBtn" data-action="click->library#filter" data-filter="3e">3e</button>
  <button class="book-filter-btn" data-library-target="filterBtn" data-action="click->library#filter" data-filter="2e">2e</button>
  <button class="book-filter-btn" data-library-target="filterBtn" data-action="click->library#filter" data-filter="third-party">3rd Party</button>
  <button class="book-filter-btn" data-library-target="filterBtn" data-action="click->library#filter" data-filter="wanted">Wanted</button>
</div>

{% assign owned_books = site.data.books | where: "status", "owned" %}
{% assign owned_editions = owned_books | map: "edition" | uniq %}

{% for edition in owned_editions %}
{% assign edition_books = owned_books | where: "edition", edition %}
<div class="book-section" data-library-target="section" data-edition="{{ edition }}">
  <h2 class="book-edition-header">
    {%- case edition -%}
    {%- when "5e" -%}5th Edition
    {%- when "4e" -%}4th Edition
    {%- when "3e" -%}3rd Edition
    {%- when "2e" -%}2nd Edition
    {%- when "third-party" -%}Third Party
    {%- else -%}{{ edition }}
    {%- endcase -%}
  </h2>
  <div class="book-grid">
    {% for book in edition_books %}
    <div class="book-card" title="{{ book.title }}">
      <img src="{{ book.cover }}" alt="{{ book.title }}">
    </div>
    {% endfor %}
  </div>
</div>
{% endfor %}

{% assign wanted_books = site.data.books | where: "status", "wanted" %}
<div class="book-section" data-library-target="section" data-edition="wanted">
  <h2 class="book-edition-header">Wanted</h2>
  <div class="book-grid">
    {% for book in wanted_books %}
    <div class="book-card wanted" title="{{ book.title }}">
      <img src="{{ book.cover }}" alt="{{ book.title }}">
    </div>
    {% endfor %}
  </div>
</div>

</div>

{% include library-stimulus.html %}
