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

            GUI.menu.visible(false);

            GUI.menu.random.addEventListener('click', () => GUI.menu.name.value = TOOL.getName());
            GUI.menu.start.addEventListener('click', () => {

                USER.name = GUI.menu.name.value.substr(0, 20);
                Cookies.set('name', USER.name, {expires: 365});

                GUI.menu.visible(false);

                GAME.init();
                HUD.init();
                WS.init();

                GUI.tool.visible(true);

            });
            GUI.menu.about.addEventListener('click', () => {

                GUI.menu.visible(false);
                GUI.about.visible(true);

            });

        },

        visible: v => {

            if (typeof v === 'boolean') {

                GUI.menu.panel.style.left = v ? CAMERA.getX(- Math.floor(GUI.menu.panel.offsetWidth / 2)) + 'px' : '';
                GUI.menu.panel.style.top = v ? CAMERA.getY(- Math.floor(GUI.menu.panel.offsetHeight / 2)) + 'px' : '';

            } else return !!GUI.menu.panel.style.left;

        }

    },

    about: {

        init: () => {

            GUI.about.panel = document.getElementById('about');
            GUI.about.close = document.getElementById('about_close');

            GUI.about.visible(false);

            GUI.about.close.addEventListener('click', () => {

                GUI.about.visible(false);
                GUI.menu.visible(true);

            });

        },

        visible: v => {

            if (typeof v === 'boolean') {

                GUI.about.panel.style.left = v ? CAMERA.getX(- Math.floor(GUI.about.panel.offsetWidth / 2)) + 'px' : '';
                GUI.about.panel.style.top = v ? CAMERA.getY(- Math.floor(GUI.about.panel.offsetHeight / 2)) + 'px' : '';

            } else return !!GUI.about.panel.style.left;

        }

    },

    tool: {

        init: () => {

            GUI.tool.panel = document.getElementById('tool');
            GUI.tool.total = document.getElementById('tool_total');

            GUI.tool.total.addEventListener('click', GUI.tool.onTotal);
            window.addEventListener('keydown', event => {

                if (event.code === 'Backquote' && GUI.tool.visible()) GUI.tool.onTotal();

            });

        },

        visible: v => {

            if (typeof v === 'boolean') {

                GUI.tool.panel.style.left = v ? '10px' : '';
                GUI.tool.panel.style.top = v ? 'auto' : '';
                GUI.tool.panel.style.bottom = v ? '10px' : '';

            } else return !!GUI.tool.panel.style.left;

        },

        onTotal: () => {

            GUI.total.visible(!GUI.total.visible());

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

            GUI.total.visible(false);

        },

        visible: v => {

            if (typeof v === 'boolean') {

                GUI.total.panel.style.left = v ? '8px' : '';
                GUI.total.panel.style.top = v ? '8px' : '';

            } else return !!GUI.total.panel.style.left;

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

                if (GUI.total.panel.style.left) GUI.total.visible(true);

            }

        }

    }

};