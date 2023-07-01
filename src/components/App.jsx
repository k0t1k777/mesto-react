import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import Footer from "./Footer/Footer.jsx";
import api from "../utils/api.js";
import { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [deleteCard, setDeleteCard] = useState("");

  // Данные пользователя
  const [currentUser, setCurrentUser] = useState({});
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

  function handleDeleteClick(cardId) {
    setIsDeletePopup(true);
    setDeleteCard(cardId);
  }

  function handleCardDeleteSubmit(event) {
    event.preventDefault();
    api
      .removeCard(deleteCard)
      .then(() => {
        setCards(
          cards.filter((item) => {
            return item._id !== deleteCard;
          })
        );
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  // Лайки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleUpdateUser(data) {
    api.changeProfile(data)
      .then((infoUser) => {
        setCurrentUser(infoUser);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  useEffect(() => {
    Promise.all([api.getInfoUser(), api.getInitialCards()])
      .then(([infoUser, infoCard]) => {
        setCurrentUser(infoUser);
        setCards(infoCard);
      })
      .catch((error) => console.error(`Ошибка ${error}`));
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
          onCardDelete={handleDeleteClick}
          onCardLike={handleCardLike}
          cards={cards}
        />

        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

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
          onCardDeletSubmit={handleCardDeleteSubmit}
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
