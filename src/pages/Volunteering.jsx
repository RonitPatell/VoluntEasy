import React from 'react';
import Card from '../components/Card';
import data from "../../volunteer_data.json";
import './Volunteering.css';

const Volunteering = () => {
  return (
    <><div className="volunteering">
          <h1>Volunteering Opportunities</h1>
          <p className="desc">Discover ways to make a difference in your community!</p>
      </div><div className="card-container">
              {data.map((item, index) => (
                  <Card
                      key={index}
                      eventName={item.eventName}
                      description={item.description}
                      datePosted={item.datePosted}
                      fullLink={item.fullLink} />
              ))}
          </div></>
  );
};

export default Volunteering;
