angular.module('dv.web.directives').directive('dvModelDisplay', function(FILE_ROOT, $parse) {
  'use strict';
  return {
    restrict: 'E',
    templateUrl: FILE_ROOT + 'components/dv.web/directives/dv-model-display.html',
    scope: {
      model: '=',
      fields: '='
    },
    link: function dvModelDisplayLink(scope) {
      scope.getFieldValue = function getFieldValue(field) {
        return field.valueMap ? field.valueMap[scope.model[field.key]].value : scope.model[field.key];
      };
      scope.getFieldType = function getFieldType(field) {
        if (!scope.model[field.key]) {
          return null;
        }
        if (field.isDate) {
          return 'date';
        }
        if (scope.getFieldValue(field).length < 40) {
          return 'span';
        } else {
          return 'div';
        }
      };
      scope.getFieldImgValue = function getFieldImgValue(field) {
        if (field.isImage) {
          return scope.getFieldImgValue(field);
        } else if (field.valueMap) {
          return field.valueMap[scope.model[field.key]].image;
        }
      };
      scope.isHidden = function isHidden(field) {
        return field.hideExpression && $parse(field.hideExpression)(scope.model);
      };
    }
  };
});