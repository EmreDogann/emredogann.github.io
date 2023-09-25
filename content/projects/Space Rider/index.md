---
title: "Space Rider"
date: 2023-09-22T03:36:54+01:00
summary: "A short on-rails driving game used to explore graphics concepts."
cascade:
    showReadingTime: false
    showWordCount: false
tags: ["University", "Graphics", "C++", "OpenGL"]
weight: 30

layout: projectSingle

githubPage: https://github.com/EmreDogann/Space-Rider

showcaseRegex: "showcase/image*.*"	# Regex for images to show on page

project:
    status: completed			# valid options: completed, ongoing, stopped
    type: university			# valid options: university, personal, gamejam
    duration: "1-2 Month"
    software: ["OpenGL"]
    languages: ["C++", "GLSL"]
    role: ["Graphics Engineering"]
---

\
{{< youtube OkYC7JHOyzM >}}

### Overview

Space Rider is racing game made for the purpose of my Computer Graphics university module.

The purpose of this project was to explore different graphics ideas and techniques in OpenGL, commonly used in real-time rendering. The subjects explored in this project were as follows:

- Shadow Mapping (Omni-directional/Point shadows)
- Multi-texturing (albedo, roughness, emissive maps)
- Environmental Mapping (Cubemap reflections)
- Instanced Rendering
- Bloom
- Vertex Displacement Animations

This project was my second time using OpenGL<!-- Mention and link to VIGIl here -->, this time the project was focused more on working with OpenGL to achieve certain effects all in the context of building out a simple racing game. We were given a base to start from, mainly Window creation via Win32 API, font rendering via [FreeType](https://freetype.org/), and .obj model imports via [assimp](https://github.com/assimp/assimp).

#### Bloom

One effect of note if the Bloom implementation. At first, the implementation mirrored the one listed out in [LearnOpenGL](https://learnopengl.com/Advanced-Lighting/Bloom). However, I was unhappy with the end result, leading to something that felt very unnatural. As I was going for a retrowave aestheic, with lots of bright neon lights, this meant a lot of the image would consist of some form of bloom and especially for big light emitters in the scene (such as the Sun), the bloom effect was not very convincing.

So, I did a little bit of research and came across this bloom implementation by [Jorge Jimenez](https://www.iryoku.com/next-generation-post-processing-in-call-of-duty-advanced-warfare) at SIGGRAPH 2014. In the end, after some tweaking of bloom values, the effect was much closer to what I had envisioned.

That is not to say I did not run into issues along the way. For example, rounding errors of image resolutions during downscaling/upscaling of the bloom image lead to an offset accumulated final bloom image.

{{< figure
    src="assets/BuggedBloom.png"
    alt="Final Bloom image before composition & tone mapping."
    caption="Final Bloom image before composition & tone mapping."
	scale=2
	optimize-image=true
>}}

Finding the issue of rounding errors took some time, as I was still new to graphics development at the time, I was trying more traditional debugging techniques to solve the issue. After being unsuccessful on that front, I found out about graphics debuggers such as [RenderDoc](https://renderdoc.org/). Using this, I was very quickly able to find the issue and resolve the rounding errors in the code.

{{< figure
    src="assets/CorrectBloom.png"
    alt="Final bloom image before composition & tone mapping."
    caption="Fixed bloom image."
	scale=2
	optimize-image=true
>}}