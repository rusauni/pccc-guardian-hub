import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SupabaseProvider } from "@/contexts/SupabaseContext";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { GlobalSearchProvider, SearchDialogContainer } from "@/components/GlobalSearchDialog";
import Index from "./pages/Index";
import NewsCategory from "./pages/NewsCategory";
import VideoPage from "./pages/VideoPage";
import NewsDetail from "./pages/NewsDetail";
import VideoDetail from "./pages/VideoDetail";
import NotFound from "./pages/NotFound";
import AuthDemo from "./pages/AuthDemo";
import GuidelinesPage from "./pages/GuidelinesPage";
import ProceduresPage from "./pages/ProceduresPage";
import NewsPage from "./pages/NewsPage";
import CommunityGuidelinesPage from "./pages/CommunityGuidelinesPage";
import ProfessionalSkillsPage from "./pages/ProfessionalSkillsPage";
import ResearchPage from "./pages/ResearchPage";
import { TestEditor } from "./pages/TestEditor";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="pccc-theme">
        <TooltipProvider>
          <GlobalSearchProvider>
            <SupabaseProvider>
              <Toaster />
              <Sonner />
            <BrowserRouter>
              <SearchDialogContainer />
              <ScrollToTop />
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tin-tuc-pccc" element={<NewsPage />} />
              <Route path="/huong-dan" element={<GuidelinesPage />} />
              <Route path="/huong-dan-cong-dong" element={<CommunityGuidelinesPage />} />
              <Route path="/huong-dan-nghiep-vu" element={<ProfessionalSkillsPage />} />
              <Route path="/thu-tuc-hanh-chinh" element={<NewsCategory />} />
              <Route path="/tai-lieu" element={<NewsCategory />} />
              <Route path="/van-ban-phap-quy" element={<NewsCategory />} />
              <Route path="/:category" element={<NewsCategory />} />
              <Route path="/nghien-cuu-trao-doi" element={<ResearchPage />} />
              <Route path="/video" element={<VideoPage />} />
              <Route path="/auth" element={<AuthDemo />} />
              <Route path="/:category/:id" element={<NewsDetail />} />
              <Route path="/video/:id" element={<VideoDetail />} />
              <Route path="/preview" element={<TestEditor />} />
              <Route path="/preview/:slug" element={<TestEditor />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </BrowserRouter>
            </SupabaseProvider>
          </GlobalSearchProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Component to handle scroll restoration when navigating between routes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // When route changes, scroll to top of page
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

export default App;
