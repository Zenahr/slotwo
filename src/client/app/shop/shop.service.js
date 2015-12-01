(function() {
    'use strict';

    angular
        .module('app.shop')
        .service('shopService', shopService);

    shopService.$inject = ['playerService', 'inventoryService'];

    /* @ngInject */
    function shopService(playerService, inventoryService) {
    	var vm = this;

    	vm.initShop = function() {
    		createShopList();
    	}

        vm.initPurchase = function(item) {
            checkBalance(item);
        }

        ////////////////

        function createShopList() {
            vm.shopList = [];
        	for (var i = 0; i < inventoryService.masterItemList.length; i++) {
        		var key = inventoryService.masterItemList[i];
        		var thisItem = inventoryService.itemDictionary[key][0][1];
        		if (thisItem.buyable) {
        			vm.shopList.push(thisItem);
        		}
        	}
 		}

        function checkBalance(item) {
        	if (item.price > playerService.player.money) {
        		console.log('not enough money');
        	} else {
        		subtractCost(item);
        		addToInventory(item);
        	}
        }

        function subtractCost(item) {
        	playerService.player.money = playerService.player.money - item.price;
            console.log(playerService.player.money);
        }

        function addItem(item) {
        	if (typeof item.unlock !== 'undefined') {
        		inventoryService.itemDictionary[item.unlock][0][1].buyable = true;
        	}
        }

		function removeItem(item) {
			if (item.removeAfterBuy) {
				item.buyable = false;
                displayNextItem(item);
                createShopList();
			}
        }

        function displayNextItem(item) {
            if (typeof item.unlock !== 'undefined') {
                inventoryService.itemDictionary[item.unlock][0][1].buyable = true;
            }
        }

        function increasePrice(item) {

        }

        function addToInventory(item) {
        	item.quantity = item.quantity + 1;
            removeItem(item);
        }

    }
})();