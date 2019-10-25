'use strict';
   var timer = document.getElementById('timer');
    var start = document.getElementById('start');
    var hp = document.getElementById('hp');
    var bom = document.getElementById('bom');
    var setu1 = document.getElementById('setu1');
    var setu2 = document.getElementById('setu2');
    var setu3 = document.getElementById('setu3');
    var setu4 = document.getElementById('setu4');
    var dame = 0;

    var originalValue = location.search.substring(1);
    var value = originalValue.split('&');
    var originalZanki = value[0].split('=');
    var zanki = Number(decodeURIComponent(originalZanki[1]));

     //var rink1 = document.getElementById('rink1');
     //var rink2 = document.getElementById('rink2');
     //var rink3 = document.getElementById('rink3');


    //クリック時の時間を保持するための変数定義
    var startTime;

    //経過時刻を更新するための変数。 初めはだから0で初期化
    var elapsedTime = 0;
 //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    var timerId;


        var xxx;

        var yyy;

        var aaa = 0;

    document.addEventListener( "touchstart", function( event ) {
        aaa = 1;
    } ) ;
    document.body.ontouchstart= function( event ){
        var touchObject = event.changedTouches[0] ;

        xxx = touchObject.clientX/1.9;

        aaa = 1;

        yyy = touchObject.clientY/1.9;
    };
    document.body.ontouchmove= function( event ){
        var touchObject = event.changedTouches[0] ;

        xxx = touchObject.clientX/1.9;

        aaa = 1;

        yyy = touchObject.clientY/1.9 ;
    };

function updateTimetText(){

        //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
        var m = Math.floor(elapsedTime / 60000);

        //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
        var s = Math.floor(elapsedTime % 60000 / 1000);

        //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
        var ms = elapsedTime % 1000;


        //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
        //javascriptでは文字列数列を連結すると文字列になる
        //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
        m = ('0' + m).slice(-2);
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-3);



}

function countUp(){

        //timerId変数はsetTimeoutの返り値になるので代入する
        timerId = setTimeout(function(){

            //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
            elapsedTime = Date.now() - startTime ;
            updateTimetText()

            //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
            countUp();

        //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
        },10);
}

class TextLabel extends Actor {
    constructor(x, y, text) {
        const hitArea = new Rectangle(0, 0, 0, 0);
        super(x, y, hitArea);

        this.text = text;
    }

    render(target) {
        const context = target.getContext('2d');
        context.font = '40px sans-serif';
        context.fillStyle = 'white';
        context.fillText(this.text, this.x, this.y);
    }
}

class Bullet extends SpriteActor {
    constructor(x, y, velocityX) {
        const sprite = new Sprite(assets.get('sprite'), new Rectangle(0, 32, 32, 32));
        const hitArea = new Rectangle(8, 0, 16, 32);
        super(x, y, sprite, hitArea, ['playerBullet']);

        this._speed = 6;		//自機の発射間隔(初期値６)
        this.velocityX = velocityX;
        // 敵に当たったら消える
        this.addEventListener('hit', (e) => {
           if(e.target.hasTag('enemy')) { this.destroy(); }
           if(e.target.hasTag('EnemyBarrier')) { this.destroy(); }
        });
    }

    update(gameInfo, input) {
    this.x += this.velocityX;
        this.y -= this._speed;
        if(this.isOutOfBounds(gameInfo.screenRectangle)) {
            this.destroy();
        }
    }
}

