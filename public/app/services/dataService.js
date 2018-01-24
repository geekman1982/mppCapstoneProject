angular.module('app').factory('dataService', ['$http', '$q', "cartFactory", dataService]);

function dataService($http, $q, cartFactory) {
    const azureDataURL = "https://webmppcapstone.blob.core.windows.net/data/itemsdata.json";
    var sessionObj = cartFactory;
    var service = {
        getProducts: loadAllProducts
    };

    return service;

    function loadAllProducts() {

        var deferred = $q.defer();
        var cached = sessionObj.getAzureProducts();
        if (!cached){
            $http.get(azureDataURL).then(function (result) {
                sessionObj.setAzureProducts(result.data);
                deferred.resolve(result.data);
            });
        } else {
            deferred.resolve(cached);
        }

        return deferred.promise;
    }
}