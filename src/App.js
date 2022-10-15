/* eslint-disable no-loop-func */
import { useState } from "react";
import "./App.css";
import CustomCheckbox from "./Components/CustomCheckbox";
import InputRange from "./Components/InputRange";

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  // Doesn't have a selected type
  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

function App() {
  const [active, setActive] = useState(-1);
  const [result, setresult] = useState("PTx1f5DaFX");
  const [rangeval, setRangeval] = useState(8);
  const [upperCaseValue, setUpperCaseValue] = useState(false);
  const [lowerCaseValue, setLowerCaseValue] = useState(false);
  const [numbersValue, setNumbersCaseValue] = useState(true);
  const [symbolsCaseValue, setSymbolsCaseValue] = useState(false);

  let strongString = "Choice options";
  const strong =
    upperCaseValue + lowerCaseValue + numbersValue + symbolsCaseValue;
  if (strong === 1) strongString = "Too Weak!";
  else if (strong === 2) strongString = "Weak";
  else if (strong === 3) strongString = "Medium";
  else if (strong === 4) strongString = "Strong";

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className="output_wrapper">
        <div> {result}</div>
        <div
          className="copy_button"
          onClick={() => {
            setActive(1);
            navigator.clipboard.writeText(result);
            setTimeout(() => {
              setActive(-1);
            }, 3000);
          }}
        >
          <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
              fill="#A4FFAF"
            />
          </svg>
          <span className={`copied ${active === 1 ? "active" : null}`}>
            COPIED!
          </span>
        </div>
      </div>
      <div className="inputs_wrapper">
        <div className="inputs_length">
          <h2>Character Length </h2>
          <div className="rangeval"> {rangeval}</div>
        </div>
        <InputRange setRangeval={setRangeval} />
        <div className="checkBoxs_wrapper">
          <CustomCheckbox
            name="Include Uppercase Letters"
            active={upperCaseValue}
            setActive={setUpperCaseValue}
          />
          <CustomCheckbox
            name="Include lowerCase Letters"
            active={lowerCaseValue}
            setActive={setLowerCaseValue}
          />
          <CustomCheckbox
            name="Include Numbers"
            active={numbersValue}
            setActive={setNumbersCaseValue}
          />
          <CustomCheckbox
            name="Include Symbols"
            active={symbolsCaseValue}
            setActive={setSymbolsCaseValue}
          />
        </div>
        <div className="strength_card">
          <div className="strength">STRENGTH</div>
          <div className="strength_wrapper">
            <div className="strong">{strongString}</div>
            <div className="bar_wrapper bar-weak">
              <div className={`bar bar-${strong}`}></div>
              <div className={`bar bar-${strong}`}></div>
              <div className={`bar bar-${strong}`}></div>
              <div className={`bar bar-${strong}`}></div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            if (strong > 0)
              setresult(
                generatePassword(
                  upperCaseValue,
                  lowerCaseValue,
                  numbersValue,
                  symbolsCaseValue,
                  rangeval
                )
              );
          }}
        >
          GENERATE{" "}
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#24232C"
              d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
