
# A Colorful Asteroids Clone!

An asteroids clone with lots of color and a simple twist. Instead of hyperspace, the "lifeline" is an energy pulse which repels all asteroids within range.

Implemented in pure javascript using the highly useful MainLoop library (https://github.com/IceCreamYou/MainLoop.js) and the web audio API. All rendering is vector based (no sprites, no fonts) and drawn using the HTML-5 canvas API.

note: the canvas is a fixed size and is quite large at 1400x800px. This creates a more spacious space (pun-intended) to play in. If too large for your screen, just zoom out on the browser.

note: tested in google chrome and firefox latest editions. Will probably work in other modern browsers. I highly doubt it will work in internet explorer.

## Play Here

https://ianmurfinxyz.github.io/colorful_asteroids/

## Gameplay Notes

Your spaceship is limited to 4 shots/lasers at once. Each shot lasts for 2.0s before despawning, unless the shot is destroyed by colliding with a target. This rewards accuracy and allows for "drilling" at close range.

Small aliens will begin spawning once you surpass 10,000 points, with a 75% chance of to spawn instead of a large alien. Prior to this only large aliens will spawn, which they will do immedietly from round 0. Like in the original, large aliens fire in random directions and small aliens target the player directly. 

An extra life will also be awarded for every 10,000 points earned.

As stated above there is no hyperspace in this version. Instead pressing the DOWN arrow releases an energy wave which repels all asteroids within a set radius. The cooldown period for this pulse is relatively long, at 1.5 seconds, so save it for emergencies!

Further the pulse force is inversely proportional to distance and applied equally to all asteroids. Meaning it is weaker at greater distance and affects the momentum of larger asteroids less. Applied to a large asteroid and it wont do much. Applied at close range to a small asteroid and it will create a high speed disaster waiting to happen. So be careful!

## Menu Controls

- UP/DOWN arrows switch between menu options.
- LEFT/ RIGHT arrows change menu option value.
- ENTER to play.

## Play Controls

- LEFT/RIGHT arrows steer the spaceship.
- UP arrow to boost.
- DOWN arrow to fire an energy pulse.
- SPACE to fire a laser.
- ESCAPE to return to menu.

## Difficulty

The game comes with 4 difficulties. On higher diffculties the asteroids break into more pieces and you start with fewer lives. Included in the 4 is a practice difficulty which is the same as hard except you get infinite lives.

- Normal: asteroids split into 2 pieces. Start with 3 lives.
- Hard: asteroids split into 3. Start with 2 lives.
- Impossible: asteroids split into 4. Start with 1 life.

## The HUD

The HUD shows:

- current score on top-left with remaining lives below.
- round number in the middle.
- your high score on top right.

note: their is no server attached to the game hence the high score exists only for as long as the browser window exists.

## Credits

The music and sound effects are not my work. You can find them at the following links:

https://freesound.org/people/LittleRobotSoundFactory/sounds/321011/
https://freesound.org/people/suntemple/sounds/253173/
http://www.classicgaming.cc/classics/asteroids/sounds
https://freesound.org/people/deleted_user_2731495/sounds/183881/

For completeness, you can also find the mainloop library here:

https://github.com/IceCreamYou/MainLoop.js

