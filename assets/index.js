var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade', 
        arcade: {
            gravity: { y: 300},
            debug: false
        } 
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config);

    var score = 0;
    var scoreText;
    var cameraMove = false;
    var cameraWidth;
    var cameraHeight;

function preload () {
    this.load.image('bg', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('boomerang', 'assets/boomerang.png');
    this.load.image('dynamite', 'assets/dynamite.png');
    this.load.spritesheet('kangaroo', 'assets/kangaroo.png', {frameWidth: 55, frameHeight: 55}
    );
}

var player;
var platforms;
var cursors;

function create () {

    this.add.image(0, 0, 'bg').setOrigin(0);

    platforms = this.physics.add.staticGroup();
    
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    movingPlatform1 = this.physics.add.image(400, 400, 'ground');

    movingPlatform1.setImmovable(true);
    movingPlatform1.body.allowGravity = false;
    movingPlatform1.setVelocityX(200);

    movingPlatform2 = this.physics.add.image(300, 300, 'ground');

    movingPlatform2.setImmovable(true);
    movingPlatform2.body.allowGravity = false;
    movingPlatform2.setVelocityX(100);

    movingPlatform3 = this.physics.add.image(150, 150, 'ground');

    movingPlatform3.setImmovable(true);
    movingPlatform3.body.allowGravity = false;
    movingPlatform3.setVelocityX(50);

    player = this.physics.add.sprite(100, 450, 'kangaroo');

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);


    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('kangaroo', {start: 0, end: 4}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('kangaroo', {start: 5, end: 9}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'kangaroo', frame: 10}],
        frameRate: 10
    })

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, movingPlatform1);
    this.physics.add.collider(player, movingPlatform2);
    this.physics.add.collider(player, movingPlatform3);

    boomerang = this.physics.add.group({
        key: 'boomerang',
        repeat: 9,
        setXY: { x:12, y:20, stepX: 260}
    });

    this.physics.add.collider(boomerang, platforms);
    this.physics.add.collider(boomerang, movingPlatform1);
    this.physics.add.collider(boomerang, movingPlatform2);
    this.physics.add.collider(boomerang, movingPlatform3);
    this.physics.add.overlap(player, boomerang, collectBoomerang, null, this);

    function collectBoomerang (player, boomerang){
        boomerang.disableBody(true, true);
    }

    dynamite = this.physics.add.group({
        key: 'dynamite',
        repeat: 4,
        setXY: {x:50, y: 30, stepX: 450},
    });
    
    this.physics.add.collider(dynamite, platforms);
    this.physics.add.collider(dynamite, movingPlatform1);
    this.physics.add.collider(dynamite, movingPlatform2);
    this.physics.add.collider(dynamite, movingPlatform3);
    this.physics.add.overlap(player, dynamite, hitDynamite, null, this);


    function hitDynamite (player, dynamite){
        this.physics.pause();
        player.disableBody(true, true);
        dynamite.disableBody(true, true);
        gameOver = true;
    }

    scoreText = this.add.text(16, 16, 'Points: 0', {fontSize: '32px', fill: '#000000'});

}
function update () 
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-320);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(320);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-380);
    }

    if (movingPlatform1.x >= 500)
    {
        movingPlatform1.setVelocityX(-200);
    }
    else if (movingPlatform1.x <= 300)
    {
        movingPlatform1.setVelocityX(200);
    }

    if (movingPlatform2.x >= 400)
    {
        movingPlatform2.setVelocityX(-100);
    }
    else if (movingPlatform2.x <= 250)
    {
        movingPlatform2.setVelocityX(100);
    }

    if (movingPlatform3.x >= 550)
    {
        movingPlatform3.setVelocityX(-50);
    }
    else if (movingPlatform3.x <= 250)
    {
        movingPlatform3.setVelocityX(50);
    }
}
