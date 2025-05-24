import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { ArrowUpDown, ChevronDown, MoreHorizontal, FileText, Loader2, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Document } from "@/models/Document"
import { getAllDocumentByCategoryId } from "@/repository/GetAllDocumentByCategoryId"
import { CATEGORIES } from "@/data/categories"
import { DocumentPreviewDialog } from "@/components/DocumentPreviewDialog"

export interface LegalDocument {
  id: number
  title: string
  documentNumber: string
  issuingAgency: string
  effectiveDate: string
  documentType: string
  status: 'active' | 'expired' | 'draft'
  file?: string
  fileUrl?: string
  description?: string | null
}

/**
 * Maps an API Document to the UI LegalDocument model
 */
const mapDocumentToLegalDocument = (doc: Document): LegalDocument => {
  // Set default status as 'active' (Còn hiệu lực)
  return {
    id: doc.id,
    title: doc.title,
    documentNumber: doc.document_number,
    // Use agency_id.agency_name if available, otherwise fallback to issuing_agency
    issuingAgency: doc.agency_id?.agency_name || '',
    effectiveDate: doc.effective_date || '',
    // Use document_type_id.document_type_name if available, otherwise fallback to document_type
    documentType: doc.document_type_id?.document_type_name || '',
    status: 'active', // Default status is 'active' (Còn hiệu lực)
    file: doc.file,
    fileUrl: doc.fileUrl,
    description: doc.description
  };
};

export function LegalDocumentsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<LegalDocument[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [previewDialogOpen, setPreviewDialogOpen] = React.useState(false)
  const [selectedDocument, setSelectedDocument] = React.useState<LegalDocument | null>(null)

  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const documents = await getAllDocumentByCategoryId(CATEGORIES.VAN_BAN_PHAP_QUY.id);
        const mappedDocuments = documents.map(mapDocumentToLegalDocument);
        setData(mappedDocuments);
        setError(null);
      } catch (err) {
        console.error('Error fetching legal documents:', err);
        setError('Không thể tải dữ liệu văn bản pháp lý. Vui lòng thử lại sau.');

      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const columns: ColumnDef<LegalDocument>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "documentNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap"
        >
          Số hiệu văn bản
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("documentNumber")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên văn bản
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div 
        className="font-medium text-pccc-primary hover:underline cursor-pointer"
        onClick={() => {
          if (row.original.fileUrl) {
            setSelectedDocument(row.original);
            setPreviewDialogOpen(true);
          }
        }}
        title={row.original.fileUrl ? "Xem chi tiết" : "Không có tệp đính kèm"}
      >
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "issuingAgency",
    header: "Cơ quan ban hành",
  },
  {
    accessorKey: "effectiveDate",
    header: ({ column }) => {
      return (
        <div className="text-left pl-4">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0"
          >
            Ngày hiệu lực
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const effectiveDate = row.getValue("effectiveDate");
      if (!effectiveDate) {
        return <div className="pl-4">--</div>;
      }
      
      try {
        const date = new Date(effectiveDate);
        // Check if date is valid
        if (isNaN(date.getTime())) {
          return <div className="pl-4">--</div>;
        }
        return <div className="pl-4">{format(date, "dd/MM/yyyy", { locale: vi })}</div>;
      } catch (error) {
        console.error("Error formatting date:", error);
        return <div className="pl-4">--</div>;
      }
    },
  },
  {
    accessorKey: "documentType",
    header: "Loại văn bản",
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Trạng thái</div>,
    cell: ({ row }) => {
      const status = row.getValue("status")
      const variant = status === 'active' ? 'default' : status === 'expired' ? 'destructive' : 'outline'
      const label = status === 'active' ? 'Còn hiệu lực' : status === 'expired' ? 'Hết hiệu lực' : 'Dự thảo'
      
      return (
        <div className="flex justify-center items-center">
          <div className={`
            w-28 py-1 px-3 rounded-full text-center text-xs font-medium
            ${status === 'active' ? 'bg-green-600 text-white' : ''}
            ${status === 'expired' ? 'bg-red-600 text-white' : ''}
            ${status === 'draft' ? 'bg-gray-100 text-gray-800 border border-gray-300' : ''}
          `}>
            {label}
          </div>
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="whitespace-nowrap">Thao tác</div>,
    cell: ({ row }) => {
      const document = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(document.documentNumber)}
            >
              Sao chép số hiệu văn bản
            </DropdownMenuItem>
            <DropdownMenuItem
                  onClick={() => {
                    if (row.original.fileUrl) {
                      window.open(row.original.fileUrl, '_blank');
                    }
                  }}
                  disabled={!row.original.fileUrl}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Tải xuống
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (row.original.fileUrl) {
                      setSelectedDocument(row.original);
                      setPreviewDialogOpen(true);
                    }
                  }}
                  disabled={!row.original.fileUrl}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Xem chi tiết
                </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Đang tải dữ liệu văn bản...</span>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-8 text-red-500">
          {error}
        </div>
      ) : (
      <>
        <div className="flex items-center py-4">
          <Input
            placeholder="Tìm kiếm văn bản..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Cột hiển thị <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === "documentNumber" && "Số hiệu văn bản"}
                    {column.id === "title" && "Tên văn bản"}
                    {column.id === "issuingAgency" && "Cơ quan ban hành"}
                    {column.id === "effectiveDate" && "Ngày hiệu lực"}
                    {column.id === "documentType" && "Loại văn bản"}
                    {column.id === "status" && "Trạng thái"}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Đã chọn {table.getFilteredSelectedRowModel().rows.length} trong số{" "}
          {table.getFilteredRowModel().rows.length} văn bản.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <div className="text-sm font-medium">
            Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sau
          </Button>
        </div>
      </div>
      </>
      )}
      {/* Document Preview Dialog */}
      {selectedDocument && (
        <DocumentPreviewDialog
          isOpen={previewDialogOpen}
          onClose={() => setPreviewDialogOpen(false)}
          documentUrl={selectedDocument.fileUrl || ''}
          documentTitle={selectedDocument.title}
          documentType={selectedDocument.documentType}
        />
      )}
    </div>
  )
}
