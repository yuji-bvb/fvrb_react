import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

//それぞれのtestで副作用が出ないように
afterEach(() => cleanup());

//rendering
describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<App />);
    //buttonがrenderingされているか
    expect(screen.getAllByRole("button")).toBeTruty();
    //Enterのplaceholderを持っているものがrenderingされているか
    expect(screen.getAllByPlaceholderText("Enter")).toBeTruty();
  });
});

//userevent
describe("INput from onChange event", () => {
  it("Should update input value correctly", () => {
    render(<App />);
    const inputValue = screen.getByPlaceholderText("Enter");
    //userがtestと入力する動作がシュミレーションできる
    userEvent.type(inputValue, "test");
    //inputValueがtestになっているか判定
    expect(inputValue.value).toBe("test");
  });
});
describe("Console button conditionally triggered", () => {
  it("Should not trigger output function", () => {
    //擬似的な関数を作成してpropsが渡された体を作る
    const outputConsole = jest.fn();
    render(<App outputConsole={outputConsole} />);
    userEvent.click(screen.getByRole("button"));
    //呼び出されないことを判定
    expect(outputConsole).not.toHaveBeenCalled();
  });
  it("Should trigger output function", () => {
    const outputConsole = jest.fn();
    render(<App outputConsole={outputConsole} />);
    const inputValue = screen.getByPlaceholderText("Enter");
    userEvent.type(inputValue, "test");
    userEvent.click(screen.getByRole("button"));
    //一回呼び出し
    expect(outputConsole).toHaveBeenCalledTimes(1);
  });
});

//mapで回してlistを作る
describe("Rendering the list with props", () => {
  it("Should render No data ! when no data propped", () => {
    render(<App />);
    //No data !が含まれるか判定
    expect(screen.getByText("No data !")).toBeInTheDocument();
  });
  it("Should render list item corrctly", () => {
    const dummyData = [
      { id: 1, item: "React" },
      { id: 2, item: "Vue" },
      { id: 3, item: "Angular" },
    ];
    render(<App frameworks={dummyData} />);
    const frameworkItems = screen
      .getAllByRole("listitem")
      .map((ele) => ele.textContent);
    const dummyItemes = dummyData.map((ele) => ele.item);
    //定義した配列とprops経由が同じ値か
    expect(frameworkItems).toEqual(dummyItemes);
    //存在しないか確認
    expect(screen.queryByText("No data !")).toBeNull();
  });
});

//useEffect(非同期)
describe("useEffect rendering", () => {
  it("Should render only after async function resolved", async () => {
    render(<App />);
    //存在しないことの確認//で囲むと中身を含む内容が存在するか確認できる
    expect(screen.queryAllByText(/I am/)).toBeNull();
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});

//npm install msq --save-dev
//API Mock
