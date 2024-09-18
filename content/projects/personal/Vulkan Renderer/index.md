---
title: "Vulkan Renderer"
type: "projects/personal"
date: 2023-09-15T02:28:44+01:00
summary: "Hybrid graphics renderer made using Vulkan & C++"
cascade:
    showReadingTime: false
    showWordCount: false
tags: ["University", "Graphics", "Vulkan", "C++"]
weight: 10

layout: projectSingle

githubPage: https://github.com/EmreDogann/Aspen-Renderer

showcaseRegex: "showcase/image*.*"	# Regex for images to show on page

project:
    status: ongoing			# valid options: completed, ongoing, stopped
    type: ["university", "personal"]			# valid options: university, personal, gamejam
    duration: "~2 Months"
    software: ["Vulkan"]
    languages: ["C++", "GLSL"]
    role: ["Graphics Engineering"]
---

\
{{< youtube M0vNy-uLXKw >}}

### Overview

For my final university project, I decided to create a simple Vulkan renderer from scratch using C++. This was coming off of the OpenGL work I had done in [Space Rider]({{< relref "Space Rider" >}}) for my Computer Graphics university module.

### Features

- Hybrid Renderer (Rasterization + Ray traced features such as Shadows, Reflections and Refractions)
- UI through ImGUI
- Mouse Picking
- Scene Manipulation via ImGuizmo

My main motivation for this project was to experiment with hardware ray-tracing. Along the way, I was exposed to the many challenges such as: how to effectively architect a graphics renderer to minimize technical debt and scope, management of memory resources, and CPU-GPU synchronization.

For the initial version, due to time constraints from this project's report write-up as part of the University's final project module (as well as other university courses I was taking at the time), many of the features were not in a place I was happy with and as a result could do with some improvement.

While I was not a complete stranger to graphics programming when starting development of this project, I underestimated the jump in complexity going from OpenGL to Vulkan would be. Many concepts in Vulkan took a while to wrap my head around and so rewrites of parts of the renderer were common. However, looking back in retrospect, it was an important part of my journey in graphics programming as it gave me a view into just far the rabbit hole could go (and even further beyond). Needless to say, the experience gained from this project only further cemented my love for graphics programming.

This was also my first time trying to build a C++ application from scratch, instead of being given a starting point to work off of. This meant understanding build toolchains and tools such as CMake to streamline this process.

Currently, I am in the process of re-writing this renderer, taking the lessons I learnt and the hardships I faced from the initial attempt into consideration.
