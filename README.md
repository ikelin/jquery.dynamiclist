# jQuery Dynamic List v2.0 #

A jQuery plugin that dynamically adds or removes items from a list on the client side and normalizes the list index.

This plugin is useful when data-binding one-to-many relationships.  Frameworks such as Spring MVC (using AutoPopulatingList) can bind the list automatically to the form backing object as long as the items are normalized.

The idea behind this plugin is to copy the first item when adding a new item.  When ever an item is added or removed, the entire list's index is normalized.

See demo page for more example such as events and call back functions.

## Usage ##

    <form>
		<div id="list">
        	<div class="list-item">
        	    <input type="text" name="guests[0].name" />
        	    <a href="#" class="list-remove">Remove</a>
	        </div>
        	<a href="#" class="list-add">Add</a>
		</div>
		<input type="submit" />
	</form>

    <script>
        $(document).ready(function() {
            $("#list").dynamiclist();
        });
    </script>

When there are existing rows, example in Grails GSP:

    <form>
		<div id="list">
			<g:each in="${guestList}" var="guest" status="i">
				<div class="list-item">
        	    	<input type="text" name="guests[${i}].name" value="${guest.name}" />
        	   		<a href="#" class="list-remove">Remove</a>
	        	</div>
			</g:each>
        	<a href="#" class="list-add">Add</a>
		</div>
		<input type="submit" />
	</form>

    <script>
        $(document).ready(function() {
            $("#list").dynamiclist();
        });
    </script>

## Options ##

`itemClass` - The class name of the item in the dynamic list.  Default is `list-item`.

`addClass` - The class name of the `Add` button.  Default is  `list-add`.

`removeClass` - The class name of the `Remove` button.  Defaults to `list-remove`

`withEvents` - When cloning a new item, copy the events/listeners as well.  Default is false.

`minSize` - The minimum number of items in the dynamic list.  Default is 1.

`maxSize` - The maximum number of items in the dynamic list.  Default is 10.

`addCallbackFn` - Callback function when add is completed.

`removeCallbackFn` - Callback function when remove is completed.
