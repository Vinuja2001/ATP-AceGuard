import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiMail, FiGlobe, FiPhone } from "react-icons/fi";
import vinujaImage from "./vinuja.png";

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-full max-w-lg"
      >
        <img
          src={vinujaImage}
          alt=""
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-500"
        />
        <h1 className="text-2xl font-bold">Vinuja Piumjith</h1>
        <p className="text-gray-400">BEng (Hons) Software Engineering</p>
        <p className="text-gray-400">University of Westminster, UK</p>
        <div className="mt-6 space-y-3">
          <Link
            to="https://vinuja-wm.netlify.app/"
            className="flex items-center space-x-2 justify-center text-blue-400 hover:text-blue-500"
          >
            <FiGlobe /> <span>My Website</span>
          </Link>
          <p className="flex items-center space-x-2 justify-center">
            <FiPhone /> <span>+94-779785709</span>
          </p>
          <p className="flex items-center space-x-2 justify-center">
            <FiMail /> <span>vinujapiumjith@gmail.com</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
