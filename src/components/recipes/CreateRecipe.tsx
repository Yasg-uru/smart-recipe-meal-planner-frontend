import React, { useState } from "react";
import { createRecipe } from "../../InterfaceTypes/Recipe/CreateRecipeFormData";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createrecipe } from "../../Redux-toolkit/Slices/RecipeSlice";

const CreateRecipe: React.FC = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<createRecipe>({
    title: "",
    description: "",
    ingredients: [],
    instructions: [],
    NumberofPersons: 0,
    cuisine: "",
    mealType: "",
    dietaryLabels: [],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fats: 0,
      vitamins: [],
      minerals: [],
    },
  });
  const NutrientsFields = [
    "calories",
    "protein",
    "carbohydrates",
    "fats",
    "vitamins",
    "minerals",
  ];
  const [currentNutrientIndex, setCurrentNutrientIndex] = useState<number>(0);
  const [ingredientsStepCounter, setIngredientsStepCounter] = useState(0);
  const [instructionsStepCounter, setInstructionStepCounter] = useState(1);
  const [currentIngredient, setCurrentIngredient] = useState({
    name: "",
    quantity: "",
  });
  const [currentInstruction, setCurrentInstruction] = useState({
    step: 0,
    description: "",
  });
  const handlecurrentIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setCurrentIngredient({
      ...currentIngredient,
      [name]: value,
    });
  };
  const handlecurrentInstructionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCurrentInstruction({
      step: instructionsStepCounter,
      description: value,
    });
  };
  console.log("this is formdata :", formData);
  const addCurrentIngredients = () => {
    if (currentIngredient.name && currentIngredient.quantity) {
      setFormData((prevdata) => ({
        ...prevdata,
        ingredients: [...formData.ingredients, { ...currentIngredient }],
      }));
      setCurrentIngredient({ name: "", quantity: "" });
    }
  };
  const addCurrentInstruction = () => {
    if (currentInstruction.step && currentInstruction.description) {
      setFormData((prevdata) => ({
        ...prevdata,
        instructions: [...prevdata.instructions, { ...currentInstruction }],
      }));
      setCurrentInstruction({ step: 0, description: "" });
    }
  };
  const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "dietaryLabels") {
      setFormData((prevdata) => ({
        ...prevdata,
        [name]: value.split(","),
      }));
    } else if (NutrientsFields.includes(name)) {
      setFormData((prevdata) => ({
        ...prevdata,
        nutritionalInfo: {
          ...prevdata.nutritionalInfo,
          [name]:
            name === "vitamins" || name === "minerals"
              ? value.split(",")
              : value,
        },
      }));

      setFormData((prevdata) => ({
        ...prevdata,
        nutritionalInfo: {
          ...prevdata.nutritionalInfo,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevdata) => ({
        ...prevdata,
        [name]: value,
      }));
    }
  };
  //after that i am creating the form vaildation function
  const isFormValid = (): boolean => {
    const {
      title,
      description,
      ingredients,
      instructions,
      NumberofPersons,
      cuisine,
      mealType,
      dietaryLabels,
      nutritionalInfo,
    } = formData;
    if (
      title === "" ||
      description === "" ||
      ingredients.length === 0 ||
      instructions.length === 0 ||
      NumberofPersons === 0 ||
      cuisine === "" ||
      mealType === "" ||
      dietaryLabels.length === 0
    ) {
      toast.error("please fill all the fieds of form");
      return false;
    }
    const Fields = Object.entries(nutritionalInfo).map(([key, value]) => {
      return key;
    });
    for (const field of Fields) {
      if (typeof field === "number" && field === 0) {
        toast.error("please fill all the nutrients field");
        return false;
      }
      if (Array.isArray(field) && field.length === 0) {
        return false;
      }
    }
    return true;
  };
  const HandleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isFormValid()) {
      dispatch(createrecipe(formData));
      toast.success("successfully submited your recipe");
    } else {
      toast.error("failed to submit form ");
    }
  };
  const handleindexChange = (): void => {
    setCurrentNutrientIndex(
      (currentNutrientIndex + 1) % NutrientsFields.length
    );
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black ">
      <form
        onSubmit={HandleSubmit}
        className="flex flex-col gap-2 p-2 border-[0.5px] border-green-500  h-auto rounded-xl"
      >
        <h1 className="text-center text-green-500 font-bold text-2xl">
          Create Recipe Form
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-green-500">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={handlechange}
            name="title"
            className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-green-500">
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={handlechange}
            name="description"
            className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mealtype" className="text-green-500">
            MealType
          </label>
          <input
            type="text"
            value={formData.mealType}
            onChange={handlechange}
            name="mealType"
            className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="ingredients" className="text-green-500">
            Ingredients (comma separated)
          </label>
          <div className="flex gap-2 w-full">
            <input
              type="text"
              name="name"
              value={currentIngredient.name}
              onChange={handlecurrentIngredientChange}
              placeholder="name of ingredient"
              className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg "
            />
            <input
              type="text"
              name="quantity"
              value={currentIngredient.quantity}
              onChange={handlecurrentIngredientChange}
              placeholder="example-> 1 tablespoon"
              className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg "
            />
            <button
              onClick={addCurrentIngredients}
              type="button"
              className="btn bg-black border-[0.5px] font-bold border-green-500 hover:bg-black hover:border-red-500 text-green-500 hover:text-red-500"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="instructions" className="text-green-500">
            Instructions
          </label>
          <div className="flex gap-1 w-full">
            <input
              type="text"
              name="step"
              value={`Step => ${instructionsStepCounter.toString()}`}
              placeholder="example name => quantity"
              className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg "
            />
            <textarea
              name="description"
              placeholder="description"
              value={currentInstruction.description}
              onChange={handlecurrentInstructionChange}
              className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg"
            />
            <button
              onClick={() => {
                setInstructionStepCounter((prevcount) => prevcount + 1);
                addCurrentInstruction();
              }}
              type="button"
              className="btn bg-black border-[0.5px] border-green-500 hover:bg-black hover:border-red-500 text-green-500 hover:text-red-500"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="NumberofPersons" className="text-green-500">
            NumberofPersons
          </label>
          <input
            type="number"
            value={formData.NumberofPersons}
            onChange={handlechange}
            name="NumberofPersons"
            className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisine" className="text-green-500">
            cuisine
          </label>
          <input
            type="text"
            value={formData.cuisine}
            onChange={handlechange}
            name="cuisine"
            className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dietaryLabels" className="text-green-500">
            DietaryLabels (comma separated)
          </label>
          <input
            type="text"
            value={formData.dietaryLabels}
            onChange={handlechange}
            name="dietaryLabels"
            className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg"
          />
        </div>

        {NutrientsFields[currentNutrientIndex] !== "vitamins" &&
        NutrientsFields[currentNutrientIndex] !== "minerals" ? (
          <div className="flex flex-col gap-1">
            <label
              htmlFor={NutrientsFields[currentNutrientIndex] as string}
              className="text-green-500"
            >
              {NutrientsFields[currentNutrientIndex]}
            </label>
            <div className="flex gap-2  w-full">
              <input
                type="number"
                name={NutrientsFields[currentNutrientIndex]}
                onChange={handlechange}
                value={
                  formData.nutritionalInfo[
                    NutrientsFields[
                      currentNutrientIndex
                    ] as keyof typeof formData.nutritionalInfo
                  ]
                }
                className="w-full input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg"
              />

              <button
                type="button"
                onClick={handleindexChange}
                className="btn bg-black border-[0.5px] border-green-500 hover:bg-black hover:border-red-500 text-green-500 hover:text-red-500"
              >
                {currentNutrientIndex + 1 < NutrientsFields.length
                  ? `Next ${NutrientsFields[currentNutrientIndex + 1]}`
                  : `current ${NutrientsFields[currentNutrientIndex]}`}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <label
              htmlFor={NutrientsFields[currentNutrientIndex] as string}
              className="text-green-500"
            >
              {NutrientsFields[currentNutrientIndex]} (comma separated)
            </label>
            <div className="flex gap-2  w-full">
              <input
                type="text"
                onChange={handlechange}
                name={NutrientsFields[currentNutrientIndex]}
                value={
                  formData.nutritionalInfo[
                    NutrientsFields[
                      currentNutrientIndex
                    ] as keyof typeof formData.nutritionalInfo
                  ]
                }
                className="w-full input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg"
              />

              <button
                type="button"
                onClick={handleindexChange}
                className="btn bg-black border-[0.5px] border-green-500 hover:bg-black hover:border-red-500 text-green-500 hover:text-red-500"
              >
                {currentNutrientIndex + 1 < NutrientsFields.length
                  ? `Next ${NutrientsFields[currentNutrientIndex + 1]}`
                  : `current ${NutrientsFields[currentNutrientIndex]}`}
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn bg-black border-[0.5px] border-green-500 hover:bg-black hover:border-red-500 text-green-500 hover:text-red-500"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
