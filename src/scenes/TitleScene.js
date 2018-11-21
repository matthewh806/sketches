export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({
			'key': 'TitleScene'
		})
	}

	preload() {

	}

	create() {
		this.add.text(200, 200, "Lifecycle of a Brexit minister", {fontSize: '32px', 'fill': '#ffffff'});
		var startButton = this.add.text(400, 400, 'Accept!', {fontSize: '32px', 'fill': '#ffffff'});
		startButton.setInteractive();

		startButton.on('pointerup', () => {
			this.sound.play('big_ben');
			this.scene.start('GameScene');
		})

		this.add.image(200, this.sys.game.config.height - 300, 'may');
	}
}