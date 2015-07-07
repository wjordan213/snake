# Snake 

* [Main site][Main]
[Main]: http://www.harrisjordan.info/snake
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

- images are used to represent the snake's head, body, and tail, as well as the cherries

- The direction of each segment of the snake is stored in its corresponding linked list element
  - this information, along with the information representing whether the segment is the snake's head, body, or tail, is used to choose and orient the appropriate images.
