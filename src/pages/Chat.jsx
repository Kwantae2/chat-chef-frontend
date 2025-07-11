import React, { useEffect, useState } from "react";
import MessageBox from "../components/MessageBox";
import PrevButton from "../components/PrevButton";
import { MoonLoader } from "react-spinners";

const Chat = ({ ingredientList }) => {
  // logic
  const endpoint = process.env.REACT_APP_SERVER_ADDRESS;

  const [value, setValue] = useState("");

  // TODO: set함수 추가하기
  const [messages, setMessages] = useState([]); // chatGPT와 사용자의 대화 메시지 배열
  const [isInfoLoading, setIsInfoLoading] = useState(true); // 최초 정보 요청시 로딩
  const [isMessageLoading, setIsMessageLoading] = useState(false); // 사용자와 메시지 주고 받을때 로딩
  const [infoMessages, setInfoMessages] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    console.log("value==>", value);
    setValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("메시지 보내기");
    const userMessage = {
      role: "user",
      content: value.trim(),
    };

    setMessages((prev) => [...prev, userMessage]); // 대화 목록 UI 업데이트
    sendMessage(userMessage); // API호출
  };

  // 첫번째 용법:
  // useEffect(() => {
  //   console.log("모든 state가 변경될때마다 실행");
  // });

  // 두번째 용법:
  // useEffect(() => {
  //   console.log("컴포넌트가 생성됐을때 딱 한번 실행");
  // }, []);

  // 세번째 용법:
  // useEffect(() => {
  //   console.log("의존성 배열에 등록한 state값이 변경될때마다 실행");
  // }, [value]);

  const sendMessage = async (userMessage) => {
    setIsMessageLoading(true);
    try {
      const response = await fetch(`${endpoint}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage,
          messages: [...infoMessages, ...messages],
        }),
      });

      const result = await response.json();

      // chatGPT의 답변 추가
      const { role, content } = result.data;
      const assistantMessage = { role, content };
      setMessages((prev) => [...prev, assistantMessage]);

      console.log("🚀 ~ sendMessage ~ result:", result);
    } catch (error) {
      console.error(error);
    } finally {
      // try 혹은 error 구문 실행후 실행되는 곳
      setIsMessageLoading(false);
    }
  };

  const sendInfo = async (data) => {
    // async-await 은 짝꿍
    // 백엔드에게 /recipe API요청
    try {
      const response = await fetch(`${endpoint}/recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientList: data }),
      });
      const result = await response.json();

      // 데이터가 잘 들어오지 않은 경우는 뒷코드 실행 안함
      if (!result.data) return;

      // 데이터가 제대로 들어온 경우
      const removeLastDataList = result.data.filter(
        (_, index, array) => array.length - 1 !== index
      );
      console.log("🚀 ~ sendInfo ~ removeLastDataList:", removeLastDataList);

      // 초기 기본답변 저장
      setInfoMessages(removeLastDataList);

      // 첫 assistant 답변 UI에 추가
      const { role, content } = result.data[result.data.length - 1];

      // prev:배열
      setMessages((prev) => [...prev, { role, content }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsInfoLoading(false);
    }
  };

  useEffect(() => {
    //페이지 진입시 딱 한번 실행
    console.log("ingredientList", ingredientList);
    sendInfo(ingredientList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      {isInfoLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MoonLoader color="#46A195" />
          </div>
        </div>
      )}

      {/* START: 로딩 스피너 */}
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        {/* START:헤더 영역 */}
        <div className="-mx-6 -mt-10 py-7 bg-chef-green-500">
          <span className="block text-xl text-center text-white">
            맛있는 쉐프
          </span>
        </div>
        {/* END:헤더 영역 */}
        {/* START:채팅 영역 */}
        <div className="overflow-auto">
          <MessageBox messages={messages} isLoading={isMessageLoading} />
        </div>
        {/* END:채팅 영역 */}
        {/* START:메시지 입력 영역 */}
        <div className="mt-auto flex py-5 -mx-2 border-t border-gray-100">
          <form
            id="sendForm"
            className="w-full px-2 h-full"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full text-sm px-3 py-2 h-full block rounded-xl bg-gray-100 focus:"
              type="text"
              name="message"
              value={value}
              onChange={handleChange}
            />
          </form>
          <button
            type="submit"
            form="sendForm"
            className="w-10 min-w-10 h-10 inline-block rounded-full bg-chef-green-500 text-none px-2 bg-[url('../public/images/send.svg')] bg-no-repeat bg-center"
          >
            보내기
          </button>
        </div>
        {/* END:메시지 입력 영역 */}
      </div>
    </div>
  );
};

export default Chat;
