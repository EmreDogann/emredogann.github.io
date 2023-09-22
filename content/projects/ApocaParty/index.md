---
title: "ApocaParty"
date: 2023-09-15T02:28:44+01:00
summary: "Chaotic party planner game for<br>**Summer Slow Jams 2023: Narrative**"
cascade:
    showReadingTime: false
    showWordCount: false
tags: ["Gameplay", "Game Jam", "Unity", "C#"]
weight: 50

layout: projectSingle

itchPage: https://ayperosia.itch.io/apocaparty
githubPage: https://github.com/EmreDogann/ApocaParty

showcaseRegex: "images/Showcase*.png"	# Regex for images to show on page

project:
    status: completed			# valid options: completed, ongoing, stopped
    type: gamejam				# valid options: university, personal, gamejam
    duration: "2 Weeks"
    software: ["Unity"]
    languages: ["C#"]
    role: ["Gameplay Designer", "Gameplay Programmer"]
---
<!-- {{< github repo="emredogann/apocaparty" >}} -->

<!-- {{< carousel images="images/*" aspectRatio="16-9" >}} -->

### Overview

Apocaparty is a 2D strategy-lite and time management game inspired by the likes of [Diner Dash](https://en.wikipedia.org/wiki/Diner_Dash) made during [Summer Slow Jams 2023: Narrative](https://itch.io/jam/ssjnarrative).

You play as Cthulhu, tasked with organizing and managing {{< tooltip "Azathoth's waking up party" "According to Lovecraft lore, reality is Azathoth’s dream, and when it wakes up the “true reality” asserts itself and the one we know of ceases to exist." >}}. Keep your guests, the four horsemen of the apocalypse, happy by fulfilling all their demands before the timer runs out and Azathoth awakens.

### Contributions

For this game, I was tasked with implementing the main game mechanics:

- UI
- Interaction & Controls
- Audio Playback
- AI
- Event Scripting
  - Tutorial
  - Win/Lose State

I also helped develop other mechanics such as:

- Dialogue System

#### Guests

The gameplay loop focuses on constantly pressuring the player by overwhelming them with guest demands/needs. Guests can make different requests, which the player must fulfill in order to keep them happy.

For the guest AI, I took inspiration from [Needs-Based AIs](http://www.zubek.net/robert/publications/Needs-based-AI-draft.pdf) implemented in games such as The Sims. Each guest has a set of metrics (such as hunger and thirst) that continually tick down and can also be influenced by external events occurring in the game world (e.g. power outage).

Requests can only be fulfilled by the player completing a set of actions. Instead of hardcoding these actions, I implemented a simple [Action List](https://allenchou.net/2012/07/action-lists-they-are-cooler-than-commands/). These action lists are integrated into the editor via a custom editor script, allowing for designers on the team to create new actions lists on the fly using predetermined building blocks.

{{< figure
    src="images/ActionList.png"
    alt="Action List for Drink Refills"
    caption="Action List for Drink Refills."
	scale=0.6
	optimize-image=true
>}}

#### UI

I created a UI system that allowed us to quickly spin-up UI views and link them together to create pause menus but was also used for the dialogue system's UI to great success.
The system works similar to layers in a photo manipulation software, with it keeping track of a stack of UI views it can navigate. Views have hooks for when they are popped and pushed from the stack, allowing for functionality such as transition animations.

#### Event Scripting

This was a difficult part of the project. Once we made an MVP, we quickly realized that the mechanics were too convoluted and therefore people had trouble figuring out what to do. We tackled this by stripping out a lot of mechanics and simplifying the gameplay loop to make it easier to digest. Along with that, we also decided to create a tutorial for the game to help ease players in.

I went back and forth with the game designers a lot to decide the best ways the convey information to the player without making the tutorial too hand-holdy, as was a worry the rest of the team had from their past game jams.

All the tutorial scripting was done using Unity's timeline system & API. Custom playables were created to facilitate the experimentation of the tutorial. Such playables included:
- Controlling sprite sorting order.
- Controlling interactable object states.
- Controlling AI.
- Integration into the project's dialogue system developed by fellow programmers.
- Text popup with animation and audio.

{{< figure
    src="images/TutorialTimeline.png"
    alt="The Unity Timeline for the game's tutorial."
    caption="The tutorial timeline sequence."
	optimize-image=true
>}}