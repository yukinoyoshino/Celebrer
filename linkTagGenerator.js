javascript:(function(){
  /* link tag list */
  var tagList = {
    'html' : '<a href="pUrl" title="pTitle">pTitle</a>',
    'markdown' : '[pTitle](pUrl)'
  };
  /* get page infomation */
  var pTitle = document.getElementsByTagName('title')[0].innerHTML;
  var pUrl = window.location.toString();
  console.log(pTitle + pUrl);
  /* create and add element */
  var viewArea = document.createElement('form');
  viewArea.className = 'bm-linktaggen';
  var viewAreaList = document.createElement('dl');
  viewAreaList.className = 'bm-linktaggen--dl';
  /* get link tag and insert to textbox */
  var plain = _getDl(pTitle, pUrl);
  for (var key in tagList) {
    tagList[key] = tagList[key].replace(/pTitle/g, pTitle);
    tagList[key] = tagList[key].replace(/pUrl/g, pUrl);
    console.log(tagList[key]);
    console.log(key + ':' +tagList[key]);
    _getDl(key, tagList[key]);
  }
  viewArea.appendChild(viewAreaList);
  console.log(viewArea);
  document.getElementsByTagName('body')[0].appendChild(viewArea);
  console.log(viewArea);
  /* get <dt /> and <dd /> */
  function _getDl(dtval, ddval) {
    eList = ['dt', 'dd'];
    for (var i = 0; i < eList.length; i++) {
      var ne = document.createElement(eList[i]);
      if (i == 0) {
        ne.innerHTML = dtval;
      } else {
        var inputTag = document.createElement('input');
        inputTag.type = 'text';
        inputTag.size = 200;
        inputTag.value = ddval;
        console.log(inputTag);
        ne.innerHTML = inputTag;
      }
      viewAreaList.appendChild(ne);
    }
    return true;
  }
})();