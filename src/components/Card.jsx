const Card = ({ eventName, description, fullLink, datePosted }) => {
    return (
        <div className="card">
            <h2>{eventName}</h2>
            <p>{description}</p>
            <p><strong>{datePosted}</strong></p>
            <a href={fullLink} target="_blank" rel="noopener noreferrer">
                View Opportunity
            </a>
        </div>
    );
};

export default Card;