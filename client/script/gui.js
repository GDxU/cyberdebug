window.GUI = {

    init: () => {

        GUI.menu.init();
        GUI.about.init();
        GUI.tool.init();
        GUI.total.init();

    },

    menu: {

        init: () => {

            GUI.menu.panel = document.getElementById('menu');
            GUI.menu.name = document.getElementById('menu_name');
            GUI.menu.random = document.getElementById('menu_random');
            GUI.menu.start = document.getElementById('menu_start');
            GUI.menu.about = document.getElementById('menu_about');

            GUI.menu.name.value = Cookies.get('name') || TOOL.getName();

            GUI.menu.hide();

            GUI.menu.random.addEventListener('click', () => GUI.menu.name.value = TOOL.getName());
            GUI.menu.start.addEventListener('click', () => {

                USER.name = GUI.menu.name.value.substr(0, 8);
                Cookies.set('name', USER.name, {expires: 365});

                GUI.menu.hide();

                GAME.init();
                HUD.init();
                WS.init();

                GUI.tool.show();

            });
            GUI.menu.about.addEventListener('click', () => {

                GUI.menu.hide();
                GUI.about.show();

            });

        },

        show: () => {

            GUI.menu.panel.style.left = CAMERA.getX(- Math.floor(GUI.menu.panel.offsetWidth / 2)) + 'px';
            GUI.menu.panel.style.top = CAMERA.getY(- Math.floor(GUI.menu.panel.offsetHeight / 2)) + 'px';

        },

        hide: () => {

            GUI.menu.panel.style.left = '';
            GUI.menu.panel.style.top = '';

        }

    },

    about: {

        init: () => {

            GUI.about.panel = document.getElementById('about');
            GUI.about.close = document.getElementById('about_close');

            GUI.about.hide();

            GUI.about.close.addEventListener('click', () => {

                GUI.about.hide();
                GUI.menu.show();

            });

        },

        show: () => {

            GUI.about.panel.style.left = CAMERA.getX(- Math.floor(GUI.about.panel.offsetWidth / 2)) + 'px';
            GUI.about.panel.style.top = CAMERA.getY(- Math.floor(GUI.about.panel.offsetHeight / 2)) + 'px';

        },

        hide: () => {

            GUI.about.panel.style.left = '';
            GUI.about.panel.style.top = '';

        }

    },

    tool: {

        init: () => {

            GUI.tool.panel = document.getElementById('tool');
            GUI.tool.total = document.getElementById('tool_total');

            GUI.tool.total.addEventListener('click', GUI.tool.onTotal);
            window.addEventListener('keydown', event => {

                if (event.code === 'Backquote') GUI.tool.onTotal();

            });

        },

        show: () => {

            GUI.tool.panel.style.left = '10px';
            GUI.tool.panel.style.top = 'auto';
            GUI.tool.panel.style.bottom = '10px';

        },

        hide: () => {

            GUI.tool.panel.style.left = '';
            GUI.tool.panel.style.top = '';
            GUI.tool.panel.style.bottom = '';

        },

        onTotal: () => {

            GUI.total.panel.style.left ? GUI.total.hide() : GUI.total.show();

        }

    },

    total: {

        ms: 0,
        tr: 0,
        timestamps: [],

        init: () => {

            GUI.total.panel = document.getElementById('total');
            GUI.total.table = document.getElementById('total_table');
            GUI.total.target = document.getElementById('total_target');
            GUI.total.info = document.getElementById('total_info');

            GUI.total.hide();

        },

        show: () => {

            GUI.total.panel.style.left = '8px';
            GUI.total.panel.style.top = '8px';

        },

        hide: () => {

            GUI.total.panel.style.left = '';
            GUI.total.panel.style.top = '';

        },

        sync: () => {

            if (WS.data.totals) {

                // счёт

                let html = '';

                WS.data.totals.forEach((total, i) => {

                    html += '<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>' + total.name + '</td>' +
                        '<td>' + total.kill + '</td>' +
                        '<td>' + total.stun + '</td>' +
                        '<td>' + total.die + '</td>' +
                        '<td>' + total.score + '</td>' +
                        '</tr>';

                });

                GUI.total.table.innerHTML = html;

                // цели

                GUI.total.target.innerHTML = '<span>Игроки: </span>' + WS.data.users +
                    '<span style="margin-left: 8px;">Боты: </span>' + WS.data.bots +
                    '<span style="margin-left: 8px;">Здесь: </span>' + WS.data.targets.length;

                // информация

                GUI.total.timestamps.push(Date.now());

                if (GUI.total.timestamps[GUI.total.timestamps.length - 1] - GUI.total.timestamps[0] > 1000) {

                    let s = 0;

                    for (let i = 1; i < GUI.total.timestamps.length; i++) s += GUI.total.timestamps[i] - GUI.total.timestamps[i - 1];

                    GUI.total.ms = s / (GUI.total.timestamps.length - 1);
                    GUI.total.tr = 1000 / GUI.total.ms;

                    GUI.total.timestamps = [];

                }

                GUI.total.info.innerHTML = '<span>Задержка:</span> ' + GUI.total.ms.toFixed(2) +
                    '<span style="margin-left: 8px;">Тикрейт:</span> ' + GUI.total.tr.toFixed(2);

                // проверка на видимость

                if (GUI.total.panel.style.left) GUI.total.show();

            }

        }

    }

};