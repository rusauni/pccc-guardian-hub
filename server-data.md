# 1. Tạo folder repository chứa các file implement api
# 2. Tạo file GetPostByCategorySlug
    Get https://dashboard.pccc40.com/items/articles?filter[category][slug][_eq]=tin-tuc-pccc&fields=id,title,slug,thumbnail,summary,date_updated,category.name,category.slug,category.id
    Response:
    {
    "data": [
        {
            "id": 1,
            "title": "Một số giải pháp để bảo đảm giao thông phục vụ chữa cháy",
            "slug": "mot-so-giai-phap-de-bao-dam-giao-thong-phuc-vu-chua-chay",
            "thumbnail": "492bce69-677a-4ce7-90c5-56060c352ccd",
            "summary": "Trong 06 tháng đầu năm 2022, toàn quốc xảy ra 848 vụ cháy (trong đó có 22 vụ cháy lớn, 397 vụ cháy trung bình và 429 vụ cháy nhỏ), làm chết 41 người, bị thương 42 người, thiệt hại về tài sản sơ bộ ước tính khoảng 414,73 tỷ đồng và 40,87 ha rừng",
            "date_updated": "2025-05-18T12:27:12.847Z",
            "category": {
                "name": "Tin tức PCCC",
                "slug": "tin-tuc-pccc",
                "id": 1
            }
        }
    ]
    }
# 3. Sửa lại mockData.ts với các field theo response này
# 4. Map Thêm field thumbnail -> thumbnailUrl với url: https://dashboard.pccc40.com/assets/{thumbnail}