---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

permalink: /
title: Home
layout: home
---

<h1 class="page-heading">A Future Roadmap for Sensorimotor Skill Learning for Robot Manipulation</h1>

<p align="center">
    <a href="">[Live Stream Link]</a>
</p>

In recent years, the field of general-purpose robot manipulation has seen exciting progress, showcasing a wide range of success in sensorimotor skill learning. However, unlike research in assembly and logistics manipulations where there are clearly defined, practically/industrially driven tasks to solve, general-purpose robot manipulation research—geared towards everyday situations—lacks community-wise agreement on which robotics tasks are most important to evaluate. To propel this field, our workshop aims to sketch the future roadmap of sensorimotor skill learning for robot manipulation and focuses on the following questions:

<ul>
<li> Which manipulation tasks can today's robots solve, and which tasks are still unsolved? </li>
<li> What are the most important tasks to evaluate in order to advance the field? </li>
<li> What assumptions should we allow when evaluating these tasks? </li>
</ul>


We envision that the workshop will help the manipulation community make progress toward understanding which problems we should focus on to build more generalizable and powerful manipulation robots.


![](assets/img/banner.jpg)

<!-- The theme is quite easy to use if you're familiar with Jekyll. The following collections are implemented:
1. **Speakers**: Curate a [speaker list like this one](speakers) from a set of markdown files, one per speaker. Crops and displays images if available. Adds a short bio. See files in the `_speakers` directory for examples.
2. **Organizers**: Curate an organizer list from a set of markdown files, one per organizer. See files in the `_organizers` directory for examples.
3. **Schedule**: Curate a [schedule like this](schedule) from a set of markdown files, one per event (talk, panel, break, etc.). See files in the `_schedule` directory for examples. Schedule items are sorted by a `sequence_id` attribute.
4. **Papers**: Curate a [list of papers like this](papers) from a bunch of markdown files, one per paper. See files in the `_papers` directory for examples. Papers are sorted by a `sequence_id` attribute if specifed (else they are listed alphabetically).

> **NOTE:** The best way to use these is to turn feature on or off by editing the `collections` attribute in `_config.yml`.

If you experience issues or have cool features to add, feel free to [fork this template](). -->


<section id="speakers">
    <h2 class="mb-3">Speakers</h2>
    <div class="row">
        {% for speaker in site.data.speakers %}
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-img-container mx-auto">
                    <img src="{{ '/assets/img/speakers/' | append: speaker.img }}" class="card-img-top rounded-img mx-auto" alt="{{ speaker.name }}">
                </div>
                <div class="card-body">
                    <h5 class="card-title  text-center"><a href="{{ speaker.webpage }}"> {{speaker.name}} </a></h5>
                    <p class="card-text">{{ speaker.bio }}</p>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</section>

<!-- Call for Papers -->

<section id="papers">
    <h2 class="mb-3">Call For Papers</h2>
    We would like to call for papers on the following topics:
        <ul>
            <li>Topic 1</li>
            <li>Topic 2</li>
            <li>Topic 3</li>
            <li>Topic 4</li>
        </ul>
    Additionally, to encourage discussion on the workshop topic, we ask authors to provide 1~2 paragraphs on how their work relates to the workshop theme. These information will help us organize the workshop discussion and better feature the accepted works on the website. The submission deadline is in:
    <br>
    <br>
    <div class="countdown-container">
    <div class="time-box">
        <span id="days" class="time-number">00</span>
        <span class="time-label">days</span>
    </div>
    <div class="time-box">
        <span id="hours" class="time-number">00</span>
        <span class="time-label">hours</span>
    </div>
    <div class="time-box">
        <span id="minutes" class="time-number">00</span>
        <span class="time-label">minutes</span>
    </div>
    </div>
    
</section>


<section id="schedules">
    <h2 class="mb-3">Schedule</h2>
    <!-- Schedule -->
    <div id="real-time-clock">
    </div>
    <div class = "post-content">
        <div id="timezone-buttons">
        <input type="radio" id="tokyo-time-btn" name="timezone" class="timezone-radio" onclick="selectTokyoTime()" checked>
        <label for="tokyo-time-btn" class="timezone-label">Tokyo Time</label>
        <input type="radio" id="local-time-btn" onclick="selectLocalTime()" name="timezone" class="timezone-radio">
        <label for="local-time-btn" class="timezone-label">Local Time</label>
        <div id="slider"></div>
    </div>
    <table>
        {% for scheduleitem in site.data.schedules %}
        <tr class="schedule-row" data-event-time="{{ scheduleitem.time }}">
            <td class="time-cell" data-tokyo-time="{{ scheduleitem.time }}">
                <!-- Initially shows Tokyo time; will be updated by JavaScript -->
                <p align="center">
                <!-- {{ scheduleitem.time }} -->
                    <div align="center" class="time-display"></div>
                    <div align="center" class="timezone-info"></div>
                </p>
            </td>
            <!-- <td>
                <p align="center">
                    {{ scheduleitem.time }}
                </p>
            </td> -->
            <!-- <td>
                <div class="col-xs-12">
                    <p align="center">
                        {% if scheduleitem.img %}
                            <img class="people-pic" src="{{ scheduleitem.img | prepend: '/assets/img/speakers/' | prepend: site.baseurl | prepend: site.url }}" target="_blank">
                        {% else %}
                            <img class="people-pic" src="{{ 'avatar.jpg' | prepend: '/assets/img/speakers/' | prepend: site.baseurl | prepend: site.url }}" target="_blank">
                        {% endif %}
                    </p>
                </div>
            </td> -->
            <td align="center">
                <div class="col-xs-12">
                    <b>{{ scheduleitem.title }}</b>
                </div>
            </td>
            <td>
                <div class="people-name text-center">
                    <!-- scheduleitem name (link to webpage if provided) -->
                    {% if scheduleitem.speaker_webpage %}
                        <a href="{{ scheduleitem.speaker_webpage }}" target="_blank">{{ scheduleitem.speaker }}</a>
                    {% else %}
                        {{ scheduleitem.speaker }}
                    {% endif %}
                    <br>
                    <!-- scheduleitem affiliation (if provided) -->
                    {% if scheduleitem.affiliation %}
                        {{ scheduleitem.affiliation }}
                    {% endif %}
                </div>
            </td>
        </tr>
        {% endfor %}
    </table>
    </div>
</section>

<!-- Force time display in the table -->
<script>
    selectTokyoTime();
    updateScheduleStyles();
</script>

<!-- Organizers Section -->
<section id="organizers" class="mt-5">
    <h2 class="mb-3">Organizers</h2>
    <div class="row">
        {% for organizer in site.data.organizers %}
        <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
            <div class="card h-100">
                <div class="card-img-container mx-auto">
                    <img src="{{ '/assets/img/organizers/' | append: organizer.img }}" class="card-img-top rounded-img mx-auto" alt="{{ organizer.name }}">
                </div>
                <div class="card-body">
                    <h5 class="card-title  text-center">
                    <a href="{{ organizer.webpage }}">{{ organizer.name }}</a></h5>
                     <h5 class="card-title  text-center">
                    <a href="{{ organizer.affil_link }}">{{ organizer.affil }}</a></h5>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</section>