class Fighter extends SpriteActor {
    constructor(x, y) {
        const sprite = new Sprite(assets.get('my'), new Rectangle(0, 0, 32, 32));
        const hitArea = new Rectangle(16, 16, 4, 4);
        super(x, y, sprite, hitArea);

        this._interval = 6;		//(自機の弾幕の発射間隔)初期値５
        this._intervalB = 30;		//の間隔
        this._timeCount = 0;
        this._timeCountS = 0;
        this._timeCountB = 0;
        this._speed = 4; //自機のスピード
        this._speedS = 2;     //低速移動時のスピード
        this._velocityX = 0;		//X方向のスピード。上書きされるので意味ないかも？
        this._velocityY = 0;		//Y(ry
        this.myzanki = zanki;
        this.myzanki = zanki;
        this.bombval = 5;

        // 敵の弾に当たったらdestroyする

this.addEventListener('hit', (e) => {

    if(e.target.hasTag('enemyBullet') && this._timeCountB > this._intervalB) {
         if(this.myzanki == 0){
             this.destroy();
        }else{
                this._timeCountB = 0;
                const bumb = new Bumb(this.x-256, this.y-160);
                this.spawnActor(bumb);
                this.myzanki --;
                zanki = this.myzanki;
     }

           }
});

}
update(gameInfo, input) {
      this._timeCountB++;

      this._velocityX = xxx;
      this._velocityY = yyy;

      this.x = xxx;
      this.y = yyy;


   // 画面外に行ってしまったら押し戻す
   const boundWidth = gameInfo.screenRectangle.width - this.width;
   const boundHeight = gameInfo.screenRectangle.height - this.height;
   const bound = new Rectangle(this.width, this.height, boundWidth, boundHeight);

   if(this.isOutOfBounds(bound)) {
       this.x -= this._velocityX;
       this.y -= this._velocityY;
   }

   // スペースキーで弾を打つ
   this._timeCount++;
   const isFireReady = this._timeCount > this._interval;
   if(isFireReady) {
     // if(input.getKey(' ')||input.getKey('z')||input.getKey('Z')){
          const bullet = new Bullet(this.x, this.y,0);
          this.spawnActor(bullet);
          const bullet2 = new Bullet(this.x, this.y,3);
          this.spawnActor(bullet2);
          const bullet3 = new Bullet(this.x, this.y,-3);
          this.spawnActor(bullet3);
          this._timeCount = 0;
       // }
   }
}
}


class Bumb extends SpriteActor {
    constructor(x, y) {
        const sprite = new Sprite(assets.get('bom'), new Rectangle(0, 0, 512, 384));
        const hitArea = new Rectangle(0, 0, 512, 384);
        super(x, y, sprite, hitArea, ['bomb']);
		this._timeCount = 0;
		this._interval = 5;
    }

    update(gameInfo, input) {
        if(this.isOutOfBounds(gameInfo.screenRectangle)) {
            this.destroy();
        }
        this._timeCount++;
        if(this._timeCount > this._interval) {
        	this.destroy();
        	this._timeCount = 0;
        }
    }
}
class EnemyBullet extends SpriteActor {
    constructor(x, y, velocityX, velocityY) {
        const sprite = new Sprite(assets.get('ringo'), new Rectangle(0, 0, 32, 32));
        const hitArea = new Rectangle(8, 8, 16, 16);
        super(x, y, sprite, hitArea, ['enemyBullet']);

        this.velocityX = velocityX;
        this.velocityY = velocityY;
         this.addEventListener('hit', (e) => {
           if(e.target.hasTag('bomb')) {
               this.destroy();
           }
        });
    }

    update(gameInfo, input) {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if(this.isOutOfBounds(gameInfo.screenRectangle)) {
            this.destroy();
        }
    }
}

class FireworksBullet extends EnemyBullet {
    constructor(x, y, velocityX, velocityY, explosionTime) {
        super(x, y, velocityX, velocityY);
        const sprite = new Sprite(assets.get('ringo'), new Rectangle(0, 0, 32, 32));
        const hitArea = new Rectangle(8, 8, 16, 16);

        this._eplasedTime = 0;
        this.explosionTime = explosionTime;
    }

    // degree度の方向にspeedの速さで弾を発射する
    shootBullet(degree, speed) {
        const rad = degree / 180 * Math.PI;
        const velocityX = Math.cos(rad) * speed;
        const velocityY = Math.sin(rad) * speed;

        const bullet = new EnemyBullet(this.x, this.y, velocityX, velocityY);
        this.spawnActor(bullet);
    }

    // num個の弾を円形に発射する
    shootCircularBullets(num, speed) {
        const degree = 360 / num;
        for(let i = 0; i < num; i++) {
            this.shootBullet(degree * i, speed);
        }
    }

