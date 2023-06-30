export default function EditProfilePopup() {
  return (
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
  );
}
