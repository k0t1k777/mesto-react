import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import Footer from "./Footer/Footer.jsx";
import api from "../utils/api.js";
import { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  // const [userName, setUserName] = useState ({});
// Данные пользователя
  const [currentUser, setCurrentUser] = useState ({});
// Данные карточек 
  const [cards, setCards] = useState([]);


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
    setIsDeletePopup(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick () {
    setIsDeletePopup(true);
  }

    useEffect(() => {
      Promise.all([api.getInfoUser(), api.getInitialCards()]).then(
        ([infoUser, infoCard]) => {
          setCurrentUser(infoUser)
          setCards(infoCard);
        }
      )
      .catch((error) => console.error(`Ошибка ${error}`))
    }, []);

  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardDelete ={handleDeleteClick }
        cards={cards}
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
        isOpen={isDeletePopup}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