    update(gameInfo, input) {
        super.update(gameInfo, input);

        // 経過時間を記録する
        this._eplasedTime++;

        // 爆発時間を超えたら弾を生成して自身を破棄する
        if(this._eplasedTime > this.explosionTime) {
            this.shootCircularBullets(10, 3);
            this.destroy();
        }
        if(this.isOutOfBounds(gameInfo.screenRectangle)) {
             this.shootCircularBullets(10, 2);
            this.destroy();
        }
    }
}


//エネミーマーカーを表示させるクラス
class aBullet extends SpriteActor {
    constructor(x, y, velocityX, velocityY) {
        const sprite = new Sprite(assets.get('mark'), new Rectangle(32, 32, 32, 32));
        const hitArea = new Rectangle(8, 8, 16, 16);
        super(x, y, sprite, hitArea, ['enemyBullet']);

        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    update(gameInfo, input) {
        this.x += this.velocityX;
        this.y += this.velocityY;
        if(this.isOutOfBounds(gameInfo.screenRectangle)) {
            this.destroy();
        }
    }
}
//背景を表示させるクラス
class BackG extends SpriteActor {
constructor(x, y) {
       const sprite = new Sprite(assets.get('haikei'), new Rectangle(0, 0, 600, 1200));
       const hitArea = new Rectangle(0, 0, 0, 0);
       super(x, y, sprite, hitArea, ['back']);
   }
}
//敵のクラス
class Enemy extends SpriteActor {
    constructor(x, y) {
        const sprite = new Sprite(assets.get('torento'), new Rectangle(0, 0, 120, 128));
        const hitArea = new Rectangle(0, 0, 120, 128);
        super(x, y, sprite, hitArea, ['enemy']);

        this.maxHp = 250;		//敵の最大HP
        this.currentHp = this.maxHp;

        this._intervalEX = 60;		//弾幕の発射間隔(初期値は30)

        this._timeCount = 0;		//謎の値
        this._velocityX = 2.5;		//敵の動くスピード(初期値は0.3でした)


        // プレイヤーの弾に当たったらHPを減らす
        this.addEventListener('hit', (e) => {
           if(e.target.hasTag('playerBullet')) {
               this.currentHp--;
               this.dispatchEvent('changehp', new GameEvent(this));
           }
        });
    }
    shootBullet(degree, speed) {
        const rad = degree / 360 * Math.PI;		//初期値は180
        const velocityX = Math.cos(rad) * speed;
        const velocityY = Math.sin(rad) * speed;
        const bullet = new EnemyBullet(this.x, this.y, velocityX*(Math.random()), velocityY*(Math.random()));
        this.spawnActor(bullet);
    }

    update(gameInfo, input) {

        // 左右に移動する
        // インターバルを経過していたら弾を撃つ
             //this.x += this._velocityX;
             if(this.x <= 20 || this.x >= 450) {		//敵が動く範囲？
             	this._velocityX *= -1;
          }
              this._timeCount++;
             if(this._timeCount > this._intervalEX) {
                  const spdX = Math.random() * 10 - 2; // -2〜+2
                  const spdY = Math.random() * 8 +1;
                  const explosionTime = 40;  //爆発するまでの時間
                   const bulletEX = new FireworksBullet(this.x, this.y+10, spdX, spdY, explosionTime);
                   this.spawnActor(bulletEX);
                 this._timeCount = 0;
             }

        // HPがゼロになったらdestroyする
        if(this.currentHp <= 0) {
            this.destroy();
        }
        const abullet = new aBullet(this.x,882, 0, 5);      //エネミーマーカーの場所を指定
        this.spawnActor(abullet);

}
}
//敵のHPバー
class EnemyHpBar extends Actor {
    constructor(x, y, enemy) {
        const hitArea = new Rectangle(0, 0, 0, 0);
        super(x, y, hitArea);

        this._width = 400;
        this._height = 10;

        this._innerWidth = this._width;

        // 敵のHPが変わったら内側の長さを変更する
        enemy.addEventListener('changehp', (e) => {
            const maxHp = e.target.maxHp;
            const hp = e.target.currentHp;
            this._innerWidth = this._width * (hp / maxHp);
        });
    }

