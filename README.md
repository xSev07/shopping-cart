Демонстрация навыков вёрстки, работы с react и тестирования компонентов.

Поддерживаемые браузеры: Chrome, FF, Edge.

Опубликованная сборка: https://xsev07.github.io/shopping-cart/

Полный стек используемых технологий:
- React
- Redux
- Redux-thunk
- Reselect
- Axios
- Prop Types
- Enzyme
- Jest
- SCSS

Запуск сборки локально:
1. установить node.js (https://nodejs.org/en/)
2. скопировать проект в папку
3. в консоли выполнить команду "npm i"
4. Запуск и сборка
    1. запуск локального сервера для разработки: "npm run dev" (открыть в браузере http://localhost:1337/ )
    2. сборка проекта "npm run build" - проект будет собран в папку build\

ТЗ:
Create shopping cart with React & Redux.
1. Load cart items on cart page load (use any API mock services or just .json file)
2. Each cart item should contain:
- Name
- Price
- Quantity
3. Each cart item should have quantity switcher (+/-)
4. Cart items should have the ability to be deleted from the list
5. Your cart page should have a form for adding new cart item, the item should be added to the top of cart items list on form submit
