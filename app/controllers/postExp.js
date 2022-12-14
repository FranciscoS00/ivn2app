$.postExp.open();

const http = require("http");
const Barcode = require('ti.barcode');
Barcode.allowRotation = true;
Barcode.displayedMessage = ' ';
Barcode.allowMenu = false;
Barcode.allowInstructions = false;
Barcode.useLED = false;

Ti.App.Properties.setString("post", "true");

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
		fontFamily: "Cascade"
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


$.scanButton.addEventListener('click', function () {
	Alloy.createController("scan").getView().open(); // remove this on final
	/* cameraPermission(function (re) {
		reset();
		Barcode.capture({
			animate: true,
			overlay: overlay,
			showCancel: false,
			showRectangle: true,
			keepOpen: false,
			acceptedFormats: [
				Barcode.FORMAT_QR_CODE
			]
		});
	}); */
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
	console.log(e.result);
	if(e.result == "https://www.uma.pt/"){
		Alloy.createController("scan").getView().open();
	}
});

