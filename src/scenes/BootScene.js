export default class BootScene extends Phaser.Scene {
	constructor() {
		super({
			'key': 'BootScene'
		})
	}

	preload() {
		const progress = this.add.graphics();

		this.load.on('progress', (value) => {
			progress.clear();
			progress.fillStyle(0xffffff, 1);
			progress.fillRect(0, this.sys.game.config.height/2, this.sys.game.config.width * value, 60);
		});

		this.load.on('complete', () => {
			progress.destroy();
			this.scene.start('TitleScene');
		});

		this.load.image('may', 'static/assets/images/may.png');
		this.load.image('mogg', 'static/assets/images/mogg.png');
		this.load.image('farage', 'static/assets/images/farage.png');
		this.load.image('hat', 'static/assets/images/top_hat.png');

		this.load.audio('big_ben', 'static/assets/sounds/big_ben_strike.wav');
		this.load.audio('eastenders', 'static/assets/sounds/eastenders_theme.wav');

		this.load.audioSprite(
			'mogg_snippets', 
			'static/assets/sounds/mogg_snippets.json',
			['static/assets/sounds/mogg_snippets.mp3', 'static/assets/sounds/mogg_snippets.ogg']
		);
	}
}