/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/describing-velocity-animations"] =
{
  "_id": "describing-velocity-animations.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Describing Velocity Animations",
    "url": "/shared/describing-velocity-animations",
    "owner": "shared",
    "pages": [
      "/shared/describing-velocity-animations/page/1-1-discovery-question",
      "/shared/describing-velocity-animations/page/2-2-label-the-position_time-graph"
    ],
    "axes": [
      "/shared/describing-velocity-animations/axes/1",
      "/shared/describing-velocity-animations/axes/2",
      "/shared/describing-velocity-animations/axes/3",
      "/shared/describing-velocity-animations/axes/4"
    ],
    "authorName": "Richard Klancer"
  },
  "pages": [
    {
      "name": "1 Discovery Question",
      "url": "/shared/describing-velocity-animations/page/1-1-discovery-question",
      "activity": "/shared/describing-velocity-animations",
      "index": 1,
      "introText": "<h1>Discovery Question</h1>",
      "steps": [
        "/shared/describing-velocity-animations/page/1-1-discovery-question/step/1"
      ],
      "firstStep": "/shared/describing-velocity-animations/page/1-1-discovery-question/step/1",
      "contextVars": []
    },
    {
      "name": "2 Label the Position-Time Graph",
      "url": "/shared/describing-velocity-animations/page/2-2-label-the-position_time-graph",
      "activity": "/shared/describing-velocity-animations",
      "index": 2,
      "introText": "<h1>Label the Position-Time Graph</h1>",
      "steps": [
        "/shared/describing-velocity-animations/page/2-2-label-the-position_time-graph/step/1"
      ],
      "firstStep": "/shared/describing-velocity-animations/page/2-2-label-the-position_time-graph/step/1",
      "contextVars": []
    }
  ],
  "steps": [
    {
      "url": "/shared/describing-velocity-animations/page/1-1-discovery-question/step/1",
      "activityPage": "/shared/describing-velocity-animations/page/1-1-discovery-question",
      "beforeText": "<p><strong>How can you describe velocity?</strong></p>\r\n<p>Let’s start by examining the motion of a car traveling from one point to another.</p>\r\n<p><b>Click</b> the Start button to the right to watch the car’s journey. Click the Stop, Reset, and Start buttons to pause and replay the motion multiple times.</p>\r\n<p>In the area below, <strong>describe</strong> the motion of the car. Try to use as many key words from the word bank as possible.</p>\r\n<p><strong>Word bank:</strong> start, position, time, forward, backward, moving, stopping, velocity, constant, steady, changing, slow, fast, end, meters, seconds<p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "dummy",
          "xAxis": "/shared/describing-velocity-animations/axes/1",
          "yAxis": "/shared/describing-velocity-animations/axes/2",
          "annotations": [],
          "highlightedAnnotations": [],
          "data": [
            "position-data"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": []
          },
          "activeDatadefs": [
            "position-data"
          ]
        }
      },
      "tools": [
        {
          "name": "animation",
          "setup": {
            "pane": "top",
            "hideGraph": true,
            "duration": 9000,
            "channelWidth": 70,
            "staticImages": [
              {
                "name": "finish",
                "image": "finish.png",
                "width": 70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  {
                    "y": 0
                  }
                ]
              }
            ],
            "backgroundImage": "road-dashed.png",
            "animations": [
              {
                "data": "position-data",
                "image": "carWhite2.png",
                "width": 30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }
            ]
          }
        }
      ],
      "responseTemplate": "/shared/describing-velocity-animations/response-templates/open-1",
      "submissibilityCriterion": [
        "textLengthIsAtLeast",
        1,
        [
          "responseField",
          1
        ]
      ],
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    },
    {
      "url": "/shared/describing-velocity-animations/page/2-2-label-the-position_time-graph/step/1",
      "activityPage": "/shared/describing-velocity-animations/page/2-2-label-the-position_time-graph",
      "beforeText": "<p><b>Start</b> the animation again and <b>observe</b> the resulting position-time graph for the car's motion.</p><p>Using key words from your descriptions, <b>label</b> the motions that occurred during each segment of the position-time graph. You should have three labels, one for each motion.</p>\r\n<p><b>Click</b> or tap where you want a label. <b>Double-click</b> (or double-tap) in the label to add text and click outside the label when you are done. You can also click and drag to rearrange the labels.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Position vs. Time",
          "xAxis": "/shared/describing-velocity-animations/axes/3",
          "yAxis": "/shared/describing-velocity-animations/axes/4",
          "showCrossHairs": false,
          "showGraphGrid": false,
          "showToolTipCoords": false,
          "annotations": [],
          "highlightedAnnotations": [],
          "data": [
            "position-data"
          ],
          "legends": {
            "title": "legend",
            "type": "name",
            "referenceDatadef": "",
            "datadefs": []
          },
          "activeDatadefs": [
            "position-data"
          ]
        }
      },
      "tools": [
        {
          "name": "animation",
          "setup": {
            "pane": "top",
            "hideGraph": false,
            "duration": 9000,
            "channelWidth": 70,
            "staticImages": [
              {
                "name": "finish",
                "image": "finish.png",
                "width": 70,
                "height": 10,
                "xOffset": 0,
                "yOffset": 5,
                "instances": [
                  {
                    "y": 0
                  }
                ]
              }
            ],
            "backgroundImage": "road-dashed.png",
            "animations": [
              {
                "data": "position-data",
                "image": "carWhite2.png",
                "width": 30,
                "height": 61,
                "xOffset": 40,
                "yOffset": 0
              }
            ]
          }
        }
      ],
      "isFinalStep": true,
      "nextButtonShouldSubmit": true
    }
  ],
  "responseTemplates": [
    {
      "url": "/shared/describing-velocity-animations/response-templates/open-1",
      "templateString": "",
      "fieldChoicesList": [
        null
      ],
      "initialValues": [
        ""
      ],
      "fieldTypes": [
        "textarea"
      ]
    }
  ],
  "axes": [
    {
      "url": "/shared/describing-velocity-animations/axes/1",
      "units": "/shared/describing-velocity-animations/units/seconds",
      "min": 0,
      "max": 9,
      "nSteps": 1,
      "label": "dummy"
    },
    {
      "url": "/shared/describing-velocity-animations/axes/2",
      "units": "/shared/describing-velocity-animations/units/meters",
      "min": 0,
      "max": 40,
      "nSteps": 1,
      "label": "dummy"
    },
    {
      "url": "/shared/describing-velocity-animations/axes/3",
      "units": "/shared/describing-velocity-animations/units/seconds",
      "min": 0,
      "max": 9,
      "nSteps": 9,
      "label": "Distance"
    },
    {
      "url": "/shared/describing-velocity-animations/axes/4",
      "units": "/shared/describing-velocity-animations/units/meters",
      "min": 0,
      "max": 40,
      "nSteps": 8,
      "label": "Position"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/describing-velocity-animations/datadefs/position-data",
          "name": "position-data",
          "activity": "/shared/describing-velocity-animations",
          "xUnits": "/shared/describing-velocity-animations/units/seconds",
          "yUnits": "/shared/describing-velocity-animations/units/meters",
          "points": [
            [
              0,
              0
            ],
            [
              0.25,
              0
            ],
            [
              0.5,
              0
            ],
            [
              0.75,
              0
            ],
            [
              1,
              0
            ],
            [
              1.25,
              0
            ],
            [
              1.5,
              0
            ],
            [
              1.75,
              0
            ],
            [
              2,
              0
            ],
            [
              2.25,
              0
            ],
            [
              2.5,
              0
            ],
            [
              2.75,
              0
            ],
            [
              3,
              0
            ],
            [
              3.25,
              0.5
            ],
            [
              3.5,
              1
            ],
            [
              3.75,
              1.5
            ],
            [
              4,
              2
            ],
            [
              4.25,
              2.5
            ],
            [
              4.5,
              3
            ],
            [
              4.75,
              3.5
            ],
            [
              5,
              4
            ],
            [
              5.25,
              4.5
            ],
            [
              5.5,
              5
            ],
            [
              5.75,
              5.5
            ],
            [
              6,
              6
            ],
            [
              6.25,
              8.5
            ],
            [
              6.5,
              11
            ],
            [
              6.75,
              13.5
            ],
            [
              7,
              16
            ],
            [
              7.25,
              18.5
            ],
            [
              7.5,
              21
            ],
            [
              7.75,
              23.5
            ],
            [
              8,
              26
            ],
            [
              8.25,
              28.5
            ],
            [
              8.5,
              31
            ],
            [
              8.75,
              33.5
            ],
            [
              9,
              36
            ]
          ],
          "pointType": "none",
          "lineType": "connected",
          "lineSnapDistance": 0.1
        }
      ]
    }
  ],
  "tags": [],
  "annotations": [],
  "variables": [],
  "units": [
    {
      "url": "/shared/describing-velocity-animations/units/Time",
      "activity": "/shared/describing-velocity-animations",
      "name": "Time",
      "abbreviation": "s",
      "pluralName": "Time"
    },
    {
      "url": "/shared/describing-velocity-animations/units/Distance",
      "activity": "/shared/describing-velocity-animations",
      "name": "Distance",
      "abbreviation": "m",
      "pluralName": "Distance"
    },
    {
      "url": "/shared/describing-velocity-animations/units/degrees Celsius",
      "activity": "/shared/describing-velocity-animations",
      "name": "degrees Celsiu",
      "abbreviation": "deg C",
      "pluralName": "degrees Celsius"
    },
    {
      "url": "/shared/describing-velocity-animations/units/minutes",
      "activity": "/shared/describing-velocity-animations",
      "name": "minute",
      "abbreviation": "min.",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/describing-velocity-animations/units/meters",
      "activity": "/shared/describing-velocity-animations",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/describing-velocity-animations/units/seconds",
      "activity": "/shared/describing-velocity-animations",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    },
    {
      "url": "/shared/describing-velocity-animations/units/centimeters",
      "activity": "/shared/describing-velocity-animations",
      "name": "centimeter",
      "abbreviation": "cm",
      "pluralName": "centimeters"
    },
    {
      "url": "/shared/describing-velocity-animations/units/grams",
      "activity": "/shared/describing-velocity-animations",
      "name": "gram",
      "abbreviation": "gr",
      "pluralName": "grams"
    },
    {
      "url": "/shared/describing-velocity-animations/units/miles",
      "activity": "/shared/describing-velocity-animations",
      "name": "mile",
      "abbreviation": "mi",
      "pluralName": "miles"
    },
    {
      "url": "/shared/describing-velocity-animations/units/hours",
      "activity": "/shared/describing-velocity-animations",
      "name": "hour",
      "abbreviation": "hr",
      "pluralName": "hours"
    },
    {
      "url": "/shared/describing-velocity-animations/units/Celsius",
      "activity": "/shared/describing-velocity-animations",
      "name": "Celsiu",
      "abbreviation": "° C.",
      "pluralName": "Celsius"
    },
    {
      "url": "/shared/describing-velocity-animations/units/dollars",
      "activity": "/shared/describing-velocity-animations",
      "name": "dollar",
      "abbreviation": "$",
      "pluralName": "dollars"
    },
    {
      "url": "/shared/describing-velocity-animations/units/inches",
      "activity": "/shared/describing-velocity-animations",
      "name": "inche",
      "abbreviation": "in",
      "pluralName": "inches"
    },
    {
      "url": "/shared/describing-velocity-animations/units/years",
      "activity": "/shared/describing-velocity-animations",
      "name": "year",
      "abbreviation": "yr",
      "pluralName": "years"
    },
    {
      "url": "/shared/describing-velocity-animations/units/millimeters",
      "activity": "/shared/describing-velocity-animations",
      "name": "millimeter",
      "abbreviation": "mm",
      "pluralName": "millimeters"
    },
    {
      "url": "/shared/describing-velocity-animations/units/parts per million",
      "activity": "/shared/describing-velocity-animations",
      "name": "parts per million",
      "abbreviation": "ppm",
      "pluralName": "parts per million"
    },
    {
      "url": "/shared/describing-velocity-animations/units/meters per second",
      "activity": "/shared/describing-velocity-animations",
      "name": "meters per second",
      "abbreviation": "m/s",
      "pluralName": "meters per second"
    }
  ]
}
