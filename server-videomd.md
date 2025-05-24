# API: SearchPostByKeyWord
curl -X GET "https://dashboard.pccc40.com/items/articles?fields=id%2C+title&search=l%C6%B0u+%C3%BD" \
 -H "accept: application/json" \



{
  "data": [
    {
      "id": 9,
      "title": "Những vẫn đề cần lưu ý trong tổ chức cứu nạn, cứu hộ trong sự cố sập đổ nhà, công trình"
    },
    {
      "id": 5,
      "title": "Những vấn đề cần lưu ý khi tổ chức chữa cháy, cứu nạn, cứu hộ đối với loại hình nhà ở kết hợp sản xuất, kinh doanh"
    },
    {
      "id": 6,
      "title": "Một số lưu ý đối với công tác CNCH trong khu vực không gian hạn chế"
    }
  ]
}

# API: SearchDocumentByKeyWord
curl -X GET "https://dashboard.pccc40.com/items/documents?search=pc30" \
 -H "accept: application/json" \

{
  "data": [
    {
      "id": 0,
      "title": "string",
      "file": "19700fba-ef30-4000-8320-7654e3793e01",
      "description": "string",
      "category": 0,
      "document_number": "string",
      "document_type": "string",
      "issuing_agency": "string",
      "effective_date": "1970-01-01",
      "tags": [
        0
      ]
    }
  ],
  "meta": {
    "total_count": 0,
    "filter_count": 0
  }
}