(function ($, window, document, undefined) {
    "use strict";

    var widgets = {

        init: function () {
            this.bindUIActions();
            $(".input-select.has-search").chosen();
            $(".input-select.no-search").chosen({ disable_search_threshold: 999 });
            $(".is-datepicker").datepicker({ format: "dd-mm-yyyy" });
            $(".is-timepicker").datetimepicker({
                format: "LT",
                icons: {
                    up: "icon-up-open-big",
                    down: "icon-down-open-big"
                }
            });
        },

        bindUIActions: function () {
            $(".dropdown").on("click", function (e) { widgets.toggleDropdown(e); });
        },

        windowResized: function () {
            //
        },

        windowScrolled: function () {
            //
        },

        toggleDropdown: function (e) {
            if ($(e.currentTarget).hasClass("open")) {
                $(e.currentTarget).removeClass("open");
            } else {
                $(".dropdown-widget").removeClass("open");
                $(e.currentTarget).addClass("open");
            }
        }
    };

    // DOM Ready
    $(function () { widgets.init(); });
    // Window Resized
    $(window).resize(function () { widgets.windowResized(); });
    // Window Scrolled
    $(window).on("scroll", function () { widgets.windowScrolled(); });

})(jQuery, window, document);
