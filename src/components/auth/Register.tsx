import React, { useState } from "react";
import { RegisterFormInterface } from "../../InterfaceTypes/Auth/RegisterType";
import toast from "react-hot-toast";
import { signup } from "../../Redux-toolkit/Slices/authSlice";
import { useDispatch } from "react-redux";
type NutrientsKeyGoal = RegisterFormInterface["nutritionalGoals"];
const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormInterface>({
    Name: "",
    Email: "",
    password: "",
    allergies: [],
    dietaryPreferences: [],
    nutritionalGoals: {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fats: 0,
      vitamins: [],
      minerals: [],
    },
  });
  const [currentNutrientsIndex, setCurrentNutrientsIndex] = useState<number>(0);
  //after that need to create array of the nutrientsgoals key
  const NutrientsKey = [
    "calories",
    "protein",
    "carbohydrates",
    "fats",
    "vitamins",
    "minerals",
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "allergies" || name === "dietaryPreferences") {
      setFormData({
        ...formData,
        [name]: value.split(","),
      });
    } else if (name in formData.nutritionalGoals) {
      if (name === "vitamins" || name === "minerals") {
        setFormData({
          ...formData,
          nutritionalGoals: {
            ...formData.nutritionalGoals,
            [name]: value.split(","),
          },
        });
      } else {
        setFormData({
          ...formData,
          nutritionalGoals: {
            ...formData.nutritionalGoals,
            [name]: parseInt(value),
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const isFormvalid = () => {
    console.log("this is fromdata :", formData);
    const {
      Name,
      Email,
      password,
      nutritionalGoals,
      dietaryPreferences,
      allergies,
    } = formData;
    if (!Name || !Email || !password) {
      return false;
    }
    if (allergies.length === 0 || dietaryPreferences.length === 0) {
      return false;
    }
    const areNutritionalGoalsFilled = Object.entries(nutritionalGoals).every(
      ([key, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== 0;
      }
    );
    console.log("this is nutrientfield", areNutritionalGoalsFilled);
    return areNutritionalGoalsFilled;
  };
  const dispatch = useDispatch();
  const HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    isFormvalid()
      ? toast.success("your form is good")
      : toast.error("please enter all the fields correctly of this form");
    if (!isFormvalid()) {
      return;
    }
    dispatch(signup(formData));
    // prompt("this is a handle submit form ");
  };
  return (
    <div className="min-h-screen bg-black flex flex-cols justify-center items-center">
      <form
        onSubmit={HandleSubmit}
        className="w-[40vw] flex flex-col gap-2 px-1 border-[0.5px] border-green-500  shadow-2xl shadow-green-500  rounded-lg   "
      >
        <h1 className="text-green-500 text-center font-bold text-2xl">
          Registration Form
        </h1>
        <div className=" flex flex-col gap-1 p-1 w-full">
          <label htmlFor="Name" className="text-white">
            Name
          </label>
          <input
            type="text"
            name="Name"
            onChange={handleChange}
            value={formData.Name}
            placeholder="Enter your name "
            className="input input-bordered w-full max-w-xs bg-black text-green-500 border-[0.5px] border-green-500 focus:border-green-500"
          />
        </div>
        <div className=" flex flex-col gap-1 p-1">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            name="Email"
            onChange={handleChange}
            value={formData.Email}
            placeholder="Enter your name "
            className="input input-bordered w-full max-w-xs bg-black text-green-500 border-[0.5px] border-green-500 focus:border-green-500"
          />
        </div>
        <div className=" flex flex-col gap-1 p-1">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Enter your password "
            className="input input-bordered w-full max-w-xs bg-black text-green-500 border-[0.5px] border-green-500 focus:border-green-500"
          />
        </div>
        <div className=" flex flex-col gap-1 p-1">
          <label htmlFor="allergies" className="text-white">
            allergies (comma separated)
          </label>
          <input
            type="text"
            name="allergies"
            onChange={handleChange}
            value={formData.allergies}
            placeholder="Enter your allergies "
            className="input input-bordered w-full max-w-xs bg-black text-green-500 border-[0.5px] border-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dietaryPreferences" className="text-white">
            dietaryPreferences (comma separated)
          </label>
          <input
            type="text"
            name="dietaryPreferences"
            onChange={handleChange}
            value={formData.dietaryPreferences}
            placeholder="Enter your allergies "
            className="input input-bordered w-full max-w-xs bg-black text-green-500 border-[0.5px] border-green-500 focus:border-green-500"
          />
        </div>
        {NutrientsKey[currentNutrientsIndex] !== "vitamins" &&
        NutrientsKey[currentNutrientsIndex] !== "minerals" ? (
          <div className=" flex flex-col gap-1 p-1">
            <label
              htmlFor={NutrientsKey[currentNutrientsIndex] as string}
              className="text-white"
            >
              {NutrientsKey[currentNutrientsIndex]}
            </label>
            <div className="flex gap-1 flex-wrap">
              <input
                type="number"
                name={NutrientsKey[currentNutrientsIndex]}
                onChange={handleChange}
                value={
                  formData.nutritionalGoals[
                    NutrientsKey[
                      currentNutrientsIndex
                    ] as keyof typeof formData.nutritionalGoals
                  ]
                }
                placeholder="Enter your dietaryPreferences "
                className="input input-bordered w-full max-w-xs bg-black text-green-500 border-[0.5px] border-green-500 focus:border-green-500"
              />
              <button 
                className="btn bg-black text-green-500 hover:bg-black hover:text-red-500 shadow-2xl shadow-green-500 hover:shadow-red-500 hover:border-red-500"
                onClick={() =>
                  setCurrentNutrientsIndex(currentNutrientsIndex + 1)
                }
              >
                Next{" "}
                {currentNutrientsIndex + 1 < NutrientsKey.length &&
                  NutrientsKey[currentNutrientsIndex + 1]}
              </button>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col gap-1 p-1">
            <label
              htmlFor={NutrientsKey[currentNutrientsIndex] as string}
              className="text-white"
            >
              {NutrientsKey[currentNutrientsIndex]} (Comma separated)
            </label>
            <div className="flex gap-1">
              <input
                type="text"
                name={NutrientsKey[currentNutrientsIndex]}
                onChange={handleChange}
                value={
                  formData.nutritionalGoals[
                    NutrientsKey[
                      currentNutrientsIndex
                    ] as keyof typeof formData.nutritionalGoals
                  ]
                }
                placeholder="Enter your dietaryPreferences "
                className="input input-bordered w-full max-w-xs bg-black text-green-500 border-[0.5px] border-green-500 focus:border-green-500"
              />
              <button
                className="btn bg-black text-green-500 hover:bg-black hover:text-red-500 shadow-2xl shadow-green-500 hover:shadow-red-500 hover:border-red-500"
                onClick={() =>
                  setCurrentNutrientsIndex(
                    (currentNutrientsIndex + 1) % NutrientsKey.length
                  )
                }
              >
                {currentNutrientsIndex + 1 < NutrientsKey.length
                  ? `Next ${NutrientsKey[currentNutrientsIndex + 1]}`
                  : ` Current ${NutrientsKey[currentNutrientsIndex]}`}
              </button>
            </div>
          </div>
        )}
        <button
          type="submit"
          className="btn bg-black text-2xl border-[0.5px] border-green-500 m-auto text-green-500 w-full mb-3 hover:bg-black hover:text-red-500 hover:border-red-500 shadow-2xl shadow-green-500 hover:shadow-red-500"
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
