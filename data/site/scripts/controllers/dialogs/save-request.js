'use strict';

angular.module('app')
    .controller('DialogSaveRequestCtrl', ['$scope', '$mdDialog', '$data', function ($scope, $mdDialog, $data) {

        var collections = null;

        function getFilteredCollections(query) {
            var lowercaseQuery = angular.lowercase(query);
            return collections.filter(c => angular.lowercase(c).indexOf(lowercaseQuery) > -1);
        }

        $scope.collection = '';
        $scope.title = '';

        $scope.queryCollections = function (query) {
            if (!query) return [];
            
            if (collections === null) {
                return $data.getRequestCollections().then(result => {
                    collections = result;

                    return getFilteredCollections(query);
                });
            } else {
                return getFilteredCollections(query);
            }
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        }

        $scope.save = function() {
            $mdDialog.hide({
                collection: $scope.collection,
                title: $scope.title
            });
        }

    }]);
