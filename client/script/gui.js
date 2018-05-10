window.GUI = {

    init: () => {

        GUI.menu.init();
        GUI.total.init();
        GUI.debug.init();

    },

    menu: {

        init: () => {

            GUI.menu.panel = document.getElementById('menu');
            GUI.menu.header = document.getElementById('menu_header');
            GUI.menu.text = document.getElementById('menu_text');
            GUI.menu.name = document.getElementById('menu_name');
            GUI.menu.random = document.getElementById('menu_random');
            GUI.menu.start = document.getElementById('menu_start');

            GUI.menu.header.innerText = 'PIXEL';
            GUI.menu.text.innerText = 'Enter your Name';
            GUI.menu.name.value = Cookies.get('name') || TOOL.getName();
            GUI.menu.random.innerText = '?!';
            GUI.menu.start.innerText = 'Start';

            let left = Math.floor(window.innerWidth / 2) - Math.floor(GUI.menu.panel.offsetWidth / 2);
            let top = Math.floor(window.innerHeight / 2) - Math.floor(GUI.menu.panel.offsetHeight / 2);

            GUI.menu.hide();

            GUI.menu.panel.style.top = top + 'px';
            GUI.menu.panel.style.right = 'auto';
            GUI.menu.panel.style.bottom = 'auto';
            GUI.menu.panel.style.left = left + 'px';

            GUI.menu.random.addEventListener('click', () => GUI.menu.name.value = TOOL.getName());
            GUI.menu.start.addEventListener('click', () => {

                USER.name = GUI.menu.name.value.substr(0, 8);
                Cookies.set('name', USER.name, {expires: 365});

                GUI.menu.hide();

                GAME.init();
                HUD.init();
                WS.init();

                GUI.total.show();
                GUI.debug.show();

            });

        },

        show: () => {

            GUI.menu.panel.style.display = 'block';

        },

        hide: () => {

            GUI.menu.panel.style.display = 'none';

        }

    },

    total: {

        init: () => {

            GUI.total.panel = document.getElementById('total');
            GUI.total.table = document.getElementById('total_table');

            GUI.total.hide();

            GUI.total.panel.style.top = 'auto';
            GUI.total.panel.style.right = '10px';
            GUI.total.panel.style.bottom = '10px';
            GUI.total.panel.style.left = 'auto';

        },

        show: () => {

            GUI.total.panel.style.display = 'block';

        },

        hide: () => {

            GUI.total.panel.style.display = 'none';

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