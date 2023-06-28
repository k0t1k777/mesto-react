export default function Card({ card, onCardClick, onCardDelete }) {
  return (
    <div className="elements__element">

      {/* Определяем, являемся ли мы владельцем текущей карточки */}
      {/* {card.myid = card.owner._id === currentUser._id} */}
     {/* Далее в разметке используем переменную для условного рендеринга */}
        {/* {card.myid && <button className='elements__element_urn' onClick={onCardDelete} />}  */}

      <button className="elements__element_urn" onClick={onCardDelete}/>
      <img
        src={card.link}
        className="elements__image"
        alt={card.name}
        onClick={() => onCardClick({ name: card.name, link: card.link })}
      />
      <div className="elements__wrapper">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__forLikes">
          <button type="button" className="elements__button" />
          <span className="elements__count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
