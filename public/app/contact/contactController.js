angular.module('app').controller('ContactController', [
    function () {
        var vm = this;
        vm.contact = {
            name: "",
            mail: "",
            reason: "General query",
            message: "",
            infoOk: false
        };

        vm.fieldIsOk = function (field) {
            if (field === "name") {
                return !(vm.contact.name !== undefined && vm.contact.name.length > 0);
            } else if (field === "message") {
                return !(vm.contact.message !== undefined && vm.contact.message.length > 0);
            } else if (field === "email") {
                /// Found this email regex on the internet
                /// This will NOT cater for correct emails, but atleast dose a very simple test
                var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return !(vm.contact.mail !== undefined && vm.contact.mail.length > 0 && emailRegex.test(vm.contact.mail));
            } else {
                /// check all fields
                var a = vm.fieldIsOk("name");
                var b = vm.fieldIsOk("message");
                var c = vm.fieldIsOk("email");
                vm.contact.infoOk = !a && !b && !c;

            }
        }

        vm.showSendAlert = function(){
            var message = "Thank you "+vm.contact.name+" for the '"+vm.contact.reason+"'\n\n" +
                "Your feedback has been captured as:\n" +
                "\n\t**Email**\n"+ vm.contact.mail +"\n"+
                "\n\t**Feedback**\n"+ vm.contact.message +"\n"+
                "\nOne of our staff members will be in contact shortly";
            alert(message);
        }
    }
]);