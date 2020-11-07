// POI controller
angular.module("myApp")
    .controller("POISController", function ($scope, $http, $filter) {
        self = this;
        $scope.points=[];
        $scope.searchName='';
        $scope.selectedName="";

        $http.get('http://localhost:3000/categories/getCategories').then(function(response){
            $scope.categories=response.data.categories;
        });

        $http.get("http://localhost:3000/points/getAllPoints")
            .then(function (response) {
                $scope.points=$filter('orderBy')(response.data.points, 'rank');
                $scope.pointsBackup=$scope.points;
            }, function (response) {
                alert(response.statusText)
            });

        $scope.sortRank = function(event){
            $scope.points=$filter('orderBy')($scope.points, 'rank');
            if ($scope.checked === event.target.value)
                $scope.checked = false
        };

        $scope.sortCat = function(event){
            $scope.points=$filter('orderBy')($scope.points, 'category');
            if ($scope.checked === event.target.value)
                $scope.checked = false
        };

        $scope.search = function () {
            let obj=$filter('filter')($scope.pointsBackup, {'name':$scope.searchName});
            if(obj.length>0){
                $scope.points=obj;
            }
            /**
             * TODO:else show modal
             */
            else {
                $scope.points=$scope.pointsBackup;
                alert("No Points Found!");
            }
        };

        $scope.filterCat = function(){
            let obj=$filter('filter')($scope.pointsBackup, {'category':$scope.selectedName.name});
            if(obj.length>0){
                $scope.points=obj;
            }
            /**
             * TODO:else show modal
             */
            else {
                $scope.points=$scope.pointsBackup;
                alert("No Points Found!");
            }
        }
    });