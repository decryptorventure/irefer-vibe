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
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="irefer-theme">
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
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
}
