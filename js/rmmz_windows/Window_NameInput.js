//-----------------------------------------------------------------------------
// Window_NameInput
//
// The window for selecting text characters on the name input screen.

function Window_NameInput() {
    this.initialize(...arguments);
}

Window_NameInput.prototype = Object.create(Window_Selectable.prototype);
Window_NameInput.prototype.constructor = Window_NameInput;

// prettier-ignore
Window_NameInput.LATIN1 =
        [ "A","B","C","D","E",  "a","b","c","d","e",
          "F","G","H","I","J",  "f","g","h","i","j",
          "K","L","M","N","O",  "k","l","m","n","o",
          "P","Q","R","S","T",  "p","q","r","s","t",
          "U","V","W","X","Y",  "u","v","w","x","y",
          "Z","[","]","^","_",  "z","{","}","|","~",
          "0","1","2","3","4",  "!","#","$","%","&",
          "5","6","7","8","9",  "(",")","*","+","-",
          "/","=","@","<",">",  ":",";"," ","Page","OK" ];
// prettier-ignore
Window_NameInput.LATIN2 =
        [ "�","�","�","�","�",  "�","�","�","�","�",
          "�","�","�","�","�",  "�","�","�","�","�",
          "�","�","�","�","�",  "�","�","�","�","�",
          "�","�","�","�","�",  "�","�","�","�","�",
          " ","","*","L","j",  "","","+","M","k",
          "�","�","�","�","�",  "�","�","�","�","�",
          "�","�","�","`","t",  "�","�","�","a","u",
          "�","v","x","}","�",  "�","�","w","~","�",
          "2","R","3","S","�",  "�","�"," ","Page","OK" ];
// prettier-ignore
Window_NameInput.RUSSIA =
        [ "","","","","",  "0","1","2","3","4",
          "","","","","",  "5","Q","6","7","8",
          "","","","","",  "9",":",";","<","=",
          "",""," ","!",""",  ">","?","@","A","B",
          "#","$","%","&","'",  "C","D","E","F","G",
          "(",")","*","+",",",  "H","I","J","K","L",
          "-",".","/","^","_",  "M","N","O","%","&",
          "0","1","2","3","4",  "(",")","*","+","-",
          "5","6","7","8","9",  ":",";"," ","","OK" ];
// prettier-ignore
Window_NameInput.JAPAN1 =
        [ "B","D","F","H","J",  "L","N","P","R","T",
          "K","M","O","Q","S",  "V","X","Z","\","^",
          "U","W","Y","[","]",  "`","b","e","g","i",
          "_","a","d","f","h",  "p","s","v","y","|",
          "j","k","l","m","n",  "q","t","w","z","}",
          "o","r","u","x","{",  "A","C","E","G","I",
          "~","","�","�","�",  "c","�","�","�","�",
          "�","�","�","�","�",  "�","^","�","","",
          "�","�","�","�","�",  "�","�"," ","��","z�" ];
// prettier-ignore
Window_NameInput.JAPAN2 =
        [ "�","�","�","�","�",  "�","�","�","�","�",
          "�","�","�","�","�",  "�","�","�","�","�",
          "�","�","�","�","�",  "�","�","�","�","�",
          "�","�","�","�","�",  "�","�","�","�","�",
          "�","�","�","�","�",  "�","�","�","�","�",
          "�","�","�","�","�",  "�","�","�","�","�",
          "�","�","�","�","�",  "�","�","�","�","�",
          "�","�","�","�","�",  "�","^","�","","",
          "�","�","�","�","�",  "�","�"," ","�p","z�" ];
// prettier-ignore
Window_NameInput.JAPAN3 =
        [ "!",""","#","$","%",  "A","B","C","D","E",
          "&","'","(",")","*",  "F","G","H","I","J",
          "+",",","-",".","/",  "K","L","M","N","O",
          "0","1","2","3","4",  "P","Q","R","S","T",
          "5","6","7","8","9",  "U","V","W","X","Y",
          ":",";","=",">","?",  "Z","[","]","\","^",
          "","","","","",  "","","","","",
          "","","","","",  "","	","
","","",
          "",""," ","","",  "",""," ","Kj","z�" ];

Window_NameInput.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._editWindow = null;
    this._page = 0;
    this._index = 0;
};

Window_NameInput.prototype.setEditWindow = function(editWindow) {
    this._editWindow = editWindow;
    this.refresh();
    this.updateCursor();
    this.activate();
};