    render(target) {
        const context = target.getContext('2d');
        context.strokeStyle = 'white';		//HPバーの外枠の色
        context.fillStyle = 'white';		//HPバーの色

        context.strokeRect(this.x, this.y, this._width, this._height);
        context.fillRect(this.x, this.y, this._innerWidth, this._height);
    }
}

class DanmakuStgEndScene extends Scene {
    constructor(renderingTarget) {
        super('クリア', 'black', renderingTarget);
        const text = new TextLabel(125, 400, 'ゲームクリア！');
        this.add(text);
        location.href = 'select.html';

    }update(gameInfo, input) {		//すべての処理を司るメソッド
        this._updateAll(gameInfo, input);
        this._hitTest();
        this._disposeDestroyedActors();
        this._clearScreen(gameInfo);
        this._renderAll();

    }
}

class DanmakuStgGameOverScene extends Scene {
    constructor(renderingTarget) {
        super('ゲームオーバー', 'black', renderingTarget);
        const text = new TextLabel(160, 400, '満身創痍');
        this.add(text);
        alert("ゲームオーバー…");
       window.location.href = 'Stage1.html';
    }
    update(gameInfo, input) {		//すべての処理を司るメソッド
        this._updateAll(gameInfo, input);
        this._hitTest();
        this._disposeDestroyedActors();
        this._clearScreen(gameInfo);
        this._renderAll();
        if(input.getKey(' ')){location.reload();}
    }
}

class DanmakuStgMainScene extends Scene {
    constructor(renderingTarget) {
        super('メイン', 'black', renderingTarget);
		const backg = new BackG(0,0);
        const fighter = new Fighter(230, 550);    //自機の初期座標
        const enemy = new Enemy(200, 100);
        const hpBar = new EnemyHpBar(50, 20, enemy);
		this.add(backg);
        this.add(fighter);
        this.add(enemy);
        this.add(hpBar);

        // 自機がやられたらゲームオーバー画面にする
        fighter.addEventListener('destroy', (e) => {
            const scene = new DanmakuStgGameOverScene(this.renderingTarget);
            this.changeScene(scene);
        });

        // 敵がやられたらクリア画面にする
        enemy.addEventListener('destroy', (e) => {
        	var m = Math.floor(elapsedTime / 60000);
        	var s = Math.floor(elapsedTime % 60000 / 1000);
        	var ms = elapsedTime % 1000;
        	m = ('0' + m).slice(-2);
        	s = ('0' + s).slice(-2);
        	ms = ('0' + ms).slice(-3);
			localStorage.setItem("new", elapsedTime);
               alert('ステージ3クリア！');
            const scene = new DanmakuStgEndScene(this.renderingTarget);
            this.changeScene(scene);
        });
    }
}

//開始画面？
class DanmakuStgTitleScene extends Scene {
    constructor(renderingTarget) {
        super('タイトル', 'black', renderingTarget);
        const title = new TextLabel(160, 400, '弾幕STG');
        const title1 = new TextLabel(10, 600, 'タップでゲームスタート');
        this.add(title);
        this.add(title1)
    }

    update(gameInfo, input) {
        super.update(gameInfo, input);
        if(aaa==1) {
            const mainScene = new DanmakuStgMainScene(this.renderingTarget);
            this.changeScene(mainScene);
            startTime = Date.now();

        //再帰的に使えるように関数を作る
        countUp();
        }
    }
}

class DanamkuStgGame extends Game {
    constructor() {
        super('弾幕STG', 500, 850, 60);//引数２と３は画面の広さ。４はフレームレート？(初期値：('弾幕STG', 300, 400, 60)
        const titleScene = new DanmakuStgTitleScene(this.screenCanvas);
        this.changeScene(titleScene);
    }
}
assets.addImage('my', '../image/godhand.png');
assets.addImage('mark', '../image/マーカー.png');
assets.addImage('bom', '../image/bomb2.png');
assets.addImage('sprite', '../image/sprite.png');
assets.addImage('torento', '../image/トレント.png');
assets.addImage('haikei', '../image/BI3.jpg');
assets.addImage('ringo', '../image/リンゴ.png');



assets.loadAll().then((a) => {
    const game = new DanamkuStgGame();
    var kon = document.body.childNodes[1];
    kon.appendChild(game.screenCanvas);
    game.start();
});
