import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const GetRecipes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCreatePath = location.pathname;
  console.log("this is a location path", location.pathname);
  return (
    <div className="bg-black min-h-screen flex flex-col gap-2 p-3">
      {isCreatePath === "/recipes" && (
        <button
          type="button"
          onClick={() => navigate("create")}
          className="btn text-green-500 bg-black hover:bg-black hover:text-red-500 border-[0.5px] hover:border-red-500   "
        >
          Contribute Your Recipe
        </button>
      )}
      <Outlet />
    </div>
  );
};

export default GetRecipes;
