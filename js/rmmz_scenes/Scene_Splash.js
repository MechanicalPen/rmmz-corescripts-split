//-----------------------------------------------------------------------------
// Scene_Splash
//
// The scene class of the splash screen.

function Scene_Splash() {
    this.initialize(...arguments);
}

Scene_Splash.prototype = Object.create(Scene_Base.prototype);
Scene_Splash.prototype.constructor = Scene_Splash;

Scene_Splash.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    this.initWaitCount();
};

Scene_Splash.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    if (this.isEnabled()) {
        this.createBackground();
    }
};

Scene_Splash.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    if (this.isEnabled()) {
        this.adjustBackground();
        this.startFadeIn(this.fadeSpeed(), false);
    }
};

Scene_Splash.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    if (this.isActive()) {
        if (!this.updateWaitCount()) {
            this.gotoTitle();
        }
        this.checkSkip();
    }
};

Scene_Splash.prototype.stop = function() {
    Scene_Base.prototype.stop.call(this);
    if (this.isEnabled()) {
        this.startFadeOut(this.fadeSpeed());
    }
};

Scene_Splash.prototype.createBackground = function() {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = ImageManager.loadSystem("Splash");
    this.addChild(this._backSprite);
};

Scene_Splash.prototype.adjustBackground = function() {
    this.scaleSprite(this._backSprite);
    this.centerSprite(this._backSprite);
};

Scene_Splash.prototype.isEnabled = function() {
    return $dataSystem.optSplashScreen;
};

Scene_Splash.prototype.initWaitCount = function() {
    if (this.isEnabled()) {
        this._waitCount = 120;
    } else {
        this._waitCount = 0;
    }
};

Scene_Splash.prototype.updateWaitCount = function() {
    if (this._waitCount > 0) {
        this._waitCount--;
        return true;
    }
    return false;
};

Scene_Splash.prototype.checkSkip = function() {
    if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
        this._waitCount = 0;
    }
};

Scene_Splash.prototype.gotoTitle = function() {
    SceneManager.goto(Scene_Title);
};
