
TextLabel = function(graphics,x,y) {
  var _self_ = {
    graphics: graphics,
    name: "test",
    editMode: false,
    fontFamily: "Helvetica",
    fontSize: 12,
    x: x,
    y: y,
    defaultWidth: 100,
    defaultHeight: 30,
    text: "double click to change me.",
    label: graphics.text(x,y,"double click to label me.").attr('font', '12px "Helvetica"').attr('text-anchor','start'),
    backgroundBox: graphics.rect(0,0,0,0),
    editBox: graphics.rect(0,0,0,0),
    // methods //


    setFont: function(family,size) {
      this.fontFamily = family;
      this.fontSize = size;
      this.updateLabel();
    },

    font: function() {
      return '' + this.fontSize + 'px "' + this.fontFamily +'"';
    },

    position: function(x,y) {
      this.x = x;
      this.y = y;
    },

    addChar: function(charst) {
      this.setText(this.text + charst);
    },

    backspace: function() {
      var t = this.text;
      var newText = t.substr(0,t.length-1);
      this.setText(newText);
      // debugger;
    },
    
    enter: function() {
      this.setText(this.text + "\n");
    },

    tab: function() {
      this.stopEditing();
    },

    setText: function(newValue) {
      this.text = newValue;
      this.updateLabel();
      this.notifyTextChange(newValue);
    },

    updateLabel: function() {
      var text = this.text;
      if (this.editMode) {
        text = text + "»";
      }
      this.label.attr({
        font: this.font(),
        text: text,
        x: this.x,
        y: this.y
      });
      this.updateBackroundBox();
      this.updateEditBox();
    },

    makeBox: function() { },

    notifyTextChange: function(newValue) {
      // this.log("text changed: " + newValue);
    },

    log: function(message) {
      console.log(message);
    },

    domObject: function() {
      return $(this.label.node);
    },

    click: function(f) {
      this.domObject().click(f);
    },

    dblclick: function(f) {
      this.domObject().dblclick(f);
    },

    handleMagic: function(evt) {
      evt.preventDefault(); // disable backspace, enter,tab
      var code, actualKey;
      
      code = evt.charCode? evt.charCode : evt.keyCode;
      if (code == 46 || code == 8) {
        this.backspace();
        return true;
      }
      if (code == 13) {
        this.enter();
        return true;
      }
      if (code == 9 || code == 27) {
        this.stopEditing(evt);
        return true;
      }
      return false;
    },

    handleAlpha: function(evt) {
        var code, actualKey;
        code = evt.charCode? evt.charCode : evt.keyCode;
        actualkey=String.fromCharCode(code);
        if (actualkey == "\t") { this.tab();   }
        else if (actualkey == "\n") { this.enter(); }
        else { this.addChar(actualkey); }
    },

    updateBackroundBox: function(evt) {
      var bb = this.label.getBBox();
      this.backgroundBox.show();
      this.backgroundBox.attr({
        x: bb.x - 5 ,
        y: bb.y - 5 ,
        width: bb.width + 10,
        height: bb.height + 10,
        fill: 'none',
        stroke: '#999',
        opacity: 1,
        r: 4
      });
    },
    
    updateEditBox: function(evt) {
      var bb = this.label.getBBox();
      if (this.editMode) {
        this.editBox.show();
        this.editBox.attr({
          x: bb.x - 2 ,
          y: bb.y - 2 ,
          width: bb.width + 4,
          height: bb.height + 4,
          fill: '#C4FFEB',
          stroke: '#D4838F',
          opacity: 0.25,
          r: 0
        });
      }
      else {
        this.editBox.hide();
      }
    },


    startEditing: function(evt) {
      evt.stopPropagation();
      var self = this;
      this.label.attr('fill', '#066');
      $(document).bind('keypress', jQuery.proxy(self.handleAlpha, self));
      $(document).bind('keyup', jQuery.proxy(self.handleMagic, self));
      this.editMode = true;
      this.updateLabel();
      $(document).bind('click', jQuery.proxy(self.stopEditing, self));
      this.domObject.bind('focousout', jQuery.proxy(self.stopEditing, self));
    },

    stopEditing: function(evt) {
      var self = this;
      this.label.attr({
        fill: '#000'
      });
      evt.stopPropagation();
      $(document).unbind('keypress', jQuery.proxy(self.handleAlpha, self));
      $(document).unbind('keyup', jQuery.proxy(self.handleKey, self));;
      this.editMode = false;
      this.updateLabel();
    },

    enableEditing: function(evt) {
      var self = this;
      this.dblclick(jQuery.proxy(self.startEditing, self));
    }

  }

  return _self_;
}
