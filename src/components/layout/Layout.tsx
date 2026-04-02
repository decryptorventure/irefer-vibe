import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { ErrorBoundary } from "../ui/error-boundary";
import { PageTransition } from "../ui/page-transition";
import { AnimatePresence } from "framer-motion";
import { useGamificationToast } from "@/hooks/use-gamification-toast";

export function Layout() {
  const location = useLocation();
  useGamificationToast();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden pb-[60px] md:pb-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 sm:p-6 lg:p-8">
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </ErrorBoundary>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
