'use strict';

(function() {
    describe('scale-question directive', function() {

        //Initialize global variables
        var $scope, $compile, element, TrialData;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function(_$rootScope_, _$compile_, _TrialData_) {
            $scope = _$rootScope_;
            $compile = _$compile_;
            element = angular.element('<scale-question question-label="qText" single-img-src="img/single.png" question-id="power" minimum-description="Lower description" maximum-description="Upper description" controller-data-path="data.answers.ratings.power"></scale-question>');
            TrialData = _TrialData_;
        }));
        
        it('should add a header for the question text', function() {
            $compile(element)($scope);
            expect(element.html()).toMatch(/<h3>qText<\/h3>/);
        });

        describe('single image', function() {
            it('should include the image', function() {
                $compile(element)($scope);
                expect(element.html()).toMatch(/<img.*src="img\/single.png".*>/);
            });

            it('should add space to either side of the image and center it', function() {
                $compile(element)($scope);
                expect(element.html()).toMatch('<div class="row ng-scope"><div class="col-md-2"></div><div class="col-md-8 text-center"><img src="img/single.png"></div><div class="col-md-2"></div></div>');
            });
        });

        describe('extreme images', function() {
            it('should include both images', function() {
                element = angular.element('<scale-question question-label="qText" left-img-src="img/left.png" right-img-src="img/right.png" question-id="power" minimum-description="Lower description" maximum-description="Upper description" controller-data-path="data.answers.ratings.power"></scale-question>');
                $compile(element)($scope);
                expect(element.html()).toMatch(/<img.*src="img\/left.png".*>/);
                expect(element.html()).toMatch(/<img.*src="img\/right.png".*>/);
            });

            it('should properly space both images', function() {
                element = angular.element('<scale-question question-label="qText" left-img-src="img/left.png" right-img-src="img/right.png" question-id="power" minimum-description="Lower description" maximum-description="Upper description" controller-data-path="data.answers.ratings.power"></scale-question>');
                $compile(element)($scope);
                var imgRow = $(element).find('div.row')[1];
                expect($(imgRow).html()).toMatch(/(col-md-2.*){2}col-md-4.*(col-md-2.*){2}/);
            });
        });

        describe('radio buttons', function() {
            it('should add five radio buttons', function() {
                $compile(element)($scope);
                var regex = /(input type="radio")/g;
                var result = element.html().match(regex);
                expect(result.length).toBe(5);
            });

            it('should set the correct id on each radio button', function() {
                $compile(element)($scope);
                var inputs = $(element).find('input[type="radio"]');
                for (var i = 0; i < inputs.length; i++) {
                    expect(inputs[i].id).toBe('powerRadioGroup'+(i+1));
                }
            });

            it('should set the correct value on each radio button', function() {
                $compile(element)($scope);
                var inputs = $(element).find('input[type="radio"]');
                for (var i = 0; i < inputs.length; i++) {
                    expect(parseInt(inputs[i].value)).toBe(i+1);
                }
            });

            it('should set the correct name on each radio button', function() {
                $compile(element)($scope);
                var inputs = $(element).find('input[type="radio"]');
                for (var i = 0; i < inputs.length; i++) {
                    expect(inputs[i].name).toBe('powerRadioGroup');
                }
            });

            it('should set the required attribute on each radio button', function() {
                $compile(element)($scope);
                var inputs = $(element).find('input[type="radio"][name="powerRadioGroup"]');
                for (var i = 0; i < inputs.length; i++) {
                    expect(inputs[i].required).toBe(true);
                }
            });

            it('should set the correct model on each radio button', function() {
                $compile(element)($scope);
                var inputs = $(element).find('input[type="radio"][name="powerRadioGroup"]');
                for (var i = 0; i < inputs.length; i++) {
                    expect($(inputs[i]).attr('ng-model')).toBe('powerRadioGroup');
                }
            });
        });
        
        describe('textual descriptions', function() {
            it('should include the minimum description', function() {
                $compile(element)($scope);
                var descriptionsBlock = $(element).children()[3];
                var left = $(descriptionsBlock).children()[1];
                expect($(left).html()).toMatch(/Lower description/);
            });
            
            it('should include the maximum description', function() {
                $compile(element)($scope);
                var descriptionsBlock = $(element).children()[3];
                var right = $(descriptionsBlock).children()[3];
                expect($(right).html()).toMatch(/Upper description/);
            });

            it('should include the small class on the minimum description', function() {
                $compile(element)($scope);
                var descriptionsBlock = $(element).children()[3];
                var left = $(descriptionsBlock).children()[1];
                expect($(left).hasClass('small')).toBe(true);
            });

            it('should include the small class on the maximum description', function() {
                $compile(element)($scope);
                var descriptionsBlock = $(element).children()[3];
                var right = $(descriptionsBlock).children()[3];
                expect($(right).hasClass('small')).toBe(true);
            });

            it('should include the text-left class on the minimum description', function() {
                $compile(element)($scope);
                var descriptionsBlock = $(element).children()[3];
                var left = $(descriptionsBlock).children()[1];
                expect($(left).hasClass('text-left')).toBe(true);
            });

            it('should include the text-right class on the maximum description', function() {
                $compile(element)($scope);
                var descriptionsBlock = $(element).children()[3];
                var right = $(descriptionsBlock).children()[3];
                expect($(right).hasClass('text-right')).toBe(true);
            });
        });

        describe('data binding', function() {
            it('should call TrialData with the correct data when an option is selected', function() {
                $compile(element)($scope);
                var inputs = $(element).find('input[type="radio"]');
                var secondInput = $(inputs[1]);

                spyOn(TrialData, 'setValueForPath');

                secondInput.scope().powerRadioGroup = '1';
                secondInput.scope().$apply();

                expect(TrialData.setValueForPath.calls.count()).toBe(1);
                expect(TrialData.setValueForPath.calls.argsFor(0)[0]).toBe('data.answers.ratings.power');
                expect(TrialData.setValueForPath.calls.argsFor(0)[1]).toBe(1);
            });

            it('should call TrialData with the correct data when an option is selected and the question is associated to media', function() {
                element = angular.element('<scale-question question-label="qText" single-img-src="img/single.png" question-id="power" minimum-description="Lower description" maximum-description="Upper description" controller-data-path="data.answers.ratings.power" associated-to-media="true"></scale-question>');
                $compile(element)($scope);
                var inputs = $(element).find('input[type="radio"]');
                var secondInput = $(inputs[1]);

                TrialData.data.state.mediaPlayCount = 2;
                spyOn(TrialData, 'setValueForPathForCurrentMedia');

                secondInput.scope().powerRadioGroup = '1';
                secondInput.scope().$apply();

                expect(TrialData.setValueForPathForCurrentMedia.calls.count()).toBe(1);
                expect(TrialData.setValueForPathForCurrentMedia.calls.argsFor(0)[0]).toBe('data.answers.ratings.power');
                expect(TrialData.setValueForPathForCurrentMedia.calls.argsFor(0)[1]).toBe(1);
            });
        });
    });
})();