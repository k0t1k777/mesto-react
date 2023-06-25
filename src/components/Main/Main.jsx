import { useEffect, useState } from "react";
import api from "../../utils/api";
import Card from "../Card/Card";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInfoUser(), api.getInitialCards()]).then(
      ([infoUser, infoCard]) => {
        setUserAvatar(infoUser.avatar);
        setUserName(infoUser.name);
        setUserDescription(infoUser.about);
        infoCard.forEach((card) => (card.myid = infoUser._id));
        setCards(infoCard);
      }
    )
    .catch((error) => console.error(`Ошибка ${error}`))
  }, []);

  return (
    <main className="container">
      <section className="profile">
        <button
          className="profile__avatar-btn"
          type="button"
          onClick={onEditAvatar}
        >
          <img src={userAvatar} className="profile__avatar" alt="Аватарка" />
        </button>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="section-title">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
          </div>
          <p className="section-subtitle">{userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
      {cards.map((data) => {
            return (
              <Card key={data._id} card={data} onCardClick={onCardClick}></Card>
          );
        })}
      </section>
    </main>
  );
}
