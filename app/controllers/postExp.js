$.postExp.open();

const http = require("http");
const Barcode = require('ti.barcode');
Barcode.allowRotation = true;
Barcode.displayedMessage = ' ';
Barcode.allowMenu = false;
Barcode.allowInstructions = false;
Barcode.useLED = true;

Ti.App.Properties.setBool("post", true);

//send image to api
$.gallery.addEventListener('click', function(){
    Ti.Media.openPhotoGallery({
        mediaTypes: [ Titanium.Media.MEDIA_TYPE_PHOTO ],
        success: function (e) {
			let params = {
				demo_image: e.media
			};
			http.post("form", params, function (e) {
				console.log(e);
			});
        },
        error: function (e) {
            alert('error opening image: ' + e);
        }
    });
});

function callback(){
	console.log("sending images");
}

//scan the qr code

var cameraPermission = (callback) => {
	if (Ti.Media.hasCameraPermissions()) {
		if (callback) {
			callback(true);
		}
	} else {
		Ti.Media.requestCameraPermissions(function (e) {
			if (e.success) {
				if (callback) {
					callback(true);
				}
			} else {
				if (callback) {
					callback(false);
				}
				alert('No camera permission'); // eslint-disable-line no-alert
			}
		});
	}
};

var overlay = Ti.UI.createView({
	backgroundColor: 'transparent',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0
});

var cancelButton = Ti.UI.createButton({
	title: 'Cancelar',
	textAlign: 'center',
	color: '#fff',
	backgroundColor: '#000',
	style: 0,
	font: {
		fontWeight: 'bold',
		fontSize: 30,
		fontFamily: "Roboto-Regular"
	},
	borderColor: '#000',
	borderRadius: 40,
	borderWidth: 5,
	opacity: 0.5,
	width: "50%",
	height: "5%",
	bottom: "1%"
});
cancelButton.addEventListener('click', function () {
	Barcode.cancel();
});
overlay.add(cancelButton);


$.scan.addEventListener('click', function () {
	Alloy.createController("scan").getView().open(); // remove this
	cameraPermission(function (re) {
		reset();
		// Note: while the simulator will NOT show a camera stream in the simulator, you may still call "Barcode.capture"
		// to test your barcode scanning overlay.
		Barcode.capture({
			animate: true,
			overlay: overlay,
			showCancel: false,
			showRectangle: false,
			keepOpen: false,
			acceptedFormats: [
				Barcode.FORMAT_QR_CODE
			]
		});
	});
});

var scannedBarcodes = {};
var scannedBarcodesCount = 0;

function reset() {
	scannedBarcodes = {};
	scannedBarcodesCount = 0;
	console.log("reseting");
}

Barcode.addEventListener('error', function (e) {
	console.log('An Error occured: ' + e);
});

Barcode.addEventListener('cancel', function (e) {
	Ti.API.info('Cancel received');
});

Barcode.addEventListener('success', function (e) {
	if(e.result == "https://www.uma.pt/"){
		Alloy.createController("scan").getView().open();
	}
});

