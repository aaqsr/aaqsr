---
layout: page.njk
redirect_from: [/488, /cs488]
---

# CS 488: Computer Graphics

## Final Project

This was quite the intense project since it was done from near scratch in C++ (our only dependency was a barebones linear algebra library, along with a windowing library).
My partner (Palaksha Drolia) and I spent about a month writing over 7000 lines of code, 
with me handling the multithreading and water simulation, and him handling the rigid body simulation.
Coupling the two was an intense process that took us both many hours of debugging.

I am quite proud of the results that you can see in the demo video below,

<div class="video-container">
<iframe
    src="https://www.youtube.com/embed/6L5K9m5ZTMM?start=103&autoplay=1&mute=1&vq=hd2160"
    title="YouTube video player"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen>
</iframe>
</div>

The source for the project is available on [github](https://github.com/aaqsr/cs488-project) in hopes that it can be useful.

The project culminated in a short technical report which one can read [here](./report.pdf).

The codebase features two custom multithreading primitives, both exposing a channel API.
One is a lock-free triple buffer for real-time communication between the physics and render threads, and one is a message queue for the logger, and other systems.
There is also a custom OBJ loader and JSON parser which enables the storing and loading of custom scenes defined by the user.
