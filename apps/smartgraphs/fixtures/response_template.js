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
    fieldTypes: ['multiplechoice','multiplechoice','numeric','textarea'],
    prompt: 'Choose <b>one</b>.',
    fieldChoiceLists: [["a", "b", "c"],["a2", "b2", "c2"],[],[]],
    initialValues: ['','b2','000','']
}];
