import { MovementDirection, PlayerAudio } from "~type/world/entities/oplayer";
import { Player, PlayerData } from "./player";
import { IWorld } from "~type/world/world";
import {
  PLAYER_MOVE_ANIMATIONS,
  PLAYER_MOVE_DIRECTIONS,
} from "~const/world/entities/player";

export class OPlayer extends Player {
  xMD: number;
  yMD: number;
  targetDirection: Phaser.Math.Vector2;

  constructor(scene: IWorld, data: PlayerData) {
    super(scene, data);
    this.targetDirection = new Phaser.Math.Vector2(this.x, this.y);
    this.isMoving = false;
    this.xMD = MovementDirection.NONE;
    this.yMD = MovementDirection.NONE;
  }

  public setTargetDirection(targetDirection: Phaser.Math.Vector2) {
    this.targetDirection = targetDirection;
  }

  public update() {
    super.update();

    if (this.live.isDead()) {
      return;
    }

    this.updateDirection();
    if (
      Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.targetDirection.x,
        this.targetDirection.y
      ) > 1
    ) {
      this.scene.physics.moveTo(
        this,
        this.targetDirection.x,
        this.targetDirection.y,
        this.speed
      );
      this.isMoving = true;
    } else {
      this.isMoving = false;
      this.setVelocity(0, 0);
      this.body.setImmovable(true);
    }
  }

  public setDirectionMovement(xMD: MovementDirection, yMD: MovementDirection) {
    this.xMD = xMD;
    this.yMD = yMD;
  }

  public updateDirection(): void {
    console.log(this.xMD, this.yMD);
    // const x = this.xMD;
    // const y = this.yMD;
    var x = this.xMD;
    var y = this.yMD;
    const key = `${x}|${y}`;
    // console.log(key);
    const oldMoving = this.isMoving;
    const oldDirection = this.direction;

    if (x !== 0 || y !== 0) {
      this.isMoving = true;
      this.direction = PLAYER_MOVE_DIRECTIONS[key];
    } else {
      this.isMoving = false;
    }

    if (oldMoving !== this.isMoving || oldDirection !== this.direction) {
      if (this.isMoving) {
        this.anims.play(PLAYER_MOVE_ANIMATIONS[key]);

        if (!oldMoving) {
          this.scene.game.sound.play(PlayerAudio.MOVE, {
            loop: true,
            rate: 1.8,
          });
        }
      } else {
        this.stopMovement();
      }
    }
  }
}
