import React, { useEffect, useState } from "react";

import { Widget } from "@uploadcare/react-widget";
import {
  Modal,
  Input,
  Select,
  Divider,
  Typography,
  Space,
  InputNumber,
  Button,
} from "antd";
import { MdOutlineCancel } from "react-icons/md";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const ModalCreate = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [newCategoryList, setNewCategoryList] = useState(categoryList);
  const [newCategory, setNewCategory] = useState("");
  const [ingredientInput, setIngredientInput] = useState([]);
  const [stepInput, setStepInput] = useState([]);
  const [recipeData, setRecipeData] = useState({
    category: null,
    name: null,
    description: null,
    cooking_time: {
      hours: 0,
      minutes: 0,
      seconds: 1,
    },
    calories: 1,
    ingredients: [],
    steps: [],
    image_url: null,
  });

  const navigate = useNavigate();

  const handleOk = () => {
    createRecipe();
  };

  const handleCancel = () => {
    props.setVisible(false);
    setRecipeData({
      category: null,
      name: null,
      description: null,
      cooking_time: {
        hours: 0,
        minutes: 0,
        seconds: 1,
      },
      calories: 1,
      ingredients: [],
      steps: [],
      image_url: null,
    });

    setIngredientInput([]);
    setStepInput([]);
    setCategoryList([]);
    setNewCategoryList(categoryList);
  };

  const handleAddIngredient = () => {
    setIngredientInput([...ingredientInput, ""]);
  };

  const handleChangeIngredient = (e, index) => {
    ingredientInput[index] = e.target.value;
    setIngredientInput([...ingredientInput]);
    recipeData.ingredients[index] = { name: e.target.value };
    setRecipeData({ ...recipeData });
  };

  const handleRemoveIngredient = (index) => {
    ingredientInput.splice(index, 1);
    setIngredientInput([...ingredientInput]);
    recipeData.ingredients.splice(index, 1);
    setRecipeData({ ...recipeData });
  };

  const handleAddStep = () => {
    setStepInput([...stepInput, ""]);
  };

  const handleChangeStep = (e, index) => {
    stepInput[index] = e.target.value;
    setStepInput([...stepInput]);
    recipeData.steps[index] = {
      order_number: index + 1,
      description: e.target.value,
    };
    setRecipeData({ ...recipeData });
  };

  const handleRemoveStep = (index) => {
    stepInput.splice(index, 1);
    setStepInput([...stepInput]);
    recipeData.steps.splice(index, 1);
    for (let i = 0; i < recipeData.steps.length; i++) {
      recipeData.steps[i].order_number = i + 1;
    }
    setRecipeData({ ...recipeData });
  };

  const fetchCategories = async () => {
    try {
      await axios
        .get(props.apiUrl.getCategories)
        .then((res) => {
          const temp = [];
          res.data.map((values) => temp.push(values.name));

          setCategoryList(temp);
          setNewCategoryList(temp);
        })
        .catch((err) => {
          setCategoryList([]);
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const createRecipe = async () => {
    setIsLoading(true);

    const token = localStorage.getItem("access_token");
    const hours = recipeData.cooking_time.hours;
    const minutes = recipeData.cooking_time.minutes;
    const seconds = recipeData.cooking_time.seconds;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const bodyParams = {
      ...recipeData,
      cooking_time: hours * 3600 + minutes * 60 + seconds,
      ingredients: JSON.stringify(recipeData.ingredients),
      steps: JSON.stringify(recipeData.steps),
    };

    try {
      await axios
        .post(props.apiUrl.createRecipe, bodyParams, config)
        .then((res) => {
          const recipeId = res.data.recipe_id;
          setIsLoading(false);
          handleCancel();
          navigate(
            `/recipe/${recipeData.category}-${recipeId}-${recipeData.name}`
          );
        })
        .catch((err) => {
          if (
            err.response.status === 401 &&
            err.response.data.message === "Token expired."
          ) {
            localStorage.removeItem("access_token");
            window.location.reload();
          }

          alert("Failed to create recipe");
          setIsLoading(false);
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [props.visible]);

  return (
    <>
      <Modal
        title="Create Recipe"
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <form action="#" className="create-recipe">
          <div className="item">
            <label htmlFor="category">Category</label>

            <div className="input-container">
              <Select
                style={{ width: "100%" }}
                placeholder="Select a category"
                onChange={(value) =>
                  setRecipeData({ ...recipeData, category: value })
                }
                value={recipeData.category}
                dropdownRender={(menu) => (
                  <>
                    {menu}

                    <Divider style={{ margin: "8px 0" }} />
                    <Space align="center" style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="add category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                      />
                      <Typography.Link
                        onClick={(e) => {
                          e.preventDefault();
                          if (newCategory !== "") {
                            setNewCategoryList([
                              ...newCategoryList,
                              newCategory,
                            ]);
                            setNewCategory("");
                          }
                        }}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <PlusOutlined /> Add item
                      </Typography.Link>
                    </Space>
                  </>
                )}
              >
                {newCategoryList.map((item, index) => (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="item">
            <label htmlFor="name">Name</label>

            <div className="input-container">
              <Input
                placeholder="Recipe name"
                onChange={(e) =>
                  setRecipeData({ ...recipeData, name: e.target.value })
                }
                value={recipeData.name}
              />
            </div>
          </div>

          <div className="item">
            <label htmlFor="Description">Description</label>

            <div className="input-container">
              <Input.TextArea
                placeholder="Description"
                onChange={(e) =>
                  setRecipeData({ ...recipeData, description: e.target.value })
                }
                value={recipeData.description}
              />
            </div>
          </div>

          <div className="item">
            <label htmlFor="cooking_time">Cooking Time</label>

            <div className="input-container">
              <Input.Group compact>
                <InputNumber
                  className="input-cooking-time"
                  defaultValue={0}
                  min={0}
                  addonAfter="hr"
                  value={recipeData.cooking_time.hours}
                  onChange={(value) =>
                    setRecipeData({
                      ...recipeData,
                      cooking_time: {
                        ...recipeData.cooking_time,
                        hours: value,
                      },
                    })
                  }
                />

                <InputNumber
                  className="input-cooking-time"
                  defaultValue={0}
                  min={0}
                  addonAfter="min"
                  value={recipeData.cooking_time.minutes}
                  onChange={(value) =>
                    setRecipeData({
                      ...recipeData,
                      cooking_time: {
                        ...recipeData.cooking_time,
                        minutes: value,
                      },
                    })
                  }
                />

                <InputNumber
                  className="input-cooking-time"
                  defaultValue={0}
                  min={0}
                  addonAfter="sec"
                  value={recipeData.cooking_time.seconds}
                  onChange={(value) =>
                    setRecipeData({
                      ...recipeData,
                      cooking_time: {
                        ...recipeData.cooking_time,
                        seconds: value,
                      },
                    })
                  }
                />
              </Input.Group>
            </div>
          </div>

          <div className="item">
            <label htmlFor="calories">Calories</label>

            <div className="input-container">
              <InputNumber
                style={{ width: "100%" }}
                defaultValue={1}
                min={1}
                addonAfter="cal"
                onChange={(value) =>
                  setRecipeData({ ...recipeData, calories: value })
                }
                value={recipeData.calories}
              />
            </div>
          </div>

          <div className="item">
            <label htmlFor="ingredients">Ingredients</label>

            <div className="input-container">
              {ingredientInput.map((ingredient, index) => (
                <div key={index} className="input-group-container">
                  <Input
                    className="input-list"
                    placeholder={`Ingredient ${index + 1}`}
                    onChange={(e) => handleChangeIngredient(e, index)}
                    value={ingredient}
                  />

                  <Button
                    className="btn-cancel"
                    type="link"
                    danger
                    onClick={() => {
                      handleRemoveIngredient(index);
                    }}
                  >
                    <MdOutlineCancel size={20} />
                  </Button>
                </div>
              ))}

              <Button
                type="dashed"
                style={{ width: "100%" }}
                icon={<PlusOutlined />}
                onClick={handleAddIngredient}
              >
                Add ingredients
              </Button>
            </div>
          </div>

          <div className="item">
            <label htmlFor="steps">Steps</label>

            <div className="input-container">
              {stepInput.map((step, index) => (
                <div key={index} className="input-group-container">
                  <Input
                    className="input-list"
                    placeholder={`Step ${index + 1}`}
                    onChange={(e) => handleChangeStep(e, index)}
                    value={step}
                  />

                  <Button
                    className="btn-cancel"
                    type="link"
                    danger
                    onClick={() => {
                      handleRemoveStep(index);
                    }}
                  >
                    <MdOutlineCancel size={20} />
                  </Button>
                </div>
              ))}

              <Button
                type="dashed"
                style={{ width: "100%" }}
                icon={<PlusOutlined />}
                onClick={handleAddStep}
              >
                Add steps
              </Button>
            </div>
          </div>

          <div className="item">
            <label htmlFor="image_url">Image</label>

            <div className="input-container">
              <Widget
                publicKey="6f7fddfb9dfa30a8f724"
                crop="free, 16:9, 4:3, 5:4, 1:1"
                tabs="file camera url"
                onChange={(info) =>
                  setRecipeData({ ...recipeData, image_url: info.cdnUrl })
                }
                clearable
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalCreate;
