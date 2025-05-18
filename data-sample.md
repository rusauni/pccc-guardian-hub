const sampleData = {
  "time": 1747564853435,
  "blocks": [
    // Header
    {
      "id": "header1",
      "type": "header",
      "data": {
        "text": "Một số giải pháp để bảo đảm giao thông phục vụ chữa cháy",
        "level": 1
      },
      "tunes": {
        "alignment": { "alignment": "center" }
      }
    },
    
    // Subheader
    {
      "id": "subheader1",
      "type": "header",
      "data": {
        "text": "Tổng quan tình hình",
        "level": 2
      },
      "tunes": {
        "alignment": { "alignment": "left" }
      }
    },
    
    // Paragraph with formatting
    {
      "id": "paragraph1",
      "type": "paragraph",
      "data": {
        "text": "Trong 06 tháng đầu năm 2022, toàn quốc xảy ra <b>848 vụ cháy</b> (trong đó có 22 vụ cháy lớn, 397 vụ cháy trung bình và 429 vụ cháy nhỏ), làm chết 41 người, bị thương 42 người, thiệt hại về tài sản sơ bộ ước tính khoảng <i>414,73 tỷ đồng</i> và 40,87 ha rừng."
      },
      "tunes": {
        "alignment": { "alignment": "justify" }
      }
    },
    
    // Image
    {
      "id": "image1",
      "type": "image",
      "data": {
        "caption": "Hình ảnh xe chữa cháy lưu thông trên đường",
        "file": {
          "url": "https://dashboard.pccc40.com/assets/0b3fb053-886f-4fee-8ad8-52e2c082f613"
        },
        "withBorder": false,
        "withBackground": false,
        "stretched": false
      },
      "tunes": {
        "alignment": { "alignment": "center" }
      }
    },
    
    // Unordered List
    {
      "id": "list1",
      "type": "list",
      "data": {
        "style": "unordered",
        "items": [
          "Kiểm tra định kỳ hệ thống báo cháy",
          "Đảm bảo lối thoát hiểm luôn thông thoáng",
          "Lắp đặt đầy đủ bình chữa cháy",
          "Tổ chức tập huấn PCCC định kỳ"
        ]
      }
    },
    
    // Ordered List
    {
      "id": "list2",
      "type": "list",
      "data": {
        "style": "ordered",
        "items": [
          "Tiếp nhận thông tin báo cháy",
          "Điều động lực lượng ứng cứu",
          "Phong tỏa hiện trường",
          "Tiến hành chữa cháy",
          "Khắc phục hậu quả"
        ]
      }
    },
    
    // Quote
    {
      "id": "quote1",
      "type": "quote",
      "data": {
        "text": "Phòng cháy hơn chữa cháy - Hãy là người tiêu dùng thông thái trong việc phòng cháy và chữa cháy.",
        "caption": "Cục Cảnh sát PCCC và CNCH"
      },
      "tunes": {
        "alignment": { "alignment": "right" }
      }
    },
    
    // Warning
    {
      "id": "warning1",
      "type": "warning",
      "data": {
        "title": "Lưu ý quan trọng",
        "message": "Khi có cháy xảy ra, hãy bình tĩnh và thực hiện đúng các bước thoát hiểm đã được hướng dẫn. Gọi ngay 114 để được hỗ trợ."
      }
    },
    
    // Code block
    {
      "id": "code1",
      "type": "code",
      "data": {
        "code": "// Thủ tục báo cháy cơ bản\nfunction baoChay() {\n  const soDienThoai = '114';\n  const diaChi = 'Số 1 Phạm Văn Đồng, Hà Nội';\n  const tinhTrang = 'Đang có khói đen bốc lên nhiều từ tầng 2';\n  \n  console.log(`Gọi ${soDienThoai} báo cháy tại ${diaChi}. Tình trạng: ${tinhTrang}`);\n}"
      }
    },
    
    // Table
    {
      "id": "table1",
      "type": "table",
      "data": {
        "content": [
          ["STT", "Nội dung", "Trách nhiệm"],
          ["1", "Kiểm tra bình chữa cháy", "Ban quản lý tòa nhà"],
          ["2", "Kiểm tra hệ thống báo cháy", "Đơn vị PCCC"],
          ["3", "Tập huấn PCCC", "Công an PCCC"]
        ]
      }
    },
    
    // Embed (YouTube video)
    {
      "id": "embed1",
      "type": "embed",
      "data": {
        "html": "<iframe width='100%' height='400' src='https://www.youtube.com/embed/VIDEO_ID' frameborder='0' allowfullscreen></iframe>",
        "caption": "Hướng dẫn sử dụng bình chữa cháy"
      }
    },
    
    // Link Tool
    {
      "id": "link1",
      "type": "linkTool",
      "data": {
        "link": "https://pccc40.com/huong-dan-phong-chay-chua-chay",
        "meta": {
          "title": "Hướng dẫn phòng cháy chữa cháy",
          "description": "Các biện pháp phòng cháy chữa cháy cơ bản cho hộ gia đình và doanh nghiệp",
          "image": {
            "url": "https://pccc40.com/images/pccc-thumbnail.jpg"
          }
        }
      }
    }
  ],
  "version": "2.29.1"
};