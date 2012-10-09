# jQuery Dynamic List #

A jQuery plugin that dynamically adds or removes items from a list on the client side and normalizes the list index.

This plugin is useful when data-binding one-to-many relationships.  Frameworks such as Spring MVC (using AutoPopulatingList) can bind the list automatically to the form backing object as long as the items are normalized.

The idea behind this plugin is to create an extra template row.  When a new row is requested, the plugin copies the template row and adds it to the row of the list.  When ever a remove row is requested, the row is removed and the entire list's index is normalized.

When the form is submitted, the plugin will remove the template row.  If the form is submitted asynchronously, then a javascript method `removeListTemplate()` must be called prior to the asynchronous call to remove the template row.  Otherwise, the template row will cause Spring MVC to complain about the "#" index

See demo page for more example.  

## Usage ##

    <form>
		<div id="list">
        	<div class="list-template">
        	    <input type="text" name="guests[#].name" />
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

When there are existing rows, using Grails GSP.

    <form>
		<div id="list">
        	<div class="list-template">
        	    <input type="text" name="guests[#].name" />
        	    <a href="#" class="list-remove">Remove</a>
	        </div>
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
