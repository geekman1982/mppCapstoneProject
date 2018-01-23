angular.module('app').controller('ProductController', ["$location", "$window", "dataService",
    function ($location, $window, dataService) {
        var vm = this;
        vm.selectedProduct = $location.search().name;
        vm.product = {};
        vm.ratings = [];
        var azureService = dataService;

        vm.back = function () {
            $window.history.back();
        };

        azureService.getProducts().then(
            function (response) {
                /// Success
                vm.products = response;
                findProduct();
                setupVariables();
            },
            function (response) {
                /// Failed
                vm.products = {};
            }
        )

        function findProduct() {

            for (var categoryCount = 0; categoryCount < vm.products.length; categoryCount++) {
                var categoryObj = vm.products[categoryCount];
                var categoryName = categoryObj.category;
                for (var subCategoryCount = 0; subCategoryCount < categoryObj.subcategories.length; subCategoryCount++) {

                    var subCategoryObj = categoryObj.subcategories[subCategoryCount];
                    var subCategoryName = subCategoryObj.name;
                    for (var productCount = 0; productCount < subCategoryObj.items.length; productCount++) {
                        var productObj = subCategoryObj.items[productCount];

                        productObj.category = categoryName;
                        productObj.subCategory = subCategoryName;

                        if (productObj.name === vm.selectedProduct) {
                            vm.product = productObj;
                            return;
                        }

                    }
                }
            }
        }

        function setupVariables() {
            setupRatings();
        }

        function setupRatings() {
            vm.ratings.length = parseInt(vm.product.rating);
        }
    }
]);