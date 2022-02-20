//++++
// prtt()
// prints messages on to the 'tester' div...

// today
Date.prototype.today = function () {
    return (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + this.getFullYear();
};

// now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
};

// ASSUMES that a 'tester' el is available :)
function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}// syntaxHighlight

prtt = function () {
    var l, s, elID;

    if (arguments.length === 3) {
        l =    arguments[0];
        s =    arguments[1];
        elID = arguments[2];
    }// label, msg, elID
    else if (arguments.length === 2) {
        l = arguments[0];
        s = arguments[1];
        elID = "tester";
    }// label, msg
    else {
        l = "";
        s = arguments[0];
        elID = "tester";
    }

    if (s==undefined)return;


    //alert(elID);

    var newDate = new Date();
    var datetime = newDate.timeNow() + "::" + newDate.today();
    //var dateTime = newDate;
    datetime="";

    var trm = document.getElementById(elID);

    ////alert(trm);
    if (trm === null) {
        // do nothing
    } else {
        if ((typeof s) === "string")
            trm.innerHTML += l + s + "<br>";
        else
            trm.innerHTML += l + syntaxHighlight(JSON.stringify(s, undefined, 4)) + "<br>";
    }// else

   //https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
   //var objDiv = document.getElementById(elID);
   //objDiv.scrollTop = objDiv.scrollHeight;
   if(trm!=null){
   trm.scrollTop = trm.scrollHeight;}

};// prtt()

// cleartester - clears all of the tester area
cleartester = function () {
  document.getElementById("tester").innerHTML = "";
}; // cleartester()



//----