Window_NameInput.prototype.table = function() {
    if ($gameSystem.isJapanese()) {
        return [
            Window_NameInput.JAPAN1,
            Window_NameInput.JAPAN2,
            Window_NameInput.JAPAN3
        ];
    } else if ($gameSystem.isRussian()) {
        return [Window_NameInput.RUSSIA];
    } else {
        return [Window_NameInput.LATIN1, Window_NameInput.LATIN2];
    }
};

Window_NameInput.prototype.maxCols = function() {
    return 10;
};

Window_NameInput.prototype.maxItems = function() {
    return 90;
};

Window_NameInput.prototype.itemWidth = function() {
    return Math.floor((this.innerWidth - this.groupSpacing()) / 10);
};

Window_NameInput.prototype.groupSpacing = function() {
    return 24;
};

Window_NameInput.prototype.character = function() {
    return this._index < 88 ? this.table()[this._page][this._index] : "";
};

Window_NameInput.prototype.isPageChange = function() {
    return this._index === 88;
};

Window_NameInput.prototype.isOk = function() {
    return this._index === 89;
};

Window_NameInput.prototype.itemRect = function(index) {
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const groupSpacing = this.groupSpacing();
    const col = index % 10;
    const group = Math.floor(col / 5);
    const x = col * itemWidth + group * groupSpacing + colSpacing / 2;
    const y = Math.floor(index / 10) * itemHeight + rowSpacing / 2;
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
};

Window_NameInput.prototype.drawItem = function(index) {
    const table = this.table();
    const character = table[this._page][index];
    const rect = this.itemLineRect(index);
    this.drawText(character, rect.x, rect.y, rect.width, "center");
};

Window_NameInput.prototype.updateCursor = function() {
    const rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};

Window_NameInput.prototype.isCursorMovable = function() {
    return this.active;
};

Window_NameInput.prototype.cursorDown = function(wrap) {
    if (this._index < 80 || wrap) {
        this._index = (this._index + 10) % 90;
    }
};

Window_NameInput.prototype.cursorUp = function(wrap) {
    if (this._index >= 10 || wrap) {
        this._index = (this._index + 80) % 90;
    }
};

Window_NameInput.prototype.cursorRight = function(wrap) {
    if (this._index % 10 < 9) {
        this._index++;
    } else if (wrap) {
        this._index -= 9;
    }
};

Window_NameInput.prototype.cursorLeft = function(wrap) {
    if (this._index % 10 > 0) {
        this._index--;
    } else if (wrap) {
        this._index += 9;
    }
};

Window_NameInput.prototype.cursorPagedown = function() {
    this._page = (this._page + 1) % this.table().length;
    this.refresh();
};

Window_NameInput.prototype.cursorPageup = function() {
    this._page = (this._page + this.table().length - 1) % this.table().length;
    this.refresh();
};

Window_NameInput.prototype.processCursorMove = function() {
    const lastPage = this._page;
    Window_Selectable.prototype.processCursorMove.call(this);
    this.updateCursor();
    if (this._page !== lastPage) {
        this.playCursorSound();
    }
};

Window_NameInput.prototype.processHandling = function() {
    if (this.isOpen() && this.active) {
        if (Input.isTriggered("shift")) {
            this.processJump();
        }
        if (Input.isRepeated("cancel")) {
            this.processBack();
        }
        if (Input.isRepeated("ok")) {
            this.processOk();
        }
    }
};

Window_NameInput.prototype.isCancelEnabled = function() {
    return true;
};

Window_NameInput.prototype.processCancel = function() {
    this.processBack();
};

Window_NameInput.prototype.processJump = function() {
    if (this._index !== 89) {
        this._index = 89;
        this.playCursorSound();
    }
};

Window_NameInput.prototype.processBack = function() {
    if (this._editWindow.back()) {
        SoundManager.playCancel();
    }
};

Window_NameInput.prototype.processOk = function() {
    if (this.character()) {
        this.onNameAdd();
    } else if (this.isPageChange()) {
        this.playOkSound();
        this.cursorPagedown();
    } else if (this.isOk()) {
        this.onNameOk();
    }
};

Window_NameInput.prototype.onNameAdd = function() {
    if (this._editWindow.add(this.character())) {
        this.playOkSound();
    } else {
        this.playBuzzerSound();
    }
};

Window_NameInput.prototype.onNameOk = function() {
    if (this._editWindow.name() === "") {
        if (this._editWindow.restoreDefault()) {
            this.playOkSound();
        } else {
            this.playBuzzerSound();
        }
    } else {
        this.playOkSound();
        this.callOkHandler();
    }
};
