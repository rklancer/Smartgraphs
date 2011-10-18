// ==========================================================================
// Project:   Smartgraphs.ImageView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Show an image and caption inside a Smartgraph pane. The image will be scaled to completely fill the pane. The aspect
  ratio of the image is preserved, so one dimension may "overflow" while the other one is fitted exactly. The image 
  will be centered in that overflow dimension.

  @extends SC.View
*/
Smartgraphs.ImageView = SC.View.extend(
/** @scope Smartgraphs.ImageView.prototype */ {

  /**
    @property String
    
    URL of the image to show
  */
  imageURL: null,
  imageURLBindingDefault: SC.Binding.oneWay(),
  
  /**
    @property String
    
    Caption text for the image.
  */
  caption: null,
  captionBindingDefault: SC.Binding.oneWay(),
  
  childViews: ['imageView', 'captionView'],

  captionView: SC.LabelView.design({
    escapeHTML: false,
    valueBinding: '.parentView.caption',
    valueBindingDefault: SC.Binding.oneWay(),

    isVisible: function () {
      return !!this.get('value');
    }.property('value'),

    classNames: 'floating-caption',
    layout: { top: 10, left: 10, right: 10, height: 20 }
  }),

  imageView: SC.ImageView.design({
    valueBinding: '.parentView.imageURL',
    valueBindingDefault: SC.Binding.oneWay(),

    useStaticLayout: YES,

    imageDidLoad: function () {
      sc_super();                           // superclass implementation actually needs to run...
      this.invokeLater(this.resizeImage);   // can't call direct or use invokeLast; need to yield js execution first
    },

    viewDidResize: function () {
      this.invokeLater(this.resizeImage);
    },

    resizeImage: function () {
      var $pane = this.getPath('parentView.parentView').$(),
          $pv = this.get('parentView').$(),
          paneHeight = $pane.innerHeight(),
          paneWidth = $pane.innerWidth(),
          imgHeight,
          imgWidth;

      // reset width and height to unscaled dimensions, then read them out. Seems to work without flicker.
      this.$().height('');
      this.$().width('');
      imgHeight = this.$().height();
      imgWidth  = this.$().width();
      
      if (imgHeight / imgWidth > paneHeight / paneWidth) {
        this.$().height('');
        this.$().width('100%');      
        this.$().css('left', '0');
        this.$().css('top', (paneHeight - imgHeight * (paneWidth / imgWidth)) / 2);
      } 
      else {
        this.$().height('100%');
        this.$().width('');
        this.$().css('left', (paneWidth - imgWidth * (paneHeight / imgHeight)) / 2 );
        this.$().css('top', '0');
      }
    }
  })
});
