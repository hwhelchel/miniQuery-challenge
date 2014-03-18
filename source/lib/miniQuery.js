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

var DOM = (function(S){

  var _initialDisplayProperty = {};

  var _hide = function(selected, selection){
    if (selected.length) {
      _initialDisplayProperty[selection] = []
      for (i=0; i < selected.length; i++) {
        _initialDisplayProperty[selection].push(selected[i].style.display);
        selected[i].style.display = 'none';
      }
    } else {
      _initialDisplayProperty[selection] = selected.style.display;
      selected.style.display = 'none';
    }
  }

  var _show = function(selected, selection){
    if (selected.length){
      for (i=0; i < selected.length; i++) {
        selected[i].style.display = _initialDisplayProperty[selection][i];
      }
    } else {
      selected.style.display = _initialDisplayProperty[selection];
    }
  }

  var _addClass = function(selected, klass){
    if (selected.length){
      for(i=0; i < selected.length; i++){
        selected[i].className += (" " + klass);
      }
    } else {
      selected.className += (" " + klass);
    }
  }

  var _removeClass = function(selected, klass){
    if (selected.length){
      for(i=0; i < selected.length; i++){
        selected[i].className = selected[i].className.replace(klass,"");
      }
    } else {
      selected.className = selected.className.replace(klass,"");
    }
  }

  return {
    hide: function(selection){
      _hide(S.select(selection), selection);
    },
    show: function(selection){
      _show(S.select(selection), selection);
    },
    addClass: function(selection, klass){
      _addClass(S.select(selection), klass);
    },
    removeClass: function(selection, klass){
      _removeClass(S.select(selection), klass);
    }
  }

}(SweetSelector))