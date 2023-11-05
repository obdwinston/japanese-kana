import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheckSquare, FaBook, FaStopwatch, FaStar } from "react-icons/fa";

const hiragana = ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ"];
const katakana = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ"];

const Home = () => {
  const [selected, setSelected] = useState([]);
  const [mode, setMode] = useState("");

  const navigate = useNavigate();

  const handleSelectedChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // checked
      if (value === "hiragana") {
        // hiragana checked
        for (let i = 0; i < hiragana.length; i++) {
          document.getElementById(hiragana[i]).checked = true;
        }
        setSelected([...new Set([...selected, ...hiragana])]);
      } else if (value === "katakana") {
        // katakana checked
        for (let i = 0; i < katakana.length; i++) {
          document.getElementById(katakana[i]).checked = true;
        }
        setSelected([...new Set([...selected, ...katakana])]);
      } else {
        // character checked
        setSelected([...selected, value]);
      }
    } else {
      // unchecked
      if (value === "hiragana") {
        // hiragana unchecked
        let selectedCopy = [...selected];
        for (let i = 0; i < hiragana.length; i++) {
          document.getElementById(hiragana[i]).checked = false;
          selectedCopy = selectedCopy.filter((e) => e !== hiragana[i]);
        }
        setSelected(selectedCopy);
      } else if (value === "katakana") {
        // katakana unchecked
        let selectedCopy = [...selected];
        for (let i = 0; i < katakana.length; i++) {
          document.getElementById(katakana[i]).checked = false;
          selectedCopy = selectedCopy.filter((e) => e !== katakana[i]);
        }
        setSelected(selectedCopy);
      } else {
        // character unchecked
        setSelected(selected.filter((e) => e !== value));
        if (hiragana.includes(value))
          document.getElementById("hiragana-checkbox").checked = false;
        if (katakana.includes(value))
          document.getElementById("katakana-checkbox").checked = false;
      }
    }
  };

  const handleModeChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // checked
      if (value === "practice") {
        // practice checked
        setMode("practice");
        document.getElementById("challenge-checkbox").checked = false;
      } else {
        // challenge checked
        setMode("challenge");
        document.getElementById("practice-checkbox").checked = false;
      }
    } else {
      // unchecked
      setMode("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selected.length > 0 && mode !== "") {
      navigate(`/start`, { state: { mode, selected } });
    } else {
      toast.error("Please select characters and mode.");
    }
  };

  return (
    <div className="center-container">
      <h1>
        Japanese Kana
        <br />
        日本仮名
      </h1>

      <form onSubmit={handleSubmit}>
        <h2>Select Hiragana</h2>
        <div className="row-container">
          {hiragana.map((character, index) => (
            <div className="character-container" key={index}>
              <input
                className="character-checkbox"
                type="checkbox"
                id={character}
                name={character}
                value={character}
                onChange={handleSelectedChange}
                style={{ display: "none" }}
              />
              <label className="character-label" htmlFor={character}>
                {character}
              </label>
            </div>
          ))}
        </div>
        <div className="hiragana-container">
          <input
            className="hiragana-checkbox"
            type="checkbox"
            id="hiragana-checkbox"
            name="hiragana-checkbox"
            value="hiragana"
            onChange={handleSelectedChange}
            style={{ display: "none" }}
          />
          <label className="hiragana-label" htmlFor="hiragana-checkbox">
            <FaCheckSquare className="icon-right" />
            All Hiragana
          </label>
        </div>

        <h2>Select Katakana</h2>
        <div className="row-container">
          {katakana.map((character, index) => (
            <div className="character-container" key={index}>
              <input
                className="character-checkbox"
                type="checkbox"
                id={character}
                name={character}
                value={character}
                onChange={handleSelectedChange}
                style={{ display: "none" }}
              />
              <label className="character-label" htmlFor={character}>
                {character}
              </label>
            </div>
          ))}
        </div>
        <div className="katakana-container">
          <input
            className="katakana-checkbox"
            type="checkbox"
            id="katakana-checkbox"
            name="katakana-checkbox"
            value="katakana"
            onChange={handleSelectedChange}
            style={{ display: "none" }}
          />
          <label className="katakana-label" htmlFor="katakana-checkbox">
            <FaCheckSquare className="icon-right" />
            All Katakana
          </label>
        </div>

        <h2>Select Mode</h2>
        <div className="row-container">
          <div className="practice-container">
            <input
              className="practice-checkbox"
              type="checkbox"
              id="practice-checkbox"
              name="practice-checkbox"
              value="practice"
              onChange={handleModeChange}
              style={{ display: "none" }}
            />
            <label className="practice-label" htmlFor="practice-checkbox">
              <FaBook className="icon-right" />
              Practice Mode
            </label>
          </div>
          <div className="challenge-container">
            <input
              className="challenge-checkbox"
              type="checkbox"
              id="challenge-checkbox"
              name="challenge-checkbox"
              value="challenge"
              onChange={handleModeChange}
              style={{ display: "none" }}
            />
            <label className="challenge-label" htmlFor="challenge-checkbox">
              <FaStopwatch className="icon-right" />
              Challenge Mode
            </label>
          </div>
        </div>

        <div className="row-container">
          <button className="styled-button" type="submit">
            <FaStar className="icon-right" />
            START
            <FaStar className="icon-left" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;