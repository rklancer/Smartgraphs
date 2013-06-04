defineJasmineHelpers()
describe "Smartgraphs.Point", ->
  point = Smartgraphs.Point.create({ x: 3.2, y: 2 })

  it "should be defined", ->
    expect(point).toBeDefined()

  it "should be able to return values with two decimal places", ->
    expect(point.xFixed()).toEqual('3.20')
    expect(point.yFixed()).toEqual('2.00')