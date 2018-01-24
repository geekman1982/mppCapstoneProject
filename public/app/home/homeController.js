angular.module('app').controller('HomeController', ["dataService",
    function (dataService) {
        const showcaseProductAmount = 12;

        var vm = this;
        vm.slideInterval = 3000;
        vm.slidingDisabled = false;
        vm.products = {};
        vm.allProducts = [];
        vm.showcaseProducts = [];

        var azureService = dataService;

        azureService.getProducts().then(
            function (response) {
                /// Success
                vm.products = response;
                populateProducts();
                selectShowcaseProducts();
            },
            function (response) {
                /// Failed
                vm.products = {};
            }
        )

        function selectShowcaseProducts() {

            var alreadyAdded = [];

            var lower = 0;
            var upper = vm.allProducts.length - 1;

            while (vm.showcaseProducts.length < showcaseProductAmount) {
                var randomPosition = Math.floor(Math.random() * (upper - lower + 1) + lower);

                while ($.inArray(randomPosition, alreadyAdded) > -1){
                    randomPosition = Math.floor(Math.random() * (upper - lower + 1) + lower);
                }
                alreadyAdded.push(randomPosition);
                vm.showcaseProducts.push( vm.allProducts[randomPosition]);
            }
        }

        function populateProducts() {

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

                        vm.allProducts.push(productObj);

                    }
                }
            }
        }

    }
]);