import React from "react";
import { Construction, ArrowLeft } from "lucide-react";

export default function Profile() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 text-center max-w-lg w-full">

                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
                        <Construction size={40} className="text-orange-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Under Development
                </h1>

                <p className="text-gray-600 mb-6">
                    This page is currently under development. We're working hard
                    to bring new features and improvements soon.
                </p>

                <div className="flex justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg transition duration-300"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>

                <div className="mt-8">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-orange-500 h-2 w-3/4 animate-pulse"></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Development in progress...
                    </p>
                </div>

            </div>
        </div>
    );
}