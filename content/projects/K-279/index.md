---
title: "K-279"
date: 2023-09-15T02:28:44+01:00
summary: "Short atmospheric Horror game for<br>**1-Bit Game Jam**"
cascade:
    showReadingTime: false
    showWordCount: false
tags: ["Graphics", "Game Jam", "Unity", "C#"]
weight: 40

layout: projectSingle

itchPage: https://emredogan.itch.io/k-279
githubPage: https://github.com/EmreDogann/K-279

showcaseRegex: "showcase/image*.*"	# Regex for images to show on page

project:
    status: ongoing			# valid options: completed, ongoing, stopped
    type: gamejam			# valid options: university, personal, gamejam
    duration: "1 Week"
    software: ["Unity"]
    languages: ["C#", "HLSL"]
    role: ["Graphics Engineer", "Gameplay Programmer", "Gameplay Designer"]
---

### Overview

K-279 is a 1D atmospheric horror game made during the [1-Bit Game Jam](https://itch.io/jam/1-bit-jam-wow).

You wake up in a soviet submarine in disrepair and must solve puzzles to figure out why you're there and how to escape.

The team was comprised of 2D & 3D artists, Audio Engineers, and programmers. With this being one of the first times working on a game with artists/audio designers, I learned a lot in terms of how to communicate with teammates coming from different professions with vastly different vocabulary. When communication was troublesome at times, we found that creating a quick prototype to show instead of tell, was the most effective.

### Contributions

For this game, I worked on:

- Interaction system (Doors, items)
- Audio Soundscape
- Visual Effects (Shooting, camera sway)
- 1-Bit Graphical Effect

#### 1-Bit limitation

The 1-Bit restriction posed many interesting problems during development that we had not expected. For example, we used a UI fade-to-black overlay to hide the transition between rooms. However, we later realized this violated the 1-Bit challenge as the black overlay would additively combine with colors in the level to create an image that was no longer 1-bit.

As a result, we had to redesign that system from a UI-based fade to black, to one that was more tightly integrated into the level. We tried many solutions but in the end settled for dimming all the lights in the level to black, then returning them back to their original intensity once the level transition was finished. This solution granted us the ability to control all the lights in a room, allowing us to also play with light intensities for specific scripted sequences.

#### 1-Bit Dither

We decided early on that we wanted to base the game inside a submarine. We also agreed on a more atmospheric horror experience. These requirements meant that we had to focus on making the submarine levels feel lived in and immersive. At that time we were using a simple thresholding shader to achieve our 1-bit look, as the team was building out the art assets and designing the levels, we found that we were unable to reach a high enough level of detail and density in the level due to the harsh cutoffs from the thresholding effect making it difficult to discern details in and around objects.

I spent some time researching how other games with similar 1-bit restrictions overcame these problems. I quickly came across [Return of the Obra Dinn](https://obradinn.com/) (RotOD) and was immediately hooked. Luckily, Lucas Pope, the creator of RotOD, posted a [very extensive write-up](https://forums.tigsource.com/index.php?topic=40832.msg1363742#msg1363742) on the theory behind the effect.

Following in his footsteps, I managed to create a close enough approximation, but quickly ran into swimming artifacts as I was unable to fully recreate the spherical projection mapping he employed for RotOD.

{{< figure
    src="assets/DitherSwimming.gif"
    alt="Dither effect showcasing swimming artifacts."
    caption="First iteration of the dither effect. Showcasing swimming artifacts."
	scale=1.5
	optimize-image=true
>}}

A lot of the work Lucas Pope put into his dither effect was to counteract rotational dither swimming/artifacts. However, due to the nature of our game, we were only dealing with positional camera movement on the XY plane (with very minimal rotation, reserved for elements like camera shake). With the effect done in screen space, we found that the effect still made it difficult to distinguish details in the environment.

{{< figure
    src="assets/DitherScreenSpace.gif"
    alt="Screen-space Dither effect."
    caption="1-bit dither effect. Using Screen-space."
	scale=1.5
	optimize-image=true
>}}

Looking back at some of my past projects, I realized we could circumvent the swimming altogether in this project by projecting the dither pattern to world space using Tri-planar mapping.

The Tri-planar mapping was not as straight forward to implement as I had initially thought due to the fact that we were attempting this on a fullscreen shader. Tri-planar mapping requires world-space position and normals to work, which we don't have access to in a fullscreen shader pass. Luckily, in recent versions of URP (10.x+), we have access to `ScriptableRenderPassInput.Normal` in renderer features. This adds a DepthsNormals prepass which we can then sample in our dither shader like so:

```HLSL
// At the top of the pass...
#include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/DeclareNormalsTexture.hlsl"  // For SampleSceneNormals()

...

// In fragment shader...
// 'ScriptableRenderPassInput.Normal' gives us world-space normals,
// so we don't need to do any space converstions.
float3 normalWS = SampleSceneNormals(UV);
```

The other piece we need is the world-space position of our fragment, which we once again don't have in a fullscreen shader. But, we can reconstruct it from the camera depth texture like so:

```HLSL
// At the top of the pass...
#include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl" // For ComputeWorldSpacePosition()
#include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/DeclareDepthTexture.hlsl" // For SampleSceneDepth()

...

// In fragment shader...
float2 UV = input.positionHCS.xy / _ScaledScreenParams.xy;
// Sample the depth from the Camera depth texture.
real depth = SampleSceneDepth(UV);

float3 worldPos = ComputeWorldSpacePosition(UV, depth, UNITY_MATRIX_I_VP);

```

With both these values, we can now perform tri-planar mapping like normal {{< superSmall "(pun intended)" >}}. In the end, we end up with the effect below:

{{< figure
    src="assets/DitherWorldSpace.gif"
    alt="World-space Dither effect."
    caption="1-bit dither effect. Using Tri-planar projection."
	scale=1.5
	optimize-image=true
>}}

While this effect worked great for our purposes, there are some issues as can be seen in the animations above:

- A moiré pattern appears throughout the effect, more visible on surfaces facing perpendicular to the camera. I suspect this might be an issue with mipmapping but will have to explore this idea further.
- Pixel aliasing due to the small (and sometimes half-) pixels.

I mitigated both of these issues by using TAA to "soak" up the moiré patterns, pixel aliasing, and half-pixel problems. TAA also had the added benefit of adding a "graininess" to the image with how it plays with the dithering effect, which suits the game's aesthetic. While not a silver bullet to the listed problems, I am overall very pleased with the final result:

{{< figure
    src="assets/DitherFinal.gif"
    alt="Final Dither effect."
    caption="Final 1-bit dither effect."
	scale=1.5
	optimize-image=true
>}}

Below are some additional captures throughout development:

<div id="img-gallery" data-packery='{ "percentPosition": true, "gutter": 10, "resize": true }'>
  {{< glightbox src="https://media.giphy.com/media/0bqOQs1H8kqngqId4Y/source.gif" class="grid-w50" gallery="extras" title="Playing around with under-grate lighting." >}}
  {{< glightbox src="https://media.giphy.com/media/MYj2nSJ0Zyt6hvtqR8/source.gif" class="grid-w50" gallery="extras" title="Testing alarm light state." >}}
  {{< glightbox src="https://media.giphy.com/media/1JMuoRlybmIr6O4szW/source.gif" class="grid-w50" gallery="extras" title="Incorrect depth reconstruction for dither shader." >}}
  {{< glightbox src="https://media.giphy.com/media/xjqAO6EXiGj6Srt1PV/source.gif" class="grid-w50" gallery="extras" title="Object normal maps working with dither effect." >}}
  {{< glightbox src="./assets/LevelLayout.png" class="grid-w50" gallery="extras" title="Early level layout before dither effect." >}}
</div>