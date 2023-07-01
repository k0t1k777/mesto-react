import Card from "../Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDeleteSubmit, onCardLike, cards }) {
  const currentUser = useContext(CurrentUserContext)

  // const [userName, setUserName] = useState("");
  // const [userDescription, setUserDescription] = useState("");
  // const [userAvatar, setUserAvatar] = useState("");

  return (
    <main className="container">
      <section className="profile">
        <button
          className="profile__avatar-btn"
          type="button"
          onClick={onEditAvatar}
        >
          <img src={currentUser.avatar} className="profile__avatar" alt="Аватарка" />
        </button>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="section-title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
          </div>
          <p className="section-subtitle">{currentUser.about}</p>
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
              <Card key={data._id} card={data} onCardLike={onCardLike} onCardClick={onCardClick} onCardDeleteSubmit={onCardDeleteSubmit}></Card>
          );
        })}
      </section>
    </main>
  );
}

