var player;

var mainState = {
    preload : function() {
        game.load.image('player', 'assets/player.png'); // carga de imagen que representa el jugador
        
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
    },
    
    create: function() {
        game.stage.backgroundColor = '#3498db'; // modificar el color del lienzo 
        game.physics.startSystem(Phaser.Physics.ARCADE); // indicar el sistema fisico para le juego 
        
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player'); // adision del jugador
        this.player.anchor.setTo(0.5, 0.5); // punto de anclaje en el centro 
        
        game.physics.arcade.enable(this.player); // se le indica a phaser que objeto usara el mecanismo fisico
        this.player.body.gravity.y = 500; // adicionar la gravedad o movimiento del jugador 
        
        this.cursor = game.input.keyboard.createCursorKeys(); // crear la respuesta para los controles

        var leftWall = game.add.sprite(0, 0, 'wallV'); // adicionar las barreras del juego (escenario)
        game.physics.arcade.enable(leftWall); // adicionar comportamiento;
        leftWall.body.immovable = true; // indicar que no pueden moverse 
        
        var rightWall = game.add.sprite(480, 0, 'wallV');
        game.physics.arcade.enable(rightWall);
        rightWall.body.immovable = true;
        
        this.walls = game.add.group();
        this.walls.enableBody = true;
        
        game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left wall
        game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right wall
        this.walls.setAll('body.immovable', true);
        
    },
    
    update: function() {
        this.movePlayer();
        this.createWorld();
        this.physics.arcade.collide(this.player, this.walls);
    },
    
    movePlayer : function() {
        
        if(this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
        }
        
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
        }
        
        else {
            this.player.body.velocity.x = 0;
        }
        
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -320;
        }
    },
    
    createWorld: function() {
        // Create our wall group with Arcade physics
        this.walls = game.add.group();
        this.walls.enableBody = true;
        // Create the 10 walls
        game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left
        game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right
        game.add.sprite(0, 0, 'wallH', 0, this.walls); // Top left
        game.add.sprite(300, 0, 'wallH', 0, this.walls); // Top right
        game.add.sprite(0, 320, 'wallH', 0, this.walls); // Bottom left
        game.add.sprite(300, 320, 'wallH', 0, this.walls); // Bottom right
        game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left
        game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right
        var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
        middleTop.scale.setTo(1.5, 1);
        var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
        middleBottom.scale.setTo(
        1.5, 1);
        // Set all the walls to be immovable
        this.walls.setAll('body.immovable', true);

    }
};



var game = new Phaser.Game(500, 340, Phaser.AUTO, 'mainArea');

game.state.add('main', mainState);
game.state.start('main');
