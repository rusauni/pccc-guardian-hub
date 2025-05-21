interface EditorJSBlock {
  id?: string;
  type: string;
  data: {
    text?: string;
    level?: number;
    items?: string[];
    style?: string;
    caption?: string;
    file?: {
      url: string;
    };
    content?: string[][];
    html?: string;
    link?: string;
    code?: string;
    title?: string;
    message?: string;
    meta?: {
      title?: string;
      description?: string;
      image?: {
        url: string;
      };
    };
  };
  tunes?: {
    alignment?: {
      alignment: 'left' | 'center' | 'right';
    };
  };
}

/**
 * Converts EditorJS JSON data to HTML
 * @param editorData The EditorJS JSON data
 * @returns HTML string
 */
export async function parseEditorContent(editorData: any): Promise<string> {
  if (!editorData || !editorData.blocks || !Array.isArray(editorData.blocks)) {
    return '';
  }

  let html = '';

  for (const block of editorData.blocks as EditorJSBlock[]) {
    try {
      const alignment = block.tunes?.alignment?.alignment || 'left';
      const alignmentClass = {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto'
      }[alignment];

      switch (block.type) {
        case 'header':
          if (block.data?.text) {
            const headerClass = `text-${8 - Math.min(block.data.level || 2, 6)}xl font-bold my-6`;
            html += `<h${block.data.level} class="${headerClass} ${alignmentClass}">${block.data.text}</h${block.data.level}>`;
          }
          break;

        case 'paragraph':
          if (block.data?.text) {
            html += `<p class="mb-4 leading-relaxed text-justify ${alignmentClass}">${block.data.text}</p>`;
          }
          break;

        case 'list':
          if (block.data?.items?.length) {
            const listTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            const listClass = block.data.style === 'ordered' 
              ? 'list-decimal pl-6 space-y-2 my-4' 
              : 'list-disc pl-6 space-y-2 my-4';
            
            html += `<${listTag} class="${listClass}">`;
            block.data.items.forEach(item => {
              html += `<li class="mb-1">${item}</li>`;
            });
            html += `</${listTag}>`;
          }
          break;

        case 'image':
          if (block.data?.file?.url) {
            // Always center images by default
            const figureClass = 'my-6 mx-auto text-center';
            const imgClass = 'max-w-full h-auto rounded-lg shadow-md mx-auto';
            const caption = block.data.caption 
              ? `<figcaption class="text-center text-sm text-gray-600 mt-2">${block.data.caption}</figcaption>` 
              : '';
            
            // Check if URL starts with '/assets' and add base URL if needed
            let imageUrl = block.data.file.url;
            if (imageUrl.startsWith('/assets')) {
              // Import BASE_URL from config
              const { BASE_URL } = await import('../config/api');
              imageUrl = `${BASE_URL}${imageUrl}`;
            }
            
            html += `
              <figure class="${figureClass}">
                <img 
                  src="${imageUrl}" 
                  alt="${block.data.caption || ''}" 
                  class="${imgClass}"
                  loading="lazy"
                />
                ${caption}
              </figure>
            `;
          }
          break;

        case 'quote':
          if (block.data?.text) {
            html += `
              <blockquote class="border-l-4 border-pccc-primary pl-4 py-2 my-4 italic text-gray-600">
                <p>${block.data.text}</p>
                ${block.data.caption ? `<footer class="mt-2 text-right font-medium">— ${block.data.caption}</footer>` : ''}
              </blockquote>
            `;
          }
          break;

        case 'code':
          if (block.data?.code) {
            html += `
              <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                <code class="text-sm">${block.data.code}</code>
              </pre>
            `;
          }
          break;

        case 'linkTool':
          if (block.data?.link) {
            const title = block.data.meta?.title || block.data.link;
            const description = block.data.meta?.description || '';
            const image = block.data.meta?.image?.url ? 
              `<img src="${block.data.meta.image.url}" alt="" class="w-24 h-24 object-cover rounded-l-lg">` : '';
            
            html += `
              <a href="${block.data.link}" target="_blank" rel="noopener noreferrer" class="block my-4 border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div class="flex">
                  ${image}
                  <div class="p-4 flex-1">
                    <h4 class="font-medium text-lg">${title}</h4>
                    ${description ? `<p class="text-gray-600 text-sm mt-1">${description}</p>` : ''}
                    <p class="text-pccc-primary text-sm mt-2">${new URL(block.data.link).hostname}</p>
                  </div>
                </div>
              </a>
            `;
          }
          break;

        case 'embed':
          if (block.data?.html) {
            // Always center embeds (videos) by default
            html += `
              <div class="my-6 aspect-video w-full max-w-4xl mx-auto">
                <div class="relative h-0 pb-[56.25%] overflow-hidden rounded-lg">
                  <div class="absolute top-0 left-0 w-full h-full">
                    ${block.data.html}
                  </div>
                </div>
                ${block.data.caption ? `<p class="text-center text-sm text-gray-600 mt-2">${block.data.caption}</p>` : ''}
              </div>
            `;
          }
          break;

        case 'table':
          if (block.data?.content?.length) {
            html += '<div class="overflow-x-auto my-6"><table class="min-w-full border border-gray-200">';
            block.data.content.forEach((row, rowIndex) => {
              const tag = rowIndex === 0 ? 'th' : 'td';
              const cellClass = tag === 'th' 
                ? 'px-4 py-2 bg-gray-100 font-medium text-left border-b border-gray-200' 
                : 'px-4 py-2 border-b border-gray-200';
              
              html += '<tr>';
              row.forEach((cell, cellIndex) => {
                html += `<${tag} class="${cellClass}">${cell || '&nbsp;'}</${tag}>`;
              });
              html += '</tr>';
            });
            html += '</table></div>';
          }
          break;

        case 'warning':
          if (block.data?.title || block.data?.message) {
            html += `
              <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    ${block.data.title ? `<h4 class="text-sm font-medium text-yellow-800">${block.data.title}</h4>` : ''}
                    ${block.data.message ? `<div class="mt-2 text-sm text-yellow-700">${block.data.message}</div>` : ''}
                  </div>
                </div>
              </div>
            `;
          }
          break;

        default:
          console.warn(`Unhandled block type: ${block.type}`, block);
          // Fallback for unknown block types
          if (block.data?.text) {
            html += `<div class="my-4">${block.data.text}</div>`;
          }
          break;
      }
    } catch (error) {
      const blockId = block.id ? `block ${block.id}` : 'a block';
      console.error(`Error processing ${blockId} (type: ${block.type}):`, error);
    }
  }

  return html;
}
