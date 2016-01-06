(function() {
    'use strict';

    angular
        .module('app.dialogue')
        .service('dialogueService', dialogueService);

    dialogueService.$inject = ['progressService', 'monkService', 'playerService', 'resourcesService'];

    /* @ngInject */
    function dialogueService(progressService, monkService, playerService, resourcesService) {
        var vm = this;
        vm.locationText = '';
        vm.progress = progressService.progress;
        vm.player = playerService.player;

        vm.Dialogue = function() {
            //return intro by default
            this.initDialogue = function() {
                return 'introduction';
            };
        };

        //Dialogue function purposes

        //initDialogue : sets initial dialogue on location switch
        //setDialogue : set up for the dialogue, runs to grab conditional changes for dialogue


        //init&reset quiz results for elder quiz
        function initQuiz() {
            var results = {
                offense: 0,
                defense: 0,
                healing: 0
            };
            return results;
        }

        //arena dialogue
        vm.arena = new vm.Dialogue();
        vm.arena.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Welcome to the arena!  I am Abner; Owner, showman, and gentleman!  We are still taking contestants for tonights show if you are interested.  Defeat your opponent and win passage across The Bridge!  Or, if you just need to train, I can hook you up.',
                    buttons: {
                        fight: {
                            text: 'I am here to fight.',
                            next: 'fight',
                            active: true,
                            master: 'arena'
                        },
                        train: {
                            text: 'Hook me up with training!',
                            next: 'train',
                            active: !vm.progress.freeSample,
                            master: 'arena'
                        },
                        buy: {
                            text: 'I need some more training formula (' + resourcesService.resources.milkPrice + 'g)',
                            next: 'buy',
                            active: vm.progress.freeSample&&resourcesService.canBuyMilk(),
                            master: 'arena'
                        },
                        notEnoughMoney: {
                            text: 'I need some more training formula (' + resourcesService.resources.milkPrice + 'g)',
                            next: 'notEnoughMoney',
                            active: vm.progress.freeSample&&!resourcesService.canBuyMilk(),
                            master: 'arena'
                        },
                        secret: {
                            text: 'Whats the secret to the formula?',
                            next: 'secret',
                            active: vm.progress.freeSample&&!vm.progress.signedNDA,
                            master: 'arena'
                        },
                        skeleton: {
                            text: 'Are you a skeleton?',
                            next: 'skeleton',
                            active: true,
                            master: 'arena'
                        }
                    }
                },
                notEnoughMoney: {
                    text: 'Sorry! You are going to need more money than that.  Current price is ' + resourcesService.resources.milkPrice + '.',
                    continue: true,
                    next: 'introduction',
                    master: 'arena',
                    special: function() {
                        vm.initAllDialogues();
                    }
                },
                secret: {
                    text: 'I will only share my secret once you sign this NDA!  I cant risk a product this good.',
                    buttons: {
                        sign: {
                            text: 'Sign the NDA',
                            next: 'sign',
                            master: 'arena',
                            active: true
                        },
                        refuse: {
                            text: 'Im not signing anything.',
                            next: 'refuse',
                            master: 'arena',
                            active: true
                        }
                    }
                },
                buy: {
                    text: 'Alright one bottle coming up!',
                    next: 'introduction',
                    continue: true,
                    master: 'arena',
                    special: function() {
                        vm.player.baseHealth = vm.player.baseHealth + 50;
                        vm.player.calculateTotalHealth();
                        resourcesService.raiseMilkPrice();
                        vm.initAllDialogues();
                    }
                },
                refuse: {
                    text: 'Your loss!  Ill keep this NDA handy if you change your mind.',
                    next: 'introduction',
                    master: 'arena',
                    active: true,
                    continue: true
                },
                sign: {
                    text: 'Alright heres the scoop.  You know the animal "cow" right?  Well I found that lady cows can excreet white fluid.  I took a drink of it and I was in utter shock!  Every glass of this stuff makes you healthier.  My bones have never been stronger!',
                    next: 'introduction',
                    continue: true,
                    master: 'arena',
                    special: function() {
                        vm.progress.signedNDA = true;
                        vm.initAllDialogues();
                    }
                },
                fight: {
                    text: 'The match tonight is against a swarm of Giant Bugs!  Win your match and you gain passage to The Bridge.  Its a fullhouse tonight, give them a show!',
                    continue: true,
                    level: 'arena'
                },
                train: {
                    text: 'Splendid! Here is a free sample of my special training formula, after that one I will have to charge you gold.  Drink up!',
                    continue: true,
                    next: 'introduction',
                    master: 'arena',
                    special: function() {
                        playerService.player.baseHealth = playerService.player.baseHealth + 50;
                        playerService.player.calculateTotalHealth();
                        vm.progress.freeSample = true;
                        vm.initAllDialogues();
                    }
                },
                skeleton: {
                    text: 'Why yes I am.  You dont have a problem with that do you?',
                    continue: true,
                    master: 'arena',
                    next: 'introduction'
                }
            };
            return dialogue;
        };

        //wizard in bear dialogue
        vm.wizard = new vm.Dialogue();
        vm.wizard.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'wizard introduction',
                    continue: true,
                    next: 'question',
                    master: 'wizard'
                },
                question: {
                    text: 'wizard question',
                    buttons: {
                        hair: {
                            text: 'Is this genuine Wizard hair?',
                            next: 'hair',
                            master: 'wizard',
                            active: true
                        },
                        whatsItLike: {
                            text: 'Whats it like to be a wizard?',
                            next: 'whatsItLike',
                            master: 'wizard',
                            active: true
                        },
                        
                    }
                }
            };
            return dialogue;
        };

        vm.treeKing = new vm.Dialogue();
        vm.treeKing.initDialogue = function() {
            if (!vm.progress.treeKingIntro) {
                return 'introduction';
            }
            else {
                return 'question';
            }
        };
        vm.treeKing.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Greetings, I am King Treemaster.  Welcome to our city, outsider.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingIntro = true;
                    }
                },
                question: {
                    text: 'Now, what can I do for you?',
                    buttons : {
                        workAccepted: {
                            text: 'Missing travelers',
                            next: 'askWorkAccepted',
                            master: 'treeKing',
                            active: vm.progress.treeKingWorkAccept
                        },
                        work: {
                            text: 'Any work you need done?',
                            next: 'askWork',
                            master: 'treeKing',
                            active: !vm.progress.treeKingWorkAccept
                        },
                        rumor: {
                            text: 'Rumors in the area',
                            next: 'askRumor',
                            master: 'treeKing',
                            active: true
                        },
                        compliment: {
                            text: 'Compliment',
                            next: 'askCompliment',
                            master: 'treeKing',
                            active: vm.progress.treeKingCompliment
                        }
                    }
                },
                askRumor: {
                    text: 'Things have been weird since the sky attacked.  Scouts have been going missing and there is even word of weather change in the east.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true
                },
                askCompliment: {
                    text: 'Flattery will get you nowhere with me, outsider.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingCompliment = false;
                        vm.treeKing.dialogue = vm.treeKing.setDialogue();
                    }
                },
                askWork: {
                    text: 'Yes, there are some things we need done.  Lately we have had an issue with travelers going missing in the forest. It has caused our trade to slow down and people are starting to feel the shortage of goods.  One of our scouts reported seeing something to the desert north of the forest, perhaps you can start there?',
                    buttons: {
                        accept: {
                            text: 'I will find the missing villagers',
                            next: 'askWorkAccept',
                            master: 'treeKing',
                            active: true
                        },
                        refuse: {
                            text: 'This type of work is beneath me',
                            next: 'askWorkRefuse',
                            master: 'treeKing',
                            active: true
                        }
                    }
                },
                askWorkAccept: {
                    text: 'Great! Please let me know if you find anything.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingWorkAccept = true;
                        vm.progress.levels.desert = true;
                        vm.treeKing.dialogue = vm.treeKing.setDialogue();
                    }
                },
                askWorkRefuse: {
                    text: 'Well.  It is unfortunate you feel that way, however, this is the only work I have for an outsider.',
                    buttons: {
                        accept: {
                            text: 'Alright.. I will search the desert.',
                            next: 'askWorkAccept',
                            master: 'treeKing',
                            active: true
                        }
                    }
                },
                askWorkAccepted: {
                    text: 'Any news from your search in the desert?',
                    buttons: {
                        yes: {
                            text: 'news',
                            next: 'askWorkComplete',
                            master: 'treeKing',
                            active: vm.progress.levels.ruinsCleared
                        },
                        no: {
                            text: 'Not yet',
                            next: 'askWorkIncomplete',
                            master: 'treeKing',
                            active: !vm.progress.levels.ruinsCleared
                        }
                    }
                },
                askWorkComplete: {
                    text: 'finish quest',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingWorkHandIn = true;
                    }
                },
                askWorkIncomplete: {
                    text: 'I see.  Please act with haste, I dont want anyone else to go missing.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true
                }
            };
            return dialogue;
        };

        vm.enchant = new vm.Dialogue();
        vm.enchant.initDialogue = function() {
            if (vm.progress.elderMet) {
                return 'welcome';
            }
            else {
                return 'introduction';
            }
        };
        vm.enchant.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Welcome young one. As you may know, I am known as The Elder of Tresabor.  Come in, come in.  Let us have some tea and speak.',
                    continue: true,
                    next: 'choice',
                    master: 'enchant',
                    special: function() {
                        vm.progress.elderMet = true;
                    }
                },
                welcome: {
                    text: 'Welcome back, let us continue our discussion.',
                    continue: true,
                    next: 'choice',
                    master: 'enchant'
                },
                choice: {
                    text: 'What wisdom can I offer you?',
                    buttons: {
                        memory: {
                            text: 'I lost my memory.',
                            next: 'memory',
                            master: 'enchant',
                            active: !vm.progress.quizTaken
                        },
                        elder: {
                            text: 'Is "The Elder" a title?',
                            next: 'elder',
                            master: 'enchant',
                            active: true
                        },
                        train: {
                            text: 'How can I become stronger',
                            next: 'train',
                            master: 'enchant',
                            active: true
                        }
                    }
                },
                train: {
                    text: 'If you need to become stronger, you need to train.  An old friend of mine is living in the mountains.  He can help you learn new abilities.  If you just want to get tougher, the arena will get you in top shape.',
                    next: 'choice',
                    master: 'enchant',
                    continue: 'true'
                },
                memory: {
                    text: 'I see.  Memory loss is very difficult to handle.  I can help you along but I cannot restore your memories.  What I can do is guide you to your true self.',
                    next: 'quizIntro',
                    continue: true,
                    master: 'enchant',
                    special: function() {
                        vm.quiz = initQuiz();
                    }
                },
                quizIntro: {
                    text: 'Very well.  I have a few questions that will help us find your true self.  The first question is: You are walking along when you see a man beating a child, what do you do?',
                    buttons: {
                        offense: {
                            text: 'I punch the man in the face!',
                            next: 'quizTwo',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.offense = vm.quiz.offense + 1;
                            }
                        },
                        defense: {
                            text: 'I run in and block the mans next punch.',
                            next: 'quizTwo',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.defense = vm.quiz.defense + 1;
                            }
                        },
                        health: {
                            text: 'I grab the child and find them a better home.',
                            next: 'quizTwo',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.healing = vm.quiz.healing + 1;
                            }
                        }
                    }
                },
                quizTwo: {
                    text: 'Next question: If you had to choose an animal to be, which animal would you choose?',
                    buttons: {
                        turtle: {
                            text: 'A turtle of course!',
                            next: 'quizThree',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.defense = vm.quiz.defense + 1;
                            }
                        },
                        lion: {
                            text: 'The Mountain Lion',
                            next: 'quizThree',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.offense = vm.quiz.offense + 1;
                            }
                        },
                        elephant: {
                            text: 'An Elephant',
                            next: 'quizThree',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.healing = vm.quiz.healing + 1;
                            }
                        }
                    }
                },
                quizThree: {
                    text: 'Only two more questions: A thief is running towards you down an alley, how do you stop him?',
                    buttons: {
                        healing: {
                            text: 'I chase the thief.  My stamina will beat his.',
                            next: 'quizFinal',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.healing = vm.quiz.healing + 1;
                            }
                        },
                        offense: {
                            text: 'I catch the thief, I can outrun him.',
                            next: 'quizFinal',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.offense = vm.quiz.offense + 1;
                            }
                        },
                        defense: {
                            text: 'I brace myself and block his path, he has nowhere to run.',
                            next: 'quizFinal',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.defense = vm.quiz.defense + 1;
                            }
                        }
                    }
                },
                quizFinal: {
                    text: 'Last question: A destitute youth wanders your way, what lesson do you teach him to obtain a better life?',
                    buttons: {
                        offense: {  
                            text: 'The power of strength.  You can obtain anylife with enough power.',
                            next: 'result',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.offense = vm.quiz.offense + 1;
                            }
                        },
                        healing: {
                            text: 'Kindness, the knowledge that only compassion will bring happiness.',
                            next: 'result',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.healing = vm.quiz.healing + 1;
                            }
                        },
                        defense: {
                            text: 'Resolve.  No one can stop you if you are determined enough.',
                            next: 'result',
                            master: 'enchant',
                            active: true,
                            special: function() {
                                vm.quiz.defense = vm.quiz.defense + 1;
                            }
                        }
                    }
                },
                result: {
                    continue: true,
                    next: 'choice',
                    master: 'enchant',
                    specialText: function() {
                        var text = vm.enchant.dialogue.result.special();
                        return text;
                    },
                    special: function() {
                        var top = [vm.quiz.offense, 'offense'];
                        if (top[0] < vm.quiz.defense) {
                            top = [vm.quiz.defense, 'defense'];
                        }
                        if (top[0] < vm.quiz.healing) {
                            top = [vm.quiz.healing, 'health'];
                        }
                        //find trueSelf var for item init
                        var trueSelf = top[1];
                        trueSelf = trueSelf.charAt(0).toUpperCase() + trueSelf.slice(1);
                        trueSelf = 'true' + trueSelf;
                        vm.player.trueSelf(trueSelf);
                        //find text for dialogue
                        var text = vm.enchant.dialogue.result.pickText(top[1]);
                        vm.progress.quizTaken = true;
                        vm.initAllDialogues();
                        vm.player.trueSelf[top[1]] = true;
                        return text;
                    },
                    pickText: function(top) {
                        var text = '';
                        if (top === 'offense') {
                            text = 'Alright lets figure out these results... Ah yes, it seems you prefer to take the offensive.  You will find great power and strength in the future.';
                        }
                        else if (top === 'defense') {
                            text = 'Oh my, you must prefer to stand your ground instead of fighting.  Your physical and mental defenses will be top quality.';
                        }
                        else if (top === 'health') {
                            text = 'Ahh.. Your true self is leaking kindness.  You will find great friendships and you be in great health.';
                        }
                        return text;
                    }
                },
                elder: {
                    text: 'Yes, "The Elder" is granted as a title and position to Tresaboras oldest citizen.  Currently, that is me of course!  I have served as The Elder for 29 years now, I was 137 at the time.',
                    buttons: {
                        old: {
                            text: 'Wow you are old!',
                            next: 'old',
                            active: true,
                            master: 'enchant'
                        },
                        lie: {
                            text: 'I am 378 years old. I am The Elder now.',
                            next: 'lie',
                            active: true,
                            master: 'enchant'
                        },
                        thank: {
                            text: 'Thank you for the explanation.',
                            next: 'thank',
                            active: true,
                            master: 'enchant'
                        }
                    }
                },
                thank: {
                    text: 'You are welcome outsider.  I hope you are enjoying the tea.',
                    next: 'choice',
                    master: 'enchant',
                    continue: true
                },
                old: {
                    text: 'Haha yes I am!',
                    continue: true,
                    next: 'choice',
                    master: 'enchant'
                },
                lie: {
                    text: 'Hm.  It would be wise not to lie young one.  You cannot fool me.',
                    buttons: {
                        joke: {
                            text: 'It was a joke!',
                            next: 'joke',
                            master: 'enchant',
                            active: true
                        },
                        sorry: {
                            text: 'Sorry for lying',
                            next: 'sorry',
                            master: 'enchant',
                            active: true
                        }
                    }
                },
                joke: {
                    text: 'Whatever you need to tell yourself.',
                    next: 'choice',
                    continue: true,
                    master: 'enchant'
                },
                sorry: {
                    text: 'I accept your apology, but please do not lie.',
                    next: 'choice',
                    continue: true,
                    master: 'enchant'
                }
            };
            return dialogue;
        };

        vm.monk = new vm.Dialogue();
        vm.monk.checkLearn = function() {
            var learn = false;
            if (vm.progress.canLearn > 0) {
                learn = true;
            }
            return learn;
        };
        vm.monk.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Hey, what are you doing in my cave?',
                    continue: true,
                    next: 'question',
                    master: 'monk'
                },
                question: {
                    text: 'Well, what do you want?',
                    buttons: {
                        angry: {
                            text: 'This is the great monk? I am unimpressed.',
                            next: 'angry',
                            master: 'monk',
                            active: true
                        },
                        why: {
                            text: 'Why did you become a monk?',
                            next: 'why',
                            master: 'monk',
                            active: true
                        },
                        train: {
                            text: 'Can you teach me?',
                            next: 'train',
                            master: 'monk',
                            active: vm.monk.checkLearn()
                        },
                        trainMore: {
                            text: 'When can I learn more?',
                            next: 'trainMore',
                            master: 'monk',
                            active: !vm.monk.checkLearn()
                        }
                    }
                },
                trainMore: {
                    text: 'You are not ready yet my student.  Check back later.',
                    next: 'question',
                    master: 'monk',
                    continue: true
                },
                why: {
                    text: 'I am just a guy who is a monk for fun.',
                    continue: true,
                    next: 'question',
                    master: 'monk'
                },
                train: {
                    text: 'Hmm, yes I can teach you.  What ability would you like to learn?',
                    buttons: {
                        battle: {
                            text: 'Berserk',
                            master: 'monk',
                            next: 'battleLearn',
                            active: !vm.progress.berserk
                        },
                        defense: {
                            text: 'Shield',
                            master: 'monk',
                            next: 'defenseLearn',
                            active: !vm.progress.shield
                        },
                        health: {
                            text: 'Healing',
                            master: 'monk',
                            next: 'healthLearn',
                            active: !vm.progress.healing
                        },
                        nothing: {
                            text: 'Nothing for now',
                            next: 'question',
                            master: 'monk',
                            active: true
                        }
                    }
                },
                battleLearn: {
                    text: 'Ok! You can now use Berserk, it will double your damage for a short time! Pretty cool huh?',
                    master: 'monk',
                    next: 'question',
                    continue: true,
                    special: function() {
                        monkService.train('battle');
                        vm.progress.berserk = true;
                        vm.initAllDialogues();
                    }
                },
                defenseLearn: {
                    text: 'Alright you can now use Shield.  It will stop any damage for a short period of time, no matter how strong.',
                    master: 'monk',
                    next: 'question',
                    continue: true,
                    special: function() {
                        monkService.train('defense');
                        vm.progress.shield = true;
                        vm.initAllDialogues();
                    }
                },
                healthLearn: {
                    text: 'So you want to heal more right?  Well you can use Heal now.  It will give you a burst of health over a few seconds.',
                    master: 'monk',
                    next: 'question',
                    continue: true,
                    special: function() {
                        monkService.train('health');
                        vm.progress.healing = true;
                        vm.initAllDialogues();
                    }
                },
                angry: {
                    text: 'fight text',
                    buttons: {
                        sorry: {
                            text: 'Sorry',
                            next: 'sorry',
                            master: 'monk',
                            active: true
                        },
                        fight: {
                            text: 'Fight me',
                            next: 'fight',
                            master: 'monk',
                            active: true
                        }
                    }
                },
                fight: {
                    text: '*The monk knocks you out instantly, you didnt stand a chance.*',
                    next: 'question',
                    master: 'monk',
                    special: function() {
                        vm.player.health = 0;
                    },
                    continue: true
                },
                sorry: {
                    text: 'Alright, Ill let it go this time.',
                    continue: true,
                    next: 'question',
                    master: 'monk'
                }
            };
            return dialogue;
        };


        vm.slumThugs = new vm.Dialogue();
        vm.slumThugs.initDialogue = function() {
            if (vm.progress.slumBossMet) {
                return 'boss';
            }
            else {
                return 'introduction';
            }
            console.log('poop test');
        };
        vm.slumThugs.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Hey! You dont belong here. Beat it!',
                    buttons: {
                        leave: {
                            text: 'Sorry I will leave!',
                            next: 'sorryLeave',
                            master: 'slumThugs',
                            active: true
                        },
                        threaten: {
                            text: 'I go where I want.',
                            next: 'threaten',
                            master: 'slumThugs',
                            active: true
                        },
                        question: {
                            text: 'What is going on here?',
                            next: 'question',
                            master: 'slumThugs',
                            active: true
                        }
                    }
                },
                sorryLeave: {
                    text: 'Thats what I thought.  Now beat it scrub!',
                },
                threaten: {
                    text: 'Oh man I like this guy! Lets take him to meet the boss!',
                    continue: true,
                    next: 'introduction',
                    master: 'slumThugsBoss'
                },
                question: {
                    text: 'Nosy huh?  Lets let the boss deal with him!',
                    continue: true,
                    next: 'introductionNosy',
                    master: 'slumThugsBoss'
                },
                boss: {
                    text: 'You need to see the boss again? Lets go.',
                    continue: true,
                    next: 'bossReturn',
                    master: 'slumThugsBoss'
                }
            };
            return dialogue;
        };

        vm.inn = new vm.Dialogue;
        vm.inn.initDialogue = function() {
            if (vm.progress.innIntro) {
                return 'question';
            }
            else {
                return 'introduction';
            }
        };
        vm.inn.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Welcome to the best inn in all of Tresabor, The Sleepy Sapling!  You look like you are new here, am I right?',
                    continue: true,
                    next: 'question',
                    master: 'inn',
                    special: function() {
                        vm.progress.innIntro = true;
                    }
                },
                question: {
                    text: 'If you need a room to rest in we have one available for 250g a night.  The Sleepy Sapling also has the tastiest pie that you can find, only 100g for a piece!  Due to limited supply it is only one per customer.  Otherwise we can always just chat!',
                    buttons: {
                        rest: {
                            text: 'I am a sleepy sapling and need a room.',
                            next: 'rest',
                            active: true,
                            master: 'inn'
                        },
                        pie: {
                            text: 'Let me get in on some of that pie!',
                            next: 'pie',
                            active: !vm.progress.pieEaten,
                            master: 'inn'
                        },
                        chat: {
                            text: 'Lets chat!',
                            next: 'chat',
                            active: true,
                            master: 'inn'
                        }
                    }
                },
                rest: {
                    text: 'rest text here',
                },
                pie: {
                    text: 'One slice of Butterscotch Pie coming up!  I wish we could offer more than one per customer, but since the sky event trade with the Northern Empire has been difficult.  I heard the impact was right along the trade route! Anyway, enjoy the pie!',
                    next: 'eatPie',
                    continue: true,
                    master: 'inn'
                },
                eatPie: {
                    text: '*You eat the Butterscotch Pie, it fills you with DETERMINATION.*',
                    next: 'question',
                    continue: true,
                    master: 'inn',
                    special: function() {
                        vm.progress.pieEaten = !vm.progress.pieEaten;
                        vm.initAllDialogues();
                    }
                },
                chat: {
                    text: 'Alright! What would you like to talk about?',
                    buttons: {
                        sky: {
                            text: 'What is your opinion on the sky attacking?',
                            next: 'sky',
                            active: true,
                            master: 'inn'
                        },
                        whatToDo: {
                            text: 'What is there to do around here?',
                            next: 'whatToDo',
                            active: true,
                            master: 'inn'
                        },
                        wizards: {
                            text: 'Any wizards around here?',
                            next: 'wizards',
                            active: true,
                            master: 'inn'
                        },
                        nothing: {
                            text: 'Nothing for now.',
                            next: 'nothing',
                            active: true,
                            master: 'inn'
                        }
                    }
                },
                nothing: {
                    text: 'Oh.  Well I enjoyed our chat while it lasted!',
                    next: 'question',
                    continue: true,
                    master: 'inn'
                },
                sky: {
                    text: 'Hmm, everyone is on edge thinking it was an attack by one of our enemies, but I fear it is far more dangerous. I have heard of people going missing and other strange occurences since that day. Lets change the subject, it worries me to think of the event.',
                    next: 'chat',
                    continue: true,
                    master: 'inn'
                },
                whatToDo: {
                    text: 'Well if you need work, the King usually has something to offer.  Otherwise there is a shop and enchant on the main level.  Down here there isnt much else.  If you are looking to leave Tresabor then you can checkout the Arena to the east.  I heard you have to be pretty tough to fight there though.',
                    next: 'chat',
                    continue: true,
                    master: 'inn'
                },
                wizards: {
                    text: 'Wizards huh? I didnt take you for the type.  Well, if you must see one of them, the closest one is to the east across the river.  The Arena guards the bridge though and they only let the toughest through.  If you want my advice, stay away from wizards.',
                    next: 'chat',
                    continue: true,
                    master: 'inn'
                }
            };
            return dialogue;
        };

        vm.house = new vm.Dialogue();
        vm.house.initDialogue = function() {
            if (vm.progress.introComplete) {
                return 'help';
            }
            else {
                return 'introduction';
            }
        }
        vm.house.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Oh my! you woke up! Do you remember what happened?',
                    buttons: {
                        no: {
                            text: 'I dont even know who I am!',
                            next: 'memory',
                            active: true,
                            master: 'house'
                        },
                        yes: {
                            text: 'Yeah I do!',
                            next: 'lie',
                            active: true,
                            master: 'house'
                        }

                    }
                },
                help: {
                    text: 'What? You are back already?! Get back out there!'
                },
                lie: {
                    text: 'Well then why did I find you passed out in my yard.  It looked like a few goons had beaten you up.',
                    buttons: {
                        lie2: {
                            text: 'Its what all the kids are doing these days.',
                            next: 'lie2',
                            active: true,
                            master: 'house'
                        },
                        kid: {
                            text: 'Haha I am just kidding! I dont remember a thing!',
                            next: 'truth',
                            active: true,
                            master: 'house'
                        }
                    }
                },
                lie2: {
                    text: 'Ok... Anyway, you cant stay here forever.',
                    continue: true,
                    next: 'question',
                    master: 'house'
                },
                truth: {
                    text: 'Kids and your crazy jokes these days I cant keep up!  What do you mean you cant remember anything?',
                    buttons: {
                        memory: {
                            text: 'I dont even know my name.',
                            next: 'memory2',
                            active: true,
                            master: 'house'
                        }
                    }
                },
                memory: {
                    text: 'Oh... I am sorry.  Well, I found you unconcious in my yard the other day.  You were in bad condition, so I nursed you back to health.',
                    continue: true,
                    master: 'house',
                    next: 'question'
                },
                memory2: {
                    text: 'Oh...  I am sorry.',
                    continue: true,
                    master: 'house',
                    next: 'question'
                },
                question: {
                    text: 'Here, take this map.  A short distance north east of here is Tresabor, City in the Tree. The Elder may be able to help with your memory loss and there will be work for you there.  Take this backpack too, I am too old for adventuring now.',
                    continue: true,
                    master: 'house',
                    next: 'goodBye',
                    special: function() {
                        vm.progress.hasMap = true;
                        vm.progress.introComplete = true;
                    }
                },
                goodBye: {
                    text: 'Goodluck kid, and remember, head north east to Tresabor!'
                }
            };
            return dialogue;
        };



        vm.slumThugsBoss = new vm.Dialogue();
        vm.slumThugsBoss.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'You think you have what it takes huh? Well lets see it then.',
                    buttons: {
                        confused: {
                            text: 'I have no idea what you mean',
                            next: 'confused',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        confident: {
                            text: 'Yeah I do! Lets do this.',
                            next: 'confident',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        threaten: {
                            text: 'I will mess you up old man!',
                            next: 'threaten',
                            master: 'slumThugsBoss',
                            active: true
                        }
                    }
                },
                introductionNosy: {
                    text: 'You like going around asking questions huh?  You think you have what it takes?',
                    buttons: {
                        confused: {
                            text: 'Takes to do what?',
                            next: 'confused',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        confident: {
                            text: 'Yeah I do! Lets do this.',
                            next: 'confident',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        threaten: {
                            text: 'I will mess you up old man!',
                            next: 'threaten',
                            master: 'slumThugsBoss',
                            active: true
                        }
                    }
                },
                confused: {
                    text: 'We need someone clean to do a mission for us, that is all I can say for now. Are you in?',
                    active: true,
                    buttons: {
                        confident: {
                            text: 'Sure, lets do this.',
                            next: 'confident',
                            master: 'slumThugsBoss',
                            active: true,
                        },
                        leave: {
                            text: 'This is pretty sketchy...',
                            next: 'leave',
                            master: 'slumThugsBoss',
                            active: true
                        }
                    }
                },
                leave: {
                    text: 'Then beat it kid! I dont have time for scrubs like you.',
                },
                confident: {
                    text: 'Alright!  Here now drink this.  Dont ask any questions.  Hopefully this is the right amount...',
                    continue: true,
                    active: true,
                    level: 'shroom',
                    special: function() {
                        vm.progress.slumBossMet = true;
                        console.log(vm.progress.slumBossMet);
                    }
                },
                threaten: {
                    text: 'Ha! You wish.  Get out of here before I sick my guard cat on you.  He doesnt mess around.'
                },
                bossReturn: {
                    text: 'Back Again? Drink this again, lets see what you can do!',
                    continue: true,
                    level: 'shroom',
                    active: true
                }
            };
            return dialogue;
        };

        //init the dialogues based on setDialogue to grab changed conditionals
        vm.initAllDialogues = function() {
            vm.treeKing.dialogue = vm.treeKing.setDialogue();
            vm.slumThugs.dialogue = vm.slumThugs.setDialogue();
            vm.slumThugsBoss.dialogue = vm.slumThugsBoss.setDialogue();
            vm.wizard.dialogue = vm.wizard.setDialogue();
            vm.monk.dialogue = vm.monk.setDialogue();
            vm.enchant.dialogue = vm.enchant.setDialogue();
            vm.house.dialogue = vm.house.setDialogue();
            vm.inn.dialogue = vm.inn.setDialogue();
            vm.arena.dialogue = vm.arena.setDialogue();
        };
    }
})();