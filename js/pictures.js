<<<<<<< HEAD
'use strict';

var PHOTO_COUNT = 25;

var COMMENT_VARIANTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var generateRandomInclusive = function (lowBound, highBound) {
  return lowBound + Math.floor(Math.random() * (highBound - lowBound + 1));
};

var generatePictures = function () {
  var pictures = [];
  var likesLowBound = 15;
  var likesHighBound = 200;

  for (var i = 0; i < PHOTO_COUNT; i++) {
    var commentsCount = generateRandomInclusive(1, 2);
    var comments = [];
    for (var j = 0; j < commentsCount; j++) {
      comments[j] = COMMENT_VARIANTS[Math.floor(Math.random() * COMMENT_VARIANTS.length)];
    }

    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: generateRandomInclusive(likesLowBound, likesHighBound),
      comments: comments,
    };
  }

  return pictures;
};

var createPictureElement = function (picture) {
  var pictureTemplate = document.querySelector('#picture-template');
  if (pictureTemplate) {
    var pictureTemplateElement = pictureTemplate.content.querySelector('.picture');

    if (pictureTemplateElement) {
      var pictureElement = pictureTemplateElement.cloneNode(true);

      var imgElement = pictureElement.querySelector('img');
      if (imgElement) {
        imgElement.src = picture.url;
      }

      var likesElement = pictureElement.querySelector('.picture-likes');
      if (likesElement) {
        likesElement.textContent = picture.likes;
      }

      var commentsElement = pictureElement.querySelector('.picture-comments');
      if (commentsElement) {
        commentsElement.textContent = picture.comments.length;
      }
    }
  }

  return pictureElement;
};

var insertPictureElements = function (pictures) {
  var picturesTargetElement = document.querySelector('.pictures');
  if (picturesTargetElement) {
    var picturesFragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      var pictureElement = createPictureElement(pictures[i]);
      picturesFragment.appendChild(pictureElement);
    }

    picturesTargetElement.appendChild(picturesFragment);
  }
};

var showGallery = function () {
  var galleryOverlayElement = document.querySelector('.gallery-overlay');
  if (galleryOverlayElement) {
    var pictures = generatePictures();
    var activePicture = pictures[0];
    insertPictureElements(pictures);

    var galleryOverlayImageElement = galleryOverlayElement.querySelector('.gallery-overlay-image');
    if (galleryOverlayImageElement) {
      galleryOverlayImageElement.src = activePicture.url;
    }

    var likesCountElement = galleryOverlayElement.querySelector('.likes-count');
    if (likesCountElement) {
      likesCountElement.textContent = activePicture.likes;
    }

    var commentsCountElement = galleryOverlayElement.querySelector('.comments-count');
    if (commentsCountElement) {
      commentsCountElement.textContent = activePicture.comments.length;
    }

    galleryOverlayElement.classList.remove('hidden');
  }
};

showGallery();
=======
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var COMMENT_VARIANTS = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var minLikes = 15;
var maxLikes = 201;

var photos = new Array(25);
var similarPictureTemplate = document.querySelector('#picture-template').content;
var similarPictures = document.querySelector('.pictures');

for (var i = 0; i < 25; i++) {
	var randomIndex = Math.random();
	shuffle(COMMENT_VARIANTS);
	photos[i] =
		{
			url: 'photos/' + (i + 1) + '.jpg',
			likes: randomInteger(minLikes, maxLikes),
		};

	if (randomIndex > 0.5) {
		photos[i].comments = [COMMENT_VARIANTS[0]];
	}
	else {
		photos[i].comments = [COMMENT_VARIANTS[0], COMMENT_VARIANTS[1]];
	}


}

var renderPhoto = function (photo, index) {
	var pictureElement = similarPictureTemplate.cloneNode(true);
	pictureElement.querySelector('img').setAttribute('src', photo.url);
	pictureElement.querySelector('.picture-likes').textContent = photo.likes;
	pictureElement.querySelector('.picture-comments').textContent = photo.comments;
	pictureElement.firstElementChild.index = index;
	return pictureElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < photos.length; i++) {
	fragment.appendChild(renderPhoto(photos[i], i));
}

similarPictures.appendChild(fragment);

var gallery = document.querySelector('.gallery-overlay');
var pictures = similarPictures.querySelectorAll('.picture');
var closePicture = gallery.querySelector('.gallery-overlay-close');
var onPopupEscPress = function (evt) {
	if (evt.keyCode === ESC_KEYCODE) {
		closeDetails();
	}
};
var openDetails = function (ph) {
	gallery.classList.remove('hidden');
	gallery.querySelector('.gallery-overlay-image').setAttribute('src', ph.url);
	gallery.querySelector('.likes-count').textContent = ph.likes;
	gallery.querySelector('.comments-count').textContent = ph.comments;
	document.addEventListener('keydown', onPopupEscPress);
};
var closeDetails = function () {
	gallery.classList.add('hidden');
	document.removeEventListener('keydown', onPopupEscPress);
};
for (var k = 0; k < pictures.length; k++) {
	pictures[k].addEventListener('click', function (e) {
		e.preventDefault(); 
		openDetails(photos[e.currentTarget.index]);
	});
	pictures[k].addEventListener('keydown', function (e) {
		if (e.keyCode === ENTER_KEYCODE) {
			openDetails(photos[e.currentTarget.index]);
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
//gallery.classList.remove('hidden');

//gallery.querySelector('.gallery-overlay-image').setAttribute('src', photos[0].url);
//gallery.querySelector('.likes-count').textContent = photos[0].likes;
//gallery.querySelector('.comments-count').textContent = photos[0].comments;



function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
}

function randomInteger(minLikes, maxLikes) {
	var rand = Math.floor(minLikes + Math.random() * (maxLikes + 1 - minLikes));
	return rand;
}
>>>>>>> parent of a8d6642... Revert "Initial commit"
