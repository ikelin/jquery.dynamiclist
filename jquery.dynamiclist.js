/*
 Dynamic List v 1.0.0
 Copyright (c) 2012 Ike Lin.  All rights reserved.  Licensed under the GPL v3.
 */
;(function($) {

    $.fn.dynamiclist = function(options) {
        
        // support multiple elements
        if (this.length > 1) {
            this.each(function() {
                $(this).dynamiclist(options)
            });
            return this;
        }
        
        // ------------------------------------------------
        // private variables
        // ------------------------------------------------
        
        // setting plugin default settings and overriding options
        var settings = $.extend( {
            templateClass: "list-template",
            itemClass: "list-item",
            addClass: "list-add",
            removeClass: "list-remove",
            minSize: 1,
            maxSize: 10,
            withEvents: false,
            addCallbackFn: null,
            removeCallbackFn: null
        }, options);
        
        // ------------------------------------------------
        // private methods
        // ------------------------------------------------

        // Appends new item to the list by cloning the template item. The new
        // item is normalized and cleared of value before adding to the list.
        var handleAdd = function(list, event, settings) {
            var length = list.find("." + settings.itemClass).length;          
            if (length < settings.maxSize) {
                // clone new item from first item
                var item = list.find("." + settings.templateClass).clone(
                    settings.withEvents);
                item.show();

                // register new item remove link
                item.find("." + settings.removeClass).click(function(event) {
                    handleRemove(list, $(this), event, settings);
                });

                // clean up new item
                normalizeItem(item, length, true);
                clearItem(item);

                // add new item
                var last = list.find("." + settings.itemClass + ":last");
                if (last.length == 0)
                    last = list.find("." + settings.templateClass);
                last.after(item);
				
                // call back before adding
                if (settings.addCallbackFn != null)
                    settings.addCallbackFn(item);
            }

            if (event != null)
                event.preventDefault();
        }

        // Handles remove link action. Removes an item from the list. Normalizes
        // the list before returning. If there is only minimal item left, clear
        // the value but do not remove the item.
        var handleRemove = function(list, alink, event, settings) {
            var length = list.find("." + settings.itemClass).length;
            var item = alink.parents("." + settings.itemClass + ":first");

            if (length == settings.minSize)
                clearItem(item);
            else
                item.remove();

            normalizeList(list, settings);
			
            if (settings.removeCallbackFn != null)
                settings.removeCallbackFn(item);

            event.preventDefault();
        }

        // Normalizes the list but changing all id, name and for attribute
        // inside the item to the current item number.
        var normalizeItem = function(item, itemNum, isTemplate) {
            item.find("label, input, select, textarea").each(function() {
                var attributes = ["class", "name", "id", "for"]
                for (var i = 0; i < attributes.length; i++) {
                    var attr = $(this).attr(attributes[i]);
                    if (attr) {
                        if (isTemplate) {
                            attr = attr.replace(/\#\./, itemNum + ".");
                            attr = attr.replace(/\[\#\]\./, "[" + itemNum + "].");
                        }
                        else {
                            attr = attr.replace(/\d+\./, itemNum + ".");
                            attr = attr.replace(/\[\d+\]\./, "[" + itemNum + "].");
                        }
                        $(this).attr(attributes[i], attr);
                    }
                }
            });
            if (isTemplate) {
                item.removeClass("list-template").addClass("list-item");
            }
        }

        // Normalizes the entire list.
        var normalizeList = function(list, settings) {
            list.find("." + settings.itemClass).each(function() {
                var index = list.find("." + settings.itemClass).index(this);
                normalizeItem($(this), index, false);
            });
        }

        // Clears value from all input text items.
        var clearItem = function(item) {
            item.find("input[type=text], textarea").val("");
            item.find("input[type=radio]").attr({checked: false});
            item.find("input[type=checkbox]").attr({checked: false});
        }
        
        var init = function(list) {
           
            // initializes the list
            list.find("." + settings.templateClass).hide();
            var length = list.find("." + settings.itemClass).length;
            while (settings.minSize > length) {
                handleAdd(list, null, settings);
                length++;
            }

            // when add link is clicked
            list.find("." + settings.addClass).click(function(event) {
                handleAdd(list, event, settings);
            });

            // when remove link is clicked
            list.find("." + settings.removeClass).click(function(event) {
                handleRemove(list, $(this), event, settings);
            });
            
            // when parent form is submitted
            list.parents("form:first").submit(function(){
                list.find("." + settings.templateClass).remove();
            })
            
            return list;
        }
        
        // ------------------------------------------------
        // public methods
        // ------------------------------------------------
        this.removeListTemplate = function() {
            $(this).find("." + settings.templateClass).remove();
        }
        
        return init(this);  
    }
})(jQuery);