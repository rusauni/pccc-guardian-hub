
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NewsCategory from "./pages/NewsCategory";
import VideoPage from "./pages/VideoPage";
import NewsDetail from "./pages/NewsDetail";
import VideoDetail from "./pages/VideoDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tin-tuc" element={<NewsCategory />} />
          <Route path="/huong-dan-cong-dong" element={<NewsCategory />} />
          <Route path="/van-ban-phap-quy" element={<NewsCategory />} />
          <Route path="/thu-tuc-hanh-chinh" element={<NewsCategory />} />
          <Route path="/huong-dan-nghiep-vu" element={<NewsCategory />} />
          <Route path="/nghien-cuu-trao-doi" element={<NewsCategory />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/:category/:id" element={<NewsDetail />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
