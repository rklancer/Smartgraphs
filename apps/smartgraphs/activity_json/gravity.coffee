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
      "/shared/gravity/page/2"
      "/shared/gravity/page/3"
      "/shared/gravity/page/4"
      "/shared/gravity/page/5"
      "/shared/gravity/page/6"
      "/shared/gravity/page/7"
      "/shared/gravity/page/8"
      "/shared/gravity/page/9"
      "/shared/gravity/page/12"
      "/shared/gravity/page/13"      
    ]


  pages: [
    {
      name:      "Introduction"
      url:       "/shared/gravity/page/1"
      activity:  "/shared/gravity"
      index:     1
      introText: 
        '''
        <h1>Introduction</h1>
      
        <p>In the 1600s, Galileo Galilei (1564-1642) hypothesized that objects of different masses would fall at the
        same rate when they were dropped from the same height and allowed to fall freely. According to legend, Galileo
        dropped an iron cannon ball and a wooden ball from the Leaning Tower of Pisa to test his hypothesis.</p>
        '''
      steps:     [
        "/shared/gravity/page/1/step/1"
      ]
      firstStep: "/shared/gravity/page/1/step/1"
    }

    {
      name:      "Predict the Graphs (Light Ball)"
      url:       "/shared/gravity/page/2"
      activity:  "/shared/gravity"
      index:     2
      introText: 
        '''
        <h1>Predict the Graphs (Light Ball)</h1>
        
        <p>To test Galileo’s hypothesis, you are going to drop same-sized balls of different masses from a fixed
        height.</p>
        
        <p>Decide what you will use for the light and heavy balls. (The heavy ball should be at least five times
        heavier than the light ball.) Then try dropping each ball from a height of at least 2.5 meters.</p>
        '''
      steps:     [
        "/shared/gravity/page/2/step/1"
        "/shared/gravity/page/2/step/2"        
      ]
      firstStep: "/shared/gravity/page/2/step/1"
    }
    
    {
      name:      "Set Up the Experiment"
      url:       "/shared/gravity/page/3"
      activity:  "/shared/gravity"
      index:     3
      introText: 
        '''
        <h1>Set Up the Experiment</h1>

        <p>Let's test out your predictions.</p>

        <p>Attach the motion sensor to the ceiling or other support so that it is between 2 and 5 meters above the
        ground.</p>
        '''
      steps:     [
        "/shared/gravity/page/3/step/1"      
      ]
      firstStep: "/shared/gravity/page/3/step/1"
    }
    
    {
      name:      "Collect Data (Light Ball)"
      url:       "/shared/gravity/page/4"
      activity:  "/shared/gravity"
      index:     4
      introText: 
        '''
          <h1>Collect Data (Light Ball)</h1>
        '''
      steps:     [
        "/shared/gravity/page/4/step/1"      
      ]
      firstStep: "/shared/gravity/page/4/step/1"
    }
    
    {
      name:      "Reflect on Predictions (Light Ball)"
      url:       "/shared/gravity/page/5"
      activity:  "/shared/gravity"
      index:     5
      introText: 
        '''
        <h1>Reflect on Predictions (Light Ball)</h1>

        <p>To the right is your predicted (red) and actual (blue) position-time and velocity-time data for the light
        ball.</p>
        '''
      steps:     [
        "/shared/gravity/page/5/step/1"      
      ]
      firstStep: "/shared/gravity/page/5/step/1"
    }
    
    {
      name:      "Predict the Graphs (Heavy Ball)"
      url:       "/shared/gravity/page/6"
      activity:  "/shared/gravity"
      index:     6
      introText: 
        '''
        <h1>Predict the Graphs (Heavy Ball)</h1>
        '''
      steps:     [
        "/shared/gravity/page/6/step/1"
      ]
      firstStep: "/shared/gravity/page/6/step/1"
    }
    
    {
      name:      "Collect Data (Heavy Ball)"
      url:       "/shared/gravity/page/7"
      activity:  "/shared/gravity"
      index:     7
      introText: 
        '''
        <h1>Collect Data (Heavy Ball)</h1>
        '''
      steps:     [
        "/shared/gravity/page/7/step/1"
      ]
      firstStep: "/shared/gravity/page/7/step/1"
    }
    
    {
      name:      "Reflect on Prediction (Heavy Ball)"
      url:       "/shared/gravity/page/8"
      activity:  "/shared/gravity"
      index:     8
      introText: 
        '''
        <h1>Reflect on Prediction (Heavy Ball)</h1>
        
        <p>To the right is your predicted (red) and actual (blue) position-time and velocity-time data for the heavy
        ball.</p>
        '''
      steps:     [
        "/shared/gravity/page/8/step/1"
      ]
      firstStep: "/shared/gravity/page/8/step/1"
    }
    
    {
      name:      "Compare the Data I"
      url:       "/shared/gravity/page/9"
      activity:  "/shared/gravity"
      index:     9
      introText: 
        '''
        <h1>Compare the Data I</h1>

        <p>Here is the actual data you just collected for the light ball and the heavy ball.</p>
        '''
      steps:     [
        "/shared/gravity/page/9/step/1"
        "/shared/gravity/page/9/step/2"        
      ]
      firstStep: "/shared/gravity/page/9/step/1"
    }
    
    {
      name:      "Compare the Accelerations"
      url:       "/shared/gravity/page/12"
      activity:  "/shared/gravity"
      index:     12
      introText: 
        '''
        <h1>Compare the Accelerations</h1>

        <p>The slope of a velocity-time graph is commonly called the acceleration. The acceleration of an object due to
        gravity is a constant, called <i>g</i>. The accepted value of <i>g</i> for objects near the surface of the
        Earth is 9.8 m/s<sup>2</sup>.<p>
        
        <p>Here is the value of <i>g</i> that you found for the light ball: ... m/s<sup>2</sup></p>
        
        <p>Here is the value of <i>g</i> that you found for the heavy ball: ... m/s<sup>2</sup></p>
        '''
        
      steps:     [
        "/shared/gravity/page/12/step/1"
        "/shared/gravity/page/12/step/2"        
      ]
      firstStep: "/shared/gravity/page/12/step/1"
    }
    
    {
      name:      "Conclusion"
      url:       "/shared/gravity/page/13"
      activity:  "/shared/gravity"
      index:     13
      introText: 
        '''
        <h1>Conclusion</h1>
        
        <p>Do heavier objects fall faster?</p>
        
        <p>In this activity, you predicted and tested whether a light ball would fall faster than a heavier ball, just
        as Galileo likely did.</p>
        
        <p>According to legend, Galileo observed that the two balls fell at the same rate. He explained that this
        phenomenon was due to the effects of gravity acting on the two balls in a similar way.</p>
        '''
      steps:     [
        "/shared/gravity/page/13/step/1"
        "/shared/gravity/page/13/step/2"        
      ]
      firstStep: "/shared/gravity/page/13/step/1"
    }
  ]

  steps: [
    {
      url:          "/shared/gravity/page/1/step/1"
      activityPage: "/shared/gravity/page/1"
      
      beforeText: 
        '''
        <p>Do heavier objects fall at the same rate as lighter objects?</p>

        <p>What do you think Galileo observed? Explain your reasoning.<p>
        '''
      paneConfig: "single"
      panes: 
        single:
          type:    "image"
          # source:   http://www.flickr.com/photos/virgomerry/315412804/
          # also see: http://www.flickr.com/photos/virgomerry/315412603/
          path:    "/static/smartgraphs/en/current/resources/images/leaning-tower-of-pisa-wide.jpg"
          caption: "Creative Commons BY-NC-SA 2.0 photo courtesy flickr user **Mary**<a href=\"http://www.flickr.com/photos/virgomerry/315412804/\">link</a>"

      responseTemplate: "/components/response-template/open"
      submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]]
      isFinalStep: true
      nextButtonShouldSubmit: true
    }
    
    {
      url:          "/shared/gravity/page/2/step/1"
      activityPage: "/shared/gravity/page/2"
      
      beforeText: 
        '''
        <p>To the right, predict what you think the position-time graph and velocity-time graph for the light ball will
        look like.</p>
        '''
      paneConfig: "split"
      panes:
        top:
          type:        "graph"
          title:       "Position vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/position"
          data:        []
          annotations: ["light-ball-position"]

        bottom:
          type:        "graph"
          title:       "Velocity vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        []
          annotations: ["light-ball-velocity"]

      tools: [
        {
          name: "prediction"
          setup:
            pane:           "top"
            annotationName: "light-ball-position"
        }

        {
          name: "prediction"
          setup:
            pane:           "bottom"
            annotationName: "light-ball-velocity"
        }
      ]

      submitButtonTitle: "OK"
      defaultBranch: "/shared/gravity/page/2/step/2"
    }
    
    
    {
      url:          "/shared/gravity/page/2/step/2"
      activityPage: "/shared/gravity/page/2"
      
      beforeText: 
        '''
        <p>Explain any points of interest on the graphs.</p>
        '''
      paneConfig: "split"
      panes:
        top:
          type:        "graph"
          title:       "Position vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/position"
          data:        []
          annotations: ["light-ball-position"]

        bottom:
          type:        "graph"
          title:       "Velocity vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        []
          annotations: ["light-ball-velocity"]
      
      responseTemplate: "/components/response-template/open"
      submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]]   
      isFinalStep: true
      nextButtonShouldSubmit: true
    }
    
    
    {
      url:          "/shared/gravity/page/3/step/1"
      activityPage: "/shared/gravity/page/3"
      
      beforeText:
        '''
        <p>Take note of some relevant measurements. What is the height in meters of the motion sensor's location? What
        is the mass of the light ball in grams?</p>
        '''
      paneConfig: "single"
      shouldFinishImmediately: true
      isFinalStep: true
      nextButtonShouldSubmit: true
    }
    
    
    {
      url:          "/shared/gravity/page/4/step/1"
      activityPage: "/shared/gravity/page/4"

      beforeText: 
        '''
        <p>Have one student place the light ball 10 cm below the motion sensor.</p>
        
        <p>The motion sensor will measure the distance of the ball as it falls away from the sensor. In this case,
        down is the positive direction.</p>
        
        <p>Have another student click Start</p>
        
        <p>Let the sensor run for 3 seconds and release the ball. Click Stop after the ball hits the ground.</p>
        
        <p>You may want to repeat this a few times before you decide to keep the data for this trial. Click Reset
        whenever you want to clear the graph and try again.</p>
        '''

      paneConfig:   "split"
      panes:
        top:
          type:        "graph"
          title:       "Position vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/position"
          data:        ["light-ball-position"]
          annotations: []

        bottom:
          type:        "graph"
          title:       "Velocity vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["light-ball-velocity"]
          annotations: []

      tools: [
        name: "sensor"
        setup:
          data:         "light-ball-position"
          controlsPane: "top"
      ]

      hideSubmitButton: true
      isFinalStep: true
      nextButtonShouldSubmit: true
    }
    
    
    {
      url:          "/shared/gravity/page/5/step/1"
      activityPage: "/shared/gravity/page/5"

      beforeText: 
        '''
        <p>How does your collected data for the light ball differ from your predicted data?</p>
        '''

      paneConfig:   "split"
      panes:
        top:
          type:        "graph"
          title:       "Position vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/position"
          data:        ["light-ball-position"]
          annotations: ["light-ball-position"]

        bottom:
          type:        "graph"
          title:       "Velocity vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["light-ball-velocity"]
          annotations: ["light-ball-velocity"]
      
      responseTemplate: "/components/response-template/open"
      submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]]      
      isFinalStep: true
      nextButtonShouldSubmit: true
    }
    

    {
      url:          "/shared/gravity/page/6/step/1"
      activityPage: "/shared/gravity/page/6"

      beforeText: 
        '''
        <p>To the right, predict what you think the position-time graph and velocity-time graph for the heavy ball will
        look like when you drop it from the same height.</p>
        '''

      paneConfig:   "split"
      panes:
        top:
          type:        "graph"
          title:       "Position vs. Time (Heavy Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/position"
          data:        []
          annotations: ["heavy-ball-position"]

        bottom:
          type:        "graph"
          title:       "Velocity vs. Time (Heavy Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        []
          annotations: ["heavy-ball-velocity"]

      tools: [
        {
          name: "prediction"
          setup:
            pane:           "top"
            annotationName: "heavy-ball-position"
        }

        {
          name: "prediction"
          setup:
            pane:           "bottom"
            annotationName: "heavy-ball-velocity"
        }
      ]
            
      isFinalStep: true
      nextButtonShouldSubmit: true
    }
    
    {
      url:          "/shared/gravity/page/7/step/1"
      activityPage: "/shared/gravity/page/7"

      beforeText: 
        '''
        <p>Have one student place the heavy ball 10 cm below the motion sensor. Have another student click Start.</p>

        <p>Let the sensor run for 3 seconds and release the ball. Then click Stop.</p>
        
        <p>You may want to repeat this a few times before you decide to keep the data for this trial. Click Reset
        whenever you want to clear the graph and try again.</p>
        '''

      paneConfig:   "split"
      panes:
        top:
          type:        "graph"
          title:       "Position vs. Time (Heavy Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/position"
          data:        ["heavy-ball-position"]
          annotations: []

        bottom:
          type:        "graph"
          title:       "Velocity vs. Time (Heavy Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["heavy-ball-velocity"]
          annotations: []

      tools: [
        name: "sensor"
        setup:
          data:         "heavy-ball-position"
          controlsPane: "top"
      ]

      hideSubmitButton: true
      isFinalStep: true
      nextButtonShouldSubmit: true
    }
    
    
    {
      url:          "/shared/gravity/page/8/step/1"
      activityPage: "/shared/gravity/page/8"
      
      beforeText: 
        '''
        <p>What happened to the ball's velocity as it approached the ground? Is this what you expected?</p>
        '''
      paneConfig: "split"
      panes:
        top:
          type:        "graph"
          title:       "Position vs. Time (Heavy Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/position"
          data:        ["heavy-ball-position"]
          annotations: ["heavy-ball-position"]

        bottom:
          type:        "graph"
          title:       "Velocity vs. Time (Heavy Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["heavy-ball-velocity"]
          annotations: ["heavy-ball-velocity"]
        
      responseTemplate: "/components/response-template/open"
      submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]]   
      isFinalStep: true
      nextButtonShouldSubmit: true
    }
    
    
    {
      url:          "/shared/gravity/page/9/step/1"
      activityPage: "/shared/gravity/page/9"
      
      beforeText: 
        '''
        <p>How does the velocity-time graph of the light ball compare to the velocity-time graph of the heavy ball?</p>
        '''
      
      paneConfig: "split"
      panes:
        top:
          type:        "graph"
          title:       "Actual Velocity vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["light-ball-velocity"]
          annotations: []

        bottom:
          type:        "graph"
          title:       "Actual Velocity vs. Time (Heavy Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["heavy-ball-velocity"]
          annotations: []
          
      responseTemplate: "/components/response-template/open"
      submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]]   
      submitButtonTitle: "OK"
      defaultBranch: "/shared/gravity/page/9/step/2"
    }
    
    
    {
      url:          "/shared/gravity/page/9/step/2"
      activityPage: "/shared/gravity/page/9"
      
      beforeText: 
        '''
        <p>On each graph, label what happened to the ball’s velocity as it approached the ground.</p>
        <p>Make sure to label where the ball’s velocity <i>increased</i>, <i>decreased</i>, or <i>stayed the same</i>.
        Additionally. make sure to label where the velocity might have been <i>fastest</i>, <i>slowest</i>, or
        <i>constant</i>.</p>
        '''
      paneConfig: "split"
      panes:
        top:
          type:        "graph"
          title:       "Actual Velocity vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["light-ball-velocity"]
          annotations: []

        bottom:
          type:        "graph"
          title:       "Actual Velocity vs. Time (Heavy Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["heavy-ball-velocity"]
          annotations: []

      tools: [
        {
          name: "label"
          setup:
            pane: "top"
            labelSetName: "light-ball-labels"
        }
        
        { 
          name: "label"
          setup:
            pane: "bottom"
            labelSetName: "heavy-ball-labels"
        }
      ]
      
      isFinalStep: true
      nextButtonShouldSubmit: true
    }
    
    {
      url:          "/shared/gravity/page/12/step/1"
      activityPage: "/shared/gravity/page/12"
      
      beforeText: 
        '''
        <p>How does your value compare with the accepted value?</p>
        '''
      paneConfig: "split"
      panes:
        top:
          type:        "graph"
          title:       "Actual Velocity vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["light-ball-velocity"]
          annotations: []

        bottom:
          type:        "graph"
          title:       "Actual Velocity vs. Time (Heavy Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["heavy-ball-velocity"]
          annotations: []
          
      responseTemplate: "/components/response-template/open"
      submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]]   
      submitButtonTitle: "OK"
      defaultBranch: "/shared/gravity/page/12/step/2"
    }
    
    
    {
      url:          "/shared/gravity/page/12/step/2"
      activityPage: "/shared/gravity/page/12"
      
      beforeText: 
        '''
        <p>What factors might have caused errors in your measurements?</p>
        '''
      paneConfig: "split"
      panes:
        top:
          type:        "graph"
          title:       "Actual Velocity vs. Time (Light Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["light-ball-velocity"]
          annotations: []

        bottom:
          type:        "graph"
          title:       "Actual Velocity vs. Time (Heavy Ball)"
          xAxis:       "/shared/gravity/axes/time"
          yAxis:       "/shared/gravity/axes/velocity"
          data:        ["heavy-ball-velocity"]
          annotations: []
      
      responseTemplate: "/components/response-template/open"
      submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]]      
      isFinalStep: true
      nextButtonShouldSubmit: true
    }
    
    {
      url:          "/shared/gravity/page/13/step/1"
      activityPage: "/shared/gravity/page/13"
      
      beforeText: 
        '''
        <p>What did you discover about the velocity of a light ball versus a heavy ball as each falls to the ground?</p>
        '''
      paneConfig: "single"
      panes: 
        single:
          type:    "image"
          # source:   http://www.flickr.com/photos/virgomerry/315412804/
          path:    "/static/smartgraphs/en/current/resources/images/leaning-tower-of-pisa-wide.jpg"
          caption: "Creative Commons BY-NC-SA 2.0 photo courtesy flickr user **Mary**<a href=\"http://www.flickr.com/photos/virgomerry/315412804/\">link</a>"
          
      responseTemplate: "/components/response-template/open"
      submissibilityCriterion: ["textLengthIsAtLeast", 1, ["responseField", 1]]
      submitButtonTitle: "OK"
      defaultBranch: "/shared/gravity/page/13/step/2"
    }
    
    {
      url:          "/shared/gravity/page/13/step/2"
      activityPage: "/shared/gravity/page/13"
      
      beforeText: 
        '''
        <p>This is the conclusion of the activity</p>
        '''
      paneConfig: "single"
      panes: 
        single:
          type:    "image"
          # source:   http://www.flickr.com/photos/virgomerry/315412804/
          path:    "/static/smartgraphs/en/current/resources/images/leaning-tower-of-pisa-wide.jpg"
          caption: "Creative Commons BY-NC-SA 2.0 photo courtesy flickr user **Mary**<a href=\"http://www.flickr.com/photos/virgomerry/315412804/\">link</a>"

      isFinalStep: true
      hideSubmitButton: true
    }
        
  ]

  axes: [
    {
      url:    "/shared/gravity/axes/time"
      units:  "/builtins/units/seconds"
      min:    0
      max:    5
      nSteps: 5
      label:  "Time"
    }
    {
      url:    "/shared/gravity/axes/position"
      units:  "/builtins/units/meters"
      min:    0
      max:    4
      nSteps: 4
      label:  "Position"
    }
    {
      url:    "/shared/gravity/axes/velocity"
      units:  "/builtins/units/meters-per-second"
      min:    -2
      max:    10
      nSteps: 12
      label:  "Velocity"
    }
  ]

  datadefs: [
    {
      type: "UnorderedDataPoints"
      records: [
        {
          url:         "/shared/gravity/datadefs/light-ball-position"
          name:        "light-ball-position"
          activity:    "/shared/gravity"
          xUnits:      "/builtins/units/seconds"
          xLabel:      "Time"
          xShortLabel: "Time"
          yUnits:      "/builtins/units/meters"
          yLabel:      "Position"
          yShortLabel: "Position"
          points:      []
        }
        
        {
          url:         "/shared/gravity/datadefs/heavy-ball-position"
          name:        "heavy-ball-position"
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
          url:          "/shared/gravity/datadefs/light-ball-velocity"
          name:         "light-ball-velocity"
          activity:     "/shared/gravity"
          xUnits:       "/builtins/units/seconds"
          xLabel:       "Time"
          xShortLabel:  "Time"
          yUnits:       "/builtins/units/meters-per-second"
          yLabel:       "Velocity"
          yShortLabel:  "Velocity"
          source:       "/shared/gravity/datadefs/light-ball-position"
          windowLength: 4
        }
        
        {
          url:          "/shared/gravity/datadefs/heavy-ball-velocity"
          name:         "heavy-ball-velocity"
          activity:     "/shared/gravity"
          xUnits:       "/builtins/units/seconds"
          xLabel:       "Time"
          xShortLabel:  "Time"
          yUnits:       "/builtins/units/meters-per-second"
          yLabel:       "Velocity"
          yShortLabel:  "Velocity"
          source:       "/shared/gravity/datadefs/heavy-ball-position"
          windowLength: 4
        }
      ]
    }
  ]

  responseTemplates: [
    {
      url:              "/components/response-template/open"
      templateString:   ""
      fieldTypes:       ["textarea"]
      fieldChoicesList: [null]
      initialValues:    [""]
    }
  ]

  annotations:       [
    {
      type: "FreehandSketch"
      records: [
        {
          url:      "/shared/gravity/annotation/light-ball-position",
          name:     "light-ball-position",
          activity: "/shared/gravity",
          color:    "#FF00FF",
          points:   []
        }
        
        {
          url:      "/shared/gravity/annotation/light-ball-velocity",
          name:     "light-ball-velocity",
          activity: "/shared/gravity",
          color:    "#FF00FF",
          points:   []
        }
        
        {
          url:      "/shared/gravity/annotation/heavy-ball-position",
          name:     "heavy-ball-position",
          activity: "/shared/gravity",
          color:    "#FF00FF",
          points:   []
        }
        
        {
          url:      "/shared/gravity/annotation/heavy-ball-velocity",
          name:     "heavy-ball-velocity",
          activity: "/shared/gravity",
          color:    "#FF00FF",
          points:   []
        }
      ]
    }
    
    {
      type: "LabelSet",
      records: [
        {
          url:      "/shared/gravity/annotation/light-ball-labels",
          name:     "light-ball-labels",
          activity: "/shared/gravity"
        }
        
        {
          url:      "/shared/gravity/annotation/heavy-ball-labels",
          name:     "heavy-ball-labels",
          activity: "/shared/gravity"
        }
      ]
    }
  ]
  
  tags:      []
  variables: []
  units:     []

