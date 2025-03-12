import React from 'react';
import GenreGrid from '../components/GenreGrid';

function HeroSection() {
    // Sample song data 
    const featuredSong = {
        title: "Blinding Lights",
        artist: "The Weeknd",
        publishedDate: "November 29, 2019",
        writer: "Abel Tesfaye, Ahmad Balshe, Jason Quenneville, Max Martin, Oscar Holter",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png" // Replace with actual album art URL
    };

    return (
        <div className="bg-darkGray">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Featured Song</h2>
                
                <div className="bg-[#252529] rounded-lg shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Song Image/Icon */}
                        <div className="md:w-1/4 flex justify-center items-center p-4">
                            <img 
                                src={featuredSong.imageUrl} 
                                alt={`${featuredSong.title} cover`} 
                                className="w-32 h-32 object-cover rounded-md shadow-md"
                            />
                        </div>
                        
                        {/* Song Details */}
                        <div className="md:w-3/4 p-6">
                            <h3 className="text-xl font-bold text-white">{featuredSong.title}</h3>
                            <div className="mt-2 space-y-2">
                                <p className="text-gray-300">
                                    <span className="text-pink-400 font-medium">Artist:</span> {featuredSong.artist}
                                </p>
                                <p className="text-gray-300">
                                    <span className="text-pink-400 font-medium">Released:</span> {featuredSong.publishedDate}
                                </p>
                                <p className="text-gray-300">
                                    <span className="text-pink-400 font-medium">Written by:</span> {featuredSong.writer}
                                </p>
                            </div>
                            <div className="mt-4">
                                <button className="px-4 py-2 bg-gradient-to-r from-pink-400 to-pink-800 rounded text-white text-sm">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Replace the old genre section with our new genre grid */}
            <GenreGrid />
        </div>
    );
}

export default HeroSection;