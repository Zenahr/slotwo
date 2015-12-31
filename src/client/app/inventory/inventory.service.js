(function() {
    'use strict';

    angular
        .module('app.inventory')
        .service('inventoryService', inventoryService);

    inventoryService.$inject = [];

    /* @ngInject */
    function inventoryService() {
    	var vm = this;
		vm.itemDictionary = [];

		this.Item = function() {
			this.buyable = false,
			this.removeAfterBuy = false,
			this.craftTime = 5000,
			this.recipe  = undefined,
			this.quantity = 0,
			this.cat = 'default',
			this.spawn = undefined,
			this.name = "Default",
			this.slug = function() {
				var slug = this.name.toLowerCase();
				return slug;
			},
			this.effect = function() {
				console.log('does nothing');
			},
			this.craftWait = function() {
				var time = 5000;
				for (var i = 0; i < this.craftTime; i++) {
					if (i = this.craftTime - 1) {
						this.craft;
					}
					else {
						time = time - 1;
					}
				}
			},
			this.craft = function() {
				if (typeof this.recipe !== 'undefined') {
					var recipe = [];
					var err = 0;
					var testAmt = 5;
					for (var i = 0; i < this.recipe.length; i++) {
						recipe[i] = this.recipe[i].split('-');
						if (recipe[i][1] > vm.itemDictionary[recipe[i][0]][1][1]) {
							err = err + 1;
						}
					}
					//if err === 0 then we have enough resources, so craft
					if (err === 0) {
						for (var j = 0; j < recipe.length; j++) {
							vm.itemDictionary[recipe[j][0]][1][1] = vm.itemDictionary[recipe[j][0]][1][1] - recipe[j][1];
						}
						vm.itemDictionary[this.slug][1][1] = vm.itemDictionary[this.slug][1][1] + this.quant;
						return true;
					}
				}
			},
			this.attackSpeedMessage = function() {
				var message = '';
				if (this.attackSpeed === 2) {
					message = 'Average Speed';
				}
				else if (this.attackSpeed > 2) {
					message = 'Slow Speed';

				} else if (this.attackSpeed < 2) {
					message = 'Fast Speed';
				}
				return message;
			}
		};




		//weapons
		this.fists = new this.Item();
		this.fists.name = 'Fists';
		this.fists.desc = 'just some fists'
		this.fists.damage = 1;
		this.fists.attackSpeed = 1;
		this.fists.slug = 'fists';

		this.club = new this.Item();
		this.club.recipe = ['stick-1', 'grass-1', 'rock-1'];
		this.club.desc = 'This thing is a beast';
		this.club.cat = 'weapon';
		this.club.damage = 4;
		this.club.attackSpeed = 2;
		this.club.name = 'Club';
		this.club.slug = 'club';

		this.sword = new this.Item();
		this.sword.name = 'Sword';
		this.sword.desc = 'A wooden sword.';
		this.sword.recipe = ['wood-100'];
		this.sword.cat = 'weapon';
		this.sword.damage = 4;
		this.sword.attackSpeed = 2;
		this.sword.slug = 'sword';

		this.bearClaws = new this.Item();
		this.bearClaws.name = 'Bear Claws';
		this.bearClaws.desc = 'claws of a bear';
		this.bearClaws.damage = 3;
		this.bearClaws.attackSpeed = 1;
		this.bearClaws.slug = 'bearClaws';

		this.minotaurHammer = new this.Item();
		this.minotaurHammer.name = 'Minotaur Hammer';
		this.minotaurHammer.desc = 'minotaur hammer';
		this.minotaurHammer.damage = 20;
		this.minotaurHammer.attackSpeed = 5;
		this.minotaurHammer.slug = 'minotaurHammer';

		this.doubleShield = new this.Item();
		this.doubleShield.name = 'Double Shields';
		this.doubleShield.desc = 'Wield two shields at the same time!';
		this.doubleShield.damage = 0;
		this.doubleShield.attackSpeed = 999999999999;
		this.doubleShield.slug = 'doubleShield';
		this.doubleShield.armor = 100;

		this.swordShield = new this.Item();
		this.swordShield.name = 'Sword + Shield';
		this.swordShield.desc = 'Classic Combo';
		this.swordShield.damage = 2;
		this.swordShield.attackSpeed = 2;
		this.swordShield.slug = 'swordShield';
		this.swordShield.armor = 10;
		this.swordShield.buyable = true;
		this.swordShield.removeAfterBuy = true;
		this.swordShield.price = 1000;

		this.giantCarrot = new this.Item();
		this.giantCarrot.name = 'Giant Carrot';
		this.giantCarrot.desc = 'Formerly known as Garys nose';
		this.giantCarrot.damage = 5;
		this.giantCarrot.attackSpeed = 1;
		this.giantCarrot.slug = 'giantCarrot';
		this.giantCarrot.lootOnce = true;

		vm.itemDictionary['fists'] = [['item', this.fists], ['amount', 1]];
		vm.itemDictionary['club'] = [['item', this.club], ['amount', 0]];
		vm.itemDictionary['sword'] = [['item', this.sword], ['amount', 1]];
		vm.itemDictionary['bearClaws'] = [['item', this.bearClaws], ['amount', 1]];
		vm.itemDictionary['minotaurHammer'] = [['item', this.minotaurHammer], ['amount', 1]];
		vm.itemDictionary['doubleShield'] = [['item', this.doubleShield], ['amount', 1]];
		vm.itemDictionary['swordShield'] = [['item', this.swordShield], ['amount', 1]];
		vm.itemDictionary['giantCarrot'] = [['item', this.giantCarrot], ['amount', 1]];



		//armor
		this.clothArmor = new this.Item();
		this.clothArmor.name = 'Cloth Armor';
		this.clothArmor.armor = 0;
		this.clothArmor.slug = 'clothArmor';

		this.woodArmor = new this.Item();
		this.woodArmor.name = 'Wood Armor';
		this.woodArmor.desc = 'Hope for no splinters!';
		this.woodArmor.cat = 'armor';
		this.woodArmor.armor = 0.1;
		this.woodArmor.buyable = true;
		this.woodArmor.removeAfterBuy = true;
		this.woodArmor.recipe = ['wood-100'];
		this.woodArmor.unlock = 'boneArmor';
		this.woodArmor.price = 150;
		this.woodArmor.slug = 'woodArmor';

		this.boneArmor = new this.Item();
		this.boneArmor.name = 'Bone Armor';
		this.boneArmor.desc = 'Bonez';
		this.boneArmor.cat = 'armor';
		this.boneArmor.armor = 0.2;
		this.boneArmor.price = 300;
		this.boneArmor.removeAfterBuy = true;
		this.boneArmor.slug = 'boneArmor';

		this.polarArmor = new this.Item();
		this.polarArmor.name = 'Polarbear Furcoat';
		this.polarArmor.desc = 'Coat made from polerbear fur';
		this.polarArmor.armor = 0.3;
		this.polarArmor.slug = 'polarArmor';

		vm.itemDictionary['woodArmor'] = [['item', this.woodArmor], ['amount', 1]];
		vm.itemDictionary['boneArmor'] = [['item', this.boneArmor], ['amount', 0]];
		vm.itemDictionary['clothArmor'] = [['item', this.clothArmor], ['amount', 1]];
		vm.itemDictionary['polarArmor'] = [['item', this.polarArmor], ['amount', 1]];


		//resources
		this.food = new this.Item();
		this.food.name = 'Food';
		this.food.desc = 'Food for workers';

		this.ore = new this.Item();
		this.ore.name = 'Ore';
		this.ore.desc = 'Metal stuff';

		this.wood  = new this.Item();
		this.wood.desc = 'A slab of wood';
		this.wood.cat = 'ingredient';
		this.wood.name = 'Wood';
		this.wood.slug = 'wood';

		vm.itemDictionary['food'] = [['item', this.food], ['amount', 0]];
		vm.itemDictionary['ore'] = [['item', this.ore], ['amount', 0]];
		vm.itemDictionary['wood']  = [['item', this.wood], ['amount', 0]];


		//consumables
		this.potion = new this.Item();
		this.potion.name = 'Health Potion';
		this.potion.slug = 'potion';
		this.potion.desc = 'Heals ' + this.potion.strength + ' health';
		this.potion.buyable = true;
		this.potion.price = 100;
		this.potion.quantity = 10;

		vm.itemDictionary['potion'] = [['item', this.potion], ['amount', 10]];

		//other items
		this.winterCoat = new this.Item();
		this.winterCoat.name = 'Winter Sweater';
		this.winterCoat.slug = 'winterCoat';
		this.winterCoat.desc = 'Covered in cute deer and trees~';
		this.winterCoat.message = 'Keeps you warm and cozy so you can visit the snow wastes safely!';
		this.winterCoat.buyable = true;
		this.winterCoat.price = 1000;
		this.winterCoat.removeAfterBuy = true;

		this.wizardsHair = new this.Item();
		this.wizardsHair.name = 'Wizards Hair';
		this.wizardsHair.slug = 'wizardsHair';
		this.wizardsHair.desc = 'Rumored to grant the holder great luck.';
		this.wizardsHair.message = 'A lock of bushy Wizard hair.';
		this.wizardsHair.buyable = true;
		this.wizardsHair.price = 1000;
		this.wizardsHair.removeAfterBuy = true;

		this.deerAntlers = new this.Item();
		this.deerAntlers.name = 'Deer Antlers';
		this.deerAntlers.slug = 'deerAntlers';
		this.deerAntlers.desc = 'The latest in deer fashion';
		this.deerAntlers.message = 'Attacks cause +1 damage.';
		this.deerAntlers.lootOnce = true;

		this.snowmanHat = new this.Item();
		this.snowmanHat.name = 'Snowmans Hat';
		this.snowmanHat.slug = 'snowmanHat';
		this.snowmanHat.desc = 'No one will ever wear it as good as the snowman...';
		this.snowmanHat.message = 'Attacks cause +5 damage';
		this.snowmanHat.lootOnce = true;

		this.sleepingBag = new this.Item();
		this.sleepingBag.name = 'Deluxe Sleeping Bag';
		this.sleepingBag.slug = 'sleepingBag';
		this.sleepingBag.desc = 'Deluxe model is 23% cozier';
		this.sleepingBag.message = 'Allows you to sleep outside and rest anywhere';
		this.sleepingBag.buyable = true;
		this.sleepingBag.price = 2000;
		this.sleepingBag.removeAfterBuy = true;

		this.gorillaFoot = new this.Item();
		this.gorillaFoot.name = 'Lucky Gorilla Foot';
		this.gorillaFoot.slug = 'gorillaFoot';
		this.gorillaFoot.desc = 'Luckiest of all animal feet';
		this.gorillaFoot.message = 'Holder gains +5 gold a second';
		this.gorillaFoot.lootOnce = true;

		this.pocketSand = new this.Item();
		this.pocketSand.name = 'Pocket Sand';
		this.pocketSand.slug = 'pocketSand';
		this.pocketSand.desc = 'Wingo! Pocket sand!';
		this.pocketSand.message = '5% chance to evade damage.';
		this.pocketSand.lootOnce = true;

		this.lostSoul = new this.Item();
		this.lostSoul.name = 'Lost Soul';
		this.lostSoul.slug = 'lostSoul';
		this.lostSoul.desc = 'Victim of The Minotaur';
		this.lostSoul.message = 'RIP';
		this.lostSoul.lootOnce = true;

		vm.itemDictionary['']
		vm.itemDictionary['pocketSand'] = [['item', this.pocketSand], ['amount', 1]]
		vm.itemDictionary['gorillaFoot'] = [['item', this.gorillaFoot], ['amount', 0]];
		vm.itemDictionary['sleepingBag'] = [['item', this.sleepingBag], ['amount', 0]];
		vm.itemDictionary['snowmanHat'] = [['item', this.snowmanHat], ['amount', 0]];
		vm.itemDictionary['deerAntlers'] = [['item', this.deerAntlers], ['amount', 0]];
		vm.itemDictionary['winterCoat'] = [['item', this.winterCoat], ['amount', 0]];
		vm.itemDictionary['wizardsHair'] = [['item', this.wizardsHair], ['amount', 0]];


		//misc
		this.forge = new this.Item();
		this.forge.name = 'Forge';
		this.forge.slug = 'forge';
		this.forge.recipe = ['wood-50', 'ore-250'];

		this.campfire = new this.Item();
		this.campfire.name = 'Campfire';
		this.campfire.slug = 'campfire';
		this.campfire.recipe = ['wood-10'];

		this.compendium = new this.Item();
		this.compendium.name = 'Beast compendium';
		this.compendium.slug = 'compendium';
		this.compendium.buyable = true;
		this.compendium.price = 1000;
		this.compendium.removeAfterBuy = true;

		vm.itemDictionary['campfire'] = [['item', this.campfire], ['amount', 0]];
		vm.itemDictionary['forge'] = [['item', this.forge], ['amount', 0]];
		vm.itemDictionary['compendium'] = [['item', this.compendium], ['amount', 0]];


		////////////////

		vm.otherItems = [vm.itemDictionary['winterCoat'],
						 vm.itemDictionary['deerAntlers'],
						 vm.itemDictionary['wizardsHair'],
						 vm.itemDictionary['snowmanHat'],
						 vm.itemDictionary['sleepingBag'],
						 vm.itemDictionary['gorillaFoot'],
						 vm.itemDictionary['pocketSand']];

		vm.buyableItems = ['potion', 
						   'swordShield', 
						   'wood', 
						   'boneArmor', 
						   'winterCoat', 
						   'wizardsHair', 
						   'compendium',
						   'sleepingBag'];

		vm.weapons = [vm.itemDictionary['fists'],
					  vm.itemDictionary['club'], 
					  vm.itemDictionary['sword'],
					  vm.itemDictionary['bearClaws'],
					  vm.itemDictionary['minotaurHammer'],
					  vm.itemDictionary['swordShield'],
					  vm.itemDictionary['doubleShield'],
					  vm.itemDictionary['giantCarrot']];


		vm.armor = [vm.itemDictionary['clothArmor'],
					vm.itemDictionary['woodArmor'],
					vm.itemDictionary['boneArmor'],
					vm.itemDictionary['polarArmor']];

		vm.trinkets = [];

		vm.helm = [];



		// function findWeapons() {
		// 	var length = Object.keys(vm.itemDictionary).length;
		// 	for (var i = 0; i < length; i++) {
		// 		console.log(vm.itemDictionary[0])
		// 		// if (vm.itemDictionary[i][0][1].cat == 'weapon') {
		// 		// 	console.log(vm.itemDictionary[0][1].name);
		// 		// }
		// 		// else {
		// 		// 	console.log(vm.itemDictionary[0][1].cat);
		// 		// }
		// 	}
		// }
		// findWeapons();
    }
})();