/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor 
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */
 
defineJasmineHelpers();

describe("Smartgraphs.UnorderedDataPoints representations", function () {
  
  var udpRecord,
      store;
  
  beforeEach( function () {
    store = SC.Store.create().from(SC.FixturesDataSource.create());
    udpRecord = store.createRecord(Smartgraphs.UnorderedDataPoints, { 
      url: 'udp-record',
      points: [[2,3], [0,1]]
    });
  });
  
  it("should be a Datadef", function () {
    expect(udpRecord).toBeA(Smartgraphs.Datadef);
  });
  
  describe("result of getNewRepresentation method with no options", function () {
    
    var dataRepresentation;
    
    beforeEach( function () {
      dataRepresentation = udpRecord.getNewRepresentation();
    });
    
    it("should be a DataRepresentation", function () {
      expect(dataRepresentation).toBeA(Smartgraphs.DataRepresentation);
    });
    
    describe("the dataRepresentations's graphableObjects", function () {
      
      var graphableObjects;
      
      beforeEach( function () {
        graphableObjects = dataRepresentation.get('graphableObjects');
      });
      
      it("should have one element", function () {
        expect(graphableObjects.get('length')).toBe(1);
      });
      
      it("should contain a Pointset", function () {
        expect(graphableObjects.objectAt(0)).toBeA(Smartgraphs.Pointset);
      });
    });
    
    describe("the dataRepresentations's sampleset", function () {
      
      var sampleset;
      
      beforeEach( function () {
        sampleset = dataRepresentation.get('sampleset');
      });
      
      it("should be a TrivialSampleset", function () {
        expect(sampleset).toBeA(Smartgraphs.TrivialSampleset);
      });
      
      describe("its points array", function () {
        
        var points;
        
        beforeEach( function () {
          points = sampleset.get('points');
        });
        
        it("should be ordered differently than the UndorderedDataPoints records' points array", function () {
          expect(points[0]).toEqual(udpRecord.getPath('points.1'));
          expect(points[1]).toEqual(udpRecord.getPath('points.0'));
        });
        
        it("should be sorted by increasing x-value", function () {
          expect(points[0][0]).toBeLessThan(points[1][0]);
        });
        
        it("should consist of copies of the items in the UnorderedDataPoints records' points array", function () {
          expect(points[0]).toEqual(udpRecord.getPath('points.1'));
          expect(points[0]).not.toBe(udpRecord.getPath('points.1'));
        });
      });
    });
    
  });
  
  describe("result of getNewRepresentation with option { 'line-type': 'connected' }", function () {
    var dataRepresentation,
        graphableObjects,
        sampleset;
        
    beforeEach( function () {
      dataRepresentation = udpRecord.getNewRepresentation({ "line-type": "connected" });
      sampleset = dataRepresentation.get('sampleset');
      graphableObjects = dataRepresentation.get('graphableObjects');
    });
    
    describe("the graphable objects", function () {
      
      it("should contain a Pointset", function () {
        expect(graphableObjects).toContainA(Smartgraphs.Pointset);
      });
      
      it("should contain a ConnectedLine", function () {
        expect(graphableObjects).toContainA(Smartgraphs.ConnectedLine);
      });
      
      describe("the connectedLine object", function () {
        
        var connectedLine;
        
        beforeEach( function () {
          connectedLine = dataRepresentation.get('line');
        });
        
        it("should have the same points array as the sampleset", function () {
          expect(connectedLine.getPath('points.0')).toEqual(sampleset.getPath('points.0'));
          expect(connectedLine.getPath('points.1')).toEqual(sampleset.getPath('points.1'));
        });
        
        it("should have the same sampleset as the pointset", function () {
          expect(connectedLine.get('sampleset')).toBe(dataRepresentation.getPath('pointset.sampleset'));
        });
      });
        
    });
  });
  
});