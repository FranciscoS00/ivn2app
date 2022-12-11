exports.post = function (url, data, callback, progress) {
  // setup
  var postURL = "http://89.109.64.184//api/" + url;
  console.log(data);
  console.log("---------------------------");
  console.log("-- POST - START");
  console.log("-- POST - URL: " + postURL);

  // online
  if (Titanium.Network.online) {
    var xhr = Ti.Network.createHTTPClient({
      onload: function (e) {
        // debug
        console.log("-- POST - " + url + " - START");
        console.log("asd");
        console.log("-- POST - " + url + " - STATUS: " + this.status);
        console.log("3");
        console.log("-- POST - " + url + " - TEXT:   " + this.responseText);

        // status ok
        if (this.status == "200" || this.status == "201") {
          if (checkJSON(this.responseText)) {
            callback(JSON.parse(this.responseText));
          } else {
            handleError(e, url, this.status, this.responseText);
          }
        }
        console.log("-- POST - " + url + " - END");
      },
      onerror: function (e) {
        console.log(this.responseText);
        console.log(e);
        console.log("-- POST - " + url + " - STATUS: " + this.status);

        if (checkJSON(this.responseText)) {
          callback(JSON.parse(this.responseText));
        } else {
          handleError(e, url, this.status, this.responseText);
        }
      },
      timeout: 60000,
    });
    if (progress) {
      xhr.onsendstream = function (e) {
        progress(e.progress);
      };
    }
    xhr.open("POST", postURL);
    xhr.setRequestHeader("Connection", "close");

    if (Ti.App.Properties.hasProperty("data")) {
      xhr.setRequestHeader("Authorization", "");
    }
    xhr.send(data);
  } else {
    console.log("rip internet");
  }
};

function checkJSON(_json) {
  try {
    JSON.parse(_json);
  } catch (e) {
    alerted.note(e);
    return false;
  }
  return true;
}