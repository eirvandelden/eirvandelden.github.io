---
layout: two-col
title: "🏰The History of Deneki"
modified: 2015-11-14
categories: dungeons-and-dragons
excerpt: "The History for the world we play in for D&D."
tags: [5e, Campaign-NeverWinter Nights, Deneki]
comments: true
---

This is the history for our D&D World "Deneki". This history will slowly be expandend with new content, both from players and the DM.

{% assign history = site.dnd-events | sort: 'dr-date' %}
{% for event in history reversed %}

  {% capture this_full_date %}{{ event.dr-date }}{% endcapture %}
  {% capture next_full_date %}{{ event.previous.dr-date}}{% endcapture %}
  {% assign this_full_array = this_full_date | split: '-' %}
  {% assign this_year = this_full_array[0] %}
  {% assign this_month = this_full_array[1] %}
  {% assign this_day = this_full_array[2] %}
  {% assign next_full_array = next_full_date | split: '-' %}
  {% assign next_year = next_full_array[0] %}

{% capture year_title %}
{% case this_year %}
  {% when '66016' %}## {{this_year}} _Year of Thran Invasion_
  {% else %} ## _{{this_year}}_
{% endcase %}
{% endcapture %}

{% capture date_title %}
{% case this_month %}
  {% when '01' %}#### _{{this_day}} of Hammer<sup>1</sup>_ {{event.title}}
  {% when '02' %}#### _{{this_day}} of Alturiak<sup>2</sup>_ {{event.title}}
  {% when '03' %}#### _{{this_day}} of Ches<sup>3</sup>_ {{event.title}}
  {% when '04' %}#### _{{this_day}} of Tarsakh<sup>4</sup>_ {{event.title}}
  {% when '05' %}#### _{{this_day}} of Mirtul<sup>5</sup>_ {{event.title}}
  {% when '06' %}#### _{{this_day}} of Kythorn<sup>6</sup>_ {{event.title}}
  {% when '07' %}#### _{{this_day}} of Flamerule<sup>7</sup><sub>summer</sub>_ {{event.title}}
  {% when '08' %}#### _{{this_day}} of Eleasis<sup>8</sup>_ {{event.title}}
  {% when '09' %}#### _{{this_day}} of Eleint<sup>9</sup>_ {{event.title}}
  {% when '10' %}#### _{{this_day}} of Marpenoth<sup>10</sup>_ {{event.title}}
  {% when '11' %}#### _{{this_day}} of Uktar<sup>11</sup>_ {{event.title}}
  {% when '12' %}#### _{{this_day}} of Nightal<sup>12</sup>_ {{event.title}}
  {% else %}#### {{this_day}} of {{this_month}} _{{event.title}}_
{% endcase %}
{% endcapture %}


{% if forloop.first %}
{{year_title}}
{% endif %}

{% if this_year != next_year %}
{% if next_year.present? %}
  {{year_title}}
{% endif %}
{% endif %}

{{date_title}}

  {{event.content}}

{% endfor %}


### Spring

- PC(s) that start adventuring: _Crow, Fairuza, Moras, Quinthia, Zaldar_
- The Hero's Academy of Neverwinter was attacked. Only a few students survived, including; _Crow, Fairuza, Moras, Quinthia, Zaldar_
- The survivors of the Academy's slaugther found out that Seldra de Tylmarande was behind the Wailing Death. While the plague was stopped, Seldra escaped.
- Seldra de Tylmarande, twin-sister of Lady Aribeth de Tylmarande, was chased into the outskirts of Menzoberranzan by the Heroes of Neverwinter. There they have caught, interrogated and killed Seldra.

## 66015 _Year of the Wailing Death_

### Summer

- A deadly plague, broke out in Neverwinter, called the _"Wailing Death"_
- Neverwinter calls out to any would be Hero to do a quickend training at the Hero's Academy and then find a solution to the _Wailing Death_


## 65753 _Year of the Gnome Banishment_

- The Warforged won the war and exiled the Gnomes from their homeland, claiming it as their own. The Gnomes now wonder the world in search of a new home, or a new army.


## 65752 _Year of the War for Existence_

- The Warforged view themselves as enslaved by the Gnomes. The Gnomes feared the newfound sentience of the Warforged and tried to destroy the Warforged.

## 65723 _Year of Metallic Servants_
- The Gnomes have an affinity for artifice, the creation of mechanics and mechanical creatures. They created the Warforged, a race of machines.


