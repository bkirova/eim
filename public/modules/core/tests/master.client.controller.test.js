'use strict';

(function() {
    describe('MasterController', function() {

        //Initialize global variables
        var mockScope, mockHotkeys, $controllerConstructor;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function($controller, $rootScope) {
            $controllerConstructor = $controller;
            mockScope = $rootScope.$new();
            mockHotkeys = { add: function() {
            } };
        }));

        describe('initialization', function() {

            it('should initialize debugMode to false', function() {

                $controllerConstructor('MasterController',
                    { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

                expect(mockScope.debugMode).toBeDefined();
                expect(mockScope.debugMode).toBe(false);
            });

            it('should initialize the alerts array to an empty array', function() {

                $controllerConstructor('MasterController',
                    { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

                expect(mockScope.alerts).toBeDefined();
                expect(Array.isArray(mockScope.alerts)).toBe(true);
                expect(mockScope.alerts.length).toBe(0);
            });

            it('should initialize blackoutClass to false', function() {

                $controllerConstructor('MasterController',
                    { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

                expect(mockScope.blackoutClass).toBe(false);
            });
        });

        it('#$scope.trialDataJson should return TrialData.toJson()', function() {

            var mockTrialData = { toJson: function() {
                return 'trial-data';
            } };

            $controllerConstructor('MasterController',
                { $scope: mockScope, TrialData: mockTrialData, hotkeys: mockHotkeys });

            expect(mockScope.trialDataJson()).toBe('trial-data');
        });

        describe('#$scope.toggleDebugMode()', function() {

            it('should toggle debugMode', function() {
                $controllerConstructor('MasterController',
                    { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

                mockScope.debugMode = true;
                mockScope.toggleDebugMode();
                expect(mockScope.debugMode).toBe(false);
            });

            it('should add a notice to alerts array', function() {

                $controllerConstructor('MasterController',
                    { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });
                mockScope.alerts = [];
                mockScope.toggleDebugMode();
                expect(mockScope.alerts.length).toBe(1);
            });
        });

        describe('alerts', function() {
            describe('#$scope.addAlert()', function() {
                it('should add alerts to the alerts array', function() {

                    $controllerConstructor('MasterController',
                        { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

                    mockScope.alerts = [];
                    mockScope.addAlert({type: 'info', msg: 'Info alert'});
                    expect(mockScope.alerts.length).toBe(1);
                });

                it('should not add duplicate alerts to the alerts array', function() {

                    $controllerConstructor('MasterController',
                        { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

                    mockScope.alerts = [];
                    mockScope.addAlert({type: 'info', msg: 'Info alert'});
                    mockScope.addAlert({type: 'warn', msg: 'Warning alert'});
                    mockScope.addAlert({type: 'info', msg: 'Info alert'});
                    expect(mockScope.alerts.length).toBe(2);
                });
            });

            describe('#$scope.closeAlert()', function() {
                it('should remove the alert at the provided index', function() {

                    $controllerConstructor('MasterController',
                        { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

                    mockScope.alerts = ['a', 'b', 'c'];
                    mockScope.closeAlert(1);
                    expect(mockScope.alerts).toEqual(['a', 'c']);
                });
            });

            describe('#$scope.addGenericErrorAlert()', function() {
                it('should add a danger alert', function() {

                    $controllerConstructor('MasterController',
                        { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

                    mockScope.alerts = [];
                    mockScope.addGenericErrorAlert();
                    expect(mockScope.alerts[0].type).toBe('danger');
                });
            });
        });

        describe('hotkeys', function() {
            it('should add a hotkey for d-d', function() {

                var addSpy = sinon.spy(mockHotkeys, 'add');

                $controllerConstructor('MasterController',
                    { $scope: {}, TrialData: {}, hotkeys: mockHotkeys });

                expect(addSpy.calledOnce).toBe(true);
                expect(addSpy.args[0][0].combo).toBe('d d');
            });

            it('should add a description for d-d', function() {

                var addSpy = sinon.spy(mockHotkeys, 'add');

                $controllerConstructor('MasterController',
                    { $scope: {}, TrialData: {}, hotkeys: mockHotkeys });

                expect(addSpy.args[0][0].description).toBeDefined();
            });

            it('should toggle debugMode on d-d', function() {

                var addSpy = sinon.spy(mockHotkeys, 'add');

                $controllerConstructor('MasterController',
                    { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

                mockScope.debugMode = true;
                var ddCallback = addSpy.args[0][0].callback;
                expect(ddCallback).toBe(mockScope.toggleDebugMode);
            });
        });

        describe('blackout', function() {
           it('#$scope.hideBody() should set blackoutClass to true', function() {

               $controllerConstructor('MasterController',
                   { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

               mockScope.blackoutClass = false;
               mockScope.hideBody();
               expect(mockScope.blackoutClass).toBe(true);
           });

            it('#$scope.showBody() should set blackoutClass to false', function() {

                $controllerConstructor('MasterController',
                    { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

                mockScope.blackoutClass = true;
                mockScope.showBody();
                expect(mockScope.blackoutClass).toBe(false);
            });

            it('#$scope.toggleBodyVisibility() should toggle blackoutClass between true and false', function() {

                $controllerConstructor('MasterController',
                    { $scope: mockScope, TrialData: {}, hotkeys: mockHotkeys });

                mockScope.blackoutClass = true;
                mockScope.toggleBodyVisibility();
                expect(mockScope.blackoutClass).toBe(false);
                mockScope.toggleBodyVisibility();
                expect(mockScope.blackoutClass).toBe(true);
            });
        });
    });
})();