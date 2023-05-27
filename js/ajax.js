async function pageUpdate(event) {
  
  // Если функция вызвана без аргументов:
  
  if (typeof event == 'undefined') {
    
    // Устанавливаем обработчики
    // на все ссылки на странице:
    
    $('body a[href]').click(pageUpdate);
    
  }
  
  // Если функция вызвана
  // в результате клика
  // по ссылке:
  
  else {
    
    // Берём адрес с нажатой ссылки
    // и записываем в переменную link:
    
    var link = event.target.href;
    
    // Если ссылка ведет на наш сайт:
    
    if (new URL(link)['host'] == location.host) {
      
      // Предотвращаем переход:
      
      event.preventDefault();
      
      // Блокируем страницу, чтобы
      // больше нельзя было кликать:
      $('body').css('pointer-events', 'none');
      
      // Активируем анимацию исчезновения (полупрозрачности):
      
      var hide = $('body').animate({ opacity: 0.2 }, 500).promise();
      
      var ajax = $.ajax(link); // Запускаем загрузку новой страницы
      
      await hide; // Ждем окончания анимации исчезновения
      
      // Вставляем данные на страницу беря их с ново-скачанной страницы:
      
      var doc = new DOMParser().parseFromString((await ajax), 'text/html');
      var html = $('body', doc).html();
      $('body').html(html);
      
      // Скролим в самый вверх:
      $('body, html').animate({scrollTop: 0}, 0);
      
      // Меняем адрес в адресной строке:
      history.pushState(null, null, link);
      
      // Заново ставим
      // обработчики:
      
      pageUpdate();
      
      // Активируем анимацию
      // постепенного появления:
      
      await $('body').animate({ opacity: 1 }, 500).promise();
      
      // Снимаем блокировку с документа:
      
      $('body').css('pointer-events', '');
      
    }
    
  }
  
}

pageUpdate();