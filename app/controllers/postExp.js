$.postExp.open();

Ti.App.Properties.setBool("post", true);

//send image to api
$.gallery.addEventListener('click', function(){
    Ti.Media.openPhotoGallery({
        mediaTypes: [ Titanium.Media.MEDIA_TYPE_PHOTO ],
        success: function (e) {
            //this has to send to the api and give some feedback that it was sent
            $.teste.image = e.media;
        },
        error: function (e) {
            alert('error opening image: ' + e);
        }
    });
});

//scan the qr code


