# jquery.dynamiclist #

A jQuery plugin that dynamically adds or removes items from a list on the client side and normalizes the list index.

This plugin is useful when data-binding one-to-many relationships.  Frameworks such as Spring MVC (using AutoPopulatingList) can bind the list automatically to the form backing object as long as the items are normalized.

The idea is a list and inside the list are items that can be dynamically added or removed.  So there is one `Add` button for the list and every item has a `Remove` button.  When the `Add` button is clicked, the plugin will clone the first item in the list and append the newly cloned item to the end of the list.

Because of the cloning, there needs to be at least one item in the dynamic list all the time.  If the business logic allows empty list, see the `minSize` option.

## Requirement ##

This plugin requires jQuery 1.4 or later.

## Usage ##

	<div id="example">
            <div class="list-item">
	        <input type="text" name="guest[0].name" />
        	<a href="#" class="list-remove">Remove</a>
            </div>
            <a href="#" class="list-add">Add</a>
	</div>

	<script>
    	$(document).ready(function() {
	        $("#example").dynamiclist();
	});
	</script>

## Options ##

`itemClass` - The class name of for each item in the dynamic list.  Default is `list-item`.

`addClass` - The class name of the `Add` button.  Default is  `list-add`.

`removeClass` - The class name of the `Remove` button.  Defaults to `list-remove`

`withEvents` - When cloning a new item, copy the events/listeners as well?  Default is false.

`minSize` - The minimum number of items in the dynamic list.  Default is 1.  If set to 0, the first item is hidden from the user (At least one item is needed to perform a cloning).  In this case, the back end processing will require extra handling since it'll have to ignore the first item in the binded list.

`maxSize` - The maximum number of items in the dynamic list.  Default is 10.

`addCallbackFn` - Callback function when add is completed.

`removeCallbackFn` - Callback function when remove is completed.
