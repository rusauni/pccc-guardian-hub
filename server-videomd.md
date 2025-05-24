# API: GetAllDocumentByCategoryId
curl --location --globoff 'https://dashboard.pccc40.com/items/documents?filter[category][_eq]=7&fields=id%2Ctitle%2Cfile%2Cdescription%2Ccategory.name%2Cdocument_number%2Csub_category%2Cagency_id%2Cdocument_type_id%2Cagency_id.agency_name%2Cdocument_type_id.document_type_name' \
--header 'accept: application/json'


{
    "data": [
        {
            "id": 2,
            "title": "Mẫu số PC30",
            "file": "fac0e866-bcdf-4757-a432-874fd4a67823",
            "description": null,
            "document_number": "PC30",
            "sub_category": null,
            "category": {
                "name": "Văn bản pháp quy"
            },
            "agency_id": {
                "agency_name": "Bộ công an"
            },
            "document_type_id": {
                "document_type_name": "Nghị định"
            }
        },
        {
            "id": 3,
            "title": "TCVN 3890_2023-Goc",
            "file": "6542bd02-7a5e-454d-94ba-7798cb363018",
            "description": null,
            "document_number": "TCVN3890_2023_919888",
            "sub_category": null,
            "category": {
                "name": "Văn bản pháp quy"
            },
            "agency_id": {
                "agency_name": "Bộ công an"
            },
            "document_type_id": {
                "document_type_name": "Thông tư"
            }
        },
        {
            "id": 4,
            "title": "Tài liệu hội nghị",
            "file": "0c7d3b73-1dda-4706-9ef8-5db368fb7b5c",
            "description": null,
            "document_number": "HN_VB_1",
            "sub_category": null,
            "category": {
                "name": "Văn bản pháp quy"
            },
            "agency_id": {
                "agency_name": "Chính phủ"
            },
            "document_type_id": {
                "document_type_name": "Luật"
            }
        },
        {
            "id": 5,
            "title": "Tài liệu hướng dẫn, sử dụng máy bơm chữa cháy và máy nén",
            "file": "aec15a1a-1bcc-4fa2-91e9-544895a503fc",
            "description": null,
            "document_number": "houngan-sudung-maybom-maynen",
            "sub_category": null,
            "category": {
                "name": "Văn bản pháp quy"
            },
            "agency_id": {
                "agency_name": "Bộ công an"
            },
            "document_type_id": {
                "document_type_name": "Tiêu chuẩn, quy chuẩn PCCC"
            }
        }
    ]
}