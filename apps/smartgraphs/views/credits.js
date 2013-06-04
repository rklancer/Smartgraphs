/*globals Smartgraphs */
Smartgraphs.CreditsPane = SC.View.extend({
  classNames:   "creditsBox".w(),

  projectInfo:  "This software is based upon work supported by the "+
                "National Science Foundation under Grant No. DRL-0918522. "+
                "Any opinions, findings, conclusions, or recommendations "+
                "expressed in this material are those of the author(s) "+
                "and do not necessarily reflect the views of the National "+
                "Science Foundation. The software is copyrighted by "+
                "the <a target='_blank' href='http://www.concord.org/software-license' "+
                "title='The Concord Consortium Software License'>"+
                "Concord Consortium under the GNU Lesser General Public License</a>, "+
                "which allows you to use and to distribute this software. ",
    
    authorName: "The SmartGraphs team at the Concord Consortium. ",

  licenseInfo: "The activity is available under the Creative Commons "+
                "<a target='_blank' href='http://creativecommons.org/licenses/by-sa/3.0/' title='Creative Commons Attribution-ShareAlike 3.0 Unported License'>"+
                "Attribution-Share Alike 3.0 Unported license</a>, "+
                "which allows you to use and to distribute this activity.",

  render: function(context, firstTime) {
    context.push(
      "<div id='credits-container'>",
        "<h2>SmartGraphs is a project of The Concord Consortium</h2>",
        "<div id='credits-logos'>",
        "  <img id='credits-sg-logo' src='", sc_static('smartgraphs.png'), "' alt='SmartGraphs' title='SmartGraphs' />",
        "  <img id='credits-cc-logo' src='", sc_static('concord.png'), "'alt='The Concord Consortium' title='The Concord Consortium' />",
        "</div>",
        "<p id='credits-projectInfo'>",
          this.get('projectInfo'),
        "</p>",
        "<hr />",
        "<h2>This SmartGraphs activity was developed by:</h2>",
        "<p id='credits-authorName'>",
          this.get('authorName'),
        "</p>",
        "<p id='credits-licenseInfo'>",
          this.get('licenseInfo'),
        "</p>",
      "</div>"
    );
    sc_super();  // render child views &etc.
  }
});

Smartgraphs.CreditsPane.show  = function(aboutText) {
  var designHash, ret, show, authorName;
  
  designHash = {
    layout      : { right: 0, left: 0, top:0, bottom: 0},
    childViews  : 'closeButton'.w(),
    closeButton : SC.ButtonView.design({
        layout    : { centerX: 0, bottom: 5, height: 24, width: 80 },
        title     : 'close',
        isVisible : YES,
        isEnabled : YES,
        action    : function () { ret.remove(); }
      })
  };

  if (aboutText) {
    designHash['licenseInfo'] = aboutText;
  }

  
  authorName = Smartgraphs.activityController.get('authorName');
  if (authorName) {
    designHash['authorName'] = authorName;
  }
  ret = SC.PanelPane.create({
    layout: { centerX:0, centerY: 0, height: 450, width: 580},
    contentView: Smartgraphs.CreditsPane.design(designHash)
  });

  show = ret.append() ; // make visible.
  return show ;
};
