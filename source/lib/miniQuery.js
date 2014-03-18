/*!
 * minQuery
 */

var SweetSelector = (function(){

  var _IdSelector = function(id){
    return document.getElementById(id);
  };

  var _ClassSelector = function(klass){
    return document.getElementsByClassName(klass);
  }

  var _TagSelector = function(tag){
    return document.getElementsByTagName(tag);
  }

  var _CheckSelectType = function(selection){
    if (selection.charAt(0) === ".") {
      return _ClassSelector(selection.substr(1));
    } else if (selection.charAt(0) === "#") {
      return _IdSelector(selection.substr(1));
    } else {
      return _TagSelector(selection);
    }
  }

  return {
    select: function(selection){
      return _CheckSelectType(selection);
    }
  }

}())