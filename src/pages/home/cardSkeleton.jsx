import React from "react";

import "./cardSkeletonStyle.scss";

const CardSkeleton = () => {
  return (
    <>
      <div className="card-skeleton-container">
        <div className="card-skeleton-image"></div>
        <div className="card-skeleton-body">
          <div className="title-skeleton"></div>
          <div className="title-skeleton"></div>

          <div className="card-skeleton-item">
            <div className="text-skeleton"></div>
            <div className="text-skeleton"></div>

            <div className="card-skeleton-footer">
              <div className="time-skeleton">
                <div className="time-skeleton-item"></div>
              </div>

              {/* <div className="rating-skeleton">
                <div className="rating-skeleton-item"></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSkeleton;
