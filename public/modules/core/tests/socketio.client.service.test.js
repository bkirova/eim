'use strict';

(function() {
    describe('SocketIOService', function() {

        //Initialize global variables
        var SocketIOService, socket, $rootScope;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function(_SocketIOService_, _$rootScope_) {
            SocketIOService = _SocketIOService_;
            socket = io();
            $rootScope = _$rootScope_;
        }));

        xdescribe('initialization', function() {
            it('should be defined', function() {
                expect(SocketIOService).toBeDefined();
            });
        });

        describe('#emit', function() {
            it('should be defined', function() {
                expect(SocketIOService.emit).toBeDefined();
            });

            it('should pass the call to Socket.IO', function() {
                var mockData = {foo:'bar'};
                var socketSpy = sinon.spy(socket, 'emit');
                SocketIOService.emit('anEvent', mockData);
                expect(socketSpy.calledOnce).toBe(true);
            });

            it('should apply changes using $rootScope.$apply');
            it('should emit the same event using Socket.IO');
            it('should register the callback handler if present');
        });

        describe('#on', function() {
            it('should be defined', function() {
                expect(SocketIOService.on).toBeDefined();
            });

            it('should pass the call to Socket.IO', function() {
                var mockCallback = function() {};
                var socketSpy = sinon.spy(socket, 'on');
                SocketIOService.on('anEvent', mockCallback);
                expect(socketSpy.calledOnce).toBe(true);
            });

            it('should apply changes using $rootScope.$apply');
            it('should register the callback handler as usual');
        });
    });
})();