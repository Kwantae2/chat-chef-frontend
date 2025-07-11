import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Info from "./pages/Info";
function App() {
  // logic
  const [ingredientList, setIngredientList] = useState([]); // 사용자가 입력한 재료목록

  const handkeIngredientList = (data) => {
    setIngredientList(data);
  };

  // view
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/info"
        element={<Info sendIngredientList={handkeIngredientList} />}
      />
      <Route path="/chat" element={<Chat ingredientList={ingredientList} />} />
    </Routes>
  );
}

export default App;
