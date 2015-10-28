(function ($, window, document, undefined) {

    "use strict";

    // Create the defaults once
    var pluginName = "scrollReader", defaults = {
        menu: "#menu",
        speed: 600,
        tags: "h1, h2, h3, h4, h5, h6",
        primaryTags: ["h1", "h2"],
        offset: 0
    };

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.buildMenu(this.element, this.settings);
            this.pageShouldScroll(this.element, this.settings);
        },

        buildMenu: function () {
            var settings = this.settings;
            var el = this.element;
            var items = $(el).find(settings.tags);

            $(items).each(function () {
                var itemId = Math.floor(Math.random() * 9999999);
                var title = $(this).text();
                var elType = $(this).prop("tagName").toLowerCase();
                var thisClass = "." + this.className;

                $(this).attr("data-scroll-id", itemId);

                if (title.length) {
                    if (settings.primaryTags.indexOf(elType) !== -1) {
                        $(settings.menu).append(
                            "<a href=# class=primary data-scroll-to=\"" + itemId + "\">" + title + "</a>"
                        );
                    } else {
                        if (settings.primaryTags.indexOf(thisClass) !== -1) {
                            $(settings.menu).append(
                                "<a href=# class=primary data-scroll-to=\"" + itemId + "\">" + title + "</a>"
                            );
                        } else {
                            $(settings.menu).append(
                                "<a href=# class=tertiary data-scroll-to=\"" + itemId + "\">" + title + "</a>"
                            );
                        }
                    }
                }
            });
        },

        pageShouldScroll: function () {
            var settings = this.settings;
            var el = this.element;
            var easing = this.easing;

            $(settings.menu).find("a[href^=#]").click(function (e) {
                e.preventDefault();
                var destination = $(this).data("scroll-to");
                var offset = $(el).find("[data-scroll-id='" + destination + "']")[0].offsetTop - settings.offset;
                $("html, body").animate({ scrollTop: offset }, settings.speed, this.easeing);
            });
        },

        easeing: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });

        // chain jQuery functions
        return this;
    };

})(jQuery, window, document);
