angular.module("app", ["ngRoute", "ui.bootstrap", "ngAnimate"]);
angular.module("app").config([
    "$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/product", {
                templateUrl: "/app/product/product.html",
                controller: "ProductController",
                controllerAs: "vm"
            }).when("/shopping", {
                templateUrl: "/app/shopping/shopping.html",
                controller: "ShoppingController",
                controllerAs: "vm"
            }).when("/", {
                templateUrl: "/app/home/home.html",
                controller: "HomeController",
                controllerAs: "vm"
            }).otherwise({
                redirectTo: "/"
            });
    }
]);
