(function() {
    'use strict';

    angular
        .module('app.main')
        .service('mainService', mainService);

    mainService.$inject = [];

    /* @ngInject */
    function mainService() {
    	var vm = this;
    	vm.setCharAt = function(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        }
        vm.click = function(ascii, data,  x, y, xlength, ylength) {
            for (var i = 0; i < ylength; i++) {
            	console.log(data);
                var before = '<span class = "click">' + ascii[y + i][x];
                var after = ascii[y + i][x + xlength] + '</span>';
                //after then before to not break order!
                ascii[y + i] = this.setCharAt(ascii[y + i], x + xlength, after);
                ascii[y + i] = this.setCharAt(ascii[y + i], x, before);
            }
        }

        vm.Location = function() {
    		
        };

        vm.treeCity = new vm.Location;
        vm.treeCity.name = 'Tree City';
		vm.treeCity.ascii = ["        ///////\\\\\\\\\\\\\\         //////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ ///////\\\\\\\\\\\\\\             |       |           |              ",                                                                        
							   "      /////////\\\\\\\\\\\\\\\\\\     ////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//////\\\\\\\\\\\\              |       |           |              ",                                                                        
							   "       ////////\\\\\\\\\\\\\\              |                   |    ///////\\\\\\\\\\\\\\             |       |     |     |              ",                                                                 
							   "    ///////////\\\\\\\\\\\\\\\\\\\\           |      |            |    ///////\\\\\\\\\\\\\\\\      .     |   |         |     |              ",                                                               
							   "  /////////////\\\\\\\\\\\\\\\\\\\\\\\\\\        |      |            |  /////////\\\\\\\\\\\\\\\\\\    / \\   .'   |         |     '.             ",                                                                          
							   "         |          |               |                   |   .    |    |          / \\  |                       |            ",                                                                        
							   "         |  |       |               |             |     |  / \\   |    |     .     |   |          ___          |      .     ",                                                
							   "         |      |   |              .'  |          |     '. / \\  .'    '.   / \\        |   |    .'   '.        |     / \\    ",                                                
							   "        /       |    \\    /\\   .  /               |       \\ |   |  __  |   / \\        |        |     |        |     / \\    ",                                                                         
							   "        |    _____   |   /  \\ / \\ |      _____            |     |  ||  |    |         /        /:___:\\     |   \\     |     ",                                                                        
							   "        |   |     |  |   /  \\ / \\ |     /     \\           |                      ...''        /:_____:\\    |    ''...      ",                                                                          
							   "________|___|     |__|____||___|__|_____|     |___________|___________________.''            /:_______:\\             ''.   ",                                                                           
							   "                                                                                             :_________:              '. ",                                                                   
							   "____________________________________________________________________  ____________________________________________________\\",                                                                    
							   "                                                                    \\ \\____                                                ",                                                                         
							   "                      ______________             ______________      \\____ \\                   .                           ",                                                                        
							   "                    .'   / \\        '.         .'           / \\'.         \\ \\____      ______ / \\  __________   ______ .__ ",                                                                        
							   "                   /      |     .     \\       /     .        |   \\         \\____ \\    /  ..  \\/ \\ /   ....   \\ / ...  / \\ \\",                                                                        
							   "                  /     .      / \\     \\     / .   / \\            \\             \\ \\___|  ||  |_|__|   |  |   |_| | |  / \\ |",                                                                        
							   "                 :     / \\     / \\      :   : / \\  / \\   .'''....' :             \\_____________________________________|___",                                                                            
							   "                 |     / \\      |       |   | / \\   |  .'          |                                                       ",                                                                        
							   "                 |      |               |   |  |      ;            |                                                       "]                                                                        
		vm.treeCity.initClicks = function() {
			vm.click(this.ascii, 'government', 92, 6, 12, 7);
			vm.click(this.ascii, 'slums', 83, 15, 40, 5);
			vm.click(this.ascii, 'minishop', 66, 8, 2, 2);
			vm.click(this.ascii, 'shop1', 40, 9, 7, 3);
			vm.click(this.ascii, 'shop2', 12, 9, 7, 3);
		}

		vm.treeSlums = new vm.Location;
		vm.treeSlums.name = 'Tree Slums';
		vm.treeSlums.initClicks = function() {
			vm.click(this.ascii, 'homeless', 105, 12, 5, 4);
			vm.click(this.ascii, 'tavern', 64, 11, 6, 5);
			vm.click(this.ascii, 'thugs', 42, 11, 13, 5);
		}

		this.treeSlums.ascii = ["            `                              ////\\\\\\\\                                                   ///\\\\\\                                      /////\\\\\\\\\\              ",                                                      
								"           `                                ///\\\\\\                                                   ////\\\\\\\\\\                                  ///////\\\\\\\\\\\\\\            ",                                                      
								"             `                            /////\\\\\\\\\                                                //////\\\\\\\\\\\\\\                                 //////\\\\\\\\\\\\\\            ",                                                      
								"           ___                             ////\\\\\\\\                                                //////\\\\\\\\\\\\                              ///////////\\\\\\\\\\\\\\\\\\         ",                                                      
								"          |   |                            ////\\\\\\\\                                              ////////\\\\\\\\\\\\\\\\\\                            //////////\\\\\\\\\\\\\\\\\\         ",                                                      
								"       ___|   |________________________ ///////\\\\\\\\\\\\\      _______________________________________///////\\\\\\\\\\\\\\\\                           ////////////\\\\\\\\\\\\\\\\\\\\\\\\      ",                                                                                           
								"      /         ~~~~~~                 \\///////\\\\\\\\\\\\      /            ~~~~                       \\/////\\\\\\\\\\\\\\_____________________________///////////\\\\\\\\\\\\\\\\\\\\\\       ",                                                            
								"     /    ~~~                ~~~~       \\//////\\\\\\\\\\\\\\\\   /   ~~~~                           ~~~    \\////\\\\\\\\\\\\/    ~~                    //////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\   ",                                                           
								"    /____________________________________\\   |  |        /___________________________________________\\  | |   /____________________________/////////////\\\\\\\\\\\\\\\\\\\\\\\\\\     ",                                                            
								"    |                                    |   |  |        |                                           |  | |   |                             ////////////\\\\\\\\\\\\\\\\\\\\\\       ",                                                          
								"    |    ____                   ____     |   |  |        |    __         __        __        __      |  | |   |                            /////////////\\\\\\\\\\\\\\\\\\\\\\\\\      ",                                                                    
								"    |   |    |                 |    |    |               |   |__|       |__|      |__|      |__|     |  | |   |                                     |    | |              ",                                                                
								"    |   |____|         ____    |____|    |    O     O    |        ____                               |        |     ___        _____         _____  |      |              ",                                                                
								"    |                 |    |             |   /|\\   /|\\   |       |    |        ___     ___           |       O|    |   |       |   |         |   |  |   |  |              ",                                                          
								"    |                 |o   |             |    |     |    |       |o   |       |___|   |___|          |      .||    |   |       |___|         |___|  |      |              ",                                                            
								"    |                 |    |             |   / \\   / \\   |       |    |                              |     __/|    |   |                            | |    |              ",                                                              
								"                                                                                                                                                    | |    |              ",                                                     
								"                                                                                                                                                    |    | |              ",                                              
								"                                                                                                                                                    |      |              "];                                                    
                                                                                                                                                                                                                     
                                                                                                                                                                                                                     
                                                                                                                                                                                                                           


		vm.treeShop = new vm.Location;
		vm.treeShop.name = 'Tree Shop';
		vm.treeShop.ascii = ['test location'];

		vm.switchLocation = function() {
			console.log('test');
		}
    }
})();