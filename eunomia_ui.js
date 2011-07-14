/**
Copyright 2008-2011 Goran Panic.
**/


//todo: remove jquery dependency
var EUNOMIA_ui = function(){
  var _ui = this;
  var _util = EUNOMIA_utilities();
 

  //dialogs
  this.confirmDelete = function(evt, callbackOK, callbackCancel){
    $('.confirmDelete').remove();
    var y = parseInt(evt.pageY,10)-20;
    var x = parseInt(evt.pageX,10)-20;
    var d = [
      '<div class="confirmDelete" style="top:'+y+'px;left:'+x+'px">',
        '<span class="tip">&#160;</span>',
        '<div>Vill du verkligen radera denna post?</div>',
        '<span id="confirmDeleteCancel" class="button buttonblue" style="margin-right:10px">Nej</span>',
        '<span id="confirmDeleteOK" class="button">Ja</span>',
    '</div>'
    ].join('');

    $('body').append(d);

    $('#confirmDeleteCancel').click(function(){
      callbackCancel();
    })

    $('#confirmDeleteOK').click(function(){
      callbackOK();
    })
  } 
  
  
  //Should use it own namespace. It's quite big...
  //todo: remove jquery dependency
  this.calendarPicker = function(oThis, evt){
    $('.eunomia-calMonth').remove();
    var y = parseInt(evt.pageY,10);
    var x = parseInt(evt.pageX,10)-10;
    var d = [
      '<div class="eunomia-calMonth" style="top:'+y+'px;left:'+x+'px">',
        '<table class="mpHeader">',
          '<tr>',
            '<td width="40" class="mpPrev">&#x25C0;</td>',
            '<td width="100" class="mpYear">2011</td>',
            '<td width="40" class="mpNext">&#x25B6;</td>',
          '</tr>',
        '</table>',
        '<table class="mpBody">',
          '<tr><td id="mp-1" class="mpItem">'+_ui.calendarMonth(1)+'</td><td id="mp-2" class="mpItem">'+_ui.calendarMonth(2)+'</td><td id="mp-3" class="mpItem">'+_ui.calendarMonth(3)+'</td></tr>',
          '<tr><td id="mp-4" class="mpItem">'+_ui.calendarMonth(4)+'</td><td id="mp-5" class="mpItem">'+_ui.calendarMonth(5)+'</td><td id="mp-6" class="mpItem">'+_ui.calendarMonth(6)+'</td></tr>',
          '<tr><td id="mp-7" class="mpItem">'+_ui.calendarMonth(7)+'</td><td id="mp-8" class="mpItem">'+_ui.calendarMonth(8)+'</td><td id="mp-9" class="mpItem">'+_ui.calendarMonth(9)+'</td></tr>',
          '<tr><td id="mp-10" class="mpItem">'+_ui.calendarMonth(10)+'</td><td id="mp-11" class="mpItem">'+_ui.calendarMonth(11)+'</td><td id="mp-12" class="mpItem">'+_ui.calendarMonth(12)+'</td></tr>',
        '</table>',
      '</div>'
    ].join('');

    $('body').append(d);

    $('.mpItem')
      .hover(
        function (e) {
          $(this).addClass('mpHov');
        },
        function () {
          $(this).removeClass('mpHov');
        }
      )
      .click(function(){
        if( $(this).hasClass('mpSel') ){
          $(this).removeClass('mpSel');
        } else {
          $('.mpItem').removeClass('mpSel');
          $(this).addClass('mpSel');
        }
        _ui.calendarUpdate(oThis);
      })
    ;

    $('.eunomia-calMonth .mpPrev').click(function(){
      var $year = $('.mpYear');
      var date = parseInt($year.html(),10)-1;
      $year.html(date);
      _ui.calendarUpdate(oThis);
    });

    $('.eunomia-calMonth .mpNext').click(function(){
      var $year = $('.mpYear');
      var date = parseInt($year.html(),10)+1;
      $year.html(date);
      _ui.calendarUpdate(oThis);
    });

    $('.eunomia-calMonth .mpYear').click(function(){
      $('.mpInput').blur();
      var year = $(this).html();
      $(this).html('<input class="mpInput input" type="text" value="'+year+'" style="width:40px"/>');
      $('.mpInput')
        .focus()
        .keyup(function(){
          //Only digits and first 4
          $(this).val($(this).val().replace(/\D/gi, '').substr(0, 4));
        })
        .blur(function(){
          var year = $(this).val();
          $('.eunomia-calMonth .mpYear').html(year);
          _ui.calendarUpdate(oThis);
        });
      return false;
    });

    var $horizonDIV = $('<div id="eunomia-catcher" style="top:0;position:absolute;z-index:99;width:100%;height:'+util.documentHeight()+'px"></div>');
    $('body').append($horizonDIV);
    $horizonDIV
      .click(function(evt){
        $('.eunomia-calMonth').remove();
        $('#eunomia-catcher').remove();
        $(this).hide();
      });

  }
  
  this.calendarSetMonth = function(month){
    $('#mp-'+month).addClass('mpSel');
  }
  
  this.calendarSetYear = function(year){
    $('.mpYear').html(year);
  }
  
  this.calendarGetMonth = function(){
    var selID = $('.mpSel').attr('id');
    return ((selID) ? selID.replace(/\D/gi,'') : '');
  }
  
  this.calendarGetYear = function(){
    return $('.mpYear').html();
  }
  
  //todo: this should not rely on sys.locale!!!
  this.calendarMonth = function(month){
    switch( month.toString() ){
      case '1': return sys.locale('Jan');
      case '2': return sys.locale('Feb');
      case '3': return sys.locale('Mar');
      case '4': return sys.locale('Apr');
      case '5': return sys.locale('May');
      case '6': return sys.locale('Jun');
      case '7': return sys.locale('Jul');
      case '8': return sys.locale('Aug');
      case '9': return sys.locale('Sep');
      case '10': return sys.locale('Oct');
      case '11': return sys.locale('Nov');
      case '12': return sys.locale('Dec');
    }
    return '';
  }
  
  this.calendarUpdate = function(oThis){
    var MM = _ui.calendarGetMonth();
    var YYYY = _ui.calendarGetYear();
    var monthText = (MM) ? _ui.calendarMonth(MM)+', ' : '';

    $(oThis)[0].firstChild.nodeValue = monthText+YYYY;
    $(oThis).children('input').val(YYYY+'-'+MM);
  }
  
  this.calendarInit = function(oThis, evt){
    _ui.calendarPicker(oThis, evt);
    var val = $(oThis).children('input').val();
    var data = (!!val) ? val.split('-') : ['2011','01'];    

    _ui.calendarSetYear(data[0]);
    _ui.calendarSetMonth(data[1]);
  }


  /** START CONTEXTMENU **/
  //Close when not in focus
  $(function() {
    $('body').mouseup(function() {
      $('.contextmenu').hide();
    });

    //Hover effects
    $('.contextmenu').children('li')
      .bind('mouseover', function(){
        $(this).css({'background-color':'#2CA5CE','color':'#fff'})
               .children().css('color','#fff');
    })
      .bind('mouseout', function(){
        $(this).css({'background-color':'','color':''})
               .children().css('color','');
    });
  });
  /** END CONTEXTMENU **/

}