var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var gallery = document.querySelector('.gallery-overlay');
var similarPictures = document.querySelector('.pictures');
var pictures = similarPictures.querySelectorAll('.picture');
var closePicture = gallery.querySelector('.gallery-overlay-close');


var onPopupEscPress = function (evt) {
	if (evt.keyCode === ESC_KEYCODE) {
		closeDetails();
	}
};
var openDetails = function (photo) {
	gallery.classList.remove('hidden');
	gallery.querySelector('.gallery-overlay-image').setAttribute('src', photo.url);
	gallery.querySelector('.likes-count').textContent = photo.likes;
	gallery.querySelector('.comments-count').textContent = photo.comments;
	document.addEventListener('keydown', onPopupEscPress);
};
var closeDetails = function () {
	gallery.classList.add('hidden');
	document.removeEventListener('keydown', onPopupEscPress);
};
for (var i = 0; i < pictures.length; i++) {
	pictures[i].addEventListener('click', function (e) {
		e.preventDefault(); 
		openDetails(photos[i]);
	});
	pictures[i].addEventListener('keydown', function (evt) {
		if (evt.keyCode === ENTER_KEYCODE) {
			openDetails(photos[i]);
		}
	});
}


closePicture.addEventListener('click', function () {
	closeDetails();
});
closePicture.addEventListener('keydown', function (evt) {
	if (evt.keyCode == ENTER_KEYCODE) {
		closeDetails();
	}
});