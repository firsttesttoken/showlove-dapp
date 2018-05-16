"use strict";

var OneLove = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.key = obj.key;
        this.author = obj.author;
        this.contentItems = obj.contentItems;
    } else {
        this.key = "";
        this.author = "";
        this.contentItems
        this.value = "";
    }
};

var LoveWords = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.time = obj.time;
        this.content = obj.content;
    } else {
        this.time = "";
        this.content = "";
    }

}

var MaxLength = 32;

OneLove.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

LoveWords.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
}


function getNowTimeString(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+ 1;
    var day = date.getDate();
    var Times = adapterNum(year)+" - "+adapterNum(month)+" - "+adapterNum(day)+"  ";
    return Times;
}

function adapterNum(val){
    var num = Number(val);
    if(num < 10) {
        num = '0' + num;
    }
    return num;
}

var MyLove = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new OneLove(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

MyLove.prototype = {
    init: function () {
    
    },

    save: function (key, value) {
        key = key.trim();
        value = value.trim();
        if (key === "" || value === "") {
            throw new Error("empty key / value");
        }
        if (value.length > MaxLength || key.length > MaxLength) {
            throw new Error("key / value exceed limit length")
        }

        var from = Blockchain.transaction.from;
        var oneLove = this.repo.get(key);
        if (oneLove == null) {
            oneLove = new OneLove();
            oneLove.author = from;
            oneLove.key = key;
            oneLove.contentItems = new Array();
        }
        var loveWords = new LoveWords();
        loveWords["time"] = getNowTimeString();
        loveWords["content"] = value;
        oneLove.contentItems.push(contentItem);
        this.repo.put(key, oneLove);
    },

    get: function (key) {
        key = key.trim();
        if (key === "") {
            throw new Error("empty key")
        }
        return this.repo.get(key);
    },

};

module.exports = MyLove;