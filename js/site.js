/*

transitionScroll.js    
http://
MIT licensed
Copyright (C) 2014 Amechi Egbe


*/

;(function ( $, document, window ) {

    /* 
        Global variables

        1. Name of plugin
        2. _window object (since it will be used throughout)

    */
    var transitionScrollPlugin = "transitionScroll";
    var _window  = $(window);



    // The actual plugin constructor
    function TransitionCore( element, settings ) {
       
        //To not confuse this, with internal functions and namespacing
        $base = this;

        //Access to element in the DOM
        $base.element = $(element);



        //Name of the plugin used for internal purposes
        $base._name = transitionScrollPlugin;


        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        $base.settings = $.extend( {}, $.fn.transitionScroll.defaults, settings);

        /* 
            Global instance of the default plugin variables used internally to set base 
            options and values, also which can be overridden by the user.

            Composing of:
            1. i =  Transition-delay 
            2. $selector = selector(for DOM elements to add transition-delay and class)
            3. scrolledIn = callback to allow for special event to happen after scrolling in (in specific for the DOM elements)
            4. scrolledOut = callback to allow for special event to happen after scrolling out (in specific for the DOM elements)
        */
        $i = $base.settings.transitionValue,
        $selector = $base.element.find($base.settings.selector),
        $scrolledIn = $base.settings.scrollIn,
        $scrolledOut = $base.settings.scrollOut;


        /*
            Place to monitor the elements being manipulated in the DOM 
            for tracking.
        */
        $base.elementTracker = []; //Array monitor the coordinates of the elements in the DOM
        $base.items = {}; //To help push the coordinates in the  $base.elementTracker array
       

        //method to initialize Plugin
        $base.init();

    }

    TransitionCore.prototype = {
       
        init: function()  {
            $base.transitionDelay();
            $base.tracking();

            //functions still being built
            $base.onScrolled();
            $base.positionLogic();
            $base.scrolledInView();
            $base.scrolledOutView();
        },
        transitionDelay: function () {
            $selector.each(function () {    
                // 'this' referring to the localized object of the transitionDelay function still pointing to the elements in the DOM
                _this = $(this),
                
                _this.css("transition-delay", $i + "ms", $i += 100);
            });
        },
        tracking: function() {
            
           $base.items = {
                element: $selector, 
                settings: $base.settings,
                invp: false    
            }
            
            $base.elementTracker.push($base.items);

            return $base.items;
        }, 
        
        //functions being built
        onScrolled:function() {
            throttled = _.throttle($base.elementInView, 100);

            _window.scroll(throttled);

            // console.log()

        },
        elementInView: function ( event ) {
            $selector.each( function ()  {
                    // 'this' referring to the localized object of the elementInView function still pointing to the elements in the DOM
                    $_this = $(this);

                    // console.log()
                    
                    if( $base.positionLogic( $_this ) ) {
                        if ( !$base.items.invp ) {
                            $base.items.invp = true;
                            if ( $scrolledIn ) {
                                $scrolledIn.call( $_this, event ),
                                $_this.trigger('scrollIn', event );
                            };
                        } else if ( $base.items.invp ) {
                                $base.items.invp = false;
                            if ( $scrolledOut ) {
                                $scrolledOut.call( $_this, event ),
                                $_this.trigger('scrollOut', event );
                            };
                        };
                    }
                });
          
        },
        scrolledInView:function() {
            $scrolledIn = function() {
                $selector.addClass('in-view');
            } 
        },
        scrolledOutView: function() {
            //  $scrolledOut = function() {
            //     $selector.removeClass('hello');
            // }
        },
        positionLogic: function () {
            docViewTop = _window.scrollTop(),
            docViewBottom = docViewTop + _window.height(),
            elemTop = $selector.offset().top,
            elemBottom = elemTop + $selector.height();


            return ( ( elemBottom >= docViewTop ) && ( elemTop <= docViewBottom )
            && ( elemBottom <= docViewBottom ) && ( elemTop >= docViewTop ) );

          
        }

   };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.transitionScroll = function ( settings ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + transitionScrollPlugin )) {
                $.data(this, "plugin_" + transitionScrollPlugin,
                new TransitionCore( this, settings ));
            }
        });
    };

    //Extendible default plugin options
    $.fn.transitionScroll.defaults = {
        transitionValue:100, //For the user to adjust the transition-delay
        selector:"article", //To grab which element to transition, you can use jQuery Selector
        scrollIn:function() {},
        scrollOut:function() {}
    };



 
    // For testing please, this code ignore!!!!!!!
    var $el = $('html');
    var divElements = $('article');
    var doc = $( '#hit' );
 
    doc.on("click", function() {

        if( $el.hasClass('js') &&  $el.hasClass('no-touch') && $el.hasClass('csstransitions') ) {
            divElements.toggleClass('in-view');
        }
      
    });


 
})( jQuery, document, window );