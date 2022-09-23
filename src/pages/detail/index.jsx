import React, { useState, useEffect } from "react";
import { NavigationStateContext } from "../../App";
import { useParams } from "react-router-dom";
import { MdAccessTime } from "react-icons/md";

import SideNavbar from "../../components/navigation/sideNav";
import TopNavbar from "../../components/navigation/topNav";
import Footer from "../../components/footer";
import axios from "axios";

import "./style.scss";

import ListDetail from "./listDetail";

const RecipeDetail = (props) => {
  const [showSideNavbar, setShowSideNavbar] = useState(false);
  const [recipeData, setRecipeData] = useState({});

  const [modalVisible, setModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const { id, name } = useParams();

  const timeFormater = (value) => {
    const hour = Math.floor(value / 3600);
    const minutes = Math.floor((value - hour * 3600) / 60);
    const seconds = value - hour * 3600 - minutes * 60;

    return `${hour}h ${minutes}m ${seconds}s`;
  };

  const fetchRecipe = async (isLoadingRequire) => {
    if (isLoadingRequire) {
      setIsLoading(true);
    }

    try {
      await axios
        .get(props.apiUrl.getRecipeById + id)
        .then((res) => {
          setRecipeData(res.data);

          if (isLoadingRequire) {
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRecipe(true);
  }, []);

  useEffect(() => {
    document.title = name;
  }, []);

  return (
    <>
      <div className="recipe-detail-container">
        <NavigationStateContext.Provider
          value={[showSideNavbar, setShowSideNavbar, props.apiUrl]}
        >
          <SideNavbar setCurrentPage={props.setCurrentPage} />
          <TopNavbar setCurrentPage={props.setCurrentPage} />
        </NavigationStateContext.Provider>

        <div className="page-container">
          <div className="page-content">
            <div className="content-body">
              <div className="card-content">
                <div className="card-header">
                  {isLoading ? (
                    <div className="skeleton-img-container"></div>
                  ) : (
                    <div className="img-container">
                      <img src={recipeData.image_url} alt="" />
                    </div>
                  )}

                  <div className="name-container">
                    {isLoading ? (
                      <>
                        <div className="skeleton-title"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                      </>
                    ) : (
                      <>
                        <h1>{recipeData.name}</h1>
                        <p>Category: {recipeData.category}</p>
                        <p>Cooked by: {recipeData.username}</p>
                        <p>Calories: {recipeData.calories}</p>
                      </>
                    )}
                  </div>
                  <div className="name-footer">
                    {isLoading ? (
                      <>
                        <div className="skeleton-footer"></div>
                        <div className="skeleton-footer"></div>
                      </>
                    ) : (
                      <>
                        <div className="time">
                          <p className="time">
                            {" "}
                            <MdAccessTime />
                            {timeFormater(recipeData.cooking_time)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="card-body">
                  {isLoading ? (
                    <>
                      <div className="skeleton-list-item"></div>
                      <div className="skeleton-list-item"></div>
                      <div className="skeleton-list-item"></div>
                    </>
                  ) : (
                    <>
                      <ListDetail
                        name={"About the recipe"}
                        data={[recipeData.description]}
                      />
                      <ListDetail
                        name={"Ingredients"}
                        data={recipeData.ingredients}
                      />
                      <ListDetail name={"Steps"} data={recipeData.steps} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
