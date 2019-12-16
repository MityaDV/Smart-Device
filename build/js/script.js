'use strict';

var buttonCall = document.querySelector('.btn--call');
var modal = document.querySelector('.modal-js');
var modalClose = modal.querySelector('.modal__button-close');
var modalForm = modal.querySelector('.modal__form');
var nameUser = modal.querySelector('[name=username]');
var phoneUser = modal.querySelector('[name=userphone]');
var questionUser = modal.querySelector('[name=userquestion]');
var isStorageSupport = true;
var storage = '';
var storagePhone = '';
var storageText = '';

try {
  storage = localStorage.getItem('nameUser');
  storagePhone = localStorage.getItem('phoneUser');
  storageText = localStorage.getItem('questionUser');
} catch (err) {
  isStorageSupport = false;
}

buttonCall.addEventListener('click', function (evt) {
  evt.preventDefault();

  modal.classList.add('modal__open');

  if (storage) {
    nameUser.value = storage;
    phoneUser.value = storagePhone;
    questionUser.value = storageText;
    questionUser.focus();
  } else {
    nameUser.focus();
  }
});

modalClose.addEventListener('click', function (evt) {
  evt.preventDefault();

  modal.classList.remove('modal__open');
  modal.classList.remove('modal__error');
});

modalForm.addEventListener('submit', function (evt) {
  if (!nameUser.value || !phoneUser.value || !questionUser.value) {
    evt.preventDefault();

    modal.classList.add('modal__error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('nameUser', nameUser.value.trim());
      localStorage.setItem('phoneUser', phoneUser.value.trim());
    }
  }
});

document.addEventListener('keyup', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (modal.classList.contains('modal__open')) {
      modal.classList.remove('modal__open');
      modal.classList.remove('modal__error');
    }
  }
});
