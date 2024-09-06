import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import {
  getAllStores,
  getAllPromotions,
  getAllDocumentTypes,
} from "../../api/dataFormApi";

const Home = () => {
  const { currentUser, isAuthenticated, logoutUser } = useAuth();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getAllStores();
        
        console.log(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const data = await getAllDocumentTypes();
        console.log(data);
      } catch (error) {
        console.error("Error fetching document types:", error);
      }
    };

    fetchDocumentTypes();
  }, []);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getAllPromotions();
        console.log(data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-4 text-slate-800">
          Bienvenido
          {isAuthenticated && currentUser ? `, ${currentUser.userName}` : ""}
        </h1>
        <p className="text-lg text-center text-indigo-600 my-8">
          {isAuthenticated
            ? "Has iniciado sesión con éxito. ¡Registra la promoción!"
            : "Por favor, inicia sesión para acceder a tu cuenta."}
        </p>


        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Date</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              placeholder="Select a date"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Time</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="time"
              type="time"
              placeholder="Select a time"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Service
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="service"
              name="service"
            >
              <option value="">Select a service</option>
              <option value="haircut">Haircut</option>
              <option value="coloring">Coloring</option>
              <option value="styling">Styling</option>
              <option value="facial">Facial</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="4"
              placeholder="Enter any additional information"
            ></textarea>
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
