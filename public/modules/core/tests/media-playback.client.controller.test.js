'use strict';

(function() {
    describe('MediaPlaybackController', function() {

        //Initialize global variables
        var mockScope, $controller, $timeout, ExperimentManager, $httpBackend,
            TrialData, $log, OSC;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function(_$controller_, $rootScope, _$timeout_, _ExperimentManager_, _$httpBackend_, _TrialData_, _$log_, _OSC_) {

            $controller = _$controller_;
            mockScope = $rootScope.$new();
            $timeout = _$timeout_;
            ExperimentManager = _ExperimentManager_;
            TrialData = _TrialData_;
            $log = _$log_;
            OSC = _OSC_;

            $httpBackend = _$httpBackend_;
            $httpBackend.whenGET('/api/config').respond();
        }));

        describe('initialization', function() {
            it('should be defined', function() {
                var createController = function() {
                    $controller('MediaPlaybackController',
                        {$scope: mockScope}
                    );
                };

                expect(createController).not.toThrow();
            });

            it('should add OSC message listeners', function() {
                spyOn(OSC, 'subscribe');

                var controller = $controller('MediaPlaybackController',
                    { $scope: mockScope }
                );

                var firstCallArgs = OSC.subscribe.calls.argsFor(0);
                expect(firstCallArgs[0])
                    .toEqual('/eim/status/playback');
                expect(firstCallArgs[1])
                    .toBe(controller.playbackMessageListener);

                var secondCallArgs = OSC.subscribe.calls.argsFor(1);
                expect(secondCallArgs[0])
                    .toEqual('/eim/status/emotionIndex');
                expect(secondCallArgs[1])
                    .toBe(controller.emotionIndexMessageListener);
            });
        });

        describe('teardown', function() {
            it('should be removed on destruction', function() {
                spyOn(OSC, 'unsubscribe');

                var ctrl = $controller('MediaPlaybackController',
                    { $scope: mockScope }
                );

                // showBody comes from MasterController--need to mock it here
                mockScope.showBody = function(){};
                mockScope.$destroy();

                expect(OSC.unsubscribe.calls.argsFor(0)[0])
                    .toEqual('/eim/status/playback');
                expect(OSC.unsubscribe.calls.argsFor(0)[1])
                    .toEqual(ctrl.playbackMessageListener);
                expect(OSC.unsubscribe.calls.argsFor(1)[0])
                    .toEqual('/eim/status/emotionIndex');
                expect(OSC.unsubscribe.calls.argsFor(1)[1])
                    .toEqual(ctrl.emotionIndexMessageListener);
            });

            it('should send a stopMedia OSC message when the scope is ' +
                'destroyed', function() {

                    var mockTrialData = {
                        data: {
                            metadata: {
                                session_number: 42
                            }
                        }
                    };
                    mockScope.showBody = function() {
                    };

                    $controller('MediaPlaybackController',
                        {$scope: mockScope, TrialData: mockTrialData}
                    );

                    spyOn(OSC, 'send');

                    mockScope.$destroy();

                    expect(OSC.send).toHaveBeenCalledWith({
                        oscType: 'message',
                        address: '/eim/control/stopMedia',
                        args: {
                            type: 'string',
                            value: '' + mockTrialData.data.metadata
                                .session_number
                        }
                    });
                }
            );

            it('should show the body when the scope is destroyed', function() {
                mockScope.showBody = function() {
                };

                $controller('MediaPlaybackController',
                    {$scope: mockScope}
                );

                spyOn(mockScope, 'showBody');
                mockScope.$destroy();
                expect(mockScope.showBody.calls.count()).toBe(1);
            });
        });

        describe('view/state manipulation', function() {
            it('should set the button label to \'Begin Playback\'', function() {
                $controller('MediaPlaybackController',
                    {$scope: mockScope}
                );

                expect(mockScope.currentButtonLabel).toBe('Begin Playback');
            });

            it('should set mediaHasPlayed to false', function() {
                $controller('MediaPlaybackController',
                    {$scope: mockScope}
                );

                expect(mockScope.mediaHasPlayed).toBe(false);
            });

            it('should set buttonAction to #startMediaPlayback', function() {
                $controller('MediaPlaybackController',
                    {$scope: mockScope}
                );

                expect(mockScope.buttonAction)
                    .toBe(mockScope.startMediaPlayback);
            });

            it('should set buttonDisabled to false', function() {
                $controller('MediaPlaybackController',
                    {$scope: mockScope}
                );

                expect(mockScope.buttonDisabled).toBe(false);
            });
        });

        describe('#requestEmotionIndex', function() {
            it('should be called when stop playback message is received',
                function() {
                    var mockTrialData = {
                        data: {
                            metadata: {
                                session_number: 42
                            },
                            state: {
                                mediaPlayCount: 0
                            }
                        }
                    };
                    mockScope.showBody = function() {
                    };
                    var controller = $controller('MediaPlaybackController',
                        {$scope: mockScope, TrialData: mockTrialData}
                    );

                    spyOn(controller, 'requestEmotionIndex');

                    controller.playbackMessageListener({
                        address: '/eim/status/playback',
                        args: [
                            {
                                value: 0
                            }
                        ]
                    });

                    expect(controller.requestEmotionIndex.calls.count()).toBe(1);
                }
            );

            it('should send the correct OSC message', function() {
                var mockTrialData = {
                    data: {
                        metadata: {
                            session_number: 42
                        }
                    }
                };
                mockScope.showBody = function() {
                };
                var controller = $controller('MediaPlaybackController',
                    {$scope: mockScope, TrialData: mockTrialData}
                );

                spyOn(OSC, 'send');

                controller.requestEmotionIndex();

                expect(OSC.send).toHaveBeenCalledWith({
                    oscType: 'message',
                    address: '/eim/control/emotionIndex',
                    args: [
                        {
                            type: 'string',
                            value: '' + mockTrialData.data.metadata
                                .session_number
                        }
                    ]
                });
            });
        });

        describe('#startMediaPlayback', function() {
            it('should send the correct OSC start message to the socket',
                function() {

                    var mockTrialData = {
                        data: {
                            media: [
                                {label: 'a'},
                                {label: 'b'},
                                {label: 'c'},
                                {label: 'd'}
                            ],
                            state: {
                                mediaPlayCount: 3
                            },
                            metadata: {
                                session_number: 42
                            }
                        }
                    };

                    $controller('MediaPlaybackController',
                        {$scope: mockScope, TrialData: mockTrialData}
                    );

                    spyOn(OSC, 'send');

                    mockScope.startMediaPlayback();
                    expect(OSC.send).toHaveBeenCalledWith({
                        oscType: 'message',
                        address: '/eim/control/mediaID',
                        args: [
                            {
                                type: 'string',
                                value: mockTrialData.data.media[mockTrialData.data.state.mediaPlayCount].label
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

            it('should update buttonAction to #advanceSlide', function() {
                var mockTrialData = {
                    data: {
                        media: [
                            {label: 'a'},
                            {label: 'b'},
                            {label: 'c'},
                            {label: 'd'}
                        ],
                        state: {
                            mediaPlayCount: 3
                        },
                        metadata: {
                            session_number: 42
                        }
                    }
                };
                $controller('MediaPlaybackController',
                    {$scope: mockScope, TrialData: mockTrialData}
                );

                mockScope.mediaHasPlayed = false;
                mockScope.startMediaPlayback();
                expect(mockScope.buttonAction)
                    .toBe(ExperimentManager.advanceSlide);
            });
        });

        describe('incoming OSC message listener', function() {
            describe('playback start messages', function() {
                it('should call $scope.hideBody', function() {
                    $httpBackend.expectGET(
                        'modules/core/views/home.client.view.html'
                    ).respond();

                    mockScope.hideBody = function() {
                    };

                    var ctrl = $controller('MediaPlaybackController',
                        {$scope: mockScope}
                    );

                    spyOn(mockScope, 'hideBody');
                    ctrl.playbackMessageListener({
                        address: '/eim/status/playback',
                        args: [
                            {
                                value: 1
                            }
                        ]
                    });
                    expect(mockScope.hideBody.calls.count()).toBe(1);
                });

                it('should call $scope.hideBody', function() {
                    $httpBackend.expectGET(
                        'modules/core/views/home.client.view.html'
                    ).respond();

                    mockScope.hideBody = function() {
                    };
                    var ctrl = $controller('MediaPlaybackController',
                        {$scope: mockScope}
                    );
                    spyOn(mockScope, 'hideBody');
                    ctrl.playbackMessageListener({
                            address: '/eim/status/playback',
                            args: [
                                {
                                    value: 1
                                }
                            ]
                        }
                    );
                    expect(mockScope.hideBody.calls.count()).toBe(1);
                });
            });

            describe('playback stop messages', function() {
                it('should call $scope.showBody', function() {
                    $httpBackend.expectGET(
                        'modules/core/views/home.client.view.html'
                    ).respond();

                    mockScope.showBody = function() {
                    };

                    var ctrl = $controller('MediaPlaybackController',
                        {$scope: mockScope}
                    );

                    spyOn(mockScope, 'showBody');

                    ctrl.playbackMessageListener({
                            address: '/eim/status/playback',
                            args: [
                                {
                                    value: 0
                                }
                            ]
                        });

                    expect(mockScope.showBody.calls.count()).toBe(1);
                });

                it('should request an emotion index', function() {
                    $httpBackend.expectGET(
                        'modules/core/views/home.client.view.html'
                    ).respond();

                    mockScope.showBody = function() {
                    };

                    var ctrl = $controller('MediaPlaybackController',
                        {$scope: mockScope}
                    );

                    spyOn(ctrl, 'requestEmotionIndex');

                    ctrl.playbackMessageListener({
                        address: '/eim/status/playback',
                        args: [
                            {
                                value: 0
                            }
                        ]
                    });

                    expect(ctrl.requestEmotionIndex)
                        .toHaveBeenCalled();
                });

                it('should update the state', function() {

                    $httpBackend.expectGET(
                        'modules/core/views/home.client.view.html'
                    ).respond();

                    mockScope.showBody = function() {
                    };

                    var ctrl = $controller('MediaPlaybackController',
                        {$scope: mockScope}
                    );

                    spyOn(mockScope, 'showBody');

                    ctrl.playbackMessageListener({
                        address: '/eim/status/playback',
                        args: [
                            {
                                value: 0
                            }
                        ]
                    });

                    $timeout.flush();

                    expect(mockScope.buttonDisabled).toBe(true);
                    expect(mockScope.currentButtonLabel).toBe('Continue');
                    expect(mockScope.mediaHasPlayed).toBe(true);
                });
            });

            describe('emotion index messages', function() {
                it('should set buttonDisabled to true', function() {

                    $httpBackend.expectGET(
                        'modules/core/views/home.client.view.html'
                    ).respond();

                    mockScope.showBody = function() {
                    };

                    var mockTrialData = {
                        data: {
                            answers: {
                                emotion_indices: []
                            },
                            state: {
                                mediaPlayCount: 0
                            }
                        },
                        setValueForPathForCurrentMedia: function() {}
                    };

                    var mockExperimentManager = {
                        advanceSlide: function() {}
                    };

                    var ctrl = $controller('MediaPlaybackController', {
                        $scope: mockScope,
                        ExperimentManager: mockExperimentManager,
                        TrialData: mockTrialData
                    });

                    ctrl.emotionIndexMessageListener({
                        address: '/eim/status/emotionIndex',
                        args: [
                            {
                                value: 0
                            }
                        ]
                    });

                    mockScope.buttonDisabled = true;

                    $timeout.flush();

                    expect(mockScope.buttonDisabled).toBe(false);
                });

                it('should set the emotion index for the correct media',
                    function() {

                        $httpBackend.expectGET(
                            'modules/core/views/home.client.view.html'
                        ).respond();

                        mockScope.showBody = function() {
                        };
                        var mockTrialData = {
                            data: {
                                answers: {
                                    emotion_indices: []
                                },
                                state: {
                                    mediaPlayCount: 0
                                }
                            },
                            setValueForPathForCurrentMedia: function() {}
                        };
                        spyOn(mockTrialData, 'setValueForPathForCurrentMedia');

                        var mockExperimentManager = {
                            advanceSlide: function() {}
                        };

                        var ctrl = $controller('MediaPlaybackController', {
                                $scope: mockScope,
                                TrialData: mockTrialData,
                                ExperimentManager: mockExperimentManager
                            }
                        );

                        ctrl.emotionIndexMessageListener({
                            address: '/eim/status/emotionIndex',
                            args: [
                                {
                                    value: 92
                                }
                            ]
                        });

                        $timeout.flush();

                        expect(mockTrialData.setValueForPathForCurrentMedia)
                            .toHaveBeenCalledWith(
                                'data.answers.emotion_indices', 92
                            );
                    }
                );

                it('should increment mediaPlayCount', function() {
                    $httpBackend.expectGET(
                        'modules/core/views/home.client.view.html'
                    ).respond();

                    mockScope.showBody = function() {
                    };
                    var mockTrialData = {
                        data: {
                            answers: {
                                emotion_indices: []
                            },
                            state: {
                                mediaPlayCount: 0
                            }
                        },
                        setValueForPathForCurrentMedia: function() {}
                    };

                    var mockExperimentManager = {
                        advanceSlide: function() {}
                    };

                    var ctrl = $controller('MediaPlaybackController', {
                            $scope: mockScope,
                            TrialData: mockTrialData,
                            ExperimentManager: mockExperimentManager
                        }
                    );

                    ctrl.emotionIndexMessageListener({
                        address: '/eim/status/emotionIndex',
                        args: [
                            {
                                value: 92
                            }
                        ]
                    });

                    $timeout.flush();

                    expect(mockTrialData.data.state.mediaPlayCount).toBe(1);
                });

                it('should call advanceSlide', function() {
                    $httpBackend.expectGET(
                        'modules/core/views/home.client.view.html'
                    ).respond();

                    mockScope.showBody = function() {
                    };
                    var mockTrialData = {
                        data: {
                            answers: {
                                emotion_indices: []
                            },
                            state: {
                                mediaPlayCount: 0
                            }
                        },
                        setValueForPathForCurrentMedia: function() {}
                    };

                    var mockExperimentManager = {
                        advanceSlide: function() {}
                    };

                    spyOn(mockExperimentManager, 'advanceSlide');

                    var ctrl = $controller('MediaPlaybackController', {
                            $scope: mockScope,
                            TrialData: mockTrialData,
                            ExperimentManager: mockExperimentManager
                        }
                    );

                    ctrl.emotionIndexMessageListener({
                        address: '/eim/status/emotionIndex',
                        args: [
                            {
                                value: 92
                            }
                        ]
                    });

                    $timeout.flush();

                    expect(mockExperimentManager.advanceSlide)
                        .toHaveBeenCalled();
                });
            });
        });
    });
})();