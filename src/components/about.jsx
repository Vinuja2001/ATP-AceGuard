import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import elbow from "../images/tennis-elbow.jpg";
import shoulder from "../images/shoulderPain.jpg";
import knee from "../images/knee.jpg";
import back from "../images/backpain.jpg";

const injuries = [
  { name: "Tennis Elbow", image: elbow, advice: "Rest, ice, and physical therapy can help in recovery." },
  { name: "Shoulder Impingement", image: shoulder, advice: "Strengthening exercises and proper stretching are recommended." },
  { name: "Knee Ligament Injuries", image: knee, advice: "Use knee braces and consult a physiotherapist for recovery." },
  { name: "Lower Back Pain", image: back, advice: "Maintain proper posture and core strength to prevent issues." }
];

export function About() {
  const [flipped, setFlipped] = useState(Array(injuries.length).fill(false));

  const handleMouseEnter = (index) => {
    setFlipped((prev) => {
      const newFlips = [...prev];
      newFlips[index] = true;
      return newFlips;
    });
  };

  const handleMouseLeave = (index) => {
    setFlipped((prev) => {
      const newFlips = [...prev];
      newFlips[index] = false;
      return newFlips;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-6">About ATP AceGuard</h1>
      <p className="text-lg text-center max-w-3xl mx-auto mb-8">
        ATP AceGuard is an AI-powered tennis stroke analysis system designed to assist players in improving their technique. 
        By analyzing stroke images, it provides feedback on movement patterns and performance accuracy.
      </p>

      {/* Injury Cards Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {injuries.map((injury, index) => (
          <div 
            key={index} 
            onMouseEnter={() => handleMouseEnter(index)} 
            onMouseLeave={() => handleMouseLeave(index)}
            className="cursor-pointer"
          >
            <ReactCardFlip isFlipped={flipped[index]} flipDirection="horizontal">
              {/* Front (Image Background with Opacity Overlay) */}
              <div 
                className="relative bg-cover bg-center p-6 rounded-lg shadow-lg text-center h-56 flex flex-col justify-center items-center"
                style={{ backgroundImage: `url(${injury.image})` }}
              >
                {/* Overlay for Readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                
                <h2 className="text-xl font-semibold text-white relative z-10">{injury.name}</h2>
              </div>

              {/* Back (Advice Text) */}
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex items-center justify-center h-56">
                <p className="text-gray-300 text-lg">{injury.advice}</p>
              </div>
            </ReactCardFlip>
          </div>
        ))}
      </div>

      {/* Instructions Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto text-center mt-16">
        <h2 className="text-2xl font-semibold text-white mb-4">How to Use ATP AceGuard</h2>
        <ul className="text-gray-300 text-lg text-left mx-auto max-w-2xl space-y-3">
          <li>✅ Upload an image of your tennis stroke (serve, forehand, or backhand).</li>
          <li>✅ The system will analyze the stroke using AI-powered biomechanics.</li>
          <li>✅ Receive instant feedback on technique, including potential injury risks.</li>
          <li>✅ Get recommendations to improve form and prevent injuries.</li>
          <li>✅ Hover over the injury cards below to learn about common tennis-related injuries.</li>
        </ul>
      </div>
    </div>
  );
}
