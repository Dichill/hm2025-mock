import MESAColorDemo from "./components/MESAColorDemo";

export default function Home() {
    return (
        <main className="min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-8">MESA Color System Demo</h1>

            <div className="space-y-8">
                <section className="p-4 border border-[rgb(var(--mesa-grey))] rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                        Basic Examples
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-[rgb(var(--mesa-warm-red))] text-white p-4 rounded-md">
                            Warm Red Background (bg-[rgb(var(--mesa-warm-red))])
                        </div>
                        <p className="text-[rgb(var(--mesa-purple))] text-lg p-2">
                            This text uses MESA Purple
                            (text-[rgb(var(--mesa-purple))])
                        </p>
                        <button className="bg-[rgb(var(--mesa-yellow-116))] hover:bg-[rgb(var(--mesa-orange))] text-black px-4 py-2 rounded-md transition-colors duration-300">
                            Button with Yellow background that changes to Orange
                            on hover
                        </button>
                    </div>
                </section>

                <MESAColorDemo />
            </div>
        </main>
    );
}
