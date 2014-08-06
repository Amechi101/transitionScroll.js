transitionScroll.js
===================

The goal of this Plugin elements that appear in the browser viewport(on loading) will transition into place (using translateY most likely).
As you scroll down, other elements will have the same effect transitioning into place and appearing from opacity 0 to 1 (Vertically). 
But in addition, when when yours scroll back up the elements disappear into their prior state, reverting back to ( opacity 1 to 0 ) only showing again the elements that are in view of the browser in full opacity. 

Inspiration from Akqa.com, Based on http://scrollrevealjs.org/

Dependencies
------------
-underscore.js (for utility functions)
-jQuery
-core.css (for the transitions)


Building Architecture

-> Build a tracking system for the elements within the DOM to see if they are in the viewport range and when to apply the create transition/transform properties. Vanilla CSS will be used to add the proper states. 

--> Create a data constructor to get the HTML5 data- api for easier manipulation and registering the events above to move and distribute allocation of memory

--> Extend options for the user to change transition-delay, grab a group of elements in the DOM to manipulate and create callbacks for scrollingUp/scrollingDown
--> Must be wrapped in a structure to allow for a multiple progression of the transition-delay to iterate by n = 100 : 100, 200, 300, 100 + n......
<ul>
	<li></li>
	<li></li>
	<li></li>
</ul>
