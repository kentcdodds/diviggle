angular.module('dv.web.directives').directive('dvTable', function (FILE_ROOT, _, $state, pluralize, $filter, AlertEventBroadcaster, ErrorDisplayService) {
  'use strict';
  function titleize(string){
    if (!string) {
      return '';
    }
    return string.toLowerCase().replace(/(?:^|\s|-)\S/g, function(c){ return c.toUpperCase(); });
  }
  return {
    restrict: 'E',
    templateUrl: FILE_ROOT + 'components/dv.web/directives/dv-table.html',
    scope: {
      itemName: '@',
      newItemSref: '@',
      newItemAction: '&?',
      rowAction: '&?',
      itemClickedSref: '@',
      columns: '=',
      items: '='
    },
    link: function (scope, el, attrs) {
      scope.itemName = scope.itemName || 'item';
      scope.buttonText = attrs.buttonText || '+ Add ' + scope.itemName;
      scope.pluralItemName = pluralize.plural(scope.itemName);
      scope.tableTitle = scope.tableTitle || titleize(scope.pluralItemName);

      scope.noAddButton = attrs.hasOwnProperty('noAddButton');
      scope.noRowAction = attrs.hasOwnProperty('noRowAction');
      scope.noTitle = attrs.hasOwnProperty('noTitle');

      scope.orderings = [];
      _.chain(scope.columns).filter(function(column) {
        return column.field && column.field.hasOwnProperty('order');
      }).sortBy(function(column) {
        return column.field.order;
      }).each(function(column) {
        scope.orderings.push({
          name: column.field.name,
          reverse: column.field.reverseOrder
        });
      });

      if (scope.itemClickedSref && !_.find(scope.columns, 'isActions')) {
        scope.columns.push({
          isActions: true,
          size: 1,
          actions: [
            {
              icon: 'fa-trash-o',
              cssClass: 'color-danger',
              action: function(item) {}
            }
          ]
        });

      }

      var totalWidth = _.reduce(scope.columns, function(sum, col) {
        return (sum.size || ~~sum) + col.size;
      });
      if (totalWidth !== 12) {
        console.warn('The sum of all column sizes of a dv-table should be 12. Was ' + totalWidth);
      }

      scope.onRowClick = function onRowClick(item) {
        if (scope.noRowAction) {
          return;
        }
        if(scope.itemClickedSref) {
          $state.go(scope.itemClickedSref, {id: item.id});
        } else if (scope.rowAction) {
          scope.rowAction({item: item});
        }
      };

      scope.doAction = function doAction($event, item, action) {
        $event.stopPropagation();
        if (_.isString(action)) {
          $state.go(action, {id: item.id});
        } else {
          action(item);
        }
      };

      scope.$watch('items.length', function() {
        scope.updateVisibleCount();
      });

      scope.updateVisibleCount = function updateVisibleCount() {
        scope.visibleItemCount = _.size($filter('filter')(scope.items, scope.itemSearch));
      };
      scope.onAddButtonClicked = function addNewItem() {
        if (scope.newItemSref) {
          $state.go(scope.newItemSref);
        } else if (scope.newItemAction) {
          scope.newItemAction();
        }
      };
    }
  };
});