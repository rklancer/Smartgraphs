// ==========================================================================
// Project:		Smartgraphs.ResponseTemplate Fixtures
// Copyright: ©2010 Concord Consortium
// @author		Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/response_template');

Smartgraphs.ResponseTemplate.FIXTURES = [
  
  { url: '/components/response-template/numeric',
  	templateString: '',
  	fieldTypes: ['numeric'],
  	fieldChoicesList: [null],
  	initialValues: ['']
  },

  { url: '/components/response-template/open',
  	templateString: '',
  	fieldTypes: ['textarea'],
  	fieldChoicesList: [null],
  	initialValues: ['']
  },

  { url: '/shared/motion-towards-and-away/response-template/walking-example-1',
  	templateString: '',
  	fieldTypes: ['multiplechoice'],
  	fieldChoicesList: [[
  		'The walker was 4 meters away, getting ready to walk toward the sensor.',
  		'The walker was closest to the motion sensor, getting ready to walk away from the sensor.',
  		'The walker was 4 meters away from the motion sensor and did not move.',
  		'The walker was 4 meters away from the motion sensor, getting ready to walk away from the sensor.'
  	 ]],
  	initialValues: [""]
  },
  
  { url: '/shared/motion-towards-and-away/response-template/two-walkers',
  	templateString: '',
  	fieldTypes: ['multiplechoice'],
  	fieldChoicesList: [[
      "My friend and I stood 2 meters away from the sensor. Together, we walked away from the sensor for 20 seconds.",
      
      "My friend and I stood 2 meters away from the sensor. I walked away from the sensor for 20 seconds "+
      "while my friend walked toward the sensor for 20 seconds.",
      
      "I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
      "from the sensor and walked away from the sensor for 20 seconds.",
      
      "I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
      "from the sensor and walked toward the sensor for 20 seconds."
  	 ]],
  	initialValues: [""]
  }

];
