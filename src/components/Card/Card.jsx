export default function Card({ card, onCardClick }) {
  return (
    <div className="elements__element">
      <button className="elements__element_urn" />
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
          <span className="elements__count">0</span>
        </div>
      </div>
    </div>
  );
}
