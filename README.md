transitionScroll.js v1.0
=======================

A simple independent plugin that transition elements in the browser viewport, and as you scroll down, other elements will have the same effect transitioning into place and appearing from ( opacity 0 to 1 ). As you scroll back up the DOM the elements disappear into their prior state, reverting back to ( opacity 1 to 0 ) only showing again the elements that are in view of the browser in full opacity. 

- This is a young plugin, currently under development (meaning features will break and more will be added!) but feel free to play along with it and try it out here:

http://amechi101.github.io/transitionScroll.js. 


**Inspiration from [Akqa.com](http://www.akqa.com/) & [scrollreveal.js](http://scrollrevealjs.org/)**

Dependencies
------------
To Start using transitionScroll.js:
<ul>
	<li> transitionScroll.js </li>
	<li> underscore.js </li>
	<li> jQuery </li>
	<li> core.css </li>
</ul>

##Options

```js
$('.container').transitionScroll({
	
	/*
       Defaults for Settings
    */
        defaults: {
            
            //Time in beteween each element transitioning
            transitionDelay: 100,
             
            //To grab which element to transition, you can use jQuery Selector
            selector: ".class",
         
            /*
            	Custom functionality when scrolling up, down or when the elements are in view. 
            */
            onScrollUp: function() {},
            onScrollDown: function() {},
            isElementInView: function() {}
        }

});
```
