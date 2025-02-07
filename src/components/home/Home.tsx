import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Bienvenido a Healthy App by Hex</h1>
            <p className="text-lg text-gray-700">Gestione sus citas de manera eficiente y fácil.</p>
        </div>
    );
};

export default Home;