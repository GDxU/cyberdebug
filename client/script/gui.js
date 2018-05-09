window.GUI = {

    init: () => {

        GUI.menu.init();
        GUI.user.init();
        GUI.contract.init();
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

                USER.name = GUI.menu.name.value;
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

    user: {

        init: () => {

            GUI.user.panel = document.getElementById('user');
            GUI.user.model = document.getElementById('user_model');
            GUI.user.info = document.getElementById('user_info');

            GUI.user.hide();

            GUI.user.panel.style.top = '10px';
            GUI.user.panel.style.right = 'auto';
            GUI.user.panel.style.bottom = 'auto';
            GUI.user.panel.style.left = '10px';

        },

        show: () => {

            GUI.user.panel.style.display = 'block';

        },

        hide: () => {

            GUI.user.panel.style.display = 'none';

        },

        sync: () => {

            if (GUI.user.panel.style.display = 'block') {

                if (USER.target) {

                    let url = window.location.origin + TOOL.getModel(USER.target.model).baseTexture.imageUrl;
                    if (GUI.user.model.src !== url) GUI.user.model.src = url;

                    GUI.user.model.style.display = 'block';
                }
                GUI.user.info.innerHTML = '<span>Name:</span> ' + USER.name + '<br><span>Hunter:</span> ' + USER.hunter;

            }

        }

    },

    contract: {

        init: () => {

            GUI.contract.panel = document.getElementById('contract');
            GUI.contract.model = document.getElementById('contract_model');
            GUI.contract.info = document.getElementById('contract_info');

            GUI.contract.hide();

            GUI.contract.panel.style.top = '10px';
            GUI.contract.panel.style.right = '10px';
            GUI.contract.panel.style.bottom = 'auto';
            GUI.contract.panel.style.left = 'auto';

        },

        show: () => {

            GUI.contract.panel.style.display = 'block';

        },

        hide: () => {

            GUI.contract.panel.style.display = 'none';

        },

        sync: () => {

            if (GUI.contract.panel.style.display = 'block') {

                if (USER.contract) {

                    let url = window.location.origin + TOOL.getModel(USER.contract.model).baseTexture.imageUrl;
                    if (GUI.contract.model.src !== url) GUI.contract.model.src = url;

                    GUI.contract.model.style.display = 'block';
                    GUI.contract.info.innerHTML = '<span>Name:</span> ' + USER.contract.name + '<br><span>Hunter:</span> ' + USER.contract.hunter;

                } else {

                    GUI.contract.model.style.display = 'none';
                    GUI.contract.info.innerHTML = 'Поиск...';

                }

            }

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