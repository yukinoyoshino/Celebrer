(function(){
  try {
    if (0 === $('a.shareCal[href]').length) {
      throw 'nullPointerException';
    } else if (1 < $('a.shareCal[href]').length) {
      throw 'overSelectException';
    }
    var paramStrForYahoo = $('a.shareCal[href]').attr('href').replace('https:\/\/calendar\.yahoo\.co\.jp\/\?', '');
    var paramAryForYahoo = paramStrForYahoo.split('&');
    var urlStrForGoogle = 'http://www.google.com/calendar/event?action=TEMPLATE';
    var paramAryForGoogle = {
      text: $('h1.title').text(),
      details: '',
      dates: ''
    };
    /* set paramsAryForGoogle.detail */
    var routeDescAry = [];
    for (var i = 0; i < $('div#srline > div').length; i++) {
      var cnt = i++;
      if (1 === $('div#srline > div:eq(' + cnt + ') a.shareButton.activation').length) {
        routeSelector = 9 < cnt ? 'div#route' + cnt : 'div#route0' + cnt;
        break;
      }
    }
    console.info(routeSelector);
    for (var i = 0; i < $(routeSelector + ' > div.routeDetail > div').length; i++) {
      var routeDescPart = {
        time: '',
        station: ''
      };
      routeDetailSelector = routeSelector + ' > div.routeDetail > div:eq(' + i + ')';
      switch ($(routeDetailSelector).attr("class")) {
        case 'station':
          routeDescPart.time = $(routeDetailSelector + ' > ul.time > li').text();
          routeDescPart.station = $(routeDetailSelector + ' > dl > dt').text();
          break;
        case 'fareSection':
          console.info(routeDetailSelector);
          routeDescPart.time = $(routeDetailSelector + ' > div.station > ul.time > li:eq(1)').text().replace(/発/g, '');
          routeDescPart.station = $(routeDetailSelector + ' > div.station > dl > dt').text();
          break;
        default:
          break;
      }
      routeDescAry[i] = routeDescPart;
    }
    for (var i = 0; i < routeDescAry.length; i++) {
      paramAryForGoogle.details = i > 0
        ? paramAryForGoogle.details + '→' + routeDescAry[i].time + ' ' + routeDescAry[i].station
        : routeDescAry[i].time + ' ' + routeDescAry[i].station;
    }
    /* set paramsAryForGoogle.dates */
    var departureDate;
    var duration;
    var arrivalDate;
    for (var i = 0; i < paramAryForYahoo.length; i++) {
      var paramDetail = paramAryForYahoo[i].split('=');
      switch (paramDetail[0]) {
        case 'ST':
          departureDate = new Date(paramDetail[1].split('T')[0].substr(0, 4)
            , paramDetail[1].split('T')[0].substr(4, 2) - 0
            , paramDetail[1].split('T')[0].substr(6, 2) - 0
            , paramDetail[1].split('T')[1].substr(0, 2) - 0
            , paramDetail[1].split('T')[1].substr(2, 2) - 0);
          break;
        case 'DUR':
          duration = new Date(1970, 1, 1, paramDetail[1].substr(0, 2) - 0, paramDetail[1].substr(2, 2) - 0);
          break;
        default :
          break;
      }
    }
    arrivalDate = new Date( departureDate.getTime() + duration.getTime() );
    paramAryForGoogle.dates = getFormattedStr(departureDate) + '/' + getFormattedStr(arrivalDate);
    /* set urlStrForGoogle */
    for (key in paramAryForGoogle) {
      urlStrForGoogle = urlStrForGoogle + '&' + key + '=' + paramAryForGoogle[key];
    }
    /* location to google */
    if ( confirm('Googleカレンダーに移動してもよろしいですか？\r\n[ルート]\r\n' + paramAryForGoogle.details) ) {
      location.href = urlStrForGoogle;
    } else {
      return false;
    }
  } catch (e) {
    switch (e) {
      case 'nullPointerException':
      /* ガッ */
        alert('Googleカレンダーに登録するルートの「ルート共有」をクリックしてください。');
        break;
      case 'overSelectException':
        alert('「ルート共有」が複数開かれています。\rカレンダーに登録するルートのみ「ルート共有」を開いてください。');
        break;
      default:
        break;
    }
    return false;
  }


  function getFormattedStr(date) {
    const dateFormat = 'YYYYMMDDThhmmssZ';
    const paramAry = ['Y', 'M', 'D', 'h', 'm', 's'];
    dateStr = dateFormat;
    for (var j = 0; j < paramAry.length; j++) {
      dateStr = getFormattedPart(dateStr, paramAry[j], date);
    };
    return dateStr;

    function getFormattedPart(dateStr, param, date) {
      switch (param) {
        case 'Y' :
          return dateStr.replace(/YYYY/g, date.getFullYear());
          break;
        case 'M' :
          return dateStr.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice( - 2));
          break;
        case 'D' :
          return dateStr.replace(/DD/g, ('0' + (date.getDate() + 1)).slice( - 2));
          break;
        case 'h' :
          return dateStr.replace(/hh/g, ('0' + (date.getHours() + 1)).slice( - 2));
          break;
        case 'm' :
          return dateStr.replace(/mm/g, ('0' + (date.getMinutes() + 1)).slice( - 2));
          break;
        case 's' :
          return dateStr.replace(/ss/g, '00');
          break;
        default :
          break;
      }
    }
  }
})();