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
