import React, { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

import "./listDetailStyle.scss";

const ListDetail = (props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="list-detail-container">
        <button className="list-detail-button" onClick={() => handleExpand()}>
          {props.data && (
            <>
              {props.name === "About the recipe" ? (
                <p>{`• ${props.name}`}</p>
              ) : (
                <p>{`• ${props.name} (${props.data.length})`}</p>
              )}
            </>
          )}

          <div className={isExpanded ? "arrow-icon expand" : "arrow-icon"}>
            <MdOutlineArrowDropDown size={24} />
          </div>
        </button>

        <div
          className={
            isExpanded ? "list-detail-items expand" : "list-detail-items"
          }
        >
          {props.data && (
            <>
              {props.data.map((value, index) => (
                <div
                  key={index}
                  className={
                    isExpanded ? "detail-card-item expand" : "detail-card-item"
                  }
                >
                  {props.name === "About the recipe" && <p>{value}</p>}
                  {props.name === "Ingredients" && (
                    <p>
                      {index + 1}. {value.name}
                    </p>
                  )}
                  {props.name === "Steps" && (
                    <p>
                      {value.order_number}. {value.description}
                    </p>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListDetail;
