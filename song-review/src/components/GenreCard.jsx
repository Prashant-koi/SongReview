import React from 'react';
import { Link } from 'react-router-dom';

export default function GenreCard({ genre, imageUrl, to = "#" }) {
  return (
    <Link 
      to={to}
      className="relative overflow-hidden rounded-lg shadow-lg h-48 block transition-all duration-300 hover:scale-105 hover:shadow-xl group"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110" 
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          filter: 'brightness(0.7)'
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
      
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        
        <h3 className="text-2xl font-bold text-white mt-auto transition-all duration-300 group-hover:translate-x-1">
          {genre}
        </h3>
      </div>
    </Link>
  );
}