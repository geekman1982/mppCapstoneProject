angular.module('app').factory('dataService', ['$http', '$q', dataService]);

function dataService($http, $q) {
    const azureDataURL = "https://webmppcapstone.blob.core.windows.net/data/itemsdata.json";

    var service = {
        products: null,
        getProducts: loadAllProducts
    };

    return service;

    function loadAllProducts() {
        var deferred = $q.defer();

        if (this.products == null) {
            $http.get(azureDataURL).then(function (result) {
                deferred.resolve(result.data);
            });
        } else {
            deferred.resolve(this.products);
        }

        return deferred.promise;
    }
}