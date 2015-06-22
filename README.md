# Snake

## Description
A remake of the classic arcade game Snake for the browser

## How to use:
- click the link to start
- move with wasd or the arrow keys
- Don't hit the walls!!!

## Technologies
Javascript, HTML5, CSS3, JQuery

## Notable implementation details
- The Snake is itself stored as a linked list which allows for only having to deal with the head and the tail of the snake at each iteration of the game

- The direction commands are stored in a queue instead of being immediately assigned to the snake object. This prevents the snake from turning into itself and allows the user to make two moves (i.e. quick turnarounds) in one frame and for both moves to be registered
