---
title: "Clown Panic"
type: "projects/personal"
date: 2023-09-22T03:34:42+01:00
summary: "Puzzle Horror game <br>**Go Godot 3 Game Jam**"
cascade:
    showReadingTime: false
    showWordCount: false
tags: ["Game Jam", "Godot", "C#", "GDScript"]
weight: 60

layout: projectSingle

itchPage: https://aumpatel2208.itch.io/clown-panic
githubPage: https://github.com/EmreDogann/ClownPanic

showcaseRegex: "showcase/image*.*"	# Regex for images to show on page

project:
    status: completed			# valid options: completed, ongoing, stopped
    type: gamejam				# valid options: university, personal, gamejam
    duration: "2 Weeks"
    software: ["Godot"]
    languages: ["C#", "GDScript"]
    role: ["Gameplay Designer", "Gameplay Programmer", "Audio Designer"]
---

\
{{< youtube MokDronndFU >}}

### Overview

ClownPanic is a 2D puzzle-horror game made during [Go Godot Jam 3](https://itch.io/jam/go-godot-jam-3).

Your computer is infected with a virus and you must try it find it on your filesystem and delete it, only this is no ordinary virus.

This was my first time working with Godot (v3.5 for this project). With a background primarily rooted in Unity, it was very interesting to see how the two engines differed with regards to philosophies and opinions about workflow and development. One aspect that particularly stood out to me was Godot's embrace of a web-inspired approach to UI, which significantly streamlined the UI development process compared to Unity's immediate-mode GUI.

While we appreciated GDScript for its Python-like syntax, we encountered limitations in its flexibility when attempting to create a mini filesystem for the project. Fortunately, Godot's support for mono allowed us to integrate a more traditional programming language, C#, for this purpose.

### Contributions

For this game, I worked on:

- UI
- Level Progression
- Interaction
- Audio
- Win/Lose State
- Visual Effects

#### Audio

A significant aspect of this game was to immerse players in the experience of using a computer. To achieve this goal, we meticulously replicated details like mouse clicks and keyboard presses, while also fine-tuning the audio to recreate a more expansive sound environment.

#### UI

UI was another aspect we paid close attention to. We wanted to harken back to the days of Windows XP where you would find viruses on browser bars, little mascots dancing in the corner of your screen, and more malicious variants. Using many references available online, I was able to closely emulate both the visuals of the OS as well as the experience of using it.

In the end I ended up writing a small window manager that allows for the movement, opening and closing of windows to facilitate windows popping up to block the player's mouse clicks, like what would have been done by viruses in that era.

The UI was then integrated with the mini file system that was written by my teammate to create the file explorer window in the game.