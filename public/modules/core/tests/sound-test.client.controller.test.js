'use strict';

(function() {
    describe('SoundTestController', function() {

        //Initialize global variables
        var mockScope, $controller, mockTrialData, OSC;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function(_$controller_, $rootScope, _OSC_) {
            $controller = _$controller_;
            mockScope = $rootScope.$new();
            OSC = _OSC_;
            mockTrialData = {
                data: {
                    metadata: {
                        session_number: 42
                    }
                }
            };
        }));

        describe('OSC messages', function() {
            it('should send the correct OSC message on init', function() {
                spyOn(OSC, 'send');

                mockTrialData.data.metadata.language = 'en';

                var startMessage = {
                    oscType: 'message',
                    address: '/eim/control/soundTest',
                    args: [
                        {
                            type: 'integer',
                            value: 1
                        },
                        {
                            type: 'string',
                            value: '' + mockTrialData.data.metadata.language
                        },
                        {
                            type: 'string',
                            value: '' + mockTrialData.data.metadata
                                .session_number
                        }
                    ]
                };

                $controller('SoundTestController',
                    { $scope: mockScope, TrialData: mockTrialData }
                );

                expect(OSC.send.calls.argsFor(0)[0]).toEqual(startMessage);
            });

            it('$scope.stopSoundTest should send the correct OSC message',
                function() {

                    $controller('SoundTestController',
                        { $scope: mockScope, TrialData: mockTrialData }
                    );

                    //SocketIOService.emits = {};

                    spyOn(OSC, 'send');
                    mockScope.stopSoundTest();

                    //var emittedData =
                    //    SocketIOService.emits.sendOSCMessage[0][0];

                    expect(OSC.send.calls.argsFor(0)[0]).toEqual({
                        oscType: 'message',
                        address: '/eim/control/soundTest',
                        args: [
                            {
                                type: 'integer',
                                value: 0
                            },
                            {
                                type: 'string',
                                value: '' + mockTrialData.data.metadata
                                    .session_number
                            }
                        ]
                    });
                }
            );

            it('should send the stopSoundTest message when the scope is ' +
                'destroyed', function() {

                    $controller('SoundTestController',
                        { $scope: mockScope, TrialData: mockTrialData }
                    );

                    spyOn(mockScope, 'stopSoundTest');
                    mockScope.$destroy();
                    expect(mockScope.stopSoundTest.calls.count()).toBe(1);
                }
            );
        });
    });
})();
