import React, { useState } from "react";
import illustration from "../assets/Thekid.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./StartPage.css";


const StartPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(""); // Store selected language
  const navigate = useNavigate();

  // Handle language selection
const handleLanguageSelect = (event) => {
    setSelectedLanguage(event.target.value); // Update state with selected language
};

const handleGetStarted = () => {
    if (selectedLanguage) {
      navigate("/calcult"); // Navigate to CalculatePage
    } else {
    alert("Please select a language before proceeding.");
    }
};

  // Determine the button text based on selected language
const getButtonText = () => {
    if (selectedLanguage === "Arabic") {
      return "إبدأ"; // Arabic button text
    } else if (selectedLanguage === "French") {
      return "commencer"; // French button text
    } else {
      return "Get Started"; // Default English button text
    }
};



return (
    <div className="start-page">
        <img src={illustration} alt="" className="illustration" />
        <h1 className="title">Choose Your Language</h1>

      {/* Language selection dropdown */}
        <div className="dropdown-container">
        <select 
        value={selectedLanguage} 
        onChange={handleLanguageSelect} 
        className="language-dropdown"
        >
        <option value="" style={{color: '#727D73'}}>Select ..</option>
        <option value="Arabic">Arabic</option>
        <option value="French">French</option>
        <option value="English">English</option>
        </select>
        <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
        </div>
        {/* Display 'Get Started' button after selecting a language */}
        {selectedLanguage && (
        <button onClick={handleGetStarted} className="get-started-button">{getButtonText()}</button>
        )}
    </div>
);
};

export default StartPage;