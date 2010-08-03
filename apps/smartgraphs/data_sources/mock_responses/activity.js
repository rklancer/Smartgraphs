// ==========================================================================
// Project:   Smartgraphs.Activity mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

Smartgraphs.mockResponses['/backend/activity/1/motion-without-words/'] = { 
  url: 
    '/backend/activity/1/motion-without-words/', 
  title: 
    'Motion Without Words',
  pages: [
    '/backend/activity/1/page/1/', 
    '/backend/activity/1/page/2/', 
    '/backend/activity/1/page/3/',
    '/backend/activity/1/page/4/'
  ]
};