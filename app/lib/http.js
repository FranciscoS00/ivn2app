exports.postImage = function (data, callback) {
    // setup
    var postURL = "http://localhost:3000/upload";
    console.log("---------------------------");
    console.log("-- POST - START");
    console.log("-- POST - URL: " + postURL);
  
    // online
    if (Titanium.Network.online) {
      var xhr = Ti.Network.createHTTPClient({
        onload: function (e) {
          // debug
          console.log("-- POST - " + postURL + " - START");
          console.log("-- POST - " + postURL + " - STATUS: " + this.status);
          console.log("-- POST - " + postURL + " - TEXT:   " + this.responseText);
  
          // status ok
          if (this.status == "200" || this.status == "201") {
            if (checkJSON(this.responseText)) {
              callback(JSON.parse(this.responseText));
            } else {
              handleError(e, postURL, this.status, this.responseText);
            }
          }
          console.log("-- POST - " + postURL + " - END");
        },
        onerror: function (e) {
          console.log(this.responseText);
          console.log("-- POST - " + postURL + " - STATUS: " + this.status);
  
          if (checkJSON(this.responseText)) {
            callback(JSON.parse(this.responseText));
          } else {
            handleError(e, postURL, this.status, this.responseText);
          }
        },
        timeout: 60000,
      });
      xhr.open("POST", postURL);
      xhr.setRequestHeader("Connection", "close");
      xhr.send(data);
    }
  };