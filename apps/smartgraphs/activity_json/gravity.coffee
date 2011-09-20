Smartgraphs.activityDocs ||= {}
Smartgraphs.activityDocs["/shared/gravity"] =

  _id:                 "gravity.df6"
  _rev:                1
  data_format_version: 6

  activity:

    title: "Was Galileo Right?"
    url:   "/shared/gravity"
    owner: "shared"

    pages: [
      "/shared/gravity/page/1"
    ]

    axes:  [
      "/shared/gravity/axes/20s"
      "/shared/gravity/axes/5m"
      "/shared/gravity/axes/3mps"
    ]

  pages: [
    name:      "Real-Time Velocity Measurement"
    url:       "/shared/gravity/page/1"
    activity:  "/shared/gravity"
    index:     1
    introText: "<h1>Real-time Velocity Measurement</h1>"
    steps:     [
      "/shared/gravity/page/1/step/1"
    ]
    firstStep: "/shared/gravity/page/1/step/1"
  ]

  steps: [
    {
      url:          "/shared/gravity/page/1/step/1"
      activityPage: "/shared/gravity/page/1"

      beforeText: "<p>Attach a sensor and click the Start button. Observe the velocity graph below.</p>"

      paneConfig:   "split"
      panes:
        top:
          type:        "graph"
          title:       "Position vs. Time"
          xAxis:       "/shared/gravity/axes/20s"
          yAxis:       "/shared/gravity/axes/5m"
          data:        ["position-time-data"]
          annotations: []

        bottom:
          type:        "graph"
          title:       "Velocity vs. Time"
          xAxis:       "/shared/gravity/axes/20s"
          yAxis:       "/shared/gravity/axes/3mps"
          data:        ["velocity-time-data"]
          annotations: []

      tools: [
        name: "sensor"
        setup:
          data:         "position-time-data"
          controlsPane: "top"
      ]

      hideSubmitButton: true
    }
  ]

  axes: [
    {
      url:    "/shared/gravity/axes/20s"
      units:  "/builtins/units/seconds"
      min:    0
      max:    20
      nSteps: 10
      label:  "Time"
    }
    {
      url:    "/shared/gravity/axes/5m"
      units:  "/builtins/units/meters"
      min:    0
      max:    5
      nSteps: 5
      label:  "Position"
    }
    {
      url:    "/shared/gravity/axes/3mps"
      units:  "/builtins/units/meters-per-second"
      min:    -1.5
      max:    1.5
      nSteps: 15
      label:  "Velocity"
    }
  ]

  datadefs: [
    {
      type: "UnorderedDataPoints"
      records: [
        {
          url:         "/shared/gravity/datadefs/position-time-data"
          name:        "position-time-data"
          activity:    "/shared/gravity"
          xUnits:      "/builtins/units/seconds"
          xLabel:      "Time"
          xShortLabel: "Time"
          yUnits:      "/builtins/units/meters"
          yLabel:      "Position"
          yShortLabel: "Position"
          points:      []
        }
      ]
    }
    {
      type: "FirstOrderDifference"
      records: [
        {
          url:          "/shared/gravity/datadefs/velocity-time-data"
          name:         "velocity-time-data"
          activity:     "/shared/gravity"
          xUnits:       "/builtins/units/seconds"
          xLabel:       "Time"
          xShortLabel:  "Time"
          yUnits:       "/builtins/units/meters-per-second"
          yLabel:       "Velocity"
          yShortLabel:  "Velocity"
          source:       "/shared/gravity/datadefs/position-time-data"
          windowLength: 4
        }
      ]
    }
  ]

  responseTemplates: []
  tags:              []
  variables:         []
  annotations:       []
  units:             []
