# TODO

List of things to get done / ideas I want to implement (tentative):

* Art
    * Create ship image
    * Create 3 different enemy ship images
    * Create Asteriod image / varying sizes
    * Create Player Bullet(s) image
    * Create Player Health image
    * Create Enemy Bullet image
    * Create Explosion image
    * Create or find a unique vertically tileable image for three levels *{optional}*
    * Create Title screen image
    * Find/Set game fonts
    * Create custom UI hud bg for displaying score and health on top of *{optional}*
    * Create boss enemy to fight (conside behavior in design) *{optional}*

* Audio
    * Find or create Music for game levels (unique for each *{optional}*)
    * Title screen music *{optional}*
    * Enemy shot sound effects
    * Player + enemy collision sound effect
    * Player hit by enemy bullet sound effect
    * Player unit destroyed
    * Game over sound effect
    * Enemy hit by player bullet (for when enemy can take more then a single hit)
    * Unique Boss Music *{optional}*
    * Boss sound effects for varying attacks (depends on design) *{optional}*

* Programming
    * Get explosions fully working
    * Get particle effects working (mainly for ship booster, possibly for explosion) *{optional}*
    * Get Title screen running, game (multiple lvls), loss state, win state, credits (each pushes into new state) **[done!]** (credits and multiple levels will be easy to add)
    * Get Title screen menu (start game, with options for sound / muting, controls display)
    * Get powerups running (alter rate of fire or type of bullet, special attacks, shields) *{optional}*
    * Get score text displaying on game screen **[done!]**
    * Get health working correctly **[done!]**
    * Get health displaying on screen
    * Indicate ship took a hit (possibly flashing ship img or transparent to opaque alternating)
    * Get timer set up **[done!]**
    * Get timer displayed in game **[done!]**
    * Create enemy spawning pattern **[done!]** (just missing helper function for more efficient enemy creation)
    * Randomize enemy spawning pattern *{optional}*
    * Get some enemy units to fire
    * Get back and forth (or random) enemy movemnt on x axis **[done!]** (can easily add in random variation)
    * Script in Boss event at end of final level *{optional}*
    * Script in Boss behavior with unique attack patterns and health bar (or visible dmg using img swap) *{optional}*
    * Create game win state **[done!]**
    * Create game loss state **[done!]**
    * Allow game restart
    * Allow game pause *{optional}*
    * Set up velocity transfer on collision *{optional}*
    * Improve player movement (needs to be smoothed) *{optional}*
    * Eliminate default BG render **[done!]**
    * Get controls working smoothly / in parallel (in other words the ability to press both w and d key to move vertically and spacebar all without any one action being stopped by multiple keypresses) *{optional}*
    * Save and Load States (as long as page is not refreshed) *{optional}*

* Server Set Up *{optional}*
    * Save and Load States preserved via server, login required *{optional}*
    * User creation with Login in info server saved *{optional}*
    * High Score server preserved data *{optional}*
    * Server set up for the above mentioned (user creation/login, save game states, high score) *{optional}*

    * Multiplayer *{optional}*
        * Use socket.io to create a 2 player co-op *{optional}*