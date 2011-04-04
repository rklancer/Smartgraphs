/*globals Smartgraphs describe it expect xit xdescribe beforeEach afterEach spyOn runs waits waitsFor clickOn fillIn */

describe("Smartgraphs.GraphController", function () {
  var controller;
  
  beforeEach( function () {
    controller = Smartgraphs.GraphController.create();
  });
  
  
  describe("clear method", function () {

    it("should clear the title", function () {
      controller.set('title', 'a title');
      controller.clear();
      
      expect(controller.get('title')).toBeNull();
    });
    
    it("should clear the axes", function () {
      controller.set('xAxis', 'an x Axis');
      controller.set('yAxis', 'a y Axis');
      controller.clear();
      
      expect(controller.get('xAxis')).toBeNull();
      expect(controller.get('yAxis')).toBeNull();
    });
    
    it("should clear the graphableDataObjects list", function () {
      controller.set('graphableDataObjects', ['a GraphableObject']);
      controller.clear();
      
      expect(controller.get('graphableDataObjects')).toEqual([]);
    });
    
    it("should clear the dataRepresentations list", function () {
      controller.set('dataRepresentations', ['a DataRepresentation']);
      controller.clear();
      
      expect(controller.get('dataRepresentations')).toEqual([]);
    });
    
    it("should call the clearAnnotations method", function () {
      spyOn(controller, 'clearAnnotations');
      controller.clear();

      expect(controller.clearAnnotations).toHaveBeenCalled();
    });
  });    
  
  
  describe("setupGraph method", function () {
    var Datadef;
    
    beforeEach( function () {
      Datadef = SC.Object.extend({
        getNewRepresentation: function () { return "DataRepresentation for: " + this.get('name'); }
      });
      
      spyOn(controller, 'getAxis').andCallFake(function (id) { return "Axis: "+id; });
      spyOn(controller, 'getDatadef').andCallFake(function (name) { return Datadef.create({name: name}); });
      spyOn(controller, 'addDataRepresentation');
      spyOn(Datadef.prototype, 'getNewRepresentation').andCallThrough();      
    });
    
    it("should call the clear method", function () {
      spyOn(controller, 'clear');
      controller.setupGraph({});
      expect(controller.clear).toHaveBeenCalled();
    });
    
    describe("when the config contains title and axis information", function () {
      beforeEach( function () {
        var config = {
          title: 'test title',
          xAxis: 'test x axis id',
          yAxis: 'test y axis id',
          data: []
        };
        controller.setupGraph(config);
      });
      
      it("should set the title property", function () {
        expect(controller.get('title')).toEqual('test title');
      });
    
      it("should set the axis properties", function () {
        expect(controller.get('xAxis')).toEqual('Axis: test x axis id');
        expect(controller.get('yAxis')).toEqual('Axis: test y axis id');
      });
    });
    
    describe("when config.data contains only datadef names", function () {

      beforeEach( function () {
        var config = {
          data: ['test datadef 1', 'test datadef 2']
        };
        controller.setupGraph(config);
      });
      
      it("should add a DataRepresentation for each Datadef named in config.data", function () {
        expect(controller.addDataRepresentation).toHaveBeenCalledWith('DataRepresentation for: test datadef 1');
        expect(controller.addDataRepresentation).toHaveBeenCalledWith('DataRepresentation for: test datadef 2');
      });
    });

    describe("when the config also contains datadef configuration objects", function () {      
      var optionsHash;
      
      beforeEach( function () {      
        optionsHash = { optionKey: "option value" };
        var config = {
          data: [['test datadef with option hash', optionsHash], 'test datadef without option hash']
        };
        controller.setupGraph(config);
      });
      
      it("should add a DataRepresentation for each datadef named in config.data", function () {
        expect(controller.addDataRepresentation).toHaveBeenCalledWith('DataRepresentation for: test datadef with option hash');
        expect(controller.addDataRepresentation).toHaveBeenCalledWith('DataRepresentation for: test datadef without option hash');
      });
      
      it("should pass the config hash to getNewRepresentation for datadefs with a config hash", function () {
        expect(Datadef.prototype.getNewRepresentation.argsForCall[0]).toEqual([optionsHash]);
      });
      
      it("should pass an empty config hash to getNewRepresentation for datadefs without a config hash", function () {
        expect(Datadef.prototype.getNewRepresentation.argsForCall[1]).toEqual([{}]);
      });
    });
  });
  
  
  describe("addDataRepresentation method", function () {
    
    var dataRepresentation, 
        graphableObjects   = ['graphable object 1', 'graphable object 2'],
        xUnits             = SC.Object.create(),
        yUnits             = SC.Object.create(),
        wrongUnits         = SC.Object.create(),
        xAxis,
        yAxis;
        
    beforeEach( function () {
      controller.clear();
      dataRepresentation = SC.Object.create({ graphableObjects: graphableObjects });
    });
    
    describe("when the current graph has units", function () {

      beforeEach(function () {
        xAxis = SC.Object.create({ units: xUnits });
        yAxis = SC.Object.create({ units: yUnits });

        controller.set('xAxis', xAxis);
        controller.set('yAxis', yAxis);
      });

      describe("and the representation has units", function () {

        beforeEach( function () {
          dataRepresentation.set('xUnits', xUnits);
          dataRepresentation.set('yUnits', yUnits);
        });
        
        describe("and the units match", function () {          

          it("should successfully add the representation to the dataRepresentations array", function () {
            controller.addDataRepresentation(dataRepresentation);
            expect(controller.get('dataRepresentations')).toContain(dataRepresentation);
          });
        });
        
        describe("and the units do not match", function () {

          describe("in the x axis", function () {
            
            beforeEach( function () {
              controller.setPath('xAxis.units', wrongUnits);
            });

            it("should throw an error indicating that the units don't match", function () {
              expect(function () { controller.addDataRepresentation(dataRepresentation); }).toThrow();
            });
          });
          
          describe("in the y axis", function () {
            
            beforeEach( function () {
              controller.setPath('yAxis.units', wrongUnits);
            });

            it("should throw an error indicating that the units don't match", function () {
              expect(function () { controller.addDataRepresentation(dataRepresentation); }).toThrow();
            });
          });
        });
      });
      
      describe("and the representation has no units", function () {
        
        it("should throw an error indicating that the units don't match", function () {
          expect(function () { controller.addDataRepresentation(dataRepresentation); }).toThrow();
        });
      });
    });
    

    describe("when the current graph does not have units", function () {

      describe("and the representation does not have units", function () {
        
        it("should add the representation to the dataRepresentations array", function () {
          controller.addDataRepresentation(dataRepresentation);
          expect(controller.get('dataRepresentations')).toContain(dataRepresentation);
        });
      });
      
      describe("and the representation does have units", function () {
        
        describe("in the x axis", function () {
          
          beforeEach( function () {
            dataRepresentation.set('xUnits', xUnits);
          });

          it("should throw an error indicating that the units don't match", function () {
            expect(function () { controller.addDataRepresentation(dataRepresentation); }).toThrow();
          });
        });
      
        describe("in the y axis", function () {

          beforeEach( function () {
            dataRepresentation.set('yUnits', yUnits);
          });
          
          it("should throw an error indicating that the units don't match", function () {
            expect(function () { controller.addDataRepresentation(dataRepresentation); }).toThrow();
          });
        });          
      });
    });
    
    
    describe("whenever the representation can be added to the graph", function () {
      
      beforeEach( function () {
        controller.set('graphableDataObjects', ['prior graphable object']);
        controller.set('dataRepresentations',  ['prior data representation object']);
        spyOn(controller, 'getColorForDataRepresentation');
        
        controller.addDataRepresentation(dataRepresentation);
      });
      
      it("should add the passed data representation to the dataRepresentations list", function () {
        expect(controller.get('dataRepresentations')).toContain(dataRepresentation);
      });

      it("should not overwrite the prior contents of the dataRepresentations list", function () {
        expect(controller.get('dataRepresentations')).toContain('prior data representation object');
      });
      
      it("should add the data representation's graphable objects to the graphableDataObjects list", function () {
        expect(controller.get('graphableDataObjects')).toContain('graphable object 1');
        expect(controller.get('graphableDataObjects')).toContain('graphable object 2');
      });
      
      it("should not overwrite the prior contents of the graphableDataObjects list", function () {
        expect(controller.get('graphableDataObjects')).toContain('prior graphable object');
      });
      
      it("should ask getColorForDataRepresentation for a new color for the data representation", function () {
        expect(controller.getColorForDataRepresentation).toHaveBeenCalledWith(dataRepresentation);
      });
    });
  });

  // this is not especially crucial functionality right now
  xdescribe("getColorForDataset method");
});
