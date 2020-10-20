NewsFinder
=============================
Это дипломный проект,
выполненный в ходе обучения в Яндекс.Практикуме
на факультете веб-разработки

АДРЕС
-----------
- https://newsfinder.tk
- https://bimimot.github.io/NewsFinder/


ОПИСАНИЕ
-----------
Поиск новостей по заданнным словам и их вывод в виде карточек.
Поиск происходит через внешнее API newsapi.org

В проекте две страницы: главная и странциа сохраненных статей,
доступная только зарегистрованным пользователям.

Авторизованные пользователи проекта могут:
- сохранять понравившиеся статьи-карточки,
- просматривать сохраненные статьи на странице "Сохраненные",
- удалять статьи-карточки из сохраненных.


ТЕСТОВЫЙ ПОЛЬЗОВАТЕЛЬ
-----------
- Email: test@yandex.ru, Pass: qwertyqwerty


БЭКЕНД
-----------
- REST API
- https://github.com/Bimimot/News-API


РЕШЕННЫЕ ЗАДАЧИ
-----------
- адаптивная верстка для разных разрешений экрана
- применена методология БЭМ для организации стилей
- соблюдены принципы ООП - код разбит на отдельные модули (классы)
- сделаны попапы: авторизация, регистрация, выпадающее меню на малых разрешениях экрана
- попапы закрываются по ESC, крестики и клику мимо попапа
- кастомная валидация полей в попапах
- реализовано взаимодействие с внешнем API
- реализовано взаимодействием с собственным REST API
- настроены сборки: build, dev, deploy 
- для сборки dev настроено атоматическое обновление hot reload
- настроены вебпак и бабель для минификации CSS и транспиляциия JS, настроен префиксер CSS
- настроено хэширование CSS и JS файлов при build сборке
- фронтенд и бекэнд подняты на одном домене, настроен nginx


АВТОР
-----------
Попов Степан

