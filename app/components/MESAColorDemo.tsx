import React from "react";

export default function MESAColorDemo(): React.ReactElement {
    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-2xl font-bold mb-6">MESA Color Demo</h1>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Using CSS Variables Directly
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        style={{ backgroundColor: "rgb(var(--mesa-warm-red))" }}
                        className="text-white p-4 rounded-lg shadow-md"
                    >
                        Warm Red (CSS Variable)
                    </div>
                    <div
                        style={{ backgroundColor: "rgb(var(--mesa-grey))" }}
                        className="text-white p-4 rounded-lg shadow-md"
                    >
                        Grey (CSS Variable)
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Primary Colors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[rgb(var(--mesa-warm-red))] text-white p-4 rounded-lg shadow-md">
                        Warm Red (bg-[rgb(var(--mesa-warm-red))])
                    </div>
                    <div className="bg-[rgb(var(--mesa-grey))] text-white p-4 rounded-lg shadow-md">
                        Grey (bg-[rgb(var(--mesa-grey))])
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Secondary Colors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[rgb(var(--mesa-yellow-107))] p-4 rounded-lg shadow-md">
                        Yellow 107 (bg-[rgb(var(--mesa-yellow-107))])
                    </div>
                    <div className="bg-[rgb(var(--mesa-yellow-116))] p-4 rounded-lg shadow-md">
                        Yellow 116 (bg-[rgb(var(--mesa-yellow-116))])
                    </div>
                    <div className="bg-[rgb(var(--mesa-orange))] p-4 rounded-lg shadow-md">
                        Orange (bg-[rgb(var(--mesa-orange))])
                    </div>
                    <div className="bg-[rgb(var(--mesa-rhodamine))] text-white p-4 rounded-lg shadow-md">
                        Rhodamine (bg-[rgb(var(--mesa-rhodamine))])
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Tertiary Colors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[rgb(var(--mesa-purple))] text-white p-4 rounded-lg shadow-md">
                        Purple (bg-[rgb(var(--mesa-purple))])
                    </div>
                    <div className="bg-[rgb(var(--mesa-green))] p-4 rounded-lg shadow-md">
                        Green (bg-[rgb(var(--mesa-green))])
                    </div>
                </div>
            </section>

            <section className="space-y-4 mt-8">
                <h2 className="text-xl font-semibold">Text Colors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-[rgb(var(--mesa-warm-red))] text-lg font-medium">
                        Warm Red Text (text-[rgb(var(--mesa-warm-red))])
                    </p>
                    <p className="text-[rgb(var(--mesa-purple))] text-lg font-medium">
                        Purple Text (text-[rgb(var(--mesa-purple))])
                    </p>
                    <p className="text-[rgb(var(--mesa-orange))] text-lg font-medium">
                        Orange Text (text-[rgb(var(--mesa-orange))])
                    </p>
                    <p className="text-[rgb(var(--mesa-rhodamine))] text-lg font-medium">
                        Rhodamine Text (text-[rgb(var(--mesa-rhodamine))])
                    </p>
                </div>
            </section>

            <section className="space-y-4 mt-8">
                <h2 className="text-xl font-semibold">Interactive Elements</h2>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-[rgb(var(--mesa-warm-red))] hover:bg-[rgb(var(--mesa-orange))] text-white px-6 py-2 rounded-md transition-colors duration-300">
                        Primary Button
                    </button>
                    <button className="bg-[rgb(var(--mesa-purple))] hover:bg-[rgb(var(--mesa-rhodamine))] text-white px-6 py-2 rounded-md transition-colors duration-300">
                        Secondary Button
                    </button>
                    <button className="bg-white border-2 border-[rgb(var(--mesa-green))] text-[rgb(var(--mesa-green))] hover:bg-[rgb(var(--mesa-green))] hover:text-white px-6 py-2 rounded-md transition-colors duration-300">
                        Outlined Button
                    </button>
                </div>
            </section>
        </div>
    );
}
