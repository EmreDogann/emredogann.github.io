---
title: "Ghostbusters: Rise of The Ghost Lord"
type: "projects/professional"
date: 2024-09-17T02:28:44+01:00
summary: "Multiplayer Virtual Reality FPS in the Ghostbusters universe"
cascade:
    showReadingTime: false
    showWordCount: false
tags: ["nDreams", "Graphics", "Unreal Engine", "C++"]
weight: 50

layout: projectSingle

showcaseRegex: "showcase/image*.*"	# Regex for images to show on page

project:
    company: [nDreams]
    software: ["Unreal Engine 4", "Render Doc"]
    languages: ["C++"]
    role: ["Graphics Programmer"]
---

<!-- {{< carousel images="images/*" aspectRatio="16-9" >}} -->

### Overview

I joined nDreams just after the release of **Ghostbusters: Rise of The Ghost Lord**. I remained on the project to work on the additional updates/DLC packs for the game including:
- Heist and Seek Update
- Infestation Update
- Slimer Hunt DLC
- Frozen Empire DLC

Coming from a Unity background I spent some time getting to grips with Unreal Engine 4 and familiarizing myself with the rendering backend. I was responsible for:
- PSO Caching for each update to ensure a first-time hitch free experience for players.
- Implementing UI to effectively communicate PSO pre-compilation to the user.
- Profiling to identify performance hotspots/hitches within levels.
- Various gameplay bug fixes and crash fixes.

## PSO
Before every update including content additions or changes, I was tasked with playing through the game to accumulate a PSO cache that could be shipped to players.

An **automatic PSO caching map** was created to help speed up the process of PSO caching by rendering every **vfx, mesh material + mesh permutation** in the asset database. But, there were still missed PSOs that needed to be collected by manually playing through the game. In addition to this, later in development of the post-launch content, Quest 3 support was added to the game. As part of this, several graphical enhancements were made to the Quest 3 version, thereby requiring **two separate PSO caches** (one for Quest 2 & one for Quest 3).

As the game grew with subsequent DLCs/updates, the number of PSO permutations that needed to be captured exploded in size. Therefore I was given the responsibility of guiding a small group to assist me in the manual PSO caching process. With this group plus the automatic PSO caching map, the game was able to achieve a **smooth 90 fps with minimal hitching** (using Application Space Warp).

## UI
Due to the large number of PSO permutations, the final PSO cache was fairly large. We were receiving reports from players of long initial load times after every update. My solution for this was to create a "Shader Compiling" screen which would communicate to the player the progress remaining on the PSO pre-compilation. Along with this, I **temporarily boosted CPU clock speeds** during this compilation period.

## Profiling
Another part of my responsibilities was to crawl through the game to find potential performance issues that could lead to motion sickness for the player. I did this mainly using **Unreal Insights**. Render Doc was not used as much due to the majority of the performance issues with the game residing in the CPU domain.

## Crash/Bug Fixes
When I had run out of graphics related tasks to do, I took the initiative and helped the gameplay team with bug fixes and crashes that were either already documented on our Jira space, or more obscure ones caught by our [Sentry](https://sentry.io/welcome/) instance running on live builds.