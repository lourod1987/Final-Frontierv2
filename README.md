Final Frontier
===============================

Welcome to the Final Frontier. Can you survive? How many points will you score?

# Rules
* Avoid taking damage. Each time an enemy ship hits you will lose a health bar.
* You start with 3 health bars.
* Destroy as many enemy ships as possible to get the highest score.
* Enemies not destroyed come back around to attack after exiting bottom of the screen.
* Game will launch first wave of enemies after 5 seconds.
* Survive for a minute and a half (01:30) to win!

# Controls

W moves player up.
A moves player left.
S moves player down.
D moves player right.

Spacebar shoots laser.

Alternatively:
Up arrow key moves player up.
Left arrow key moves player left.
Down arrow key moves player down.
Right arrow key moves player right.

Note: current set up only allows a single button to be registered at anyone time.

# Bug / Crash workarounds
    * Don't fire laser bullets too quickly and it should avoid the game crashing.
    * If game does crash refresh the browser page.
    * If you make it to the game win screen. Press 'Esc' and then press 'Enter' to play a new game.
    * If modal window does not pop up on game over refresh the browser page.

# Known Bugs / Crashes
    * When there are many enemies on screen occassionally game will crash citing allEnemies[i] undefined.
    * Explosions don't render or disappear as they should
    * Game win screen does not allow you to immediately jump back into gameplay (Pressing Enter at Win Screen Does not start new game)
    * Starting new game does not clear all previous enemies
    * Game over modal will not pop up after single time (unless page is reloaded)
    * When modal pops up it knocks the canvas element down.
    * Start menu music loop does not play after leaving start menu the first time.