/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { Refer } from "@/pages/Refer";
import { MyReferrals } from "@/pages/MyReferrals";
import { JobList } from "@/pages/JobList";
import { JobDetail } from "@/pages/JobDetail";
import { CandidateDetail } from "@/pages/CandidateDetail";
import { Leaderboard } from "@/pages/Leaderboard";
import { Rewards } from "@/pages/Rewards";
import { Toaster } from "@frontend-team/ui-kit";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="refer" element={<Refer />} />
            <Route path="my-referrals" element={<MyReferrals />} />
            <Route path="referrals/:id" element={<CandidateDetail />} />
            <Route path="jobs" element={<JobList />} />
            <Route path="jobs/:id" element={<JobDetail />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="rewards" element={<Rewards />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </TooltipProvider>
  );
}
