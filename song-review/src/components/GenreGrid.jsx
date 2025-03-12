import React from 'react';
import GenreCard from './GenreCard';
import { genres } from '../data/genres';

export default function GenreGrid() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-darkGray">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Explore Music Genres
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map(genre => (
            <GenreCard 
              key={genre.id} 
              genre={genre.name} 
              imageUrl={genre.imageUrl} 
              to={`/genre/${genre.name.toLowerCase().replace(/\s+/g, '-')}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}