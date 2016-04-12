//Created By Rajeshwar Patlolla
//https://github.com/rajeshwarpatlolla/ionic-toast
//rajeshwar.patlolla@gmail.com
//Modified by Tan Li Hau
//https://github.com/ionic-widget/ui-ionic-toast.git
//lhtan93@gmail.com

'use strict';
angular.module('ui.ionic-toast', ['ionic'])

.run(['$templateCache', function ($templateCache) {
    var toastTemplate = '<div class="ionic_toast_wrapper"><div ng-class="ionicToast.toastClass">' +
        '<span class="ionic_toast_close" ng-click="hide()"><i class="ion-close-round toast_close_icon"></i></span>' +
        '<span ng-bind-html="ionicToast.toastMessage"></span>' +
        '</div></div>';

    $templateCache.put('ionic-toast/templates/ionic-toast.html', toastTemplate);
}])

.provider('ionicToast', function () {

    this.$get = ['$compile', '$document', '$interval', '$rootScope', '$templateCache', '$timeout',
    function ($compile, $document, $interval, $rootScope, $templateCache, $timeout) {

        var defaultScope = {
            toastClass: {},
            toastMessage: '',
        };

        var toastTimeout;

        var toastPosition = {
            top: 'ionic_toast_top',
            middle: 'ionic_toast_middle',
            bottom: 'ionic_toast_bottom'
        };

        var toastScope = $rootScope.$new();
        var toastTemplate = $compile($templateCache.get('ionic-toast/templates/ionic-toast.html'))(toastScope);

        toastScope.ionicToast = defaultScope;

        $document.find('body').append(toastTemplate);

        var toggleDisplayOfToast = function (show, callback) {
            if(show){
                toastScope.ionicToast.toastClass.ionic_toast_show = true;
                toastScope.ionicToast.toastClass.ionic_toast_hide = false;
            }else{
                toastScope.ionicToast.toastClass.ionic_toast_show = false;
                toastScope.ionicToast.toastClass.ionic_toast_hiding = true;
                $timeout(function () {
                    toastScope.ionicToast.toastClass.ionic_toast_hiding = false;
                    toastScope.ionicToast.toastClass.ionic_toast_hide = true;
                }, 1000);
            }
            if (callback) {
                callback();
            }
        };

        toastScope.hide = function () {
            toggleDisplayOfToast(false, function () {
                // console.log('toast hidden');
                $rootScope.$broadcast('ionicToastDismissed');
            });
        };

        var baseShow = function(message, position, closeBtn, duration) {

            if (!message || !position || !duration) return;
            $timeout.cancel(toastTimeout);
            if (duration > 5000) duration = 5000;

            angular.extend(toastScope.ionicToast, {
                toastClass: {
                    'ionic_toast_top': position == 'top',
                    'ionic_toast_middle': position == 'middle',
                    'ionic_toast_bottom': position == 'bottom',
                    'ionic_toast': true,
                    'ionic_toast_sticky': closeBtn,
                    'ionic_toast_error': false,
                    'ionic_toast_warning': false,
                    'ionic_toast_success': false,
                    'ionic_toast_info': false,
                    'ionic_toast_show': false,
                    'ionic_toast_hiding': false,
                    'ionic_toast_hide': false,
                },
                toastMessage: message
            });

            toggleDisplayOfToast(true, function () {
                if (closeBtn) return;

                toastTimeout = $timeout(function () {
                    toastScope.hide();
                }, duration);
            });
        }

        return {

            show: function (message, position, closeBtn, duration) {
                baseShow(message, position, closeBtn, duration);
            },
            showError: function (message, position, closeBtn, duration) {
                baseShow(message, position, closeBtn, duration);
                toastScope.ionicToast.toastClass.ionic_toast_error = true;
            },
            showWarning: function (message, position, closeBtn, duration) {
                baseShow(message, position, closeBtn, duration);
                toastScope.ionicToast.toastClass.ionic_toast_warning = true;
            },
            showInfo: function (message, position, closeBtn, duration) {
                baseShow(message, position, closeBtn, duration);
                toastScope.ionicToast.toastClass.ionic_toast_info = true;
            },
            showSuccess: function (message, position, closeBtn, duration) {
                baseShow(message, position, closeBtn, duration);
                toastScope.ionicToast.toastClass.ionic_toast_success = true;
            },
            hide: function () {
                toastScope.hide();
            }
        };
    }
    ];
});
