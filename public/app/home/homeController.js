angular.module('app').controller('HomeController', ["dataService",
    function (dataService) {
        const showcaseProductAmount = 12;

        var vm = this;
        vm.config = {
            slideInterval: 3000,
            slidingDisabled: false,
            products: {},
            allProducts: [],
            showcaseProducts: []
        };
        

        var azureService = dataService;

        azureService.getProducts().then(
            function (response) {
                /// Success
                vm.config.products = response;
                populateProducts();
                selectShowcaseProducts();
            },
            function (response) {
                /// Failed
                vm.config.products = {};
            }
        )

        function selectShowcaseProducts() {

            var alreadyAdded = [];

            var lower = 0;
            var upper = vm.config.allProducts.length - 1;

            while (vm.config.showcaseProducts.length < showcaseProductAmount) {
                var randomPosition = Math.floor(Math.random() * (upper - lower + 1) + lower);

                while ($.inArray(randomPosition, alreadyAdded) > -1){
                    randomPosition = Math.floor(Math.random() * (upper - lower + 1) + lower);
                }
                alreadyAdded.push(randomPosition);
                vm.config.showcaseProducts.push( vm.config.allProducts[randomPosition]);
            }
        }

        function populateProducts() {

            for (var categoryCount = 0; categoryCount < vm.config.products.length; categoryCount++) {
                var categoryObj = vm.config.products[categoryCount];
                var categoryName = categoryObj.category;
                for (var subCategoryCount = 0; subCategoryCount < categoryObj.subcategories.length; subCategoryCount++) {

                    var subCategoryObj = categoryObj.subcategories[subCategoryCount];
                    var subCategoryName = subCategoryObj.name;
                    for (var productCount = 0; productCount < subCategoryObj.items.length; productCount++) {
                        var productObj = subCategoryObj.items[productCount];

                        productObj.category = categoryName;
                        productObj.subCategory = subCategoryName;

                        vm.config.allProducts.push(productObj);

                    }
                }
            }
        }

        vm.changeSliding = function(){
            vm.config.slideInterval = (vm.config.slidingDisabled) ? false : 3000;
        }

    }
]);