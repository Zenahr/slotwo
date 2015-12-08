(function() {
	'use strict';

	angular
		.module('app.level')
		.controller('LevelController', LevelController);

	LevelController.$inject = ['levelService', 'playerService', 'enemyService', '$scope', '$timeout', 'messageService', 'progressService'];

	/* @ngInject */
	function LevelController(levelService, playerService, enemyService, $scope, $timeout, messageService, progressService) {
		var vm = this;
		vm.title = 'LevelController';


		vm.currentLevel = levelService.treeOne;
		vm.currentLevel.checkLength();
		vm.player = playerService.player;
		vm.enemySpawn = false;
		vm.messageLog = messageService.messageLog;
		vm.mainMessage = messageService.mainMessage;

		vm.resetLevel = function() {
			vm.currentLevel = levelService.currentLevel;
			specialEnd();
			vm.unitArray = [playerService.player];
			vm.player.active = true;
			createAscii();
			initLevel();
			var spawn = [];
			spawn[0] = vm.currentLevel.playerSpawn[0];
			spawn[1] = vm.currentLevel.playerSpawn[1];
			vm.player.position = spawn;
		}
		vm.resetLevel();

		function specialEnd() {
			if (vm.currentLevel.specialEnd) {
				vm.player.specialEnd = vm.currentLevel.specialEnd;
			} else {
				vm.player.specialEnd = undefined;
			}
		}


		function initLevel() {
			if (typeof vm.currentLevel.spawnAtStart != 'undefined') {
				for (var i = 0; i < vm.currentLevel.spawnAtStart.length; i++) {
					spawnEnemyAtStart(vm.currentLevel.spawnAtStart[i]);
				}
			}
			else {
				vm.enemySpawn = true;
			}
		}

		function createAscii() {
			var ascii = [];
			for (var i = 0; i < vm.currentLevel.defaultAscii.length; i++) {
				ascii[i] = vm.currentLevel.defaultAscii[i];
			}
			console.log(vm.currentLevel.defaultAscii);
			vm.currentLevel.ascii = ascii;
			levelRenderArea();
		}

		function levelRenderArea() {
			var length = vm.currentLevel.ascii[0].length;
			if (vm.player.position[0] > 50 && vm.player.position[0] < length - 50) {
				var left = (vm.player.position[0] - 50)*8;
				var elem = document.getElementById('levelwrap');
				elem.style.left = '-' + left + 'px';
			}
		}

		var test = "test/test";
		test.split('//');
		var testvar = 0;
		function createEnemy() {
			var random = Math.round(Math.random()*100);
			if ((random > 0) && (testvar < 1)) {
				testvar = testvar + 1;
				var test = new vm.currentLevel.enemyArray[0];
				var spawn = [];
				spawn[0] = vm.currentLevel.enemySpawn[0];
				spawn[1] = vm.currentLevel.enemySpawn[1];
				test.position = spawn;
				vm.unitArray.push(test);
			}
		}

		function spawnEnemyAtStart(position) {
			var entity = new vm.currentLevel.enemyArray[0];
			var spawn = [];
			spawn[0] = position[0];
			spawn[1] = position[1];
			entity.position = spawn;
			vm.unitArray.push(entity);
		}


		function updateMap(unit, unitOld, map, unitSymbol, prevCheck) {
			if (!prevCheck) {
				map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], ' ');
				map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
			}
			else {
				map[unitOld[1]] = setCharAt(map[unitOld[1]], unitOld[0], '_');
				map[unit[1]] = setCharAt(map[unit[1]], unit[0], unitSymbol);
			}
		}


		function setCharAt(str,index,chr) {
			if (typeof str !== 'undefined') {
				if(index > str.length-1) return str;
				return str.substr(0,index) + chr + str.substr(index+1);
			}
		}

		function checkBig(unit) {
			if (typeof unit.colBox !== 'undefined') {
				for (var j = 1; j < unit.colBox[1] + 1; j++) {
					for (var i = 0; i < unit.colBox[0]; i++) {
						setCharAt();
						vm.currentLevel.ascii[unit.position[1] - j] = setCharAt(vm.currentLevel.ascii[unit.position[1] - j], unit.position[0] + i, ' ');
						vm.currentLevel.ascii[unit.position[1] - j] = setCharAt(vm.currentLevel.ascii[unit.position[1] - j], unit.position[0] - i, ' ');
					}
				}
			}
		}
		function autoKill(unit) {
			if (unit.position[0] == 0) {
				unit.alive = false;
			}
		}

		vm.count = 0;
		function levelLoop() {
			var dead = false;
			vm.count = vm.count + 1;
			if (vm.player.active) {
				for (var i = 0; i < vm.unitArray.length; i++) {
					vm.unitArray[i].collisionCheck(vm.currentLevel.ascii, vm.unitArray);
					if (i > 0) {
						autoKill(vm.unitArray[i]);
					}
					if (!vm.unitArray[i].alive) {
						messageService.addMessage(vm.unitArray[i].deathMessage);
						checkBig(vm.unitArray[i]);
						var newArray = [];
						for (var j = 0; j < vm.unitArray.length; j++) {
							if (j !== i) {
								newArray.push(vm.unitArray[j]);
							}
							else {
								updateMap(vm.unitArray[i].position, vm.unitArray[i].positionOld, vm.currentLevel.ascii, ' ', vm.unitArray[i].prevCheck);
								dead = true;
							}
						}
						vm.unitArray = newArray;
					}
					if (typeof vm.unitArray[i] !== 'undefined') {
						updateMap(vm.unitArray[i].position, vm.unitArray[i].positionOld, vm.currentLevel.ascii, vm.unitArray[i].symbol, vm.unitArray[i].prevCheck);
					}
					vm.currentEnemy = enemyService.currentEnemy;
				}
				if (vm.enemySpawn) {
					createEnemy();
				}
				levelRenderArea();
				$timeout(levelLoop, 125);
			}
			else if (vm.player.levelComplete) {
				if (vm.currentLevel.unlock) {
					progressService.progress.levels[vm.currentLevel.unlock] = true;
					console.log(vm.currentLevel.unlock);
					console.log(progressService.progress.levels[vm.currentLevel.unlock]);
				}
			}
		}

		activate();

		////////////////

		function activate() {
			levelLoop();
		}
	}
})();