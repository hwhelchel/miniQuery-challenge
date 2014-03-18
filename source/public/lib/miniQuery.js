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


var EventDispatcher = (function(S){

  var _eventHolder = {};

  var _makeEvent = function(selection, eventString, callback){
    _eventHolder[eventString] = new Event(eventString);
    if (selection.length){
      for(i=0; i < selection.length; i++){
        selection[i].addEventListener(eventString, callback);
      }
    } else {
      selection.addEventListener(eventString, callback);
    }
  }

  var _triggerEvent = function(selection, eventString){
    if (selection.length){
      for(i=0; i < selection.length; i++){
        selection[i].dispatchEvent(_eventHolder[eventString]);
      }
    } else {
      selection.dispatchEvent(_eventHolder[eventString]);
    }
  }


  return {
    on: function(elem, event, callback){
      _makeEvent(S.select(elem), event, callback);
    },
    trigger: function(elem, event){
      _triggerEvent(S.select(elem),event);
    }
  }

}(SweetSelector))

// config = {
//   url: '/',
//   type: 'GET',
//   success: function(){
//     console.log('success');
//   },
//   fail: function(){
//     console.log('fail');
//   }
// }

var AjaxWrapper = (function(){

  var _request = function(config){
    var req = new XMLHttpRequest();
    // debugger;
    req.addEventListener("load", config.success);
    req.addEventListener("error", config.fail);
    req.open(config.type, config.url, true);
    req.send();
  }

  return {
    ajax: function(config){
      _request(config);
    }
  }
}())

var miniQuery = (function(D, E, A, S){
  var Options = function(selection) {
    this.hide = function() {
      D.hide(selection);
    }
    this.show = function() {
      D.show(selection);
    }
    this.addClass = function(klass) {
      D.addClass(selection, klass);
    }
    this.removeClass = function(klass) {
      D.removeClass(selection, klass);
    }
    this.on = function(event, listener) {
      E.on(selection, event, listener);
    }
    this.trigger = function(event) {
      E.trigger(selection, event);
    }
    return S.select(selection);
  }

  var Tool = function(selection){
    return new Options(selection);
  }
  Tool.ajax = function(config){
    A.ajax(config);
  }
  return Tool;

}(DOM, EventDispatcher, AjaxWrapper, SweetSelector));

var $ = miniQuery;

