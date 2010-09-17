// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/response_template');

Smartgraphs.ResponseTemplate.FIXTURES = [

{
    url: '/backend/response-template/1/numeric',
    templateString: '',
    fieldTypes: ['numeric'],
    fieldChoiceLists: [null],
    initialValues: ['']
},

{
    url: '/backend/response-template/2/open',
    templateString: '',
    fieldTypes: ['textarea'],
    fieldChoiceLists: [null],
    initialValues: ['']
},

{
    url: '/backend/response-template/3/multiplechoice',
    templateString: '',
    fieldTypes: ['multiplechoice'],
    prompt: 'Choose <b>one</b>.',
    fieldChoiceLists: [[
        "The walker was 4 meters away, getting ready to walk toward the sensor.",
         "The walker was closest to the motion sensor, getting ready to walk away from the sensor.",
         "The walker was 2 meters away from the motion sensor, getting ready to walk toward the sensor.",
         "The walker was 2 meters away from the motion sensor, getting ready to walk away from the sensor."
     ]],
    initialValues: [""]
}];
