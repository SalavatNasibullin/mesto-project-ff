(()=>{"use strict";var e="popup_is-opened",t="popup_is-animated";function n(n){n.classList.add(t),setTimeout((function(){n.classList.add(e)}),0),document.addEventListener("keydown",c)}function r(n){n.classList.remove(e),n.addEventListener("transitionend",(function(){n.classList.remove(t)}),{once:!0}),document.removeEventListener("keydown",c)}function o(t){t.addEventListener("click",(function(n){n.target.classList.contains(e)&&r(t)}))}function c(t){if("Escape"===t.key){var n=document.querySelector("."+e);n&&r(n)}}var u=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.errorClass)},a=function(e,t,n){e.every((function(e){return e.validity.valid}))?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)},i=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),a(n,r,t)},l={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-34",headers:{authorization:"b1ee835b-77af-4cd9-98da-82bd72bbe12f","Content-Type":"application/json"}},s=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}document.addEventListener("DOMContentLoaded",(function(){var e=".places__list",t=".popup__close",c=".profile__title",p=".profile__description",f={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},m=document.querySelector(".popup_type_image"),_=m.querySelector(t),y=m.querySelector(".popup__caption"),v=m.querySelector(".popup__image");function S(e){y.textContent=e.name,v.src=e.link,v.alt=e.name,n(m)}o(m),_.addEventListener("click",(function(){return r(m)}));var h=document.querySelector(".popup_type_edit"),b=h.querySelector(t),q=document.querySelector(".profile__edit-button"),E=document.forms["edit-profile"],L=E.querySelector(".popup__input_type_name"),C=E.querySelector(".popup__input_type_description");o(h),b.addEventListener("click",(function(){return r(h)})),q?q.addEventListener("click",(function(){L.value=document.querySelector(c).textContent,C.value=document.querySelector(p).textContent,i(E,f),n(h)})):console.error("Кнопка редактирования профиля не найдена!");var k=document.querySelector(".popup_type_new-card"),g=k.querySelector(t),x=document.querySelector(".profile__add-button"),A=document.forms["new-place"],T=A.querySelector(".popup__input_type_card-name"),U=A.querySelector(".popup__input_type_url");o(k),g.addEventListener("click",(function(){return r(k)})),x?x.addEventListener("click",(function(){A.reset(),i(A,f),n(k)})):console.error("Кнопка добавления новой карточки не найдена!");var j=document.querySelector(".popup_type_edit-avatar"),w=document.forms["edit-avatar"],O=w.querySelector(".popup__input_type_url"),D=document.querySelector(".profile__image"),I=j.querySelector(".popup__close");I?I.addEventListener("click",(function(){return r(j)})):console.error("Кнопка закрытия всплывающего окна редактирования аватара не найдена!");var P=document.querySelector(".profile__image-overlay");function B(e,t,n,o){var c=t.querySelector(".popup__button"),u=c.textContent;c.textContent="Сохранение...",e().then((function(e){o(e),r(n)})).catch((function(e){console.error("Ошибка:",e)})).finally((function(){c.textContent=u}))}P?P.addEventListener("click",(function(){console.log("Клик по аватару"),w.reset(),i(w,f),n(j)})):console.error("Оверлей для профиля не найден!"),w.addEventListener("submit",(function(e){e.preventDefault(),B((function(){return e=O.value,fetch("".concat(l.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:e})}).then(s);var e}),w,j,(function(e){D.style.backgroundImage="url(".concat(e.avatar,")")}))})),E.addEventListener("submit",(function(e){e.preventDefault(),B((function(){return e=L.value,t=C.value,fetch("".concat(l.baseUrl,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:e,about:t})}).then(s);var e,t}),E,h,(function(e){document.querySelector(c).textContent=e.name,document.querySelector(p).textContent=e.about}))})),A.addEventListener("submit",(function(t){t.preventDefault(),B((function(){return e=T.value,t=U.value,fetch("".concat(l.baseUrl,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify({name:e,link:t})}).then(s);var e,t}),A,k,(function(t){var n=z(t,S,$);document.querySelector(e).prepend(n)}))}));var M=document.querySelector(".popup_type_delete-card"),N=document.forms["delete-card"],H=null;if(M){var J=M.querySelector(".popup__close");J?J.addEventListener("click",(function(){r(M)})):console.error("Кнопка закрытия модального окна удаления карточки не найдена!")}else console.error("Модальное окно удаления карточки не найдено!");function z(e,t,r,o){var c=document.querySelector("#card-template").content.cloneNode(!0).querySelector(".card"),u=c.querySelector(".card__image"),a=c.querySelector(".card__title"),i=c.querySelector(".card__like-button"),l=c.querySelector(".card__like-count"),s=c.querySelector(".card__delete-button");return u.src=e.link,u.alt=e.name,a.textContent=e.name,l.textContent=e.likes.length,s&&(e.owner._id!==o?s.remove():s.addEventListener("click",(function(){return function(e,t){H={cardId:e,cardElement:t},n(M)}(e._id,c)}))),u.addEventListener("click",(function(){return t(e)})),i.addEventListener("click",(function(){return r(e._id,i,l)})),c}function $(e,t,n){(function(e,t){var n=t?"DELETE":"PUT";return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:n,headers:l.headers}).then(s)})(e,t.classList.contains("card__like-button_is-active")).then((function(e){t.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.error("Ошибка при обработке лайка:",e)}))}N.addEventListener("submit",(function(e){e.preventDefault();var t,n=N.querySelector(".popup__button");n.textContent="Удаление...",(t=H.cardId,fetch("".concat(l.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:l.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){H.cardElement.remove(),r(M)})).catch((function(e){console.error("Ошибка при удалении карточки:",e)})).finally((function(){n.textContent="Да"}))})),Promise.all([fetch("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).then(s),fetch("".concat(l.baseUrl,"/cards"),{headers:l.headers}).then(s)]).then((function(t){var n,r,o,u,a,i=(a=2,function(e){if(Array.isArray(e))return e}(u=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(u,a)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(u,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=i[0],s=i[1];console.log("Данные пользователя:",l),console.log("Загруженные карточки:",s),document.querySelector(c).textContent=l.name,document.querySelector(p).textContent=l.about,D.style.backgroundImage="url(".concat(l.avatar,")"),n=s,r=l._id,(o=document.querySelector(e)).innerHTML="",console.log("Карточки для рендеринга:",n),n.forEach((function(e){var t=z(e,S,$,r);o.append(t)}))})).catch((function(e){console.error("Ошибка при загрузке данных:",e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);a(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?u(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),a(n,r,t)}))}))}(t,e)}))}(f)}))})();