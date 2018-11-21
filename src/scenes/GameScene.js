var _ = require('underscore');

export default class GameScene extends Phaser.Scene {
	constructor() {
		super({
			'key': 'GameScene'
		})
	}

	preload() {

	}

	create() {
		this.graphics2 = this.add.graphics({x: -16, y: 0}).lineStyle(28, 0x00ffff, 0.8);
    this.graphics1 = this.add.graphics().lineStyle(28, 0x0000ff, 0.8);

    this.graphics1.setVisible(false);
    this.graphics2.setVisible(false);

    var radius1 = 64;
    var radius2 = 32;

    for (var i = 0; i < 8; i++)
    {
        this.graphics1.strokeCircle(400, 300, radius1);
        this.graphics2.strokeCircle(400, 300, radius2);

        radius1 += 64;
        radius2 += 64;
    }

		this.mogg = this.add.image(200, this.sys.game.config.height - 300, 'mogg');
		this.farage = this.add.image(100, this.sys.game.config.height - 200, 'farage');

		this.mogg_snippets = this.sound.addAudioSprite('mogg_snippets');
		this.mogg_snippets_map = this.cache.json.get('mogg_snippets').spritemap;

		this.add.text(100, 50, "Congratulations!", {fontSize: '32px', 'fill': '#ffffff'}); 
		this.add.text(100, 100, "You are now the Brexit Minister!!!", {fontSize: '32px', 'fill': '#ffffff'});

		this.tweens.add({
			targets: this.mogg,
			x: { value: 600, duration: 3000, ease: 'Power2', yoyo: -1},
			y: { value: 500, duration: 4000, ease: 'Power2', yoyo: -1},
			duration: 3000,
			yoyo: true,
			loop: -1
		});

		this.timedEvent = this.time.addEvent({
			delay: 4000,
			callback: _.bind(function() {
				this.timeToBeSick();
			}, this),
			callbackScope: this,
			loop: true
		});
	}

	update() {
	}

	timeToBeSick() {
		// Finish existing?
		this.idx = 0;
		this.being_sick = true;
		this.t = 0;

		this.graphics1.setVisible(true);
    this.graphics2.setVisible(true);

		var num_hats = Math.floor(Math.random() * 10);
		this.mogg_snippets.setVolume(0.4).play(randomKey(this.mogg_snippets_map));
		this.time.addEvent(
			{
				delay: 100, 
				callback: _.bind(function() {
					this.spawnSingleHat();
				}, this),
				callbackScope: this,
				repeat: num_hats
			});

		this.time.addEvent(
		{
				delay: 200, 
				callback: _.bind(function() {
					this.flashBackground();
					this.rotateMogg();
				}, this),
				callbackScope: this,
				repeat: 10
		});
	}

	spawnSingleHat() {
		this.physics.add.image(this.mogg.x, this.mogg.y, 'hat').setDisplaySize(40, 40);
	}

	flashBackground() {
		this.cameras.main.setBackgroundColor(getRandomColor());
		this.t += 0.1;

  	this.graphics1.x += Math.sin(this.t) * 2;
  	this.graphics1.y += Math.cos(this.t) * 2;

  	this.graphics2.x += Math.sin(this.t) * 3;
  	this.graphics2.y += Math.cos(this.t) * 3;
	}
}

var getRandomColor = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}	

var randomKey = function(obj) {
	var keys = Object.keys(obj);
	return keys[keys.length * Math.random() << 0];
}

var randomProperty = function(obj) {
	var keys = Object.keys(obj);
	// TODO: figure this out...
	return obj[keys[keys.length * Math.random() << 0]];
}	
