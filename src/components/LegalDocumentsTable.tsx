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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

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

export interface LegalDocument {
  id: number
  title: string
  documentNumber: string
  issuingAgency: string
  effectiveDate: string
  documentType: string
  status: 'active' | 'expired' | 'draft'
}

const data: LegalDocument[] = [
  {
    id: 1,
    title: "Thông tư số 01/2024/TT-BCA quy định về phòng cháy chữa cháy",
    documentNumber: "01/2024/TT-BCA",
    issuingAgency: "Bộ Công an",
    effectiveDate: "2024-01-15",
    documentType: "Thông tư",
    status: 'active'
  },
  {
    id: 2,
    title: "Nghị định số 136/2020/NĐ-CP quy định chi tiết một số điều của Luật Phòng cháy và chữa cháy",
    documentNumber: "136/2020/NĐ-CP",
    issuingAgency: "Chính phủ",
    effectiveDate: "2020-12-31",
    documentType: "Nghị định",
    status: 'active'
  },
  {
    id: 3,
    title: "Thông tư liên tịch số 02/2023/TTLT-BCA-BXD hướng dẫn về phòng cháy chữa cháy đối với nhà và công trình",
    documentNumber: "02/2023/TTLT-BCA-BXD",
    issuingAgency: "Bộ Công an - Bộ Xây dựng",
    effectiveDate: "2023-03-01",
    documentType: "Thông tư liên tịch",
    status: 'active'
  },
  {
    id: 4,
    title: "Nghị định số 79/2014/NĐ-CP quy định chi tiết thi hành một số điều của Luật Phòng cháy và chữa cháy",
    documentNumber: "79/2014/NĐ-CP",
    issuingAgency: "Chính phủ",
    effectiveDate: "2014-08-15",
    documentType: "Nghị định",
    status: 'expired'
  },
  {
    id: 5,
    title: "Thông tư số 52/2014/TT-BCA quy định về kiểm định phương tiện phòng cháy chữa cháy",
    documentNumber: "52/2014/TT-BCA",
    issuingAgency: "Bộ Công an",
    effectiveDate: "2014-11-20",
    documentType: "Thông tư",
    status: 'active'
  },
  {
    id: 6,
    title: "Thông tư số 12/2022/TT-BCA hướng dẫn thi hành một số điều của Luật Phòng cháy và chữa cháy",
    documentNumber: "12/2022/TT-BCA",
    issuingAgency: "Bộ Công an",
    effectiveDate: "2022-04-10",
    documentType: "Thông tư",
    status: 'active'
  },
  {
    id: 7,
    title: "Nghị quyết số 25/2022/NQ-HĐND quy định mức thuế bảo vệ môi trường đối với nước thải công nghiệp",
    documentNumber: "25/2022/NQ-HĐND",
    issuingAgency: "HĐND Thành phố Hà Nội",
    effectiveDate: "2022-07-01",
    documentType: "Nghị quyết",
    status: 'active'
  },
  {
    id: 8,
    title: "Chỉ thị số 09/CT-TTg về tăng cường công tác phòng cháy, chữa cháy mùa khô hanh",
    documentNumber: "09/CT-TTg",
    issuingAgency: "Thủ tướng Chính phủ",
    effectiveDate: "2023-10-15",
    documentType: "Chỉ thị",
    status: 'active'
  },
  {
    id: 9,
    title: "Thông tư số 33/2019/TT-BTC hướng dẫn chế độ quản lý, sử dụng kinh phí hỗ trợ phòng cháy, chữa cháy",
    documentNumber: "33/2019/TT-BTC",
    issuingAgency: "Bộ Tài chính",
    effectiveDate: "2019-12-31",
    documentType: "Thông tư",
    status: 'expired'
  },
  {
    id: 10,
    title: "Dự thảo Thông tư quy định về kiểm tra an toàn phòng cháy chữa cháy đối với cơ sở",
    documentNumber: "Dự thảo",
    issuingAgency: "Bộ Công an",
    effectiveDate: "2025-06-01",
    documentType: "Dự thảo Thông tư",
    status: 'draft'
  },
  {
    id: 11,
    title: "Quyết định số 08/2023/QĐ-TTg về quy định tiêu chuẩn phòng cháy chữa cháy cho nhà cao tầng",
    documentNumber: "08/2023/QĐ-TTg",
    issuingAgency: "Thủ tướng Chính phủ",
    effectiveDate: "2023-05-20",
    documentType: "Quyết định",
    status: 'active'
  },
  {
    id: 12,
    title: "Thông tư số 15/2023/TT-BCA quy định về trang bị phương tiện phòng cháy chữa cháy cho lực lượng dân phòng",
    documentNumber: "15/2023/TT-BCA",
    issuingAgency: "Bộ Công an",
    effectiveDate: "2023-07-15",
    documentType: "Thông tư",
    status: 'active'
  },
  {
    id: 13,
    title: "Nghị định số 42/2022/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực phòng cháy chữa cháy",
    documentNumber: "42/2022/NĐ-CP",
    issuingAgency: "Chính phủ",
    effectiveDate: "2022-08-10",
    documentType: "Nghị định",
    status: 'active'
  },
  {
    id: 14,
    title: "Thông tư số 18/2021/TT-BXD về quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình",
    documentNumber: "18/2021/TT-BXD",
    issuingAgency: "Bộ Xây dựng",
    effectiveDate: "2021-11-01",
    documentType: "Thông tư",
    status: 'active'
  },
  {
    id: 15,
    title: "Quyết định số 19/2020/QĐ-TTg về cơ chế hỗ trợ kinh phí phòng cháy chữa cháy cho các địa phương",
    documentNumber: "19/2020/QĐ-TTg",
    issuingAgency: "Thủ tướng Chính phủ",
    effectiveDate: "2020-09-15",
    documentType: "Quyết định",
    status: 'expired'
  },
  {
    id: 16,
    title: "Thông tư số 22/2022/TT-BCA hướng dẫn công tác huấn luyện nghiệp vụ phòng cháy chữa cháy",
    documentNumber: "22/2022/TT-BCA",
    issuingAgency: "Bộ Công an",
    effectiveDate: "2022-06-01",
    documentType: "Thông tư",
    status: 'active'
  },
  {
    id: 17,
    title: "Nghị quyết số 31/2023/NQ-CP về tăng cường công tác phòng cháy chữa cháy tại các khu dân cư",
    documentNumber: "31/2023/NQ-CP",
    issuingAgency: "Chính phủ",
    effectiveDate: "2023-09-10",
    documentType: "Nghị quyết",
    status: 'active'
  },
  {
    id: 18,
    title: "Dự thảo Nghị định về quản lý hoạt động kinh doanh dịch vụ phòng cháy chữa cháy",
    documentNumber: "Dự thảo",
    issuingAgency: "Chính phủ",
    effectiveDate: "2025-01-01",
    documentType: "Dự thảo Nghị định",
    status: 'draft'
  },
  {
    id: 19,
    title: "Thông tư số 05/2018/TT-BCA quy định về trang phục chữa cháy của lực lượng phòng cháy chữa cháy",
    documentNumber: "05/2018/TT-BCA",
    issuingAgency: "Bộ Công an",
    effectiveDate: "2018-03-15",
    documentType: "Thông tư",
    status: 'expired'
  },
  {
    id: 20,
    title: "Quyết định số 27/2023/QĐ-UBND về quy định phòng cháy chữa cháy đối với chợ và trung tâm thương mại",
    documentNumber: "27/2023/QĐ-UBND",
    issuingAgency: "UBND Thành phố Hồ Chí Minh",
    effectiveDate: "2023-08-01",
    documentType: "Quyết định",
    status: 'active'
  },
  {
    id: 21,
    title: "Thông tư liên tịch số 07/2022/TTLT-BCA-BYT về quy định phòng cháy chữa cháy tại các cơ sở y tế",
    documentNumber: "07/2022/TTLT-BCA-BYT",
    issuingAgency: "Bộ Công an - Bộ Y tế",
    effectiveDate: "2022-05-10",
    documentType: "Thông tư liên tịch",
    status: 'active'
  },
  {
    id: 22,
    title: "Nghị định số 83/2017/NĐ-CP về công tác cứu nạn, cứu hộ của lực lượng phòng cháy chữa cháy",
    documentNumber: "83/2017/NĐ-CP",
    issuingAgency: "Chính phủ",
    effectiveDate: "2017-07-31",
    documentType: "Nghị định",
    status: 'expired'
  },
  {
    id: 23,
    title: "Thông tư số 29/2024/TT-BCA quy định về trang bị phương tiện phòng cháy chữa cháy cho cơ sở sản xuất",
    documentNumber: "29/2024/TT-BCA",
    issuingAgency: "Bộ Công an",
    effectiveDate: "2024-03-01",
    documentType: "Thông tư",
    status: 'active'
  },
  {
    id: 24,
    title: "Chỉ thị số 17/2023/CT-TTg về tăng cường công tác thanh tra, kiểm tra phòng cháy chữa cháy",
    documentNumber: "17/2023/CT-TTg",
    issuingAgency: "Thủ tướng Chính phủ",
    effectiveDate: "2023-11-15",
    documentType: "Chỉ thị",
    status: 'active'
  },
  {
    id: 25,
    title: "Quyết định số 35/2021/QĐ-UBND về quy định phòng cháy chữa cháy tại các khu công nghiệp",
    documentNumber: "35/2021/QĐ-UBND",
    issuingAgency: "UBND Tỉnh Bình Dương",
    effectiveDate: "2021-10-01",
    documentType: "Quyết định",
    status: 'active'
  },
  {
    id: 26,
    title: "Thông tư số 11/2020/TT-BCA hướng dẫn về bảo hiểm cháy, nổ bắt buộc",
    documentNumber: "11/2020/TT-BCA",
    issuingAgency: "Bộ Công an",
    effectiveDate: "2020-10-30",
    documentType: "Thông tư",
    status: 'active'
  },
  {
    id: 27,
    title: "Nghị quyết số 19/2023/NQ-HĐND về chính sách hỗ trợ trang bị phương tiện phòng cháy chữa cháy",
    documentNumber: "19/2023/NQ-HĐND",
    issuingAgency: "HĐND Tỉnh Đồng Nai",
    effectiveDate: "2023-06-15",
    documentType: "Nghị quyết",
    status: 'active'
  },
  {
    id: 28,
    title: "Dự thảo Thông tư quy định về tiêu chuẩn kỹ thuật phương tiện phòng cháy chữa cháy",
    documentNumber: "Dự thảo",
    issuingAgency: "Bộ Công an",
    effectiveDate: "2025-04-01",
    documentType: "Dự thảo Thông tư",
    status: 'draft'
  },
  {
    id: 29,
    title: "Thông tư số 08/2019/TT-BCA quy định về quy chuẩn kỹ thuật quốc gia về phương tiện phòng cháy chữa cháy",
    documentNumber: "08/2019/TT-BCA",
    issuingAgency: "Bộ Công an",
    effectiveDate: "2019-05-01",
    documentType: "Thông tư",
    status: 'expired'
  },
  {
    id: 30,
    title: "Quyết định số 42/2024/QĐ-TTg về chiến lược phát triển công tác phòng cháy chữa cháy đến năm 2030",
    documentNumber: "42/2024/QĐ-TTg",
    issuingAgency: "Thủ tướng Chính phủ",
    effectiveDate: "2024-02-15",
    documentType: "Quyết định",
    status: 'active'
  }
]

export const columns: ColumnDef<LegalDocument>[] = [
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
      <div className="font-medium text-pccc-primary hover:underline cursor-pointer">
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
      const date = new Date(row.getValue("effectiveDate"))
      return <div className="pl-4">{format(date, "dd/MM/yyyy", { locale: vi })}</div>
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
            <DropdownMenuSeparator />
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
            <DropdownMenuItem>Tải xuống</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function LegalDocumentsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
    </div>
  )
}
