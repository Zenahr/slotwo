(function () {
    'use strict';

    angular
        .module('app.battle')
        .controller('BattleController', BattleController);

    BattleController.$inject = ['$scope'];


    /* @ngInject */
    function BattleController($scope) {
        var vm = this;
        vm.count = 0;
        vm.level = [];

        vm.test = [
        
        "           _______    ____                                                                             ",
        "-----------------------------\\                                                                                           ",
        "                              \\__                                                                                        ",
        "    __        ..         __      \\__        ..        __        __        ..        __--------------------------111111111",
        "                                    `--..--`  `--..--`  `--..--`  `--..--`  `--..--`  `                                   "
        ];

        vm.test2 = ["                                                                                                                                  ",
                    "                                                                                                                                  ",
                    "=================================================================================================================================="]
        // x, y
        var player = [0, 0];
        var playerOld = [0, 0];
        var grounded = false;

        function updatePosition(unit, unitOld, x, y) {
            unitOld[0] = unit[0];
            unitOld[1] = unit[1];
            unit[1] = unit[1] + y;
            unit[0] = unit[0] + x;
        }


        function updateMap(unit, unitOld, map, unitSymbol) {
            map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], ' ');
            map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
        }

        function prevTile(unitOld, map) {
            map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], '_');
        }

        function checkLevelEnd(unit, map) {
            if (map[unit[1]].length <= unit[0]) {
                console.log('level end');
                return true;
            }
        }

        function battle(unit, enemy, map) {
            if (count % enemy.attackSpeed) {
                unit.health = unit.health = enemy.damage;
                console.log(unit.health);
            }
            if (count % unit.attackSpeed == 0) {
                enemy.health = enemy.health - unit.damage;
                console.log(enemy.health);
            }
            if (enemy.health <= 0) {
                console.log('enemy dead');

            }
            if (unit.health <= 0) {
                console.log('player dead');
            }
            enemy.death(map);
        }
        var count = 0;

        function setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        }

        function spawnEnemy() {
            var random = Math.round(Math.random()*100);
            if (random > 95) {
                console.log('hello');
            }

        }

        var Unit = function() {
            //combat
            this.collisionCheck = function(map) {
                var current = this;
                if (current.alive) {
                    if (checkLevelEnd(current.position, map)) {
                        return;
                    }
                    if (current.grounded) {
                        current.grounded = false;
                        var groundedLastTurn = true;
                    }
                    //collission detection y
                    if ((map[current.position[1] + 1][current.position[0]] == ' ') && !current.prevCheck) {
                        updatePosition(current.position, current.positionOld, 0, 1);
                    }
                     //collision detection x
                    else if (map[current.position[1]][current.position[0] + current.speed] == ' ') {
                        updatePosition(current.position, current.positionOld, current.speed, 0);
                    }
                    //collision detection with replacable tiles
                    else if (map[current.position[1]][current.position[0] + current.speed] == '_') {
                        current.prev = true;
                        updatePosition(current.position, current.positionOld, current.speed, 0);
                    }
                    else if (map[current.position[1]][current.position[0] + current.speed] == 'Y') {
                        battle(player, current, map);
                        var inCombat = true;
                    }
                    else {
                        setTimeout(function() {
                            var wait = true;
                        }, 1000);
                    }
                    //move up and over if nothing else possible
                    // else {
                    //     updatePosition(unit.position, unit.positionOld, unit.speed, -1);
                    // }
                    if (!inCombat) {
                        updateMap(current.position, current.positionOld, map, current.symbol);
                    }
                    if (current.prevCheck) {
                        prevTile(current.positionOld, map);
                    }
                    if (current.prev) {
                        current.prevCheck = true;
                        current.prev = false;
                    }
                    else {
                        current.prevCheck = false;
                    }
                    $scope.$apply();
                    setTimeout(function() {
                        spawnEnemy()
                        current.collisionCheck(map);
                    }, 120);
                }   
                else {
                    return;
                }
            },
            this.ground = false,
            this.attackSpeed = 1;
            this.health = 10,
            this.maxHealth = 10,
            this.damage = 1,
            this.alive = true,
            //movement
            this.prev = false;
            this.prevCheck = false;
            this.speed = 1;
            this.position = [0, 0];
            this.positionOld = [0, 0];
            this.initPosition = function() {
                this.positionOld = this.position;
            },
            //other
            this.name = 'default',
            this.desc = 'default desc'
        };

        var Player = function Player() {
            this.name = 'Player',
            this.symbol = 'Y',
            this.desc = 'This is you'
        };
        Player.prototype = new Unit();
        var player = new Player();
        player.collisionCheck(vm.test2);
        console.log(player);

        var Enemy = function Enemy() {
            this.speed = -1,
            this.death = function(map) {
                if (this.health <= 0) {
                    this.alive = false;
                    this.itemDrop();
                    this.moneyDrop();
                    this.health = this.fullHealth;
                    console.log(map[this.position[1]][this.position[0]])
                    map[this.position[1]] =  setCharAt(map[this.position[1]], this.position[0], '');
                    console.log(map[this.position[1]][this.position[0]]);
                } 
            },
            this.itemDrop = function() {
                var random = Math.round(Math.random()*100);
                if (random <= this.itemChance) {
                    console.log('item dropped');
                }
            }
            this.moneyDrop = function() {
                var cash = Math.round(this.moneyMult * ( Math.random() + 1));
                console.log(cash);
            },
            this.position = [90, 0]
        };
        Enemy.prototype = new Unit();


        var Snake = function Snake() {
            this.fullHealth = 25;
            this.health = 25;
            this.damage = 1;
            this.name = 'Snake';
            this.desc = "A scary snake";
            this.symbol = 'S';
        };
        Snake.prototype = new Enemy();
        
        var snake = new Snake();
        snake.fullHealth = 25;
        snake.health = 25;
        snake.damage = 1;
        snake.name = 'Snake';
        snake.desc = "A scary snake";
        snake.symbol = 'S';
        snake.position[50, 0];
        snake.positionOld[50, 0];
        snake.collisionCheck(vm.test2);
        console.log(snake);


        activate();






        ////////////////

        function activate() {
        }
    }
})();