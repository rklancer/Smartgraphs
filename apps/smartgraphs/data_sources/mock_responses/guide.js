// ==========================================================================
// Project:   Smartgraphs.Guide mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

Smartgraphs.mockResponses['/backend/guide/1/motion-without-words/'] = { 
  url: 
    '/backend/guide/1/motion-without-words/', 
  title: 
    'First Learner Guide',
  pages: [
    '/backend/guide/1/page/1/', 
    '/backend/guide/1/page/2/', 
    '/backend/guide/1/page/3/'
  ]
};