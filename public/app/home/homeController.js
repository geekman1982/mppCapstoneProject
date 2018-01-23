angular.module('app').controller('HomeController', ["dataService",
    function (dataService) {
        const showcaseProductAmount = 5;

        var vm = this;
        vm.message = 'Welcome!';
        vm.slideInterval = 3000;
        vm.enableSliding = false;
        vm.products = {};
        vm.showcaseProducts = [];

        var azureService = dataService;

        azureService.getProducts().then(
            function (response) {
                /// Success
                vm.products = response;
                selectShowcaseProducts(showcaseProductAmount);
            },
            function (response) {
                /// Failed
                vm.products = {};
            }
        )

        function selectShowcaseProducts(numberOfProducts) {

            var alreadyAdded = [];
            for (var i = 0; i < numberOfProducts; i++) {

                var selectedCategory = randomCategory();
                var selectedSubCategory = null;
                while (selectedSubCategory === null) {
                    selectedSubCategory = randomSubCategory(selectedCategory);
                    if (selectedSubCategory !== null) {
                        var selectedProduct = null;
                        while (selectedProduct === null) {
                            selectedProduct = randomProduct(selectedSubCategory);

                            var allowedToAdd = $.inArray(selectedProduct.name, alreadyAdded) == -1;
                            if (allowedToAdd){
                                alreadyAdded.push(selectedProduct.name);
                                selectedProduct.index = i;
                            }else{
                                /// We have already added this product
                                /// Randomly select a different one
                                selectedProduct = null;
                            }

                        }
                    }
                }
                
                vm.showcaseProducts.push(selectedProduct);
            }
        }

        function randomCategory() {
            var lower = 0;
            var upper = vm.products.length - 1;
            var randomPosition = Math.floor(Math.random() * (upper - lower + 1) + lower);

            while(vm.products[randomPosition] == undefined){
                randomPosition = Math.floor(Math.random() * (upper - lower + 1) + lower);    
            }
            return vm.products[randomPosition]
        }

        function randomSubCategory(categoryObject) {
            if (categoryObject.subcategories === undefined)
                return null;
            var lower = 0;
            var upper = categoryObject.subcategories.length - 1;
            var randomPosition = Math.floor(Math.random() * (upper - lower + 1) + lower);

            return categoryObject.subcategories[randomPosition]
        }

        function randomProduct(subCategoryObject) {
            var returnObj = null;
            if (subCategoryObject.items === undefined)
                return returnObj;

            var lower = 0;
            var upper = subCategoryObject.items.length - 1;
            while(returnObj === null){
                var randomPosition = Math.floor(Math.random() * (upper - lower + 1) + lower);
                returnObj = subCategoryObject.items[randomPosition];
            }

            return returnObj;
        }
    }
]);