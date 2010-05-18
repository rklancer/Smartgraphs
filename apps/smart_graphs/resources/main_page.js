// ==========================================================================
// Project:   SmartGraphs - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs CC*/

sc_require('main');

// This page describes the main user interface for your application.
SmartGraphs.mainPage = SC.Page.design({

    mainPane: SC.MainPane.design({
        layout: {
            width: 960,
            height: 820
        },
        
        childViews: 'promptView graphView tableView authorView'.w(),
        
        promptView: SC.View.design({
            layout: {
                left: 20,
                top: 20,
                width: 455,
                height: 680
            },
            classNames: ['smartgraph-pane'],
            
            childViews: 'navButtons questionView nextButton backButton'.w(),
            
            navButtons: SC.SegmentedView.design({
                layout: {
                    top: 25
                },
                
                // in order to enable the button for the next question when it becomes selectable:
                displayProperties: 'nextQuestionIsSelectable'.w(),
                
                itemsBinding: 'SmartGraphs.questionSequenceController',
                itemTitleKey: 'shortName',
                itemIsEnabledKey: 'isSelectable',
                valueBinding: 'SmartGraphs.questionSequenceController.selectedQuestion',
                nextQuestionIsSelectableBinding: SC.Binding.oneWay('SmartGraphs.questionSequenceController*nextQuestion.isSelectable')
            }),
            
            questionView: SmartGraphs.QuestionView.design({
                classNames: 'sg-question'.w(),
                layout: {
                    top: 50,
                    bottom: 5,
                    left: 5,
                    right: 5
                },
                
                controllerBinding: 'SmartGraphs.questionController',
                promptBinding: 'SmartGraphs.questionController.prompt',
                textInputShouldBeVisibleBinding: 'SmartGraphs.questionController.shouldAcceptTextResponse',
                feedbackBinding: 'SmartGraphs.questionController.feedback'
            }),
            
            nextButton: SC.ButtonView.design({
                displayProperties: ['isEnabled'],
                layout: {
                    top: 620,
                    left: 325,
                    width: 80
                },
                title: "Next",
                target: 'SmartGraphs.questionSequenceController',
                action: 'selectNextQuestion',
                isEnabledBinding: 'SmartGraphs.questionSequenceController.canSelectNextQuestion',
                isVisibleBinding: SC.Binding.not('SmartGraphs.questionSequenceController.isLastQuestion').oneWay()
            }),
            
            backButton: SC.ButtonView.design({
                displayProperties: ['isEnabled'],
                layout: {
                    top: 620,
                    left: 50,
                    width: 80
                },
                title: "Back",
                target: 'SmartGraphs.questionSequenceController',
                action: 'selectPreviousQuestion',
                isEnabledBinding: 'SmartGraphs.questionSequenceController.canSelectPreviousQuestion',
                isVisibleBinding: SC.Binding.not('SmartGraphs.questionSequenceController.isFirstQuestion').oneWay()
            })
        }),
        
        graphView: SmartGraphs.RaphaelView.design({
            layout: {
                left: 485,
                top: 20,
                width: 455,
                height: 335
            },
            childViews: 'axesView series1View'.w(),
            classNames: ['smartgraph-pane'],
            
            axesView: SmartGraphs.AxesView.design({
                xMinBinding: 'SmartGraphs.axesController.xMin',
                xMaxBinding: 'SmartGraphs.axesController.xMax',
                yMinBinding: 'SmartGraphs.axesController.yMin',
                yMaxBinding: 'SmartGraphs.axesController.yMax',
                xStepsBinding: 'SmartGraphs.axesController.xSteps',
                yStepsBinding: 'SmartGraphs.axesController.ySteps',
                paddingBinding: 'SmartGraphs.axesController.padding'
            }),
            
            series1View: SmartGraphs.SeriesView.design({
                xMinBinding: 'SmartGraphs.axesController.xMin',
                xMaxBinding: 'SmartGraphs.axesController.xMax',
                yMinBinding: 'SmartGraphs.axesController.yMin',
                yMaxBinding: 'SmartGraphs.axesController.yMax',
                xScaleBinding: 'SmartGraphs.axesController.xScale',
                yScaleBinding: 'SmartGraphs.axesController.yScale',
                paddingBinding: 'SmartGraphs.axesController.padding',
                controllerBinding: 'SmartGraphs.dataSeriesController',
                contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
                selectionBinding: 'SmartGraphs.dataSeriesController.selection'
            })
        
        }),
        
        tableView: SC.View.design({
            layout: {
                left: 485,
                top: 365,
                width: 455,
                height: 335
            },
            classNames: ['smartgraph-pane'],
            
            childViews: ['labelsView', 'scrollerView'],
            
            labelsView: SC.View.design({
                layout: {
                    left: 0,
                    top: 0,
                    width: 455,
                    height: 30
                },
                childViews: ['xsLabel', 'ysLabel'],
                
                xsLabel: SC.LabelView.design({
                    layout: {
                        left: 10,
                        width: 40,
                        top: 7,
                        height: 20
                    },
                    displayValue: 'time'
                }),
                
                ysLabel: SC.LabelView.design({
                    layout: {
                        left: 70,
                        width: 50,
                        top: 7,
                        height: 20
                    },
                    displayValue: 'distance'
                })
            }),
            
            scrollerView: SC.ScrollView.design({
                layout: {
                    left: 0,
                    top: 30,
                    width: 455,
                    height: 305
                },
                
                borderStyle: SC.BORDER_NONE,
                
                contentView: SC.View.design({
                    childViews: ['xsView', 'ysView'],
                    
                    // look at SC.ContentDisplay for this too
                    xHeightBinding: SC.Binding.from('.xsView.height').oneWay(),
                    yHeightBinding: SC.Binding.from('.ysView.height').oneWay(),
                    
                    height: function(){
                        return Math.max(this.get('xHeight'), this.get('yHeight'));
                    }
.property('xHeight', 'yHeight').cacheable()                    ,
                    
                    _heightDidChange: function(){
                        this.adjust('height', this.get('height'));
                    }
.observes('height')                    ,
                    
                    xsView: SC.ListView.design({
                        height: function(){
                            var layout = this.get('layout');
                            return this.get('calculatedHeight') + (layout.top || 0) + (layout.bottom || 0);
                        }
.property('calculatedHeight', 'layout').cacheable()                        ,
                        
                        layout: {
                            left: 10,
                            top: 0,
                            bottom: 15,
                            width: 50
                        },
                        canEditContent: NO,
                        contentValueKey: 'x',
                        contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
                        selectionBinding: 'SmartGraphs.dataSeriesController.selection',
                        rowHeight: 18
                    }),
                    
                    ysView: SC.ListView.design({
                        height: function(){
                            var layout = this.get('layout');
                            return this.get('calculatedHeight') + (layout.top || 0) + (layout.bottom || 0);
                        }
.property('calculatedHeight', 'layout').cacheable()                        ,
                        
                        layout: {
                            left: 70,
                            top: 0,
                            bottom: 15,
                            width: 50
                        },
                        isEditable: YES,
                        canEditContent: YES,
                        // as per http://groups.google.com/group/sproutcore/browse_thread/thread/6564941be2b51276/fcf4eb11a1ea268f?#fcf4eb11a1ea268f
                        exampleView: SmartGraphs.EditableListItemView,
                        contentValueKey: 'y',
                        contentBinding: 'SmartGraphs.dataSeriesController.arrangedObjects',
                        selectionBinding: 'SmartGraphs.dataSeriesController.selection',
                        rowHeight: 18
                    })
                })
            })
        }),
        
        authorView: SC.ListView.design({
            layout: {
                left: 20,
                top: 720,
                bottom: 15,
                width: 1600
            },
            //contentValueKey: "prompt",
            contentBinding: "SmartGraphs.questionSequenceController.arrangedObjects",
            //exampleView: SmartGraphs.QuestionAuthorView,
            canEditContent: NO
        })
    })
});
