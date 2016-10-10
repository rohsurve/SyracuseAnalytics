app.directive('customPopover', function () {
    return {
        restrict: 'A',
        template: ' <span class="glyphicon glyphicon-info-sign">{{label}}</span>',
        link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;
            $(el).popover({
                trigger: 'click',
                html: true,
                content: attrs.popoverHtml,
                placement: attrs.popoverPlacement
            });
        }
    };
});