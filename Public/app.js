angular.module('anvayaaAdminApp', []);

angular.module('anvayaaAdminApp').constant('env', {
    "url": "http://0.0.0.0:3334",
    "Token": "x-anvayaaadmin-token",
    "TokenType": "x-anvayaaadmin-token"
})




angular.module('anvayaaAdminApp').controller('adminCtrl', ['$scope', function($scope) {


$scope.Name="Sharath"


}])
