---
# Project Info
title: "{{ replace .Name "-" " " | title }}"
type: "projects/personal"
summary: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}

# Page Settings
draft: true
cascade:
    showReadingTime: false
    showWordCount: false

#  Layout
weight: 999
layout: projectSingle

# External Links
itchPage: {{ urls.JoinPath .Site.BaseURL (path.Join .File.Path "") }}
githubPage: {{ urls.JoinPath .Site.BaseURL (path.Join .File.Path "") }}
---
