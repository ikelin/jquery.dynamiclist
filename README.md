# jQuery Dynamic List #

A jQuery plugin that dynamically adds or removes items from a list on the client side and normalizes the list index.

This plugin is useful when data-binding one-to-many relationships.  Frameworks such as Spring MVC (using AutoPopulatingList) can bind the list automatically to the form backing object as long as the items are normalized.

The idea is a list and inside the list are items that can be dynamically added or removed.  So there is one `Add` button for the list and every item has a `Remove` button.  When the `Add` button is clicked, the plugin will clone the template item in the list and append the newly cloned item to the end of the list.  While adding and removing, the plugin is also normalizing the index for each item.

The index for the template item has to be `#` so that the cloning process can replace the `#` with the appropriate index.  Before the form is submitted, the template item is removed so the data binding won't have a NumberFormatException.  If the form is submitted via AJAX, make sure to call the `removeListTemplate()` method before the remote form submit.

See demo for more example.  

## Usage ##

    <form>
		<div id="list">
        	<div class="list-template">
        	    <input type="text" name="guest[#].name" />
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

## Methods ##

`removeListTemplate()` removes the list template so it will not be submitted and potentially causing NumberFormatException.  Example:

	<script>
        $(document).ready(function() {
            var list = $("#list").dynamiclist();

			// when doing AJAX form submit
			$("#button").click(function(event) {
				// remove list template
				list.removeListTemplate();

				// continue AJAX form submit
				$.ajax(...)
			});
        });
    </script>

## Options ##

`templateClass` - The class name of the template item.  Default is `list-template`.

`itemClass` - The class name of the item in the dynamic list.  Default is `list-item`.

`addClass` - The class name of the `Add` button.  Default is  `list-add`.

`removeClass` - The class name of the `Remove` button.  Defaults to `list-remove`

`withEvents` - When cloning a new item, copy the events/listeners as well.  Default is false.

`minSize` - The minimum number of items in the dynamic list.  Default is 1.

`maxSize` - The maximum number of items in the dynamic list.  Default is 10.

`addCallbackFn` - Callback function when add is completed.

`removeCallbackFn` - Callback function when remove is completed.
