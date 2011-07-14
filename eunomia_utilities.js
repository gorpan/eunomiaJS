/**
Copyright 2008-2011 Goran Panic.
**/

/*
var EUNOMIA_utilities = {};

EUNOMIA_utilities.profileStart = function(){
  EUNOMIA_utilities.profileStartTime = new Date().getTime();
}*/


var EUNOMIA_utilities = function(){
  var _utilities = this;
  
  //profiling tools
  this.profileStart = function(){
    _utilities.profileStartTime = new Date().getTime();
  }

  this.profileStartTime = 0;
  
  this.profileEnd = function(){
    var end = new Date().getTime();
    return end - _utilities.profileStartTime;
  }

  
  this.isEmail = function(s){
    var f = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return (f.test(s));
  }
  
  /**
   * getFormXPath
   * Desc: Returns either a jQuery XML node-set or a string
   **/
   //TODO: should return a XML Document, or Node. not be tied to jQuery
  this.getByXPath = function(xpath, XML){
    if (!xpath){
      return false;
    }
    var p = xpath.split('/');
    var len = p.length;
    var r = XML;
    var i = 0;

    if (len > 0){
      //iterate elements
      for (i;i<len;i++){
        if (p[i].indexOf('@') < 0 && p[i].indexOf('text()') < 0){
          r = $(r).children(p[i]);
        }
      }

      if (r.length === 1 && $(r).children().length < 1 && xpath.indexOf('@') < 0){
        return $(r).text(); //select text-node if single node
      }
    }

    //Attribute
    if( xpath.indexOf('@') > 0 ){
      var val = p[len-1].substring(1);
      return $(r).attr(val);
    }

    //Text
    if( xpath.indexOf('text()') > 0 ){
      return $(r).text();
    }

    return r;
  }
  
  this.pi = 3.1415;
  
// this fixes an issue with the old method, ambiguous values
// with this test document.cookie.indexOf( name + "=" );
  //todo: needs rewrite!
  this.getCookie = function( cookieName ){
    var a_all_cookies = document.cookie.split( ';' );
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false; // set boolean t/f default f
    var aCookieLen = a_all_cookies.length;

    for( i = 0; i < aCookieLen; i++ ){
      // now we'll split apart each name=value pair
      a_temp_cookie = a_all_cookies[i].split( '=' );
      // and trim left/right whitespace while we're at it
      cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
      // if the extracted name matches passed cookieName
      if ( cookie_name === cookieName ){
        b_cookie_found = true;
        // we need to handle case where cookie has no value but exists (no = sign, that is):
        if ( a_temp_cookie.length > 1 ){
          cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
        }
        // note that in cases where cookie is initialized but no value, null is returned
        return cookie_value;
      }
      a_temp_cookie = null;
      cookie_name = '';
    }
    if ( !b_cookie_found ){
      return null;
    }
  }

  this.isArray = function(obj){
    return obj.constructor === Array;
  }

  this.screenWidth = function(){
    return ( document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth );
  }
  
  this.screenHeight = function(){
    return ( document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight );
  }

  this.documentWidth = function(){
    return ( document.body.clientWidth ? document.body.clientWidth : 0 );
  }
  
  this.documentHeight = function(){
    return ( document.body.clientHeight ? document.body.clientHeight : 0 );
  }
}