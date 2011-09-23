defineJasmineHelpers()

describe "Data flow from UnorderedDataPoints record to GraphableObjects", ->
  
  udpRecord = store = null
  
  beforeEach ->
    store     = SC.Store.create().from(SC.FixturesDataSource.create())
    udpRecord = store.createRecord(Smartgraphs.UnorderedDataPoints,
      url:    "udp-record"
    )
    # not used because Jasmine's toContain works just fine here -- 'expect([[1,2],[3,4]).toContain [1,2]' passes

    @addMatchers(
      toContainPair: (p) -> return true for a in @actual 
      toEqualPairs:  (ps) ->
        return false if not @actual? or ps.length != @actual.length
        i = 0
        for a in @actual
          p = ps[i++]
          return false if a[0] != p[0] or a[1] != p[1]
        true
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
      
      sourcePoints = [[0,1],[2,3]]
      
      beforeEach ->
        udpRecord.set('points', sourcePoints)
        
      describe "the line's points array", ->
        points = null
        beforeEach ->
          points = line.get('points')
          
        it "should have the two pairs [0,1] and [2,3] in its points array", ->
          expect(points).toContain [0,1]
          expect(points).toContain [2,3]
          expect(points.length).toEqual 2
  
        describe "a representative point taken from the line's points array", ->
          
          point = null
          beforeEach ->
            point = points[0]
            
          it "should not be the same object as any member of the source points array", ->
            expect(point).not.toBe sourcePoints[0]
            expect(point).not.toBe sourcePoints[1]
        
      describe "and a point (4,5) is added to the UnorderedDataPoints record's 'points' array via the addPoint method", ->
      
        beforeEach ->
          udpRecord.addPoint(4,5)
        
        describe "the line's points array", ->
          points = null
          beforeEach ->
            points = line.get('points')
        
          it "should have the three pairs [0,1], [2,3], and [4,5] (in order)", ->
            expect(points).toEqualPairs [[0,1], [2,3], [4,5]]
      
      