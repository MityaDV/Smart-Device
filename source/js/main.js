'use strict';

var buttonOpenPopup = document.querySelector('.btn--call');
var modal = document.querySelector('.modal-js');
var buttonClosePopup = modal.querySelector('.modal__button-close');
var modalForm = modal.querySelector('.modal__form');
var pageOverlay = document.querySelector('.overlay');
var nameUser = modal.querySelector('[name=username]');
var phoneUser = modal.querySelector('[name=userphone]');
var questionUser = modal.querySelector('[name=userquestion]');
var footer = document.querySelector('.footer');
var footerNav = footer.querySelector('.footer__navigation');
var footerContact = footer.querySelector('.footer__contact');
var footerToggleNav = footer.querySelector('.footer__toggle--navigation');
var footerToggleContact = footer.querySelector('.footer__toggle--contact');
var btnScrollDown = document.querySelector('.promo__scroll-button');
var isStorageSupport = true;
var storage = '';
var storagePhone = '';
var storageText = '';
var ESC_KEYCODE = 27;

footerToggleNav.addEventListener('click', function () {
  if (footerNav.classList.contains('footer__navigation--closed')) {
    footerNav.classList.remove('footer__navigation--closed');
    footerNav.classList.add('footer__navigation--opened');
  } else {
    footerNav.classList.add('footer__navigation--closed');
    footerNav.classList.remove('footer__navigation--opened');
  }
});

footerToggleContact.addEventListener('click', function () {
  if (footerContact.classList.contains('footer__contact--closed')) {
    footerContact.classList.remove('footer__contact--closed');
    footerContact.classList.add('footer__contact--opened');
  } else {
    footerContact.classList.add('footer__contact--closed');
    footerContact.classList.remove('footer__contact--opened');
  }
});

// сохраняем значения полей в localStorage
try {
  storage = localStorage.getItem('nameUser');
  storagePhone = localStorage.getItem('phoneUser');
  storageText = localStorage.getItem('questionUser');
} catch (err) {
  isStorageSupport = false;
}

// утилита для обработки клавиатурных событий
var isEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    action();
  }
};

// обработчик нажатия ESC
var onPopupEscPress = function (evt) {
  isEscEvent(evt, closePopup);
};

// обработчик нажатия на overlay
var onCLickOverlay = function () {
  if (modal.classList.contains('modal__open') && pageOverlay.classList.contains('overlay__open')) {
    modal.classList.remove('modal__open');
    modal.classList.remove('modal__error');
    pageOverlay.classList.remove('overlay__open');
  }
};

// логика открытия popup
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

// логика закрытия popup
var closePopup = function () {

  if (modal.classList.contains('modal__open') && pageOverlay.classList.contains('overlay__open')) {
    modal.classList.remove('modal__open');
    modal.classList.remove('modal__error');
    pageOverlay.classList.remove('overlay__open');
  }

  pageOverlay.removeEventListener('click', onCLickOverlay);
  document.removeEventListener('keydown', onPopupEscPress);
};

// логика ошибки при вводе данных
var errorPopup = function () {
  modal.classList.add('modal__error');
};

// логика валидации формы popup
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

// навешиваем события на элементы
buttonOpenPopup.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
modalForm.addEventListener('submit', formValidation);

// прокрутка к блоку преимуществ

function scrollDown() {
  var windowCoords = document.documentElement.clientHeight;
  (function scroll() {
    if (window.pageYOffset < windowCoords) {
      window.scrollBy(0, 10);
      setTimeout(scroll, 0);
    }
    if (window.pageYOffset > windowCoords) {
      window.scrollTo(0, windowCoords);
    }
  })();
}

btnScrollDown.addEventListener('click', scrollDown);

// прокрутка к форме

$(document).ready(function () {
  $('#promo').on('click', 'a', function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
});
