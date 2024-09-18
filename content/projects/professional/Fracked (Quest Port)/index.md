---
title: "Fracked (Quest Port)"
type: "projects/professional"
date: 2024-09-17T03:28:44+01:00
summary: "Port of Fracked from PSVR 1 to Quest 2/3"
cascade:
    showReadingTime: false
    showWordCount: false
tags: ["nDreams", "Graphics", "Unreal Engine", "C++"]
weight: 50
draft: true

layout: projectSingle

showcaseRegex: "showcase/image*.*"	# Regex for images to show on page

project:
    company: [nDreams]
    software: ["Unreal Engine 4", "Unreal Insights", "Render Doc"]
    languages: ["C++"]
    role: ["Graphics Programmer"]
---

The port of Fracked to Quest 2/3 was a very ambitious one primarily due to the small team size (5 people at its largest) and the fact that the game was designed first and foremost for PS4.

My responsibilities morphed as the project progressed. Below is a list of responsibilities split into the different phases of the project.

#### Pre-production:
- Identify the main areas of optimization work that would be required. What graphical features could be brought over and what features would need to be cut.
- Initial performance profiling pass on Quest 2 to identify the worst-case views and areas.
- Write-up of my findings from the pre-production investigation to hand off to the production team.

#### Production:
- Disable graphical features which would not be feasible on a mobile platform like Quest 2 (volumetric effects, heavy full screen FX like bloom, sobel outlines, sun flares etc.)
- Port of some effects to mobile friendly Vulkan subpasses (color grading, tonemapping, tinting, fade to black, etc.)
- Optimization of master materials; baking material effects to textures where possible.
- Optimization and cleanup of geometry.
- Frequent performance profiling.
- Various gameplay bug & crash fixes.
- PSO caching & Shader Compiling UI screen implementation.

## Pre-Production
I was brought onto the project at the start in order to help identify the bulk of the optimization work that would be required along with the people needed for said work.

In the initial discussions it was expressed that the port would target **72 fps native** (with dynamic resolution) on Quest 2.

I began with an initial performance profiling pass using **OVR Metrics** plus **Unreal Insights** and quickly identified that the game's rendering pipeline was bottlenecked from very high draw calls (in the 1000+ draw call range). Meta's official [documentation](https://developers.meta.com/horizon/documentation/unity/unity-perf/#draw-calls-on-meta-quest) suggests a 200-300 draw call range for Quest 2 for a medium simulation. With the help of **Precomputed Visibility**, **Hierarchical LODS** and **Cull Distance Volumes** we were able to reduce this number down to 400-700 draw calls (any further reduction was difficult to achieve due to the level design and lack of an environment artist to fully optimize geometry).

With this, OVR Metrics still showed **high GPU App Time** with **high GPU usage**, indicating that the application was **GPU limited**. To further diagnose this I took several **Render Doc** captures from a few of the most expensive views in the game. The general capture statistics (draw calls, GPU render time) were recorded in a spreadsheet along with performance counters from the most expensive draw calls (instruction counts, texture reads, wave occupancy, etc.) to indicate what the most expensive materials/objects were in the scene.

My findings from this profiling pass was collated into a document that was used to help identify the resources that would be required to complete this port.

## Production
After the team was formed from the findings of the pre-production, we began work on the bulk of the optimization. The most obvious place to start was disabling features that we knew would not be possible to replicate on Quest 2 at the 72fps native target such as volumetric effects, sun flares, bloom, full screen sobel outline filters, and other full screen post processing effects.