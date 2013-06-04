(function() {
  Smartgraphs.activityDocs || (Smartgraphs.activityDocs = {});
  Smartgraphs.activityDocs["/shared/gravity"] = {
    _id: "gravity.df6",
    _rev: 1,
    data_format_version: 6,
    activity: {
      title: "Was Galileo Right?",
      url: "/shared/gravity",
      owner: "shared",
      pages: ["/shared/gravity/page/1", "/shared/gravity/page/2", "/shared/gravity/page/3", "/shared/gravity/page/4", "/shared/gravity/page/5", "/shared/gravity/page/6", "/shared/gravity/page/7", "/shared/gravity/page/8", "/shared/gravity/page/9", "/shared/gravity/page/10", "/shared/gravity/page/11", "/shared/gravity/page/12", "/shared/gravity/page/13", "/shared/gravity/page/14"]
    },
    pages: [
      {
        name: "Introduction",
        url: "/shared/gravity/page/1",
        activity: "/shared/gravity",
        index: 1,
        introText: '<h1>Introduction</h1>\n\n<p>In the 1600s, Galileo Galilei (1564-1642) hypothesized that objects of different masses would fall at the\nsame rate when they were dropped from the same height and allowed to fall freely. According to legend, Galileo\ndropped an iron cannon ball and a wooden ball from the Leaning Tower of Pisa to test his hypothesis.</p>',
        steps: ["/shared/gravity/page/1/step/1"],
        firstStep: "/shared/gravity/page/1/step/1"
      }, {
        name: "Predict the Graphs (Light Ball)",
        url: "/shared/gravity/page/2",
        activity: "/shared/gravity",
        index: 2,
        introText: '<h1>Predict the Graphs (Light Ball)</h1>\n\n<p>To test Galileo’s hypothesis, you are going to examine data collected when same-sized balls of different\nmasses were dropped from a fixed height.</p>\n\n<p>To help you predict the motions, find a light ball and heavy ball that are the same size. (The heavy ball\nshould be at least five times heavier than the light ball.)</p>',
        steps: ["/shared/gravity/page/2/step/1", "/shared/gravity/page/2/step/2", "/shared/gravity/page/2/step/3"],
        firstStep: "/shared/gravity/page/2/step/1"
      }, {
        name: "Look at the Data (Light Ball)",
        url: "/shared/gravity/page/3",
        activity: "/shared/gravity",
        index: 3,
        introText: '<h1>Look at the Data (Light Ball)</h1>\n\n<p>The data to the right was collected when a light softball was dropped from a height of about 2 meters.\nEvery second, 20 data samples were collected.</p>',
        steps: ["/shared/gravity/page/3/step/1"],
        firstStep: "/shared/gravity/page/3/step/1"
      }, {
        name: "Reflect on Predictions (Light Ball)",
        url: "/shared/gravity/page/4",
        activity: "/shared/gravity",
        index: 4,
        introText: '<h1>Reflect on Predictions (Light Ball)</h1>\n\n<p>To the right is your predicted (red) and actual (blue) position-time and velocity-time data for the light\nball.</p>',
        steps: ["/shared/gravity/page/4/step/1"],
        firstStep: "/shared/gravity/page/4/step/1"
      }, {
        name: "Predict the Graphs (Heavy Ball)",
        url: "/shared/gravity/page/5",
        activity: "/shared/gravity",
        index: 5,
        introText: '<h1>Predict the Graphs (Heavy Ball)</h1>',
        steps: ["/shared/gravity/page/5/step/1", "/shared/gravity/page/5/step/2"],
        firstStep: "/shared/gravity/page/5/step/1"
      }, {
        name: "Look at the Data (Heavy Ball)",
        url: "/shared/gravity/page/6",
        activity: "/shared/gravity",
        index: 6,
        introText: '<h1>Look at the Data (Heavy Ball)</h1>\n\n<p>The data to the right was collected when a heavier softball was dropped from a height of about 2 meters.\nEvery second, 20 data samples were collected.</p>',
        steps: ["/shared/gravity/page/6/step/1"],
        firstStep: "/shared/gravity/page/6/step/1"
      }, {
        name: "Reflect on Prediction (Heavy Ball)",
        url: "/shared/gravity/page/7",
        activity: "/shared/gravity",
        index: 7,
        introText: '<h1>Reflect on Prediction (Heavy Ball)</h1>\n\n<p>To the right is your predicted (red) and actual (blue) position-time and velocity-time data for the heavy\nball.</p>',
        steps: ["/shared/gravity/page/7/step/1"],
        firstStep: "/shared/gravity/page/7/step/1"
      }, {
        name: "Compare the Data",
        url: "/shared/gravity/page/8",
        activity: "/shared/gravity",
        index: 8,
        introText: '<h1>Compare the Data I</h1>\n\n<p>Look at the actual data for the light ball and the heavy ball.</p>',
        steps: ["/shared/gravity/page/8/step/1", "/shared/gravity/page/8/step/2"],
        firstStep: "/shared/gravity/page/8/step/1"
      }, {
        name: "Identify the Interval (Light Ball)",
        url: "/shared/gravity/page/9",
        activity: "/shared/gravity",
        index: 9,
        introText: '<h1>Identify the Interval (Light Ball)</h1>\n\n<p>To the right is the actual velocity-time data for the light ball. You will identify the interval where the\nball was falling.</p>',
        steps: ["/shared/gravity/page/9/step/p1", "/shared/gravity/page/9/step/p1-incorrect-left", "/shared/gravity/page/9/step/p1-incorrect-right", "/shared/gravity/page/9/step/p2", "/shared/gravity/page/9/step/p2-incorrect-left", "/shared/gravity/page/9/step/p2-incorrect-right", "/shared/gravity/page/9/step/done"],
        firstStep: "/shared/gravity/page/9/step/p1"
      }, {
        name: "Find the Slope (Light Ball)",
        url: "/shared/gravity/page/10",
        activity: "/shared/gravity",
        index: 10,
        introText: '<h1>Find the Slope (Light Ball)</h1>\n\n<p>The slope of a velocity-time graph tells us how the velocity of an object changed over time.</p>\n\n<p>You are going to find the slope of a line that you think best represents the data when the ball was\nfalling.</p>',
        contextVars: [
          {
            name: "initial-velocity",
            value: ["coord", "y", ["listItem", 1, ["slopeToolOrder", "light-ball-point-1", "light-ball-point-2"]]]
          }, {
            name: "initial-velocity-as-string",
            value: ["toFixedString", ["get", "initial-velocity"], 2]
          }, {
            name: "final-velocity",
            value: ["coord", "y", ["listItem", 2, ["slopeToolOrder", "light-ball-point-1", "light-ball-point-2"]]]
          }, {
            name: "final-velocity-as-string",
            value: ["toFixedString", ["get", "final-velocity"], 2]
          }, {
            name: "delta-velocity",
            value: ["-", ["get", "final-velocity"], ["get", "initial-velocity"]]
          }, {
            name: "delta-velocity-as-string",
            value: ["toFixedString", ["get", "delta-velocity"], 2]
          }, {
            name: "initial-time",
            value: ["coord", "x", ["listItem", 1, ["slopeToolOrder", "light-ball-point-1", "light-ball-point-2"]]]
          }, {
            name: "initial-time-as-string",
            value: ["toFixedString", ["get", "initial-time"], 2]
          }, {
            name: "final-time",
            value: ["coord", "x", ["listItem", 2, ["slopeToolOrder", "light-ball-point-1", "light-ball-point-2"]]]
          }, {
            name: "final-time-as-string",
            value: ["toFixedString", ["get", "final-time"], 2]
          }, {
            name: "delta-time",
            value: ["-", ["get", "final-time"], ["get", "initial-time"]]
          }, {
            name: "delta-time-as-string",
            value: ["toFixedString", ["get", "delta-time"], 2]
          }, {
            name: "slope",
            value: ["/", ["get", "delta-velocity"], ["get", "delta-time"]]
          }, {
            name: "slope-as-string",
            value: ["toFixedString", ["get", "slope"], 2]
          }
        ],
        steps: ["/shared/gravity/page/10/step/p1", "/shared/gravity/page/10/step/p1-incorrect", "/shared/gravity/page/10/step/p2", "/shared/gravity/page/10/step/p2-incorrect", "/shared/gravity/page/10/step/p2-same-as-p1", "/shared/gravity/page/10/step/slope-initial", "/shared/gravity/page/10/step/slope-initial-hint", "/shared/gravity/page/10/step/velocity", "/shared/gravity/page/10/step/velocity-hint", "/shared/gravity/page/10/step/velocity-giveaway", "/shared/gravity/page/10/step/time-velocity-incorrect", "/shared/gravity/page/10/step/time-velocity-correct", "/shared/gravity/page/10/step/time-hint", "/shared/gravity/page/10/step/time-giveaway", "/shared/gravity/page/10/step/slope-final-time-incorrect", "/shared/gravity/page/10/step/slope-final-time-correct", "/shared/gravity/page/10/step/slope-final-giveaway", "/shared/gravity/page/10/step/slope-correct"],
        firstStep: "/shared/gravity/page/10/step/p1"
      }, {
        name: "Identify the Interval (Heavy Ball)",
        url: "/shared/gravity/page/11",
        activity: "/shared/gravity",
        index: 11,
        introText: '<h1>Identify the Interval (Heavy Ball)</h1>\n\n<p>To the right is the actual velocity-time data for the heavy ball. You will identify the interval where the\nball was falling.</p>',
        steps: ["/shared/gravity/page/11/step/p1", "/shared/gravity/page/11/step/p1-incorrect-left", "/shared/gravity/page/11/step/p1-incorrect-right", "/shared/gravity/page/11/step/p2", "/shared/gravity/page/11/step/p2-incorrect-left", "/shared/gravity/page/11/step/p2-incorrect-right", "/shared/gravity/page/11/step/done"],
        firstStep: "/shared/gravity/page/11/step/p1"
      }, {
        name: "Find the Slope (Heavy Ball)",
        url: "/shared/gravity/page/12",
        activity: "/shared/gravity",
        index: 12,
        introText: '<h1>Find the Slope (Heavy Ball)</h1>\n\n<p>The slope of a velocity-time graph tells us how the velocity of an object changed over time.</p>\n\n<p>You are going to find the slope of a line that you think best represents the data when the ball was\nfalling.</p>',
        contextVars: [
          {
            name: "initial-velocity",
            value: ["coord", "y", ["listItem", 1, ["slopeToolOrder", "heavy-ball-point-1", "heavy-ball-point-2"]]]
          }, {
            name: "initial-velocity-as-string",
            value: ["toFixedString", ["get", "initial-velocity"], 2]
          }, {
            name: "final-velocity",
            value: ["coord", "y", ["listItem", 2, ["slopeToolOrder", "heavy-ball-point-1", "heavy-ball-point-2"]]]
          }, {
            name: "final-velocity-as-string",
            value: ["toFixedString", ["get", "final-velocity"], 2]
          }, {
            name: "delta-velocity",
            value: ["-", ["get", "final-velocity"], ["get", "initial-velocity"]]
          }, {
            name: "delta-velocity-as-string",
            value: ["toFixedString", ["get", "delta-velocity"], 2]
          }, {
            name: "initial-time",
            value: ["coord", "x", ["listItem", 1, ["slopeToolOrder", "heavy-ball-point-1", "heavy-ball-point-2"]]]
          }, {
            name: "initial-time-as-string",
            value: ["toFixedString", ["get", "initial-time"], 2]
          }, {
            name: "final-time",
            value: ["coord", "x", ["listItem", 2, ["slopeToolOrder", "heavy-ball-point-1", "heavy-ball-point-2"]]]
          }, {
            name: "final-time-as-string",
            value: ["toFixedString", ["get", "final-time"], 2]
          }, {
            name: "delta-time",
            value: ["-", ["get", "final-time"], ["get", "initial-time"]]
          }, {
            name: "delta-time-as-string",
            value: ["toFixedString", ["get", "delta-time"], 2]
          }, {
            name: "slope",
            value: ["/", ["get", "delta-velocity"], ["get", "delta-time"]]
          }, {
            name: "slope-as-string",
            value: ["toFixedString", ["get", "slope"], 2]
          }
        ],
        steps: ["/shared/gravity/page/12/step/p1", "/shared/gravity/page/12/step/p1-incorrect", "/shared/gravity/page/12/step/p2", "/shared/gravity/page/12/step/p2-incorrect", "/shared/gravity/page/12/step/p2-same-as-p1", "/shared/gravity/page/12/step/slope-initial", "/shared/gravity/page/12/step/slope-initial-hint", "/shared/gravity/page/12/step/velocity", "/shared/gravity/page/12/step/velocity-hint", "/shared/gravity/page/12/step/velocity-giveaway", "/shared/gravity/page/12/step/time-velocity-incorrect", "/shared/gravity/page/12/step/time-velocity-correct", "/shared/gravity/page/12/step/time-hint", "/shared/gravity/page/12/step/time-giveaway", "/shared/gravity/page/12/step/slope-final-time-incorrect", "/shared/gravity/page/12/step/slope-final-time-correct", "/shared/gravity/page/12/step/slope-final-giveaway", "/shared/gravity/page/12/step/slope-correct"],
        firstStep: "/shared/gravity/page/12/step/p1"
      }, {
        name: "Compare the Accelerations",
        url: "/shared/gravity/page/13",
        activity: "/shared/gravity",
        index: 13,
        introText: '<h1>Compare the Accelerations</h1>\n\n<p>The slope of a velocity-time graph is commonly called the acceleration. The acceleration of an object due to\ngravity is a constant, called <i>g</i>. The accepted value of <i>g</i> for objects near the surface of the\nEarth is 9.8 m/s<sup>2</sup>.<p>',
        steps: ["/shared/gravity/page/13/step/1", "/shared/gravity/page/13/step/2"],
        firstStep: "/shared/gravity/page/13/step/1"
      }, {
        name: "Conclusion",
        url: "/shared/gravity/page/14",
        activity: "/shared/gravity",
        index: 14,
        introText: '<h1>Conclusion</h1>\n\n<p>Do heavier objects fall faster?</p>\n\n<p>In this activity, you predicted and confirmed whether a light ball would fall faster than a heavier ball,\njust as Galileo likely did.</p>\n\n<p>According to legend, Galileo observed that the two balls fell at the same rate. He explained that this\nphenomenon was due to the effects of gravity acting on the two balls in a similar way.</p>',
        steps: ["/shared/gravity/page/14/step/1", "/shared/gravity/page/14/step/2"],
        firstStep: "/shared/gravity/page/14/step/1"
      }
    ],
    steps: [
      {
        url: "/shared/gravity/page/1/step/1",
        activityPage: "/shared/gravity/page/1",
        beforeText: '<p>Do heavier objects fall at the same rate as lighter objects?</p>\n\n<p>What do you think Galileo observed? Explain your reasoning.<p>',
        paneConfig: "single",
        panes: {
          single: {
            type: "image",
            path: "/static/smartgraphs/en/current/source/resources/images/leaning-tower-of-pisa-wide.jpg",
            caption: "Creative Commons BY-NC-SA 2.0 photo courtesy flickr user **Mary** (<a href=\"http://www.flickr.com/photos/virgomerry/315412804/\">link</a>)"
          }
        },
        responseTemplate: "/components/response-template/open",
        submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]],
        isFinalStep: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/2/step/1",
        activityPage: "/shared/gravity/page/2",
        beforeText: '<p>Try dropping each ball from a height of 2 meters.</p>\n\n<p>To the right, predict what you think the <b>position-time</b> graph for the light ball will look like.</p>\n\n<p>(Assume that the ground is at 0 meters.)</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Predicted Position vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/position",
            data: [],
            annotations: ["light-ball-position"]
          },
          bottom: {
            type: "graph",
            title: "Predicted Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: [],
            annotations: []
          }
        },
        tools: [
          {
            name: "prediction",
            setup: {
              pane: "top",
              uiBehavior: "freehand",
              annotationName: "light-ball-position"
            }
          }
        ],
        submissibilityDependsOn: ["annotation", "light-ball-position"],
        submissibilityCriterion: [">=", ["sketchLength", "light-ball-position"], 0.2],
        submitButtonTitle: "OK",
        defaultBranch: "/shared/gravity/page/2/step/2"
      }, {
        url: "/shared/gravity/page/2/step/2",
        activityPage: "/shared/gravity/page/2",
        beforeText: '<p>To the right, predict what you think the <b>velocity-time</b> graph for the light ball will look like.</p>\n\n<p>(Assume that the ground is at 0 meters.)</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Predicted Position vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/position",
            data: [],
            annotations: ["light-ball-position"]
          },
          bottom: {
            type: "graph",
            title: "Predicted Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: [],
            annotations: ["light-ball-velocity"]
          }
        },
        tools: [
          {
            name: "prediction",
            setup: {
              pane: "bottom",
              uiBehavior: "freehand",
              annotationName: "light-ball-velocity"
            }
          }
        ],
        submissibilityDependsOn: ["annotation", "light-ball-velocity"],
        submissibilityCriterion: [">=", ["sketchLength", "light-ball-velocity"], 0.2],
        submitButtonTitle: "OK",
        defaultBranch: "/shared/gravity/page/2/step/3"
      }, {
        url: "/shared/gravity/page/2/step/3",
        activityPage: "/shared/gravity/page/2",
        beforeText: '<p>Describe how the ball’s motions are represented on your graphs. Try to use as many words from the word bank\nas possible.</p>\n\n<p><b>Word Bank</b>: ball, released, seconds, meters, position, velocity, increased, decreased, stayed the\nsame, fast, slow, stopped, ground.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Predicted Position vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/position",
            data: [],
            annotations: ["light-ball-position"]
          },
          bottom: {
            type: "graph",
            title: "Predicted Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: [],
            annotations: ["light-ball-velocity"]
          }
        },
        responseTemplate: "/components/response-template/open",
        submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]],
        isFinalStep: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/3/step/1",
        activityPage: "/shared/gravity/page/3",
        beforeText: '',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Actual Position vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/position",
            data: ["light-ball-position"],
            annotations: [],
            activeDatadefs: ["light-ball-position"]
          },
          bottom: {
            type: "graph",
            title: "Actual Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: [],
            activeDatadefs: ["light-ball-velocity"]
          }
        },
        hideSubmitButton: true,
        isFinalStep: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/4/step/1",
        activityPage: "/shared/gravity/page/4",
        beforeText: '<p>How does the actual data for the light ball differ from your predicted data?</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Position vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/position",
            data: ["light-ball-position"],
            annotations: ["light-ball-position"]
            
          },
          bottom: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-velocity"]
          }
        },
        responseTemplate: "/components/response-template/open",
        submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]],
        isFinalStep: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/5/step/1",
        activityPage: "/shared/gravity/page/5",
        beforeText: '<p>To the right, predict what you think the <b>position-time</b> graph will look like when the heavy ball is\ndropped from the same height.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Predicted Position vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/position",
            data: [],
            annotations: ["heavy-ball-position"]
          },
          bottom: {
            type: "graph",
            title: "Predicted Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: [],
            annotations: []
          }
        },
        tools: [
          {
            name: "prediction",
            setup: {
              pane: "top",
              uiBehavior: "freehand",
              annotationName: "heavy-ball-position"
            }
          }
        ],
        submitButtonTitle: "OK",
        submissibilityDependsOn: ["annotation", "heavy-ball-position"],
        submissibilityCriterion: [">=", ["sketchLength", "heavy-ball-position"], 0.2],
        defaultBranch: "/shared/gravity/page/5/step/2"
      }, {
        url: "/shared/gravity/page/5/step/2",
        activityPage: "/shared/gravity/page/5",
        beforeText: '<p>To the right, predict what you think the <b>velocity-time</b> graph will look like when the heavy ball is\ndropped from the same height.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Predicted Position vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/position",
            data: [],
            annotations: ["heavy-ball-position"]
          },
          bottom: {
            type: "graph",
            title: "Predicted Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: [],
            annotations: ["heavy-ball-velocity"]
          }
        },
        tools: [
          {
            name: "prediction",
            setup: {
              pane: "bottom",
              uiBehavior: "freehand",
              annotationName: "heavy-ball-velocity"
            }
          }
        ],
        submissibilityDependsOn: ["annotation", "heavy-ball-velocity"],
        submissibilityCriterion: [">=", ["sketchLength", "heavy-ball-velocity"], 0.2],
        nextButtonShouldSubmit: true,
        isFinalStep: true
      }, {
        url: "/shared/gravity/page/6/step/1",
        activityPage: "/shared/gravity/page/6",
        beforeText: '',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Actual Position vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/position",
            data: ["heavy-ball-position"],
            annotations: [],
            activeDatadefs: ["heavy-ball-position"]
          },
          bottom: {
            type: "graph",
            title: "Actual Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: [],
            activeDatadefs: ["heavy-ball-velocity"]
          }
        },
        hideSubmitButton: true,
        isFinalStep: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/7/step/1",
        activityPage: "/shared/gravity/page/7",
        beforeText: '<p>What happened to the ball\'s velocity as it approached the ground? Is this what you expected?</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Position vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/position",
            data: ["heavy-ball-position"],
            annotations: ["heavy-ball-position"]
          },
          bottom: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-velocity"]
          }
        },
        responseTemplate: "/components/response-template/open",
        submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]],
        isFinalStep: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/8/step/1",
        activityPage: "/shared/gravity/page/8",
        beforeText: '<p>How does the velocity-time graph of the light ball compare to the velocity-time graph of the heavy ball?</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Actual Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: []
          },
          bottom: {
            type: "graph",
            title: "Actual Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: []
          }
        },
        responseTemplate: "/components/response-template/open",
        submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]],
        submitButtonTitle: "OK",
        defaultBranch: "/shared/gravity/page/8/step/2"
      }, {
        url: "/shared/gravity/page/8/step/2",
        activityPage: "/shared/gravity/page/8",
        beforeText: '<p>On each graph, click to label the point where the ball\'s velocity was fastest.</p>\n',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Actual Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: []
          },
          bottom: {
            type: "graph",
            title: "Actual Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: []
          }
        },
        tools: [
          {
            name: "label",
            setup: {
              pane: "top",
              labelName: "light-ball-label"
            }
          }, {
            name: "label",
            setup: {
              pane: "bottom",
              labelName: "heavy-ball-label"
            }
          }
        ],
        isFinalStep: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/9/step/p1",
        activityPage: "/shared/gravity/page/9",
        beforeText: '<p>Click the earliest point at which the ball was in motion.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-label", "light-ball-point-1"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "light-ball-point-1",
              data: "light-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "light-ball-point-1"], 0.45],
            step: "/shared/gravity/page/9/step/p2"
          }, {
            criterion: [">", ["coord", "x", "light-ball-point-1"], 0.45],
            step: "/shared/gravity/page/9/step/p1-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/9/step/p1-incorrect-left"
      }, {
        url: "/shared/gravity/page/9/step/p1-incorrect-left",
        activityPage: "/shared/gravity/page/9",
        beforeText: '<p>Incorrect. At this point, the ball\'s velocity was (approximately) 0. Therefore, the ball was not moving. Try\nagain.</p>\n\n<p>Click the earliest point at which the ball was in motion.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-label", "light-ball-point-1"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "light-ball-point-1",
              data: "light-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "light-ball-point-1"], 0.45],
            step: "/shared/gravity/page/9/step/p2"
          }, {
            criterion: [">", ["coord", "x", "light-ball-point-1"], 0.45],
            step: "/shared/gravity/page/9/step/p1-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/9/step/p1-incorrect-left"
      }, {
        url: "/shared/gravity/page/9/step/p1-incorrect-right",
        activityPage: "/shared/gravity/page/9",
        beforeText: '<p>Incorrect. This point does not represent the beginning of the ball\'s motion. Try again.</p>\n\n<p>Click the earliest point at which the ball was in motion.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-label", "light-ball-point-1"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "light-ball-point-1",
              data: "light-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "light-ball-point-1"], 0.45],
            step: "/shared/gravity/page/9/step/p2"
          }, {
            criterion: [">", ["coord", "x", "light-ball-point-1"], 0.45],
            step: "/shared/gravity/page/9/step/p1-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/9/step/p1-incorrect-left"
      }, {
        url: "/shared/gravity/page/9/step/p2",
        activityPage: "/shared/gravity/page/9",
        beforeText: '<p>Correct!</p>\n\n<p>Now, click the point that best represents the ball\'s velocity when it was closest to the ground.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-label", "light-ball-point-1", "light-ball-point-2"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "light-ball-point-2",
              data: "light-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "light-ball-point-2"], 0.85],
            step: "/shared/gravity/page/9/step/done"
          }, {
            criterion: [">=", ["coord", "x", "light-ball-point-2"], 0.45],
            step: "/shared/gravity/page/9/step/p2-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/9/step/p2-incorrect-left"
      }, {
        url: "/shared/gravity/page/9/step/p2-incorrect-left",
        activityPage: "/shared/gravity/page/9",
        beforeText: '<p>Incorrect. The ball had not yet started to fall at this point. Try again.</p>\n<p>Click the point that best represents the ball\'s velocity when it was closest to the ground.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-label", "light-ball-point-1", "light-ball-point-2"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "light-ball-point-2",
              data: "light-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "light-ball-point-2"], 0.85],
            step: "/shared/gravity/page/9/step/done"
          }, {
            criterion: [">=", ["coord", "x", "light-ball-point-2"], 0.45],
            step: "/shared/gravity/page/9/step/p2-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/9/step/p2-incorrect-left"
      }, {
        url: "/shared/gravity/page/9/step/p2-incorrect-right",
        activityPage: "/shared/gravity/page/9",
        beforeText: '<p>Incorrect. The ball continued to move closer the ground after this point. Try again.</p>\n\n<p>Click the point that best represents the ball\'s velocity when it was closest to the ground.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-label", "light-ball-point-1", "light-ball-point-2"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "light-ball-point-2",
              data: "light-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "light-ball-point-2"], 0.85],
            step: "/shared/gravity/page/9/step/done"
          }, {
            criterion: [">=", ["coord", "x", "light-ball-point-2"], 0.45],
            step: "/shared/gravity/page/9/step/p2-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/9/step/p2-incorrect-left"
      }, {
        url: "/shared/gravity/page/9/step/done",
        activityPage: "/shared/gravity/page/9",
        beforeText: '<p>Correct! Here is the interval defined by the points you selected. The ball was falling in this interval.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-label", "light-ball-motion-segment", "light-ball-point-1", "light-ball-point-2"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        isFinalStep: true,
        hideSubmitButton: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/10/step/p1",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Select a representative point in the highlighted interval. Then click OK.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-motion-segment"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "light-ball-point-1",
              data: "light-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: [">=", ["coord", "x", "light-ball-point-1"], 0.45],
            step: "/shared/gravity/page/10/step/p2"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/p1-incorrect"
      }, {
        url: "/shared/gravity/page/10/step/p1-incorrect",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Incorrect. Select a point when the ball was falling (between 0.45 and 0.85 seconds). Then click OK.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-motion-segment"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "light-ball-point-1",
              data: "light-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: [">=", ["coord", "x", "light-ball-point-1"], 0.45],
            step: "/shared/gravity/page/10/step/p2"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/p1-incorrect"
      }, {
        url: "/shared/gravity/page/10/step/p2",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Select another point in the highlighted interval and then click OK.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-motion-segment"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "light-ball-point-2",
              data: "light-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "light-ball-point-2"], ["coord", "x", "light-ball-point-1"]],
            step: "/shared/gravity/page/10/step/p2-same-as-p1"
          }, {
            criterion: [">=", ["coord", "x", "light-ball-point-2"], 0.45],
            step: "/shared/gravity/page/10/step/slope-initial"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/p2-incorrect"
      }, {
        url: "/shared/gravity/page/10/step/p2-incorrect",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Incorrect. Select a point when the ball was falling (between 0.45 and 0.85 seconds). Then click OK.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-motion-segment"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "light-ball-point-2",
              data: "light-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "light-ball-point-2"], ["coord", "x", "light-ball-point-1"]],
            step: "/shared/gravity/page/10/step/p2-same-as-p1"
          }, {
            criterion: [">=", ["coord", "x", "light-ball-point-2"], 0.45],
            step: "/shared/gravity/page/10/step/slope-initial"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/p2-incorrect"
      }, {
        url: "/shared/gravity/page/10/step/p2-same-as-p1",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Incorrect. The point you selected is the same as the first point you selected. You need two different points\nin order to calculate the slope of the line between them. Try again.</p>\n\n<p>Select another point in the highlighted interval and then click OK.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-motion-segment"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "light-ball-point-2",
              data: "light-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "light-ball-point-2"], ["coord", "x", "light-ball-point-1"]],
            step: "/shared/gravity/page/10/step/p2-same-as-p1"
          }, {
            criterion: [">=", ["coord", "x", "light-ball-point-2"], 0.45],
            step: "/shared/gravity/page/10/step/slope-initial"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/p2-incorrect"
      }, {
        url: "/shared/gravity/page/10/step/slope-initial",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>To the right, a line has been drawn between the points you selected.</p>\n\n<p>What is the slope of the line between the points you selected, in m/s<sup>2</sup>?</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        variableAssignments: [
          {
            name: "light-ball-slope-as-string",
            value: ["get", "slope-as-string"]
          }
        ],
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "slope"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/10/step/slope-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/slope-initial-hint"
      }, {
        url: "/shared/gravity/page/10/step/slope-initial-hint",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Incorrect. Hint: Recall that the slope is the change in the velocity at the two points, divided by the\nchange in the time.</p>\n\n<p>What is the slope of the line between the points you selected, in m/s<sup>2</sup>?</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "slope"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/10/step/slope-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/velocity"
      }, {
        url: "/shared/gravity/page/10/step/velocity",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Incorrect. What was the change in the velocity of the ball, in m/s?</p>\n\n<p>Hint: Look at the graph.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line"],
            highlightedAnnotations: ["light-ball-rise-arrow"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "delta-velocity"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/10/step/time-velocity-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/velocity-hint"
      }, {
        url: "/shared/gravity/page/10/step/velocity-hint",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Incorrect. What was the change in the velocity of the ball, in m/s?</p>\n\n\n<p>Hint: Look at the table and the graph.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line", "light-ball-rise-arrow"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            highlightedAnnotations: ["light-ball-rise-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "delta-velocity"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/10/step/time-velocity-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/velocity-giveaway"
      }, {
        url: "/shared/gravity/page/10/step/velocity-giveaway",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Incorrect. The change in the velocity of the ball was %@ m/s - %@ m/s, or %@ m/s</p>',
        substitutedExpressions: ["final-velocity-as-string", "initial-velocity-as-string", "delta-velocity-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line", "light-ball-rise-arrow"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-rise-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        submitButtonTitle: "OK",
        defaultBranch: "/shared/gravity/page/10/step/time-velocity-incorrect"
      }, {
        url: "/shared/gravity/page/10/step/time-velocity-correct",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Correct! What is the change in time between the points you selected, in seconds?</p>\n\n<p>Hint: Look at the graph.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line", "light-ball-rise-arrow"],
            highlightedAnnotations: ["light-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-rise-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "delta-time"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/10/step/slope-final-time-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/time-hint"
      }, {
        url: "/shared/gravity/page/10/step/time-velocity-incorrect",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>What is the change in time between the points you selected, in seconds?</p>\n\n<p>Hint: Look at the graph.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line", "light-ball-rise-arrow"],
            highlightedAnnotations: ["light-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-rise-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "delta-time"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/10/step/slope-final-time-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/time-hint"
      }, {
        url: "/shared/gravity/page/10/step/time-hint",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Incorrect. What is the change in time between the points you selected, in seconds?</p>\n\n<p>Hint: Look at the table and the graph.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line", "light-ball-rise-arrow", "light-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-rise-bracket"],
            highlightedAnnotations: ["light-ball-run-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "delta-time"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/10/step/slope-final-time-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/time-giveaway"
      }, {
        url: "/shared/gravity/page/10/step/time-giveaway",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Incorrect. The change in time between the points is %@ s - %@ s, or %@ s.</p>',
        substitutedExpressions: ["final-time-as-string", "initial-time-as-string", "delta-time-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line", "light-ball-rise-arrow", "light-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-rise-bracket", "light-ball-run-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        submitButtonTitle: "OK",
        defaultBranch: "/shared/gravity/page/10/step/slope-final-time-incorrect"
      }, {
        url: "/shared/gravity/page/10/step/slope-final-time-correct",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Correct! If the change in velocity is %@ m/s during a change in time of %@ s, then what is the slope of the velocity-time graph, in m/s<sup>2</sup>?</p>',
        substitutedExpressions: ["delta-velocity-as-string", "delta-time-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line", "light-ball-rise-arrow", "light-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-rise-bracket", "light-ball-run-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "slope"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/10/step/slope-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/slope-final-giveaway"
      }, {
        url: "/shared/gravity/page/10/step/slope-final-time-incorrect",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>If the change in velocity is %@ m/s during a change in time of %@ s, then what is the slope of the velocity-time graph, in m/s<sup>2</sup>?</p>',
        substitutedExpressions: ["delta-velocity-as-string", "delta-time-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line", "light-ball-rise-arrow", "light-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-rise-bracket", "light-ball-run-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "slope"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/10/step/slope-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/10/step/slope-final-giveaway"
      }, {
        url: "/shared/gravity/page/10/step/slope-final-giveaway",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Incorrect. If the change in velocity is %@ m/s during a change in time of %@ s, then the slope is %@ m/s<sup>2</sup></p>',
        substitutedExpressions: ["delta-velocity-as-string", "delta-time-as-string", "slope-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-slope-line", "light-ball-rise-arrow", "light-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2", "light-ball-rise-bracket", "light-ball-run-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        isFinalStep: true,
        hideSubmitButton: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/10/step/slope-correct",
        activityPage: "/shared/gravity/page/10",
        beforeText: '<p>Correct! The slope of the velocity-time graph between the points you selected is %@ m/s<sup>2</sup>.</p>',
        substitutedExpressions: ["slope-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"]
          },
          bottom: {
            type: "table",
            data: ["light-ball-velocity"],
            annotations: ["light-ball-point-1", "light-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        isFinalStep: true,
        hideSubmitButton: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/11/step/p1",
        activityPage: "/shared/gravity/page/11",
        beforeText: '<p>Click the earliest point at which the ball was in motion.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-label", "heavy-ball-point-1"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "heavy-ball-point-1",
              data: "heavy-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "heavy-ball-point-1"], 0.45],
            step: "/shared/gravity/page/11/step/p2"
          }, {
            criterion: [">", ["coord", "x", "heavy-ball-point-1"], 0.45],
            step: "/shared/gravity/page/11/step/p1-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/11/step/p1-incorrect-left"
      }, {
        url: "/shared/gravity/page/11/step/p1-incorrect-left",
        activityPage: "/shared/gravity/page/11",
        beforeText: '<p>Incorrect. At this point, the ball\'s velocity was (approximately) 0. Therefore, the ball was not moving. Try\nagain.</p>\n\n<p>Click the earliest point at which the ball was in motion.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-label", "heavy-ball-point-1"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "heavy-ball-point-1",
              data: "heavy-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "heavy-ball-point-1"], 0.45],
            step: "/shared/gravity/page/11/step/p2"
          }, {
            criterion: [">", ["coord", "x", "heavy-ball-point-1"], 0.45],
            step: "/shared/gravity/page/11/step/p1-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/11/step/p1-incorrect-left"
      }, {
        url: "/shared/gravity/page/11/step/p1-incorrect-right",
        activityPage: "/shared/gravity/page/11",
        beforeText: '<p>Incorrect. This point does not represent the beginning of the ball\'s motion. Try again.</p>\n\n<p>Click the earliest point at which the ball was in motion.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-label", "heavy-ball-point-1"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "heavy-ball-point-1",
              data: "heavy-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "heavy-ball-point-1"], 0.45],
            step: "/shared/gravity/page/11/step/p2"
          }, {
            criterion: [">", ["coord", "x", "heavy-ball-point-1"], 0.45],
            step: "/shared/gravity/page/11/step/p1-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/11/step/p1-incorrect-left"
      }, {
        url: "/shared/gravity/page/11/step/p2",
        activityPage: "/shared/gravity/page/11",
        beforeText: '<p>Correct!</p>\n\n<p>Now, click the point that best represents the ball\'s velocity when it was closest to the ground.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-label", "heavy-ball-point-1", "heavy-ball-point-2"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "heavy-ball-point-2",
              data: "heavy-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "heavy-ball-point-2"], 0.9],
            step: "/shared/gravity/page/11/step/done"
          }, {
            criterion: [">=", ["coord", "x", "heavy-ball-point-2"], 0.45],
            step: "/shared/gravity/page/11/step/p2-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/11/step/p2-incorrect-left"
      }, {
        url: "/shared/gravity/page/11/step/p2-incorrect-left",
        activityPage: "/shared/gravity/page/11",
        beforeText: '<p>Incorrect. The ball had not yet started to fall at this point. Try again.</p>\n<p>Click the point that best represents the ball\'s velocity when it was closest to the ground.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-label", "heavy-ball-point-1", "heavy-ball-point-2"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "heavy-ball-point-2",
              data: "heavy-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "heavy-ball-point-2"], 0.9],
            step: "/shared/gravity/page/11/step/done"
          }, {
            criterion: [">=", ["coord", "x", "heavy-ball-point-2"], 0.45],
            step: "/shared/gravity/page/11/step/p2-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/11/step/p2-incorrect-left"
      }, {
        url: "/shared/gravity/page/11/step/p2-incorrect-right",
        activityPage: "/shared/gravity/page/11",
        beforeText: '<p>Incorrect. The ball continued to move closer the ground after this point. Try again.</p>\n\n<p>Click the point that best represents the ball\'s velocity when it was closest to the ground.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-label", "heavy-ball-point-1", "heavy-ball-point-2"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "heavy-ball-point-2",
              data: "heavy-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "heavy-ball-point-2"], 0.9],
            step: "/shared/gravity/page/11/step/done"
          }, {
            criterion: [">=", ["coord", "x", "heavy-ball-point-2"], 0.45],
            step: "/shared/gravity/page/11/step/p2-incorrect-right"
          }
        ],
        defaultBranch: "/shared/gravity/page/11/step/p2-incorrect-left"
      }, {
        url: "/shared/gravity/page/11/step/done",
        activityPage: "/shared/gravity/page/11",
        beforeText: '<p>Correct! Here is the interval defined by the points you selected. The ball was falling in this interval.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-label", "heavy-ball-motion-segment", "heavy-ball-point-1", "heavy-ball-point-2"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        isFinalStep: true,
        hideSubmitButton: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/12/step/p1",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Select a representative point in the highlighted interval. Then click OK.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-motion-segment"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "heavy-ball-point-1",
              data: "heavy-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: [">=", ["coord", "x", "heavy-ball-point-1"], 0.45],
            step: "/shared/gravity/page/12/step/p2"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/p1-incorrect"
      }, {
        url: "/shared/gravity/page/12/step/p1-incorrect",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Incorrect. Select a point when the ball was falling (between 0.45 and 0.9 seconds). Then click OK.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-motion-segment"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "heavy-ball-point-1",
              data: "heavy-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: [">=", ["coord", "x", "heavy-ball-point-1"], 0.45],
            step: "/shared/gravity/page/12/step/p2"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/p1-incorrect"
      }, {
        url: "/shared/gravity/page/12/step/p2",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Select another point in the highlighted interval and then click OK.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-motion-segment"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "heavy-ball-point-2",
              data: "heavy-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "heavy-ball-point-2"], ["coord", "x", "heavy-ball-point-1"]],
            step: "/shared/gravity/page/12/step/p2-same-as-p1"
          }, {
            criterion: [">=", ["coord", "x", "heavy-ball-point-2"], 0.45],
            step: "/shared/gravity/page/12/step/slope-initial"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/p2-incorrect"
      }, {
        url: "/shared/gravity/page/12/step/p2-incorrect",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Incorrect. Select a point when the ball was falling (between 0.45 and 0.9 seconds). Then click OK.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-motion-segment"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "heavy-ball-point-2",
              data: "heavy-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "heavy-ball-point-2"], ["coord", "x", "heavy-ball-point-1"]],
            step: "/shared/gravity/page/12/step/p2-same-as-p1"
          }, {
            criterion: [">=", ["coord", "x", "heavy-ball-point-2"], 0.45],
            step: "/shared/gravity/page/12/step/slope-initial"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/p2-incorrect"
      }, {
        url: "/shared/gravity/page/12/step/p2-same-as-p1",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Incorrect. The point you selected is the same as the first point you selected. You need two different points\nin order to calculate the slope of the line between them. Try again.</p>\n\n<p>Select another point in the highlighted interval and then click OK.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-motion-segment"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        tools: [
          {
            name: "tagging",
            setup: {
              tag: "heavy-ball-point-2",
              data: "heavy-ball-velocity"
            }
          }
        ],
        hideSubmitButton: false,
        submitButtonTitle: "OK",
        responseBranches: [
          {
            criterion: ["=", ["coord", "x", "heavy-ball-point-2"], ["coord", "x", "heavy-ball-point-1"]],
            step: "/shared/gravity/page/12/step/p2-same-as-p1"
          }, {
            criterion: [">=", ["coord", "x", "heavy-ball-point-2"], 0.45],
            step: "/shared/gravity/page/12/step/slope-initial"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/p2-incorrect"
      }, {
        url: "/shared/gravity/page/12/step/slope-initial",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>To the right, a line has been drawn between the points you selected.</p>\n\n<p>What is the slope of the line between the points you selected, in m/s<sup>2</sup>?</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        variableAssignments: [
          {
            name: "heavy-ball-slope-as-string",
            value: ["get", "slope-as-string"]
          }
        ],
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "slope"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/12/step/slope-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/slope-initial-hint"
      }, {
        url: "/shared/gravity/page/12/step/slope-initial-hint",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Incorrect. Hint: Recall that the slope is the change in the velocity at the two points, divided by the\nchange in the time.</p>\n\n<p>What is the slope of the line between the points you selected, in m/s<sup>2</sup>?</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "slope"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/12/step/slope-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/velocity"
      }, {
        url: "/shared/gravity/page/12/step/velocity",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Incorrect. What was the change in the velocity of the ball, in m/s?</p>\n\n<p>Hint: Look at the graph.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line"],
            highlightedAnnotations: ["heavy-ball-rise-arrow"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "delta-velocity"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/12/step/time-velocity-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/velocity-hint"
      }, {
        url: "/shared/gravity/page/12/step/velocity-hint",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Incorrect. What was the change in the velocity of the ball, in m/s?</p>\n\n\n<p>Hint: Look at the table and the graph.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line", "heavy-ball-rise-arrow"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            highlightedAnnotations: ["heavy-ball-rise-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "delta-velocity"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/12/step/time-velocity-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/velocity-giveaway"
      }, {
        url: "/shared/gravity/page/12/step/velocity-giveaway",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Incorrect. The change in the velocity of the ball was %@ m/s - %@ m/s, or %@ m/s</p>',
        substitutedExpressions: ["final-velocity-as-string", "initial-velocity-as-string", "delta-velocity-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line", "heavy-ball-rise-arrow"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-rise-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        submitButtonTitle: "OK",
        defaultBranch: "/shared/gravity/page/12/step/time-velocity-incorrect"
      }, {
        url: "/shared/gravity/page/12/step/time-velocity-correct",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Correct! What is the change in time between the points you selected, in seconds?</p>\n\n<p>Hint: Look at the graph.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line", "heavy-ball-rise-arrow"],
            highlightedAnnotations: ["heavy-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-rise-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "delta-time"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/12/step/slope-final-time-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/time-hint"
      }, {
        url: "/shared/gravity/page/12/step/time-velocity-incorrect",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>What is the change in time between the points you selected, in seconds?</p>\n\n<p>Hint: Look at the graph.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line", "heavy-ball-rise-arrow"],
            highlightedAnnotations: ["heavy-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-rise-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "delta-time"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/12/step/slope-final-time-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/time-hint"
      }, {
        url: "/shared/gravity/page/12/step/time-hint",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Incorrect. What is the change in time between the points you selected, in seconds?</p>\n\n<p>Hint: Look at the table and the graph.</p>',
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line", "heavy-ball-rise-arrow", "heavy-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-rise-bracket"],
            highlightedAnnotations: ["heavy-ball-run-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "delta-time"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/12/step/slope-final-time-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/time-giveaway"
      }, {
        url: "/shared/gravity/page/12/step/time-giveaway",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Incorrect. The change in time between the points is %@ s - %@ s, or %@ s.</p>',
        substitutedExpressions: ["final-time-as-string", "initial-time-as-string", "delta-time-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line", "heavy-ball-rise-arrow", "heavy-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-rise-bracket", "heavy-ball-run-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        submitButtonTitle: "OK",
        defaultBranch: "/shared/gravity/page/12/step/slope-final-time-incorrect"
      }, {
        url: "/shared/gravity/page/12/step/slope-final-time-correct",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Correct! If the change in velocity is %@ m/s during a change in time of %@ s, then what is the slope of the velocity-time graph, in m/s<sup>2</sup>?</p>',
        substitutedExpressions: ["delta-velocity-as-string", "delta-time-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line", "heavy-ball-rise-arrow", "heavy-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-rise-bracket", "heavy-ball-run-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "slope"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/12/step/slope-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/slope-final-giveaway"
      }, {
        url: "/shared/gravity/page/12/step/slope-final-time-incorrect",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>If the change in velocity is %@ m/s during a change in time of %@ s, then what is the slope of the velocity-time graph, in m/s<sup>2</sup>?</p>',
        substitutedExpressions: ["delta-velocity-as-string", "delta-time-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line", "heavy-ball-rise-arrow", "heavy-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-rise-bracket", "heavy-ball-run-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        responseTemplate: "/components/response-template/numeric",
        submissibilityCriterion: ["isNumeric", ["responseField", 1]],
        submitButtonTitle: "Check My Answer",
        responseBranches: [
          {
            criterion: ["withinAbsTolerance", ["get", "slope"], ["responseField", 1], 0.1],
            step: "/shared/gravity/page/12/step/slope-correct"
          }
        ],
        defaultBranch: "/shared/gravity/page/12/step/slope-final-giveaway"
      }, {
        url: "/shared/gravity/page/12/step/slope-final-giveaway",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Incorrect. If the change in velocity is %@ m/s during a change in time of %@ s, then the slope is %@ m/s<sup>2</sup></p>',
        substitutedExpressions: ["delta-velocity-as-string", "delta-time-as-string", "slope-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-slope-line", "heavy-ball-rise-arrow", "heavy-ball-run-arrow"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2", "heavy-ball-rise-bracket", "heavy-ball-run-bracket"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        isFinalStep: true,
        hideSubmitButton: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/12/step/slope-correct",
        activityPage: "/shared/gravity/page/12",
        beforeText: '<p>Correct! The slope of the velocity-time graph between the points you selected is %@ m/s<sup>2</sup>.</p>',
        substitutedExpressions: ["slope-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"]
          },
          bottom: {
            type: "table",
            data: ["heavy-ball-velocity"],
            annotations: ["heavy-ball-point-1", "heavy-ball-point-2"],
            xLabel: "Time",
            yLabel: "Position"
          }
        },
        isFinalStep: true,
        hideSubmitButton: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/13/step/1",
        activityPage: "/shared/gravity/page/13",
        beforeText: '<p>Here is the value of <i>g</i> that you found for the light ball: <b>%@ m/s<sup>2</sup></p></b>\n\n<p>Here is the value of <i>g</i> that you found for the heavy ball: <b>%@ m/s<sup>2</sup></p></b>\n\n<p>How does your value compare with the accepted value?</p>',
        substitutedExpressions: ["light-ball-slope-as-string", "heavy-ball-slope-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Actual Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: []
          },
          bottom: {
            type: "graph",
            title: "Actual Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: []
          }
        },
        responseTemplate: "/components/response-template/open",
        submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]],
        submitButtonTitle: "OK",
        defaultBranch: "/shared/gravity/page/13/step/2"
      }, {
        url: "/shared/gravity/page/13/step/2",
        activityPage: "/shared/gravity/page/13",
        beforeText: '<p>Here is the value of <i>g</i> that you found for the light ball: <b>%@ m/s<sup>2</sup></p></b>\n\n<p>Here is the value of <i>g</i> that you found for the heavy ball: <b>%@ m/s<sup>2</sup></p></b>\n\n<p>What factors might have caused errors in your measurements?</p>',
        substitutedExpressions: ["light-ball-slope-as-string", "heavy-ball-slope-as-string"],
        paneConfig: "split",
        panes: {
          top: {
            type: "graph",
            title: "Actual Velocity vs. Time (Light Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["light-ball-velocity"],
            annotations: []
          },
          bottom: {
            type: "graph",
            title: "Actual Velocity vs. Time (Heavy Ball)",
            xAxis: "/shared/gravity/axes/time",
            yAxis: "/shared/gravity/axes/velocity",
            data: ["heavy-ball-velocity"],
            annotations: []
          }
        },
        responseTemplate: "/components/response-template/open",
        submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]],
        isFinalStep: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/gravity/page/14/step/1",
        activityPage: "/shared/gravity/page/14",
        beforeText: '<p>What did you discover about the velocity of a light ball versus a heavy ball as each falls to the\nground?</p>',
        paneConfig: "single",
        panes: {
          single: {
            type: "image",
            path: "/static/smartgraphs/en/current/source/resources/images/leaning-tower-of-pisa-wide.jpg",
            caption: "Creative Commons BY-NC-SA 2.0 photo courtesy flickr user **Mary** (<a href=\"http://www.flickr.com/photos/virgomerry/315412804/\">link</a>)"
          }
        },
        responseTemplate: "/components/response-template/open",
        submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]],
        submitButtonTitle: "OK",
        defaultBranch: "/shared/gravity/page/14/step/2"
      }, {
        url: "/shared/gravity/page/14/step/2",
        activityPage: "/shared/gravity/page/14",
        beforeText: '<p>This is the conclusion of the activity</p>',
        paneConfig: "single",
        panes: {
          single: {
            type: "image",
            path: "/static/smartgraphs/en/current/source/resources/images/leaning-tower-of-pisa-wide.jpg",
            caption: "Creative Commons BY-NC-SA 2.0 photo courtesy flickr user **Mary** (<a href=\"http://www.flickr.com/photos/virgomerry/315412804/\">link</a>)"
          }
        },
        isFinalStep: true,
        hideSubmitButton: true
      }
    ],
    responseTemplates: [
      {
        url: "/components/response-template/open",
        templateString: "",
        fieldTypes: ["textarea"],
        fieldChoicesList: [null],
        initialValues: [""]
      }, {
        url: "/components/response-template/numeric",
        templateString: "",
        fieldTypes: ["numeric"],
        fieldChoicesList: [null],
        initialValues: [""]
      }
    ],
    axes: [
      {
        url: "/shared/gravity/axes/time",
        units: "/builtins/units/seconds",
        min: 0,
        max: 1.0,
        nSteps: 10,
        label: "Time"
      }, {
        url: "/shared/gravity/axes/position",
        units: "/builtins/units/meters",
        min: 0,
        max: 2.4,
        nSteps: 12,
        label: "Position"
      }, {
        url: "/shared/gravity/axes/velocity",
        units: "/builtins/units/meters-per-second",
        min: -6,
        max: 2,
        nSteps: 8,
        label: "Velocity"
      }
    ],
    datadefs: [
      {
        type: "UnorderedDataPoints",
        records: [
          {
            url: "/shared/gravity/datadefs/light-ball-position",
            name: "light-ball-position",
            activity: "/shared/gravity",
            xUnits: "/builtins/units/seconds",
            xLabel: "Time",
            xShortLabel: "Time",
            yUnits: "/builtins/units/meters",
            yLabel: "Position",
            yShortLabel: "Position",
            points: [[0.05, 1.867], [0.1, 1.84], [0.15, 1.84], [0.2, 1.84], [0.25, 1.84], [0.3, 1.84], [0.35, 1.84], [0.4, 1.819], [0.45, 1.745], [0.5, 1.651], [0.55, 1.531], [0.6, 1.394], [0.65, 1.229], [0.7, 1.042], [0.75, .837], [0.8, .607], [0.85, .359]]
          }, {
            url: "/shared/gravity/datadefs/heavy-ball-position",
            name: "heavy-ball-position",
            activity: "/shared/gravity",
            xUnits: "/builtins/units/seconds",
            xLabel: "Time",
            xShortLabel: "Time",
            yUnits: "/builtins/units/meters",
            yLabel: "Position",
            yShortLabel: "Position",
            points: [[0.05, 1.83], [0.1, 1.832], [0.15, 1.829], [0.2, 1.829], [0.25, 1.829], [0.3, 1.823], [0.35, 1.815], [0.4, 1.815], [0.45, 1.761], [0.5, 1.682], [0.55, 1.58], [0.6, 1.455], [0.65, 1.312], [0.7, 1.139], [0.75, .942], [0.8, .726], [0.85, .487], [0.9, .244]]
          }
        ]
      }, {
        type: "FirstOrderDifference",
        records: [
          {
            url: "/shared/gravity/datadefs/light-ball-velocity",
            name: "light-ball-velocity",
            activity: "/shared/gravity",
            xUnits: "/builtins/units/seconds",
            xLabel: "Time",
            xShortLabel: "Time",
            yUnits: "/builtins/units/meters-per-second",
            yLabel: "Velocity",
            yShortLabel: "Vel",
            source: "/shared/gravity/datadefs/light-ball-position",
            windowLength: 4
          }, {
            url: "/shared/gravity/datadefs/heavy-ball-velocity",
            name: "heavy-ball-velocity",
            activity: "/shared/gravity",
            xUnits: "/builtins/units/seconds",
            xLabel: "Time",
            xShortLabel: "Time",
            yUnits: "/builtins/units/meters-per-second",
            yLabel: "Velocity",
            yShortLabel: "Vel",
            source: "/shared/gravity/datadefs/heavy-ball-position",
            windowLength: 4
          }
        ]
      }
    ],
    tags: [
      {
        url: "/shared/gravity/tag/light-ball-point-1",
        activity: "/shared/gravity",
        name: "light-ball-point-1"
      }, {
        url: "/shared/gravity/tag/light-ball-point-2",
        activity: "/shared/gravity",
        name: "light-ball-point-2"
      }, {
        url: "/shared/gravity/tag/heavy-ball-point-1",
        activity: "/shared/gravity",
        name: "heavy-ball-point-1"
      }, {
        url: "/shared/gravity/tag/heavy-ball-point-2",
        activity: "/shared/gravity",
        name: "heavy-ball-point-2"
      }
    ],
    annotations: [
      {
        type: "HighlightedPoint",
        records: [
          {
            url: "/shared/gravity/anotation/light-ball-point-1",
            name: "light-ball-point-1",
            activity: "/shared/gravity",
            datadefName: "light-ball-velocity",
            tag: "/shared/gravity/tag/light-ball-point-1",
            color: "#1f77b4"
          }, {
            url: "/shared/gravity/annotation/light-ball-point-2",
            name: "light-ball-point-2",
            activity: "/shared/gravity",
            datadefName: "light-ball-velocity",
            tag: "/shared/gravity/tag/light-ball-point-2",
            color: "#ff7f0e"
          }, {
            url: "/shared/gravity/annotation/heavy-ball-point-1",
            name: "heavy-ball-point-1",
            activity: "/shared/gravity",
            datadefName: "heavy-ball-velocity",
            tag: "/shared/gravity/tag/heavy-ball-point-1",
            color: "#1f77b4"
          }, {
            url: "/shared/gravity/annotation/heavy-ball-point-2",
            name: "heavy-ball-point-2",
            activity: "/shared/gravity",
            datadefName: "heavy-ball-velocity",
            tag: "/shared/gravity/tag/heavy-ball-point-2",
            color: "#ff7f0e"
          }
        ]
      }, {
        type: "SegmentOverlay",
        records: [
          {
            url: "/shared/gravity/annotation/light-ball-motion-segment",
            name: "light-ball-motion-segment",
            activity: "/shared/gravity",
            datadefName: "light-ball-velocity",
            x1Record: 0.45,
            x2Record: 0.85
          }, {
            url: "/shared/gravity/annotation/heavy-ball-motion-segment",
            name: "heavy-ball-motion-segment",
            activity: "/shared/gravity",
            datadefName: "heavy-ball-velocity",
            x1Record: 0.45,
            x2Record: 0.9
          }
        ]
      }, {
        type: "LineThroughPoints",
        records: [
          {
            url: "/shared/gravity/annotation/light-ball-slope-line",
            name: "light-ball-slope-line",
            activity: "/shared/gravity",
            p1Tag: "/shared/gravity/tag/light-ball-point-1",
            p2Tag: "/shared/gravity/tag/light-ball-point-2",
            color: "#1f77b4"
          }, {
            url: "/shared/gravity/annotation/heavy-ball-slope-line",
            name: "heavy-ball-slope-line",
            activity: "/shared/gravity",
            p1Tag: "/shared/gravity/tag/heavy-ball-point-1",
            p2Tag: "/shared/gravity/tag/heavy-ball-point-2",
            color: "#1f77b4"
          }
        ]
      }, {
        type: "RiseArrow",
        records: [
          {
            url: "/shared/gravity/annotation/light-ball-rise-arrow",
            name: "light-ball-rise-arrow",
            activity: "/shared/gravity",
            color: "#cccccc",
            p1Tag: "/shared/gravity/tag/light-ball-point-1",
            p2Tag: "/shared/gravity/tag/light-ball-point-2"
          }, {
            url: "/shared/gravity/annotation/heavy-ball-rise-arrow",
            name: "heavy-ball-rise-arrow",
            activity: "/shared/gravity",
            color: "#cccccc",
            p1Tag: "/shared/gravity/tag/heavy-ball-point-1",
            p2Tag: "/shared/gravity/tag/heavy-ball-point-2"
          }
        ]
      }, {
        type: "RunArrow",
        records: [
          {
            url: "/shared/gravity/annotation/light-ball-run-arrow",
            name: "light-ball-run-arrow",
            activity: "/shared/gravity",
            color: "#cccccc",
            p1Tag: "/shared/gravity/tag/light-ball-point-1",
            p2Tag: "/shared/gravity/tag/light-ball-point-2"
          }, {
            url: "/shared/gravity/annotation/heavy-ball-run-arrow",
            name: "heavy-ball-run-arrow",
            activity: "/shared/gravity",
            color: "#cccccc",
            p1Tag: "/shared/gravity/tag/heavy-ball-point-1",
            p2Tag: "/shared/gravity/tag/heavy-ball-point-2"
          }
        ]
      }, {
        type: "RiseBracket",
        records: [
          {
            url: "/shared/gravity/annotation/light-ball-rise-bracket",
            name: "light-ball-rise-bracket",
            activity: "/shared/gravity",
            color: "#cccccc",
            datadefName: "light-ball-velocity",
            p1Tag: "/shared/gravity/tag/light-ball-point-1",
            p2Tag: "/shared/gravity/tag/light-ball-point-2"
          }, {
            url: "/shared/gravity/annotation/heavy-ball-rise-bracket",
            name: "heavy-ball-rise-bracket",
            activity: "/shared/gravity",
            color: "#cccccc",
            datadefName: "heavy-ball-velocity",
            p1Tag: "/shared/gravity/tag/heavy-ball-point-1",
            p2Tag: "/shared/gravity/tag/heavy-ball-point-2"
          }
        ]
      }, {
        type: "RunBracket",
        records: [
          {
            url: "/shared/gravity/annotation/light-ball-run-bracket",
            name: "light-ball-run-bracket",
            activity: "/shared/gravity",
            color: "#cccccc",
            datadefName: "light-ball-velocity",
            p1Tag: "/shared/gravity/tag/light-ball-point-1",
            p2Tag: "/shared/gravity/tag/light-ball-point-2"
          }, {
            url: "/shared/gravity/annotation/heavy-ball-run-bracket",
            name: "heavy-ball-run-bracket",
            activity: "/shared/gravity",
            color: "#cccccc",
            datadefName: "heavy-ball-velocity",
            p1Tag: "/shared/gravity/tag/heavy-ball-point-1",
            p2Tag: "/shared/gravity/tag/heavy-ball-point-2"
          }
        ]
      }, {
        type: "FreehandSketch",
        records: [
          {
            url: "/shared/gravity/annotation/light-ball-position",
            name: "light-ball-position",
            activity: "/shared/gravity",
            color: "#CC0000",
            points: []
          }, {
            url: "/shared/gravity/annotation/light-ball-velocity",
            name: "light-ball-velocity",
            activity: "/shared/gravity",
            color: "#CC0000",
            points: []
          }, {
            url: "/shared/gravity/annotation/heavy-ball-position",
            name: "heavy-ball-position",
            activity: "/shared/gravity",
            color: "#CC0000",
            points: []
          }, {
            url: "/shared/gravity/annotation/heavy-ball-velocity",
            name: "heavy-ball-velocity",
            activity: "/shared/gravity",
            color: "#CC0000",
            points: []
          }
        ]
      }, {
        type: "Label",
        records: [
          {
            url: "/shared/gravity/annotation/light-ball-label",
            name: "light-ball-label",
            activity: "/shared/gravity",
            text: "Fastest point"
          }, {
            url: "/shared/gravity/annotation/heavy-ball-label",
            name: "heavy-ball-label",
            activity: "/shared/gravity",
            text: "Fastest point"
          }
        ]
      }
    ],
    variables: [],
    units: []
  };
}).call(this);
