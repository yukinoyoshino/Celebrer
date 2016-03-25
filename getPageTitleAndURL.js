javascript:(function(){
  const template = {
    'ss': {
      string: 'url\ttitle',
      desc: 'Googleスプレッドシート用の出力形式です。'
    },
    'md': {
      string: '[title](url)',
      desc: 'Markdown用の出力形式です。'
    }
  };
  const switchVal = ['ss', 'md'];
  var page = {
    url: location.href,
    title: document.getElementsByTagName("title")[0].innerText
  };
  var message = '出力形式を指定してください。';
  for (var i = 0; i < switchVal.length; i++) {
    message = message + '\n' + i + ':' + template[switchVal[i]]['desc'];
  };
  var switcher;
  if( switcher = prompt(message, '') ) {
    if (typeof switchVal[switcher] === 'undefined') {
      alert('指定された値が不適切です。');
      return false;
    }
    var output = template[switchVal[switcher]]['string'];
    output = output.replace('url', page.url);
    output = output.replace('title', page.title);
    prompt('コピペして使ってください。', output);
  }
})();