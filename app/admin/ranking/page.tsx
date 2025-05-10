"use client";

import { RankingTabs } from "./components/RankingTabs";

/**
 * Main ranking page that displays judging results
 * Organized with tabs for different types of results:
 * - Round 1 results
 * - Top projects
 * - Round 2 results
 * - Track winners
 * - Award winners
 */
export default function RankingPage() {
    return (
        <div className="container mx-auto py-6">
            <RankingTabs />
        </div>
    );
}
