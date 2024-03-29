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

                HUD.init();
                WS.init();
                CAMERA.init();
                ACTION.init();

                GUI.tool.visible(true);
                GUI.total.visible(true);

            });
            GUI.menu.about.addEventListener('click', () => {

                GUI.menu.visible(false);
                GUI.about.visible(true);

            });

        },

        visible: v => {

            if (typeof v === 'boolean') {

                GUI.menu.panel.style.left = v ? Math.floor(window.innerWidth / 2) - Math.floor(GUI.menu.panel.offsetWidth / 2) + 'px' : '';
                GUI.menu.panel.style.top = v ? Math.floor(window.innerHeight / 2) - Math.floor(GUI.menu.panel.offsetHeight / 2) + 'px' : '';

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

                GUI.about.panel.style.left = v ? Math.floor(window.innerWidth / 2) - Math.floor(GUI.about.panel.offsetWidth / 2) + 'px' : '';
                GUI.about.panel.style.top = v ? Math.floor(window.innerHeight / 2) - Math.floor(GUI.about.panel.offsetHeight / 2) + 'px' : '';

            } else return !!GUI.about.panel.style.left;

        }

    },

    tool: {

        init: () => {

            GUI.tool.panel = document.getElementById('tool');

            GUI.tool.total = document.getElementById('tool_total');
            GUI.tool.morph = document.getElementById('tool_morph');
            GUI.tool.teleport = document.getElementById('tool_teleport');
            GUI.tool.glitch = document.getElementById('tool_glitch');

            GUI.tool.total.addEventListener('click', GUI.tool.onTotal);
            GUI.tool.morph.addEventListener('click', GUI.tool.onMorph);
            GUI.tool.teleport.addEventListener('click', GUI.tool.onTeleport);
            GUI.tool.glitch.addEventListener('click', GUI.tool.onGlitch);

            window.addEventListener('keydown', event => {

                if (GUI.tool.visible()) {

                    if (event.code === 'Backquote') GUI.tool.onTotal();
                    if (event.code === 'Digit1') GUI.tool.onMorph();
                    if (event.code === 'Digit2') GUI.tool.onTeleport();
                    if (event.code === 'Digit3') GUI.tool.onGlitch();

                }

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

        },

        onMorph: () => {

            WS.client.send(JSON.stringify({skill: 'morph'}));

        },

        onTeleport: () => {

            WS.client.send(JSON.stringify({skill: 'teleport'}));

        },

        onGlitch: () => {

            WS.client.send(JSON.stringify({skill: 'glitch'}));

        },

        sync: () => {

            ['morph', 'teleport', 'glitch'].forEach(skill => {

                if (USER[skill] > 0) {

                    GUI.tool[skill].classList.add('cool-down');
                    GUI.tool[skill].children[2].innerHTML = (USER[skill] / 1000).toFixed(3);

                } else {

                    GUI.tool[skill].classList.remove('cool-down');
                    GUI.tool[skill].children[2].innerHTML = '<br>';

                }

            });

        }

    },

    total: {

        ms: 0,
        tr: 0,
        timestamps: [],

        init: () => {

            GUI.total.panel = document.getElementById('total');
            GUI.total.close = document.getElementById('total_close');
            GUI.total.score = document.getElementById('total_score');
            GUI.total.info = document.getElementById('total_info');

            GUI.total.visible(false);

            GUI.total.close.addEventListener('click', () => {

                GUI.total.visible(false);

            });

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

                GUI.total.score.innerHTML = html;

                // информация

                GUI.total.timestamps.push(Date.now());

                if (GUI.total.timestamps[GUI.total.timestamps.length - 1] - GUI.total.timestamps[0] > 1000) {

                    let s = 0;

                    for (let i = 1; i < GUI.total.timestamps.length; i++) s += GUI.total.timestamps[i] - GUI.total.timestamps[i - 1];

                    GUI.total.ms = s / (GUI.total.timestamps.length - 1);
                    GUI.total.tr = 1000 / GUI.total.ms;

                    GUI.total.timestamps = [];

                }

                let mouse = GAME.application.renderer.plugins.interaction.mouse.global;

                let x = Math.floor(mouse.x / CAMERA.scale) - LAYER.world.x;
                let y = Math.floor(mouse.y / CAMERA.scale) - LAYER.world.y;

                let wind = [
                    '□□□□',
                    '■□□□',
                    '■■□□',
                    '■■■□',
                    '■■■■'
                ];

                GUI.total.info.innerHTML = '' +

                    '<tr><th style="width: 40%">Цели</th>' +
                    '<tr><td>Игроки</td><td>' + WS.data.count.user + '</td>' +
                    '<tr><td>Боты</td><td>' + WS.data.count.bot + '</td>' +
                    '<tr><td>Здесь</td><td>' + WS.data.targets.length + '</td>' +
                    '<tr><td>Всего</td><td>' + (WS.data.count.user + WS.data.count.bot) + '</td>' +

                    '<tr><th>Авто</th>' +
                    '<tr><td>Здесь</td><td>' + WS.data.cars.length + '</td>' +
                    '<tr><td>Всего</td><td>' + WS.data.count.car + '</td>' +

                    '<tr><th>Дождь</th>' +
                    '<tr><td>Интенсивность</td><td>' + (WS.data.rain.power * 100).toFixed(2) + '%</td>' +
                    '<tr><td>Капли</td><td>' + LAYER.rain.children.length + '</td>' +
                    '<tr><td>Ветер</td><td>' + wind[WS.data.rain.wind] + '</td>' +

                    '<tr><th>Часы</th>' +
                    '<tr><td>Время</td><td>' + WS.data.sun.now + '</td>' +
                    '<tr><td>Солнце</td><td>' + Math.floor(WS.data.sun.value * 100) + '%</td>' +

                    '<tr><th>Соединение</th>' +
                    '<tr><td>Задержка</td><td>' + GUI.total.ms.toFixed(2) + '</td>' +
                    '<tr><td>Тикрейт</td><td>' + GUI.total.tr.toFixed(2) + '</td>' +

                    '<tr><th>Позиция</th>' +
                    '<tr><td>X</td><td>' + (USER.target ? USER.target.sprite.x : '?') + '</td>' +
                    '<tr><td>Y</td><td>' + (USER.target ? USER.target.sprite.y : '?') + '</td>' +

                    '<tr><th>Курсор</th>' +
                    '<tr><td>X</td><td>' + x + '</td>' +
                    '<tr><td>Y</td><td>' + y + '</td>';

            }

        }

    }

};