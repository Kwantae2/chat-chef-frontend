import React, { useState } from "react";
import PrevButton from "../components/PrevButton";
import InfoInput from "../components/InfoInput";
import AddButton from "../components/AddButton";
import Button from "../components/Button";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const Info = () => {
  // logic
  const history = useNavigate();

  // TODO: set함수 추가하기
  const [ingredientList, setIngredientList] = useState([]); // 사용자가 입력할 재료 목록

  const addIngredient = () => {
    console.log("재료 추가하기");
    // input 박스 추가
    const id = Date.now();

    const newItem = {
      id,
      label: `ingredient_${id}`,
      text: "재료명",
      value: "", //사용자가 입력할 값
    };
    setIngredientList((prev) => [...prev, newItem]);
  };

  const handleNext = () => {
    console.log("chat페이지로 이동");
    history("/Chat");
  };

  const handleRemove = (selectedId) => {
    const filterList = ingredientList.filter(
      (ingredient) => ingredient.id !== selectedId
    );
    setIngredientList(filterList);
  };

  const handleChange = (userValue, selectedId) => {
    console.log("🚀 ~ selectedId:", selectedId);
    console.log("🚀 ~ userValue:", userValue);

    //prev 배열
    setIngredientList((prev) =>
      prev.map((ingredient) =>
        ingredient.id === selectedId
          ? { ...ingredient, value: userValue }
          : { ...ingredient }
      )
    );
  };

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-chef-green-500 fixed -z-10 -left-60 -top-104"></i>
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        {/* TODO:Title 컴포넌트 */}
        <Title mainTitle={"당신의 냉장고를 알려주세요"} />
        {/* // TODO:Title 컴포넌트 */}

        {/* START:form 영역 */}
        <div className="mt-20 overflow-auto">
          <form>
            {/* START:input 영역 */}
            <div>
              {ingredientList.map((item) => (
                <InfoInput
                  key={item.id}
                  content={item}
                  onRemove={handleRemove}
                  onChange={handleChange}
                />
              ))}
            </div>
            {/* END:input 영역 */}
          </form>
        </div>
        {/* END:form 영역 */}
        {/* START:Add button 영역 */}
        <AddButton onClick={addIngredient} />
        {/* END:Add button 영역 */}
        {/* START:Button 영역 */}
        <Button text="Next" color="bg-chef-green-500" onClick={handleNext} />
        {/* END:Button 영역 */}
      </div>
    </div>
  );
};

export default Info;
