# Webpack для WordPress

Используется для сборки ресурсов проекта темы CMS WordPress.
## Использование
* Разместить содержимое репозитория в папке темы.
* Выполнить сборку:
  * Перейти в папку webpack
  * Во вложенной папке src находится шаблон исходных файлов. Изменить/добавить файлы на своё усмотрение.
  * Установить зависимости командой **npm install**
  * Выполнить сборку командой **npm run build**
* После сборки в папке темы появятся:
  * папка assets, содержащая необходимые для темы ресурсы в подпапках:
    * fonts
    * images
    * js
  * файл style.css
* Подключите файлы ресурсов в соответствующих файлах php темы.

## Требования

* `node.js` версии `14.18.1` или выше
* `npm` версии `6.14.15` или выше

## Установка
Перейти в папку webpack
```bash
$ npm i
```

Эта команда устанавливает все необходимые пакеты для разработки и сборки ресурсов темы.

## Сборка для разработки
Перейти в папку webpack
```bash
$ npm run dev
```
 Сценарий `dev` выполняет однократную сборку в режиме разработки. В результате сборки файлы .js и .css не минифицированные. Файлы удобны для отладки.
```bash
$ npm run watch
```
Сценарий `watch` выполняет пересборку на лету в режиме наблюдателя. Это тот же режим разработки, где файлы .js и .css не минифицированные. Но пересборка происходит автоматически при изменении в исходных файлах.

Страницу сайта необходимо перезагрузить вручную, чтобы увидеть результат.

## Сборка для эксплуатации
```bash
$ npm run build
```
Сценарий `build` выполняет однократную сборку в продуктовом режиме. Перед началом сборки выполняет в корне темы очистку папки `assets` от старых файлов и создаёт новые файлы.
* Файлы .js минифицированные и транспилированные.
* Файл style.css минифицированный с добавленными вендорных префиксов. В начале файла сохраняется комментарий в специальном формате, содержащий информацию о теме. Эта информация отображается в админке в разделе Внешний вид/Темы/Текущая тема
