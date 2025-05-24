import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";

interface DocumentPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  documentUrl: string;
  documentTitle: string;
  documentType?: string;
}

export function DocumentPreviewDialog({
  isOpen,
  onClose,
  documentUrl,
  documentTitle,
  documentType,
}: DocumentPreviewDialogProps) {
  const [viewType, setViewType] = useState<'iframe' | 'google' | 'microsoft'>('iframe');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract file extension from URL
  const fileExtension = documentUrl?.split('.')?.pop()?.toLowerCase() || '';
  const isPdf = fileExtension === 'pdf';
  
  // Reset loading state when URL changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [documentUrl, viewType]);

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Handle iframe error
  const handleIframeError = () => {
    setError('Không thể xem trước tài liệu này. Vui lòng thử cách khác hoặc tải xuống.');
    setIsLoading(false);
  };

  // Get viewer URL based on selected view type
  const getViewerUrl = () => {
    if (viewType === 'google') {
      return `https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true`;
    } else if (viewType === 'microsoft') {
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(documentUrl)}`;
    } else {
      // For direct view, use PDF viewer for PDFs, otherwise default to Google viewer
      // to prevent automatic downloads
      if (fileExtension === 'pdf') {
        return documentUrl;
      } else {
        // Default to Google viewer for non-PDF files to prevent auto-download
        return `https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true`;
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{documentTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="flex space-x-2 mb-2">
          <Button 
            variant={viewType === 'iframe' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewType('iframe')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Xem trực tiếp
          </Button>
          <Button 
            variant={viewType === 'google' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewType('google')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Google Viewer
          </Button>
          <Button 
            variant={viewType === 'microsoft' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewType('microsoft')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Microsoft Viewer
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            asChild
          >
            <a href={documentUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Tải xuống
            </a>
          </Button>
        </div>
        
        <div className="relative mt-2 h-[70vh] border rounded-md overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pccc-primary"></div>
            </div>
          )}
          
          {documentUrl && (
            <iframe 
              src={getViewerUrl()} 
              className="w-full h-full" 
              title={documentTitle}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
            />
          )}
          
          {error && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90">
              <p className="mb-4 text-lg text-red-600">{error}</p>
              <div className="flex space-x-2">
                <Button 
                  variant="default" 
                  onClick={() => {
                    setError(null);
                    if (viewType === 'iframe') setViewType('google');
                    else if (viewType === 'google') setViewType('microsoft');
                    else setViewType('iframe');
                  }}
                >
                  Thử cách khác
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                >
                  <a href={documentUrl} download>
                    Tải xuống tệp
                  </a>
                </Button>
              </div>
            </div>
          )}
          
          {!documentUrl && (
            <div className="p-4 text-center">Không tìm thấy tệp để xem trước</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
