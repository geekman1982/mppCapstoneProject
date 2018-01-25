angular.module('app').controller('AboutController', ["avatarService",
    function (avatarService) {
        var avatarAPI = avatarService;
        var vm = this;
        vm.config = {
            randomCount: 12,
            randomAvatars: []
        }


        for (var i = 0; i < vm.config.randomCount; i++){

            
            avatarAPI.getAvatar().then(
                function (response) {
                    /// Success
                    vm.config.randomAvatars.push(response);
                },
                function (response) {
                    /// Failed
                }
            )


        }
    }
]);