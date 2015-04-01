'use strict';

/**
 * @ngdoc function
 * @name slotwoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slotwoApp
 */
angular.module('slotwoApp')
  .controller('MainCtrl', function ($scope, $interval) {
  	$scope.rotate = false;

    var Monster = function() {
      this.isPlayer = false,
      this.armor =  0,
      this.damage = 5,
      this.armorPen = 0,
      this.health = 30,
      this.maxHealth = 100,
      this.cashDrop = 1,
      this.cashDropBase = 1,
      this.lootTable = ['gold'],
      this.alive = true,
      this.cashDropCalculate = function() {
        var random = Math.random() + 1;
        this.cashDrop = this.cashDropBase + (random * this.cashDropBase);
      },
      this.damageDealtCall = function() {
        $scope.battle.damageDealth(this.monster, $scope.player);
      }
    };

    var test = new Monster();
    console.log(test);

    $scope.battle = {
      'active': false,
      damageDealt: function(unit, enemy) {
        var effectiveArmor = enemy.armor - unit.armorPen;
        if (effectiveArmor <= 0) {
          effectiveArmor = 0;
        }
        var damage = unit.damage - effectiveArmor;
        return damage;
      },
      isDead: function(unit) {
        if (unit.health <= 0) {
          unit.alive = false;
          if (unit.isPlayer) {
            console.log('player is dead');
          }
          else {
            console.log('monster is dead');
          }
        }
      }
    }; 



  	$scope.player = {
      'isPlayer': true,
  		'armor': 0,
      'alive': true,
  		'health': 75,
      'maxHealth': 100,
  		'damage': 5,
  		'cash': 0,
      'cashPerTick': 1,
      cashUpdate: function() {
        this.cash = this.cash + this.cashPerTick;
      },
      damageDealtCall: function(currentMonster) {
        $scope.battle.damageDealth(this.player, currentMonster);
      },
      healthPercent: function() {
        var percent = (this.health / this.maxHealth)*100;
        return percent;
      },

      healthUpdate: function() {
        if (this.health < this.maxHealth) {
          this.health = this.health + 1;
          var percent = this.healthPercent();
          if (percent > 65) {
            $scope.healthWidth = {'background-color': 'green', 'width': percent + '%'};
            console.log('green');
          }
          else if (40 < percent) {
            $scope.healthWidth = {'background-color': 'orange', 'width': percent + '%'};
            console.log('orange');
          }
          else {
            $scope.healthWidth = {'background-color': 'red', 'width': percent + '%'};
            console.log('red');
          }
        }
      }
  	};

  	function update()  {
      $scope.player.cashUpdate();
      $scope.player.healthUpdate();
      if ($scope.rotate === true) {
        $scope.ascii.house = $scope.ascii.house2;
        $scope.rotate = false;
      }
      else {
        $scope.ascii.house = $scope.ascii.house1;
        $scope.rotate = true;
      }
  	}
  	$interval(update, 1000);



  	$scope.ascii = {};
    $scope.ascii.shopKeep = '                   \/\/\/\/^\\\\\\\\                     +\r\n                   + ^   ^ +                     |\r\n                  @ (o) (o) @                    |\r\n                   +   ^   +                     |\r\n                   +  ___  +                     |\r\n                    \\_____\/                      |\r\n                  ____+  +____                   |\r\n                 \/    \\__\/    \\                  |\r\n                \/              \\                 |\r\n               \/\\_\/+        +\\_\/\\                |\r\n              \/ \/  |        |  \\ \\               |\r\n             ( ^   |        |   ^ )              |\r\n+--------------+---+--------+---+----------------+\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n|                                                |\r\n+------------------------------------------------+\r\n';

    $scope.ascii.mainTitle = '   ____                    __   _     __     \r\n  \/ __\/__  ___ ________   \/ \/  (_)___\/ \/     \r\n _\\ \\\/ _ \\\/ _ `\/ __\/ -_) \/ \/__\/ \/ __\/ _ \\    \r\n\/___\/ .__\/\\_,_\/\\__\/\\__\/ \/____\/_\/\\__\/_\/\/_\/    \r\n   \/_\/____                        ___        \r\n     \/ __ \\__ _  ___ ___ ____ _  |_  |       \r\n    \/ \/_\/ \/  \' \\\/ -_) _ `\/ _ `\/ \/ __\/        \r\n    \\____\/_\/_\/_\/\\__\/\\_, \/\\_,_\/ \/____\/        \r\n                   \/___\/          ';

    $scope.ascii.house = $scope.ascii.house1;

  	$scope.ascii.house1 = '                           (   )     )                     \r\n                                                           \r\n                                                           \r\n                          (     )                          \r\n                             )                   \/\\        \r\n                            (                   \/  \\  \/\\   \r\n                    ________[_]________      \/\\\/    \\\/  \\  \r\n           \/\\      \/\\        ______    \\    \/   \/\\\/\\  \/\\\/\\ \r\n          \/  \\    \/\/_\\       \\    \/\\    \\  \/\\\/\\\/    \\\/    \\\r\n   \/\\    \/ \/\\\/\\  \/\/___\\       \\__\/  \\    \\\/                \r\n  \/  \\  \/\\\/    \\\/\/_____\\       \\ +[]+     \\                \r\n \/\\\/\\\/\\\/       \/\/_______\\       \\+__+      \\               \r\n\/      \\      \/XXXXXXXXXX\\                  \\              \r\n        \\    \/_I_II  I__I_\\__________________\\             \r\n               I_I+  I__I_____[]_+_[]_____I                \r\n               I_II  I__I_____[]_+_[]_____I                \r\n               I II__I  I     XXXXXXX     I                \r\n            ~~~~~\"   \"~~~~~~~~~~~~~~~~~~~~~~~~             \r\n';
    $scope.ascii.house2 = '                       (   )     \n                          \r\n                         (                                 \r\n                          (  )                             \r\n                               )                 \/\\        \r\n                            (                   \/  \\  \/\\   \r\n                    ________[_]________      \/\\\/    \\\/  \\  \r\n           \/\\      \/\\        ______    \\    \/   \/\\\/\\  \/\\\/\\ \r\n          \/  \\    \/\/_\\       \\    \/\\    \\  \/\\\/\\\/    \\\/    \\\r\n   \/\\    \/ \/\\\/\\  \/\/___\\       \\__\/  \\    \\\/                \r\n  \/  \\  \/\\\/    \\\/\/_____\\       \\ +[]+     \\                \r\n \/\\\/\\\/\\\/       \/\/_______\\       \\+__+      \\               \r\n\/      \\      \/XXXXXXXXXX\\                  \\              \r\n        \\    \/_I_II  I__I_\\__________________\\             \r\n               I_I+  I__I_____[]_+_[]_____I                \r\n               I_II  I__I_____[]_+_[]_____I                \r\n               I II__I  I     XXXXXXX     I                \r\n            ~~~~~\"   \"~~~~~~~~~~~~~~~~~~~~~~~~             \r\n';
  });


