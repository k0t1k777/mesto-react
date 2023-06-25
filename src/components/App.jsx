import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import Footer from "./Footer/Footer.jsx";
import { useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page__content">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <PopupWithForm
        name="popupEditProfile"
        title="Редактировать профиль"
        nameOfButton="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__wrapper">
          <input
            name="userName"
            className="popup__input popup__input_type_name"
            id="popup__name"
            type="text"
            placeholder="Ваше имя"
            minLength={2}
            maxLength={40}
            required=""
          />
          <span className="popup__error" id="popup__name-error" />
        </div>
        <div className="popup__wrapper">
          <input
            name="userJob"
            className="popup__input popup__input_type_job"
            id="popup__job"
            type="text"
            placeholder="Чем занимаетесь"
            minLength={2}
            maxLength={200}
            required=""
          />
          <span className="popup__error" id="popup__job-error" />
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="popupAddPicture"
        title="Новое место"
        nameOfButton="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__wrapper">
          <input
            name="title"
            className="popup__input popup__input_type_title"
            id="title"
            type="text"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required=""
          />
          <span className="popup__error" id="title-error" />
        </div>
        <div className="popup__wrapper">
          <input
            name="link"
            className="popup__input popup__input_type_link"
            id="link"
            type="url"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span className="popup__error" id="link-error" />
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="popupConfirm"
        title="Вы уверены?"
        nameOfButton="Да"
        onClose={closeAllPopups}
      ></PopupWithForm>

      <PopupWithForm
        name="popupRefreshAvatar"
        title="Обновить аватар"
        nameOfButton="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__wrapper">
          <input
            name="avatar"
            className="popup__input popup__input_type_link"
            id="avatar"
            type="url"
            placeholder="Ссылка на аватар"
            required=""
          />
          <span className="popup__error" id="avatar-error" />
        </div>
      </PopupWithForm>
    </div>
  );
}

export default App;
