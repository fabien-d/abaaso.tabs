/**
 * Copyright (c) 2012, Jason Mulligan <jason.mulligan@avoidwork.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of abaaso.tabs nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL JASON MULLIGAN BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * abaaso.tabs
 * 
 * UI tabs module
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @link http://avoidwork.com
 * @requires abaaso 1.8
 * @requires abaaso.route
 * @version 1.0
 */
(function () {
	"use strict";

	var tabs = (function () {
		var $ = window[abaaso.aliased],
		    create;

		/**
		 * Add a tab widget to a target Element
		 * 
		 * @param  {Object}  target   Element to receive the tabs
		 * @param  {Object}  children Tabs to add to this widget
		 * @param  {Object}  args     Properties to set on the tabs
		 * @param  {Boolean} subs     True if called as for nested subs
		 * @return {Object} Element
		 */
		create = function (target, children, args, route) {
			var obj, hash, i, item, array;

			args instanceof Object ? args["class"] = "tabs" : args = {"class": "tabs"};
			route = typeof route === "undefined" ? "" : route;
			array = (children instanceof Array);

			if (target !== null) obj = target.create("ul", args);

			for (i in children) {
				if (!children.hasOwnProperty(i)) continue;
				item = array ? children[parseInt(i)] : i;
				hash = route + "/" + item.toLowerCase();
				if (!array && typeof children[item] === "function") $.route.set(hash.replace(/^\/{1,1}/, ""), children[item]);
				typeof i !== "object" ? obj.create("li").create("a", {href: "#!" + hash}).html(item) : tabs(obj, children[array ? parseInt(i) : i], null, hash);
			}

			target.create("section", {"class": "content"});
			return target;
		};

		// Hooking into prototype chain
		Element.prototype.tabs = create;

		// @constructor
		return {
			create : create
		};
	}),
	fn = function () { abaaso.module("tabs", tabs()); };

	// AMD support
	typeof define === "function" ? define("abaaso.tabs", ["abaaso", "abaaso.route"], fn) : abaaso.on("init", fn, "abaaso.tabs");
})();