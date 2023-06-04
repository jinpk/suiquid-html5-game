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
  private timer: NodeJS.Timeout;

  constructor(scene: IWorld, data: PlayerData) {
    super(scene, data);
    this.targetDirection = new Phaser.Math.Vector2(this.x, this.y);
    this.isMoving = false;
    this.xMD = MovementDirection.NONE;
    this.yMD = MovementDirection.NONE;
    this.timer = setTimeout(this.changeDirection.bind(this), getRandomTime());
  }

  public setTargetDirection(targetDirection: Phaser.Math.Vector2) {
    this.targetDirection = targetDirection;
  }

  public update() {
    super.update();
    if (this.live.isDead()) {
      return;
    }
  
    if (this.isExistPlayerInNearbyList(this.getNearbyObjects(0))) {
      this.live.setHealth(0);
    }
    this.updateDirection();
  }
  public isExistPlayerInNearbyList(objectList: Phaser.GameObjects.GameObject[]): boolean {
    for (const object of objectList) {
      if (object instanceof Player) {
        return true;
      }
    }
    return false;
  }
  public getNearbyObjects(range: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
  
    const nearbyObjects = this.scene.physics.overlapCirc(
      this.x,
      this.y,
      range,
      true
    );
  
    nearbyObjects.forEach((collision) => {
      const object = collision.gameObject;
      if (object && object !== this && object instanceof Phaser.GameObjects.Sprite) {
        objects.push(object);
      }
    });
    return objects;
  }
  public setDirectionMovement(xMD: MovementDirection, yMD: MovementDirection) {
    this.xMD = xMD;
    this.yMD = yMD;
  }

  public updateDirection(): void {
    const key = `${this.xMD}|${this.yMD}`;
    const oldMoving = this.isMoving;
    const oldDirection = this.direction;

    if (this.xMD !== 0 || this.yMD !== 0) {
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

  private changeDirection(): void {
    const randomXDirection: number = Math.floor(Math.random() * 3) - 1; // -1, 0, 1 중 랜덤 선택
    const randomYDirection: number = Math.floor(Math.random() * 3) - 1; // -1, 0, 1 중 랜덤 선택
    this.xMD = randomXDirection;
    this.yMD = randomYDirection;
    this.timer = setTimeout(this.changeDirection.bind(this), getRandomTime());
  }

  public destroy(): void {
    clearTimeout(this.timer);
    super.destroy();

  }

  public onDead() {
    this.scene.sound.play(PlayerAudio.DEAD);

    this.stopMovement();
    this.scene.tweens.add({
      targets: [this, this.container],
      alpha: 0.0,
      duration: 250,
    });
  }


}
function getRandomTime(): number {
  return Math.floor(Math.random() * 2000) + 2000; // 3~6초 랜덤한 시간 반환
}
