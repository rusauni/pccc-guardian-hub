import React, { useState, useEffect, createContext, useContext } from 'react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { FileText, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { searchPostsByKeyword } from '@/repository/SearchPostsByKeyword';
import { searchDocumentsByKeyword } from '@/repository/SearchDocumentsByKeyword';
import { DocumentPreviewDialog } from '@/components/DocumentPreviewDialog';
import { SearchResultItem, transformSearchResults } from '@/models/SearchResult';

// Create a context to manage the global search state
interface GlobalSearchContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

const GlobalSearchContext = createContext<GlobalSearchContextType | undefined>(undefined);

// Provider component
export const GlobalSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  
  const toggleOpen = () => setOpen(prev => !prev);
  
  // Global keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleOpen();
      }
    };
    
    // Add global event listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Clean up
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <GlobalSearchContext.Provider value={{ open, setOpen, toggleOpen }}>
      {children}
      {/* The dialog is now rendered by the SearchDialogContainer component inside the Router */}
    </GlobalSearchContext.Provider>
  );
};

// Hook to use the search context
export const useGlobalSearch = (): GlobalSearchContextType => {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error('useGlobalSearch must be used within a GlobalSearchProvider');
  }
  return context;
};

// Container component that must be rendered inside the Router
export const SearchDialogContainer: React.FC = () => {
  // Only render the dialog if we're inside a Router
  return <GlobalSearchDialog />;
};

// The actual dialog component - only one instance will exist
const GlobalSearchDialog: React.FC = () => {
  const { open, setOpen } = useGlobalSearch();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  
  // Document preview state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState({
    url: '',
    title: '',
    type: ''
  });
  
  const { toast } = useToast();
  
  // Only use navigate inside a try-catch to prevent errors outside Router context
  let navigate: ReturnType<typeof useNavigate> | null = null;
  try {
    navigate = useNavigate();
  } catch (error) {
    console.warn('Navigation not available - outside Router context');
  }
  
  // Reset search when dialog is opened/closed
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [open]);
  
  // Handle search input change with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Only search if dialog is open
    if (open) {
      const debounceTimeout = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);
      
      return () => clearTimeout(debounceTimeout);
    }
  }, [searchQuery, open]);
  
  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    if (!open) return; // Don't search if dialog is closed
    
    setIsLoading(true);
    try {
      // Call both APIs in parallel
      const [posts, documents] = await Promise.all([
        searchPostsByKeyword(query),
        searchDocumentsByKeyword(query)
      ]);
      
      // Transform results into unified model
      const results = transformSearchResults(posts, documents);
      
      // Only update results if dialog is still open
      if (open) {
        setSearchResults(results);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Lỗi tìm kiếm",
        description: "Không thể tìm kiếm. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      if (!open) {
        setIsLoading(false);
      }
    }
  };
  
  const handleResultClick = (result: SearchResultItem) => {
    // Close the dialog first
    setOpen(false);
    
    // Use a short timeout to ensure the dialog is closed before proceeding
    setTimeout(() => {
      if (result.type === 'Post' && result.postInfo) {
        // Navigate to post detail page using category.slug/slug format
        const post = result.postInfo;
        const url = `/${post.category.slug}/${post.slug}`;
        if (navigate) {
          navigate(url);
        } else {
          // Fallback for when outside Router context
          window.location.href = url;
        }
      } else if (result.type === 'Document' && result.documentInfo) {
        // Open document preview
        setPreviewDocument({
          url: result.documentInfo.fileUrl || '',
          title: result.title,
          type: result.documentInfo.document_type || ''
        });
        setPreviewOpen(true);
      }
    }, 100);
  };
  
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };
  
  return (
    <>
      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
        aria-describedby="search-description"
      >
        <DialogTitle className="sr-only">Tìm kiếm</DialogTitle>
        <CommandInput 
          placeholder="Nhập từ khóa tìm kiếm..." 
          value={searchQuery}
          onValueChange={handleSearch}
        />
        <CommandList>
          {searchResults.length === 0 && !isLoading ? (
            <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
          ) : isLoading ? (
            <CommandEmpty>Đang tìm kiếm...</CommandEmpty>
          ) : null}
          
          {/* Group results by type */}
          {!isLoading && searchResults.length > 0 && (
            <div className="space-y-0">
              {searchResults.filter(item => item.type === 'Post').length > 0 && (
                <CommandGroup heading="Bài viết" className="pt-1 pb-0 mb-0">
                  {searchResults
                    .filter(item => item.type === 'Post')
                    .map((result) => (
                      <div
                        key={`post-${result.id}`}
                        className="w-full cursor-pointer hover:bg-accent"
                        onClick={() => handleResultClick(result)}
                      >
                        <CommandItem 
                          className="flex items-center w-full py-0 my-0 h-8 pointer-events-none"
                          value={`post-${result.id}-${result.title}`}
                        >
                          <div className="flex items-center w-full py-[4px]">
                            <BookOpen className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="truncate w-full">{result.title}</span>
                          </div>
                        </CommandItem>
                      </div>
                    ))}
                </CommandGroup>
              )}
              
              {searchResults.filter(item => item.type === 'Document').length > 0 && (
                <CommandGroup heading="Văn bản tài liệu" className="pt-1 pb-0 mb-0">
                  {searchResults
                    .filter(item => item.type === 'Document')
                    .map((result) => (
                      <div
                        key={`doc-${result.id}`}
                        className="w-full cursor-pointer hover:bg-accent"
                        onClick={() => handleResultClick(result)}
                      >
                        <CommandItem 
                          className="flex items-center w-full py-0 my-0 h-8 pointer-events-none"
                          value={`doc-${result.id}-${result.title}`}
                        >
                          <div className="flex items-center w-full py-[4px]">
                            <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span className="truncate w-full">{result.title}</span>
                          </div>
                        </CommandItem>
                      </div>
                    ))}
                </CommandGroup>
              )}
            </div>
          )}
        </CommandList>
        <span id="search-description" className="sr-only">
          Nhập từ khóa để tìm kiếm văn bản pháp luật. Sử dụng phím mũi tên để di chuyển và Enter để chọn.
        </span>
      </CommandDialog>
      
      {/* Document Preview Dialog */}
      <DocumentPreviewDialog 
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        documentUrl={previewDocument.url}
        documentTitle={previewDocument.title}
        documentType={previewDocument.type}
      />
    </>
  );
};
