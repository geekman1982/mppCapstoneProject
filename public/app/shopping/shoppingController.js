angular.module('app').controller('ShoppingController', ["$filter", "orderByFilter", "dataService",
    function ($filter, orderByFilter, dataService) {
        var vm = this;

        vm.config = {
            selectedSubCategory: "Baby care",
            foundItems: 0,
            foundFiltered: 0,
            onlyInStock: false,
            filteredItems: [],
            sortBy: "",
            filterProducts: $filter("categoryFilter")
        };
        vm.products = {};
        vm.flatProducts = [];
        vm.categories = [];

        var azureService = dataService;

        azureService.getProducts().then(
            function (response) {
                /// Success
                vm.products = response;
                populateProducts();
                populateCategories();
                performFilter();
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
                        productObj.id = (categoryName + subCategoryName).replace(/\s/g, '') + "_" + subCategoryCount + "_" + productCount;
                        productObj.isInStock = (parseInt(productObj.stock) > 0);
                        productObj.ratings = [];
                        productObj.ratings.length = parseInt(productObj.rating);
                        vm.flatProducts.push(productObj);
                    }
                }
            }
        }
        function populateCategories() {
            var alreadyAdded = [];
            for (var i = 0; i < vm.flatProducts.length; i++) {
                var categoryName = vm.flatProducts[i].category;
                var subCategoryName = vm.flatProducts[i].subCategory;

                if ($.inArray(categoryName, alreadyAdded) == -1) {
                    alreadyAdded.push(categoryName);
                    var categoryObj = {
                        category: categoryName,
                        subCategories: []
                    };
                    categoryObj.subCategories = populateSubCategories(categoryName);
                    vm.categories.push(categoryObj);
                }
            }
        }
        function populateSubCategories(parentCategory) {
            var alreadyAdded = [];
            var returnArray = [];
            for (var i = 0; i < vm.flatProducts.length; i++) {
                var categoryName = vm.flatProducts[i].category;

                if (categoryName === parentCategory) {
                    var subCategoryName = vm.flatProducts[i].subcategory;

                    if ($.inArray(subCategoryName, alreadyAdded) == -1) {
                        var uniqueName = (categoryName + subCategoryName).replace(/\s/g, '');
                        var subCategoryObj = {
                            name: subCategoryName,
                            id: uniqueName
                        };
                        alreadyAdded.push(subCategoryObj.name);
                        returnArray.push(subCategoryObj);

                    }
                }
            }
            return returnArray;
        }

        vm.setSelectedSubcategory = function (subCategoryName) {
            vm.config.selectedSubCategory = subCategoryName;
            performFilter();
            vm.performSort();
        }


        function performFilter(){
            vm.config.filteredItems = vm.config.filterProducts(vm.flatProducts, vm);
        }

        vm.performSort = function () {
            var ascending = (vm.config.sortBy !== "name");
            vm.config.filteredItems = orderByFilter(vm.config.filteredItems, vm.config.sortBy, ascending);

        };
    }
]).filter("categoryFilter", function () {
    return function (items, vmObject) {
        console.log(arguments);
        var currentSelectedCategory = vmObject.config.selectedSubCategory;
        var filtered = [];
        items.forEach(function (item) {
            if (item.subcategory === currentSelectedCategory) {
                filtered.push(item);
            }
        });

        vmObject.config.foundItems = filtered.length;
        return filtered;
    }
}).filter("stockFilter", function () {
    return function (items, vmObject) {

        var onlyShowInStock = vmObject.config.onlyInStock;
        var filtered = [];
        items.forEach(function (item) {

            var allowedToAdd = true;
            if (onlyShowInStock && !item.isInStock)
                allowedToAdd = false;

            if (allowedToAdd) {
                filtered.push(item);
            }
        });

        vmObject.config.foundFiltered = filtered.length;
        return filtered;
    }
});