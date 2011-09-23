defineJasmineHelpers()

describe "Data flow from UnorderedDataPoints record to GraphableObjects", ->
  
  udpRecord = store = null
  
  beforeEach ->
    console.log "making a new store and a new udpRecord"
    store     = SC.Store.create().from(SC.FixturesDataSource.create())
    udpRecord = store.createRecord(Smartgraphs.UnorderedDataPoints,
      url:    "udp-record",
      points: []
    )

    do =>
      toMatchUsing = (matcher) ->
        (pairs) ->
          return false if @actual?.length isnt pairs.length or typeof @actual isnt 'object'
          return false for a, i in @actual when not matcher( a, pairs[i] )
          true

      @addMatchers(
        toEqualPairs:           toMatchUsing (a, [x, y]) -> a[0]       is x and a[1]       is y
        toEqualPointsDefinedBy: toMatchUsing (a, [x, y]) -> a.get('x') is x and a.get('y') is y
      )
    
  describe "when the source UnorderedDataPoint's 'points' array is empty", ->
    
    dataRepresentation = line = pointset = null
    
    beforeEach ->
      dataRepresentation = udpRecord.getNewRepresentation("line-type": "connected")
      line               = dataRepresentation.get('line')
      pointset           = dataRepresentation.get('pointset')
      
    it "should be a dataRepresentation", ->
      expect( dataRepresentation ).toBeA Smartgraphs.DataRepresentation
      
    describe "the line", ->
      it "should have no points", ->
        expect( line.get('points') ).toBeEmpty()
        
    describe "the pointset", ->
      it "should have no points", ->
        expect( pointset.get('points') ).toBeEmpty()
        
    describe "and the source UnorderedDataPoints record's 'points' array is then populated with [0,1] and [2,3]", ->
      sourcePoints = null
      beforeEach ->
        sourcePoints = [[0,1], [2,3]]
        udpRecord.set('points', sourcePoints)
        
      describe "the line's points array", ->
        points = null
        beforeEach ->
          points = line.get('points')
          
        it "should have the two pairs [0,1] and [2,3]", ->
          expect(points).toContain [0,1]
          expect(points).toContain [2,3]
          expect(points.length).toEqual 2
  
        describe "a representative point", ->
          point = null
          beforeEach ->
            point = points[0]
            
          it "should not be the same object as any member of the source points array", ->
            expect(point).not.toBe sourcePoints[0]
            expect(point).not.toBe sourcePoints[1]
      
      describe "the poinset's points array", ->
        points = null
        beforeEach ->
          points = pointset.get('points')
          
        it "should have the Smartgraph.Points [0,1] and [2,3]", ->
          expect(points).toEqualPointsDefinedBy [[0,1], [2,3]]
      
      describe "and a point (4,5) is added to the UnorderedDataPoints record's 'points' array via the addPoint method", ->
        beforeEach ->
          console.log "adding point (4,5)"
          udpRecord.addPoint(4,5)
        
        describe "the line's points array", ->            
          points = null
          beforeEach ->
            points = line.get('points')
                
          it "should have exactly the three pairs [0,1], [2,3], and [4,5] (in that order)", ->
            console.log "testing line's points array"
            expect(points).toEqualPairs [[0,1], [2,3], [4,5]]
        
        describe "the pointset's points array", ->
          points = null
          beforeEach ->
            points = pointset.get('points')
            
          it "should have exactly the Smartgraph.Points [0,1], [2,3], and [4,5] (in that order)", ->
            console.log "testing pointset's points array"
            expect(points).toEqualPointsDefinedBy [[0,1], [2,3], [4,5]]
        