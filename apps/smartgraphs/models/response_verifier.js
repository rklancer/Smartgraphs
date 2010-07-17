// ==========================================================================
// Project:   Smartgraphs.ResponseVerifier
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.ResponseVerifier = SC.Record.extend(
/** @scope Smartgraphs.ResponseVerifier.prototype */ {

  // e.g., what kind of response verifier we want
  verifierDelegateName: SC.Record.attr(String),

  // the verifier delegate will interpret this string as appropriate.
  configString: SC.Record.attr(String)
}) ;
