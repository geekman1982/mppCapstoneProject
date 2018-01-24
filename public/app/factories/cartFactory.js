angular.module("app").factory("cartFactory", ["$window", cartFactory]);
function cartFactory($window) {
    return {
        add: addProduct,
        getAll: getProducts,
        remove: removeProduct,
        clear: clear,
        getAzureProducts: getAzure,
        setAzureProducts: setAzure
    }

    /// This adds a product into the session
    function addProduct(product, quantity) {

        var existingProduct = get(product.name);
        if (existingProduct) {
            existingProduct.quantity += quantity;
            save(existingProduct);
        } else {
            product.quantity = quantity;
            save(product);
        }
    }

    // This removes a single product
    function removeProduct(product) {
        $window.sessionStorage.removeItem(product.name);
    }

    /// This returns all the products we have in session
    function getProducts() {
        var returnArray = [];
        var length = $window.sessionStorage.length;
        for (var i = 0; i < length; ++i) {
            if ($window.sessionStorage.key(i) === "azure_products")
                continue;

            var obj = $window.sessionStorage.getItem($window.sessionStorage.key(i));
            if (obj) {
                returnArray.push(JSON.parse(obj));
            }
        }
        return returnArray;
    }

    /// This clears all products from the cart
    function clear() {
        $window.sessionStorage.clear();
    }


    function getAzure() {
        return get("azure_products");
    }

    function setAzure(products) {
        $window.sessionStorage.setItem("azure_products", JSON.stringify(products));
    }

    /*
    This are private functions
    */
    function save(value) {
        $window.sessionStorage.setItem(value.name, JSON.stringify(value));
    }
    function get(key) {
        var obj = $window.sessionStorage.getItem(key);
        if (obj) {
            return JSON.parse(obj);
        } else {
            return null;
        }
    }

}