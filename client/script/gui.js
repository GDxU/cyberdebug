window.GUI = {

    init: () => {

        GUI.menu.init();
        GUI.debug.init();

    },

    menu: {

        init: () => {

            GUI.menu.panel = document.getElementById('menu');
            GUI.menu.header = document.getElementById('menu_header');
            GUI.menu.text = document.getElementById('menu_text');
            GUI.menu.nickname = document.getElementById('menu_nickname');
            GUI.menu.random = document.getElementById('menu_random');
            GUI.menu.start = document.getElementById('menu_start');

            GUI.menu.header.innerText = 'PIXEL';
            GUI.menu.text.innerText = 'Введите ваш Никнейм';
            GUI.menu.nickname.value = Cookies.get('nickname') || TOOL.getNickname();
            GUI.menu.random.innerText = '?!';
            GUI.menu.start.innerText = 'СТАРТ';

            let left = Math.round(window.innerWidth / 2) - Math.round(GUI.menu.panel.offsetWidth / 2);
            let top = Math.round(window.innerHeight / 2) - Math.round(GUI.menu.panel.offsetHeight / 2);

            GUI.menu.panel.style.top = top + 'px';
            GUI.menu.panel.style.right = 'auto';
            GUI.menu.panel.style.bottom = 'auto';
            GUI.menu.panel.style.left = left + 'px';

            GUI.menu.random.addEventListener('click', () => {

                GUI.menu.nickname.value = TOOL.getNickname();

            });

            GUI.menu.start.addEventListener('click', () => {

                GUI.menu.hide();

                USER.name = GUI.menu.nickname.value;
                Cookies.set('nickname', USER.name, {expires: 365});

                BACKGROUND.init();
                WS.init();

                GUI.debug.show();

            });

            GUI.menu.show();

        },

        show: () => {

            GUI.menu.panel.style.display = 'block';

        },

        hide: () => {

            GUI.menu.panel.style.display = 'none';

        }

    },

    debug: {

        init: () => {

            GUI.debug.panel = document.getElementById('debug');
            GUI.debug.info = document.getElementById('debug_info');

            GUI.debug.hide();

            GUI.debug.panel.style.top = 'auto';
            GUI.debug.panel.style.right = 'auto';
            GUI.debug.panel.style.bottom = '10px';
            GUI.debug.panel.style.left = '10px';

        },

        show: () => {

            GUI.debug.panel.style.display = 'block';

        },

        hide: () => {

            GUI.debug.panel.style.display = 'none';

        }

    }

};