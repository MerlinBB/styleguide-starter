(function ($, window, document, undefined) {
    "use strict";

    var docs = {

        init: function () {
            this.bindUIActions();
            this.initScrollMenu();
        },

        bindUIActions: function () {
            $(".demo-pattern-title").on("click", function (e) { docs.toggleCode(e); });
            $(".demo-filter").on("keyup", function (e) { docs.filterComponents(e); });
            $(".demo-clear-query").on("click", function (e) {docs.clearQuery(e); });
        },

        windowResized: function () {
            //
        },

        windowScrolled: function () {
            //
        },

        initScrollMenu: function () {
            $("#patterns").scrollReader({
                menu: "#menu",
                speed: 400,
                tags: ".demo-pattern-title",
                offset: 36
            });
        },

        toggleCode: function (e) {
            $(e.currentTarget).siblings(".demo-details").slideToggle("fast");
        },

        clearQuery: function (e) {
            var view = this;
            $(e.currentTarget).prev().val("");
            view.filterComponents(e);
        },

        filterComponents: function (e) {
            // This function turns the input text into an array of queries
            // for each component item, we loop through these queries and see if they exist in the keywords string
            // if the test passes for all items in the array, that list item is shown
            var view = this;
            var queries = $(e.currentTarget).val().toLowerCase().split(" ");
            var components = $(".demo-pattern");

            if ($(e.currentTarget).val().length) {
                // if we have a search query array, hide everything until it needs to be shown
                $(components).hide();
                $(".demo-clear-query").addClass("show");


                _.each(components, function (user) {
                    var keywords = $.trim($(user).find(".demo-keywords").text().toLowerCase());

                    var matches = [];

                    _.each(queries, function (query) {
                        if (query.length) {
                            var match = keywords.search(query);
                            if (match !== -1) {
                                matches.push(true);
                            } else {
                                matches.push(false);
                            }
                        }
                    });

                    // all tests pass? if so then show item
                    if (_.indexOf(matches, false) === -1) {
                        $(user).show();
                    }
                });
            } else {
                $(components).show();
                $(".demo-clear-query").removeClass("show");
            }
        }
    };

    // DOM Ready
    $(function () { docs.init(); });
    // Window Resized (smart debounced event)
    $(window).resize(function () { docs.windowResized(); });
    // Window Scrolled
    $(window).on("scroll", function () { docs.windowScrolled(); });

})(jQuery, window, document);
