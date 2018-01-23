angular.module('app').controller('ShoppingController', ["dataService",
    function (dataService) {
        var vm = this;
        vm.currentSetting = "";
        vm.selectedItem = "none";
        vm.itemCount = 0;
        vm.products = {};
        vm.flatProducts = [];
        var azureService = dataService;

        azureService.getProducts().then(
            function (response) {
                /// Success
                vm.products = response;
                populateProducts();
            },
            function (response) {
                /// Failed
                vm.products = {};
            }
        )

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

                        vm.flatProducts.push(productObj);
                    }
                }
            }
        }

    }
]);