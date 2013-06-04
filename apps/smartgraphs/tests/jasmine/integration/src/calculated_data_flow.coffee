defineJasmineHelpers()
$ -> $('body').css('overflow', 'auto')

describe "Data flow from UnorderedDataPoints record to GraphableObjects", ->

  udpRecord = null

  beforeEach ->
    store     = SC.Store.create().from(SC.FixturesDataSource.create())
    udpRecord = store.createRecord(Smartgraphs.UnorderedDataPoints,
      url:    "udp-record",
      points: []
    )

    do =>
      matchArraysUsing = (matcher) ->
        (pairs) ->
          return false if @actual?.length isnt pairs.length or typeof @actual isnt 'object'
          return false for a, i in @actual when not matcher( a, pairs[i] )
          true

      @addMatchers(
        toEqualPairs:           matchArraysUsing (a, [x, y]) -> a[0]       is x and a[1]       is y
        toEqualPointsDefinedBy: matchArraysUsing (a, [x, y]) -> a.get('x') is x and a.get('y') is y
        toBeTheSameObjectsAs:   matchArraysUsing (a, b) -> a is b
      )

  describe "when the source UnorderedDataPoint's 'points' array is empty", ->
    dataRepresentation = line = pointset = null
    beforeEach ->
      dataRepresentation = udpRecord.getNewRepresentation("line-type": "connected")
      line               = dataRepresentation.get('line')
      pointset           = dataRepresentation.get('pointset')

    describe "the line's points  array", ->
      it "should be empty", ->
        expect( line.get('points') ).toBeEmpty()

    describe "the pointset's poitns array", ->
      it "should be empty", ->
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

        it "should be the pairs [0,1] and [2,3]", ->
          expect(points).toEqualPairs [[0,1], [2,3]]

        it "should be strictly a copy of the objects in the UnorderedDataPoints record's points array", ->
          expect(points).not.toBeTheSameObjectsAs udpRecord.get('points')

        describe "after adding a point (4,5) to the UnorderedDataPoints record", ->
          pointsBeforeAdd = null
          beforeEach ->
            pointsBeforeAdd = (p for p in points)
            udpRecord.addPoint(4, 5)
            points = line.get('points')

          xdescribe "the first two pairs", ->
            it "should be exactly the same objects as before", ->
              expect(points[0..1]).toBeTheSameObjectsAs pointsBeforeAdd

          describe "the new points array", ->
            it "should be the pairs [0,1], [2,3], and [4,5]", ->
              expect(points).toEqualPairs [[0,1], [2,3], [4,5]]

      describe "the pointset's points array", ->
        points = null
        beforeEach ->
          points = pointset.get('points')

        it "should be Smartgraph.Points for [0,1] and [2,3]", ->
          expect(points).toEqualPointsDefinedBy [[0,1], [2,3]]

        describe "after adding a point (4,5) to the UnorderedDataPoints record", ->
          pointsBeforeAdd = null
          beforeEach ->
            pointsBeforeAdd = (p for p in points)
            udpRecord.addPoint(4, 5)
            points = pointset.get('points')

          xdescribe "the first two points", ->
            it "should be exactly the same objects as before", ->
              expect(points[0..1]).toBeTheSameObjectsAs pointsBeforeAdd

          describe "the new points array", ->
            it "should be Smartgraph.Points for [0,1], [2,3], and [4,5]", ->
              expect(points).toEqualPointsDefinedBy [[0,1], [2,3], [4,5]]
