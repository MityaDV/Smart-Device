'use strict';

var buttonOpenPopup = document.querySelector('.btn--call');
var modal = document.querySelector('.modal-js');
var buttonClosePopup = modal.querySelector('.modal__button-close');
var modalForm = modal.querySelector('.modal__form');
var pageOverlay = document.querySelector('.overlay');
var nameUser = modal.querySelector('[name=username]');
var phoneUser = modal.querySelector('[name=userphone]');
var questionUser = modal.querySelector('[name=userquestion]');
var isStorageSupport = true;
var storage = '';
var storagePhone = '';
var storageText = '';
var ESC_KEYCODE = 27;

try {
  storage = localStorage.getItem('nameUser');
  storagePhone = localStorage.getItem('phoneUser');
  storageText = localStorage.getItem('questionUser');
} catch (err) {
  isStorageSupport = false;
}

var isEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    action();
  }
};

var onPopupEscPress = function (evt) {
  isEscEvent(evt, closePopup);
};

var onCLickOverlay = function () {
  if (modal.classList.contains('modal__open') && pageOverlay.classList.contains('overlay__open')) {
    modal.classList.remove('modal__open');
    modal.classList.remove('modal__error');
    pageOverlay.classList.remove('overlay__open');
  }
};

var openPopup = function (evt) {
  evt.preventDefault();

  if (storage) {
    nameUser.value = storage;
    phoneUser.value = storagePhone;
    questionUser.value = storageText;
    questionUser.focus();
  } else {
    nameUser.focus();
  }

  modal.classList.add('modal__open');
  pageOverlay.classList.add('overlay__open');

  pageOverlay.addEventListener('click', onCLickOverlay);
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {

  if (modal.classList.contains('modal__open') && pageOverlay.classList.contains('overlay__open')) {
    modal.classList.remove('modal__open');
    modal.classList.remove('modal__error');
    pageOverlay.classList.remove('overlay__open');
  }

  pageOverlay.removeEventListener('click', onCLickOverlay);
  document.removeEventListener('keydown', onPopupEscPress);
};

var errorPopup = function () {
  modal.classList.add('modal__error');
};

var formValidation = function (evt) {
  if (!nameUser.value || !phoneUser.value || !questionUser.value) {
    evt.preventDefault();
    errorPopup();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('nameUser', nameUser.value.trim());
      localStorage.setItem('phoneUser', phoneUser.value.trim());
    }
  }
};

buttonOpenPopup.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
modalForm.addEventListener('submit', formValidation);
