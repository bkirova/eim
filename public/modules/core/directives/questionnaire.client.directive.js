'use strict';

angular.module('core').directive('questionnaire', ['$compile', function($compile) {

    var buildScaleQuestion = function(item) {
        var questionElement = angular.element('<scale-question></scale-question>');

        if (item.questionLabel) {
            questionElement.attr('question-label', item.questionLabel);
        }

        if (item.questionLikertMinimumDescription) {
            questionElement.attr('minimum-description', item.questionLikertMinimumDescription);
        }

        if (item.questionLikertMaximumDescription) {
            questionElement.attr('maximum-description', item.questionLikertMaximumDescription);
        }

        if (item.questionLikertSingleImageSrc) {
            questionElement.attr('single-img-src', item.questionLikertSingleImageSrc);
        }

        if (item.questionLikertLeftImageSrc) {
            questionElement.attr('left-img-src', item.questionLikertLeftImageSrc);
        }

        if (item.questionLikertRightImageSrc) {
            questionElement.attr('right-img-src', item.questionLikertRightImageSrc);
        }

        if (item.questionStoragePath) {
            questionElement.attr('controller-data-path', item.questionStoragePath);
        }

        if (item.questionIsAssociatedToMedia) {
            questionElement.attr('associated-to-media', item.questionIsAssociatedToMedia);
        }

        return questionElement;
    };

    return {
        restrict: 'E',
        scope: {
            questionnaireData: '='
        },

        link: function(scope, element, attrs) {

            var data = scope.questionnaireData;

            // Create an element for the title
            var title = angular.element('<h1>' + data.title + '</h1>');
            element.append(title);

            var formElement = angular.element('<form class="form" name="questionnaireForm" novalidate></form>');//('<form name="questionnaireForm" class="form" novalidate></form>');
            element.append(formElement);

            // Iterate over structure
            for (var i = 0; i < data.structure.length; i++) {

                // Create an element for each structure entry
                var questionElement;
                var item = data.structure[i];

                switch (item.questionType) {
                    case 'likert':
                        questionElement = buildScaleQuestion(item);
                }

                // Append a spacer row
                questionElement.append(angular.element('<div class="row"><div class="col-md-12 questionSpacer"></div></div>'));

                formElement.append(questionElement);
            }

              $compile(formElement)(scope);
        }
    };
}]);