/**!
 * AngularJS Plupload directive
 * @author Chungsub Kim <subicura@subicura.com>
 */

(function () {
  'use strict';

  angular.module('angular-form-plus', [])
    .directive('formPlus', [
      function () {
        return {
          restrict: 'A',
          require: 'form',
          /* jshint unused: false */
          link: function postLink(scope, element, attrs) {
            var form = element.controller('form');
            var submit = attrs.ngSubmit;
            element.unbind('submit');
            element.bind('submit', function (event) {
              form.submitted = true;
              scope.$apply(submit);
              if (!scope.$$phase) {
                scope.$apply();
              }
            });

            /**
             * public methods
             */

            /**
             * form initialize
             */
            form.init = function() {
              form.$setPristine();
              form.submitted = false;
              if (!scope.$$phase) {
                scope.$apply();
              }
            };

            /**
             * check invalid helper
             * input창을 입력하지 않고 form을 서브밋 하거나 input창에 값을 입력했을 경우에만 체크한다.
             * ex) form.isInvalid(title)
             */
            form.isInvalid = function(model) {
              return (form.submitted && model.$dirty) && model.$invalid;
            };
          }
        };
      }
    ]
  );
})();
