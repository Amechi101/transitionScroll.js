/*

        transitionScroll.js v1.0.0

        *--------------------------------------------------------------------*
        Documentation for this plugin lives here:
        https://github.com/Amechi101/transitionScroll.js
        *--------------------------------------------------------------------*

        *--------------------------------------------------------------------*
        Licensed under the MIT license - http://opensource.org/licenses/MIT
        Copyright (C) 2014 Amechi Egbe
        *--------------------------------------------------------------------*
        
        *--------------------------------------------------------------------*
        Ping, follow, or look and then if you like, maybe lets get tea!
        - amechiegbe@gmail.com
        - @fashionidealist
        - fashionidealist.com 

        *--------------------------------------------------------------------*

        Made with love in NYC from a USC Trojan.

        Fight On!

*/

;(function( $, document, window ) {

    'use strict';
    
    function TransitionCore(elem, settings) {
        this.init(elem, settings);
    }
 
    TransitionCore.prototype = {
        /**
        * Name of Plugin
        */
        name: 'transitionScroll',
         
        /**
        * The container than holds the elements to be animated
        */
        $container: null,
         
        /**
        * The elements that are being animated
        */
        $animatedElements: null,
         
        /**
        * Previous scrollTop
        */
        _previousScrollTop: 0,
         
        /**
        * Which direction are we scrolling in. Set by _getScrollDirection
        */
        _scrollDirection: null,
         
        /**
        * Will hold settings
        */
        settings: null,
         
        /**
        * Defaults for Settings
        */
        defaults: {
            //Time in between each element transitioning
            transitionDelay: 100,
             
            //To grab which element to transition, you can use jQuery Selector
            selector: null,
         
            /**
            * Custom functionality when scrolling down. Default is on the prototype (functions)
            */
            onScrollUp:function() {},
            onScrollDown:function() {},
            isElementInView:function() {}
        },
         
        /**
        * Gets called when the user does $('elements').transitionScroll();
        */
        init: function(element, settings) {
            //merge defaults and the user provided settings
            this.settings = _({}).extend(this.defaults, settings);
             
            this._checkOverwriteFunctions(settings);
             
            //set the container
            this.$container = $(element);
             
            //find the DOM elements we want to apply animation to
            this.$animatedElements = this.$container.find(this.settings.selector);
             
            //throttle onScroll to 100ms. This means that it will only call onScroll a max of once every
            //100ms when the user is scrolling
            $(window).scroll(_.throttle(this.onScroll.bind(this), 100, {
                trailing: true
            }));
        },
         
        _checkOverwriteFunctions: function(settings) {
            var funcsThatCanBeOverwritten = ['onScrollUp', 'onScrollDown', 'isElementInView'];
             
            settings = settings || {};
             
        _(funcsThatCanBeOverwritten).each(function(func) {
                //check if the user has specificed it and if so overwrite it
            if ( typeof settings[func] === 'object' ) {
                this[func] = settings[func];
            }
            
            });
        },
         
        /**
        * The Function that will get called when a scroll happens.
        * Will determine scroll direction and do the animation of the Elements in the
        * current viewport
        */
        onScroll: function(e) {
            var $window = $(e.currentTarget);
            this._getScrollDirection($window);
         
            this.animateElementsInView();
        },
         
        /**
        * Default functionality when scrolling down. Overwritten in settings
        */
        onScrollDown: function($element) {
            $element.addClass('in-view'); 
        },
         
        /**
        * Default functionality when scrolling up. Overwritten in settings
        */
        onScrollUp: function($element) {
            $element.removeClass('in-view');
        },
         
        /**
        * Checks whether the element is in view
        */
        isElementInView: function($element) {
            var buffer = 0,
                docViewTop = $(window).scrollTop(),
                docViewBottom = docViewTop + $(window).height(),
                elemTop = parseInt($element.offset().top, 10),
                elemBottom = elemTop + $element.height();

            if ( 
                //bottom of element is lower than the top of the page
                (elemBottom + buffer >= docViewTop ) && 
                //top of the element is higher than the bottom of the page
                (elemTop <= docViewBottom + buffer) && 

                //bottom of the element is higher than bottom of the document
                (elemBottom <= docViewBottom + buffer) && 

                //top of the element is lower than top of the document
                (elemTop + buffer >= docViewTop) ) 
            {
                return true;
            } else {
                return false;
            }

        },         
        /**
        * Chain of events that happens to animate the elements
        * #1 : figure out WHAT we are animate
        * #2: Apply the animation
        */
        animateElementsInView: function() {
            //Go through each one of the elements on the page that we are applying the transiton to
            this.$animatedElements
             
            //We only care about the ones in view, so we will filter them by using a custom 
            //function (_elemnentInView) to determine if they're in view on not
            .filter(function(i, element) {
            //we only want to act on elements in view
                
                //console.log('val returned', $(element), this.isElementInView($(element)))
                return this.isElementInView($(element));
            }.bind(this))
             
            //this function is dealing ONLY with the filtered elements (which are in view)
            .each(function(i, element) {
                var $element = $(element);
             
            //delay animation of the element by it's index (2nd element will be delay by
            //x ms, 3rd by 2x, 4th by 3x)
                $element.css("transition-delay", (this.settings.transitionDelay * (i + 1)) + "ms");
             
                if (this._direction === 'down') {
                    this.onScrollDown.bind(this)($element);
                } else {
                    this.onScrollUp.bind(this)($element);
                }
             
                }.bind(this));
            },
        /**
        * Gets the direction in which the user is scrolling (up or down) and
        * saves to this._direction
        */
        _getScrollDirection: function($window) {
            var overScroll = $window.scrollTop() + $window.height() >= $(document).height();

            if(overScroll) { return true; }

            this._direction = ($window.scrollTop() > this._previousScrollTop) ? 'down' : 'up';

            this._previousScrollTop = $window.scrollTop();
        }
    };
     
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.transitionScroll = function(settings) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + TransitionCore.name)) {
                $.data(this, "plugin_" + TransitionCore.name, new TransitionCore(this, settings));
            }
        });
    };
     
})( jQuery, document, window );