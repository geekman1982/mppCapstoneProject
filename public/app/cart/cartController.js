angular.module('app').controller('CartController', ["$window", "cartFactory",
    function ($window, cartFactory) {
        var vm = this;
        vm.shipping = {
            infoOk: false,
            shippingFee: 0,
            taxFee: 0,
            total: 0,
            freeShipping: false
        };

        vm.grandTotal = function () {
            var total = 0;
            for (var i = 0; i < vm.products.length; i++) {
                total += parseInt(vm.products[i].quantity) * parseInt(vm.products[i].price);
            }

            if (total == 0) {
                vm.shipping.shippingFee = 0;
                vm.shipping.taxFee = 0;
                vm.shipping.total = 0;
            } else {
                vm.shipping.freeShipping = total > 200;
                vm.shipping.shippingFee = (!vm.shipping.freeShipping) ? parseInt(total * 0.05) : 0;
                vm.shipping.taxFee = parseInt((vm.shipping.shippingFee + total) / 10);
                vm.shipping.total = parseInt(total + vm.shipping.shippingFee + vm.shipping.taxFee);
            }

            return parseInt(total);
        };

        var cart = cartFactory;

        vm.products = cart.getAll();

        vm.removeProduct = function (product) {
            cart.remove(product);
            vm.products = cart.getAll();
        };

        vm.back = function () {
            $window.history.back();
        };

        vm.fieldIsOk = function (field) {
            if (field === "name") {
                return !(vm.shipping.name !== undefined && vm.shipping.name.length > 0);
            } else if (field === "address") {
                return !(vm.shipping.address !== undefined && vm.shipping.address.length > 0);
            } else if (field === "city") {
                return !(vm.shipping.city !== undefined && vm.shipping.city.length > 0);
            } else if (field === "phone") {
                var phoneNumber = /\d{4}[\-]\d{4}/;
                return !(vm.shipping.phone !== undefined && vm.shipping.phone.length > 0 && phoneNumber.test(vm.shipping.phone));
            } else {
                /// check all fields
                var a = vm.fieldIsOk("name");
                var b = vm.fieldIsOk("address");
                var c = vm.fieldIsOk("city");
                var d = vm.fieldIsOk("phone");
                vm.shipping.infoOk = !a && !b && !c && !d;

            }
        }

        vm.calcProductPrice = function (product) {
            var a = parseFloat(product.quantity);
            var b = parseFloat(product.price);

            return (a * b).toFixed(2);
        }

        vm.showCheckout = function(){
            var message = "Thank you "+vm.shipping.name+" for your purchase!\n\n" +
                "We will be shipping your product to:\n" +
                "**Address**\n"+ vm.shipping.address +"\n"+
                "**City** "+ vm.shipping.city +"\n"+
                "**Phone** "+ vm.shipping.phone +"\n"+
                "\nYour total for this order was: $"+vm.shipping.total +"\n"+
                "Thank you for your support"
            alert(message);
        }
    }
]);