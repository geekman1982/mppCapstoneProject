angular.module('app').factory('avatarService', ['$http', '$q', avatarService]);

function avatarService($http, $q) {
    const avatarServiceBaseURL = "https://api.adorable.io/avatars/face/eyes/nose/mouth/color";
    var service = {
        getAvatar: loadAvatar
    };

    return service;
    //{"face":{"eyes":["eyes1","eyes10","eyes2","eyes3","eyes4","eyes5","eyes6","eyes7","eyes9"],"nose":["nose2","nose3","nose4","nose5","nose6","nose7","nose8","nose9"],"mouth":["mouth1","mouth10","mouth11","mouth3","mouth5","mouth6","mouth7","mouth9"]}}

    function loadAvatar() {
        var deferred = $q.defer();


        var lower = 0;
        var upper = 9;

        var eyes = ["eyes1", "eyes10", "eyes2", "eyes3", "eyes4", "eyes5", "eyes6", "eyes7", "eyes9"];
        var noses = ["nose2", "nose3", "nose4", "nose5", "nose6", "nose7", "nose8", "nose9"];
        var mouths = ["mouth1", "mouth10", "mouth11", "mouth3", "mouth5", "mouth6", "mouth7", "mouth9"];

        /// Found this nifty random hex generator on the internet:
        /// Credit: https://www.paulirish.com/2009/random-hex-color-code-snippets/
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        var randomEye = eyes[Math.floor(Math.random() * (upper - lower + 1) + lower)];
        var randomNose = noses[Math.floor(Math.random() * (upper - lower + 1) + lower)];
        var randomMouth = mouths[Math.floor(Math.random() * (upper - lower + 1) + lower)];
        
        var randomAvatarURL = avatarServiceBaseURL.replace("eyes", randomEye).replace("nose",randomNose).replace("mouth", randomMouth).replace("color", randomColor);

        deferred.resolve(randomAvatarURL);

        return deferred.promise;
    }
}