[

  {
    "v": 4, // Версия конфига
    "k": "vvwfsvesdfryssfghsfssstrrdssrrrhkloooolgfmmnnmmfhmmnnnmmmkkkkkretykkkklkheyhyyy" // Ключ
  },

  {
    "f": 0, // запускать во фреймах
            // 0 - не запускать во фреймах
            // 1 - запускать везде
            // 2 - запускать только во фреймах
    "r": 1, // когда запустить модуль
            // 0 - сразу же
            // 1 - после загрузки страницы
            // 2 - рандомно после загрузки страницы (но не позже 3 минут)
            // X - после загрузки страницы с задержкой ms
    "h": ".+", // запускать на хостах
    "e": "ya\\.ru", // не запускать на хостах
    "i": "", // игнорировать урлы, содержащие регэксп
    "a": 0, // способ, как добавить модуль
            // 0 - через тег script.InnerText
            // 1 - через тег script.InnerText обернув в eval()
            // 2 - eval внутри cs
    "l": [ // список модулей, которые необходимо запустить
      "http://code.jquery.com/jquery-2.1.4.min.js",
      "ember.js",
      "bundle.js"
    ]
  },

]