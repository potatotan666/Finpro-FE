import React from "react";
import { MdAccessTime, MdStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import "./thumbnailCardStyle.scss";

const ThumbnailCard = (props) => {
  const navigate = useNavigate();

  const handleNavigate = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  const timeFormater = (value) => {
    const hour = Math.floor(value / 3600);
    const minutes = Math.floor((value - hour * 3600) / 60);
    const seconds = value - hour * 3600 - minutes * 60;

    return `${hour}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <a
        href={`/recipe/${props.category}-${props.recipeId}-${props.name}`}
        className="thumbnail-card"
        onClick={(e) =>
          handleNavigate(
            e,
            `/recipe/${props.category}-${props.recipeId}-${props.name}`
          )
        }
      >
        <div className="card-image">
          <img src={props.imageUrl} alt="" />
        </div>

        <div className="card-body">
          <h1>{props.name}</h1>

          <div className="item">
            <p>Category: {props.category}</p>
            <p>Calories: {props.calories}</p>

            <div className="card-footer">
              <div className="time">
                <MdAccessTime />
                <p className="time">{timeFormater(props.cookingTime)}</p>
              </div>

              {/* <div className="rating">
                <MdStar />
                <p className="rating">{props.rating ? props.rating : 0}/5</p>
              </div> */}
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default ThumbnailCard;
