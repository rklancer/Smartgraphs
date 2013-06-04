/* Modified slightly from Miles Johnson's snippet at http://www.milesj.me/resources/snippet/13 */

/*globals Smartgraphs */

(function (undefined) {

  /**
   * Transform text into a URL slug: spaces turned into dashes, remove non alnum
   * @param string text
   */
  function slugify (text) {
  	text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
  	text = text.replace(/-/gi, "_");
  	text = text.replace(/\s/gi, "-");
  	return text.toLowerCase();
  }

  Smartgraphs.slugify = slugify;

}());
