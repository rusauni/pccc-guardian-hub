import { useEffect, useState } from 'react';
import { parseEditorContent } from '@/utils/editorParser';

interface EditorContentProps {
  content: any;
  className?: string;
}

export function EditorContent({ 
  content, 
  className = '' 
}: EditorContentProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndParseContent = async () => {
      if (!content) {
        setHtmlContent('');
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const html = await parseEditorContent(content);
        setHtmlContent(html);
        setError(null);
      } catch (err) {
        console.error('Error parsing content:', err);
        setError('Không thể tải nội dung. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndParseContent();
  }, [content]);

  if (isLoading) {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>;
  }

  return (
    <div 
      className={`prose max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
}
