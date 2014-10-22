'use strict';

angular.module('core').controller('StartController', ['$scope', '$timeout', 'TrialData', 'ExperimentManager', 'SocketIOService',
    function($scope, $timeout, TrialData, ExperimentManager, SocketIOService) {

        // Bind $scope.advanceSlide to ExperimentManager functionality
        $scope.advanceSlide = ExperimentManager.advanceSlide;

        // Ready to advance?
        $scope.readyToAdvance = function() {
            return $scope.maxReady || $scope.debugMode;
        };

        // Configure handler for incoming OSC messages
        this.oscMessageReceivedListener = function(data) {
            if (data.address === '/eim/status/startExperiment') {
                $scope.$apply(function() {
                    $scope.maxReady = true;
                });
            }
        };

        // Attach handler for incoming OSC messages
        SocketIOService.on('oscMessageReceived', this.oscMessageReceivedListener);

        // Destroy handler for incoming OSC messages when $scope is destroyed
        // Also, remove error timeout
        var thisController = this;
        $scope.$on('$destroy', function removeOSCMessageReceivedListener() {
            SocketIOService.removeListener('oscMessageReceived', thisController.oscMessageReceivedListener);
            $timeout.cancel(thisController.errorTimeout);
        });

        this.sendExperimentStartMessage = function() {

            $scope.maxReady = false;
            SocketIOService.emit('sendOSCMessage', {
                oscType: 'message',
                address: '/eim/control/startExperiment',
                args: {
                    type: 'string',
                    value: '' + TrialData.data.metadata.session_number
                }
            });
        };

        this.sendExperimentStartMessage();

        this.errorTimeout = $timeout(function() {}, 10000);
        this.errorTimeout.then(function() {
            if (!$scope.readyToAdvance) {
                $scope.addGenericErrorAlert();
                throw new Error('Max had not responded to startExperiment message after 10 seconds');
            }
        });
    }
]);