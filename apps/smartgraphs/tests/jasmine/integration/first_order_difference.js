/*globals Smartgraphs RaphaelViews describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor 
 clickOn fillIn defineJasmineHelpers runBeforeEach runAfterEach */

defineJasmineHelpers();

describe("Smartgraphs.FirstOrderDifference calculations", function () {
  
  var unorderedPointsRecord,
      differenceRecord,
      store;
  
  runBeforeEach( function () {
    store = SC.Store.create().from(SC.FixturesDataSource.create());
    
    unorderedPointsRecord = store.createRecord(Smartgraphs.UnorderedDataPoints, { 
      url: 'unordered-points-record',
      points: [[2,3], [0,1]]
    });
    
    differenceRecord = store.createRecord(Smartgraphs.FirstOrderDifference, {
      url: 'difference-record',
      source: 'unordered-points-record'
    });
    
  });
  
  
  describe("the FirstOrderDifference record", function () {

    it("should be a type of UnorderedDataPoints", function () {
      expect(differenceRecord).toBeA(Smartgraphs.UnorderedDataPoints);
    });
  

    describe("its points array", function () {
      
      var unorderedPoints,
          differencePoints;
          
      beforeEach( function () {
        unorderedPoints = unorderedPointsRecord.get('points');
        differencePoints = differenceRecord.get('points');
      });
      
      it("should be 1 item shorter than the points array of the source record", function () {
        expect(differencePoints.get('length')).toEqual(unorderedPoints.get('length') - 1);
      });
        
      it("should reflect successive differences divided by successive distances", function () {
        expect(differencePoints[0]).toEqual([2,1]);
      });
      
      
      describe("when points are pushed into the source record", function () {
      
        beforeEach( function () {
          SC.run( function () { 
            unorderedPoints.pushObject([-2, -1]);
          });
          differencePoints = differenceRecord.get('points');
        });
        
        it("should contain more records", function () {
          expect(differencePoints.get('length')).toEqual(unorderedPoints.get('length') - 1);
        });
        
        it("should reflect the updated values", function () {
          expect(differencePoints[0]).toEqual([0, 1]);
          expect(differencePoints[1]).toEqual([2, 1]);
        });
        
      });
    });
  });   
});