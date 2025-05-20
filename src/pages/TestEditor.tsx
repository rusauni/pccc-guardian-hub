import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EditorContent } from '@/components/EditorContent/EditorContent';
import { getPostDetailBySlug } from '@/repository/GetPostDetailBySlug';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for related articles and categories
const relatedArticles = [
  {
    id: 1,
    title: 'Các biện pháp phòng cháy chữa cháy cơ bản',
    date_updated: '2025-05-15T10:30:00.000Z',
    category: { slug: 'tin-tuc-pccc', name: 'Tin tức PCCC' }
  },
  {
    id: 2,
    title: 'Hướng dẫn sử dụng bình chữa cháy đúng cách',
    date_updated: '2025-05-10T14:20:00.000Z',
    category: { slug: 'huong-dan-cong-dong', name: 'Hướng dẫn cộng đồng' }
  },
  {
    id: 3,
    title: 'Quy định mới về PCCC trong tòa nhà cao tầng',
    date_updated: '2025-05-05T09:15:00.000Z',
    category: { slug: 'van-ban-phap-quy', name: 'Văn bản pháp quy' }
  }
];

const categories = [
  { name: 'Tin tức PCCC', slug: 'tin-tuc-pccc' },
  { name: 'Hướng dẫn cộng đồng', slug: 'huong-dan-cong-dong' },
  { name: 'Văn bản pháp quy', slug: 'van-ban-phap-quy' },
  { name: 'Thủ tục hành chính', slug: 'thu-tuc-hanh-chinh' },
  { name: 'Hướng dẫn nghiệp vụ', slug: 'huong-dan-nghiep-vu' },
  { name: 'Nghiên cứu - Trao đổi', slug: 'nghien-cuu-trao-doi' }
];

// Format date helper function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

interface Article {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnailUrl: string;
  summary: string;
  date_updated: string;
  content: {
    time: number;
    blocks: any[];
    version: string;
  };
  category: {
    name: string;
    slug: string;
    id: number;
  };
}

// Sample data as fallback
const sampleData = {
  "data": [
        {
            "id": 1,
            "title": "Một số giải pháp để bảo đảm giao thông phục vụ chữa cháy",
            "slug": "mot-so-giai-phap-de-bao-dam-giao-thong-phuc-vu-chua-chay",
            "thumbnail": "492bce69-677a-4ce7-90c5-56060c352ccd",
            "summary": "Trong 06 tháng đầu năm 2022, toàn quốc xảy ra 848 vụ cháy (trong đó có 22 vụ cháy lớn, 397 vụ cháy trung bình và 429 vụ cháy nhỏ), làm chết 41 người, bị thương 42 người, thiệt hại về tài sản sơ bộ ước tính khoảng 414,73 tỷ đồng và 40,87 ha rừng",
            "date_updated": "2025-05-18T12:27:12.847Z",
            "content": {
                "time": 1747564853435,
                "blocks": [
                    {
                        "id": "aXCCDqO3Bp",
                        "type": "header",
                        "data": {
                            "text": "<b>Một số giải pháp để bảo đảm giao thông phục vụ chữa cháy</b>",
                            "level": 2
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "AIT_F--TM5",
                        "type": "paragraph",
                        "data": {
                            "text": "<i>25/07/2022 12:00:00 SA</i>"
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "x6fDYpAuSg",
                        "type": "paragraph",
                        "data": {
                            "text": "<b>Trong 06 tháng đầu năm 2022, toàn quốc xảy ra 848 vụ cháy (trong đó có 22 vụ cháy lớn, 397 vụ cháy trung bình và 429 vụ cháy nhỏ), làm chết 41 người, bị thương 42 người, thiệt hại về tài sản sơ bộ ước tính khoảng 414,73 tỷ đồng và 40,87 ha rừng. Ngoài ra, đã xảy ra 1.778 vụ sự cố chạm chập thiết bị điện trên cột điện, trong nhà dân và cháy cỏ, rác, phế liệu khác thiệt hại không đáng kể. So với cùng kỳ năm 2021, số vụ cháy giảm 306 vụ (848/1.154 vụ), giảm 12 người chết (41/53 người), giảm 35 người bị thương (42/77 người), thiệt hại về tài sản tăng 128,06 tỷ đồng (414,73/288,67 tỷ đồng). Số vụ cháy lớn giảm 02 vụ (22/24 vụ), thiệt hại về tài sản tăng 153,3 tỷ đồng (332,2/196,9 tỷ đồng).</b>"
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "6nzDp972Tc",
                        "type": "paragraph",
                        "data": {
                            "text": "Một trong những nguyên nhân dẫn đến các vụ cháy gây thiệt hại lớn về người và tài sản là do việc giao thông phục vụ chữa cháy chưa đảm bảo dẫn tới việc di chuyển của lực lượng chữa cháy chuyên nghiệp đến đám cháy chậm khiến thời gian cháy tự do chửa đám cháy kéo dài."
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "2ZqnpNY_3l",
                        "type": "paragraph",
                        "data": {
                            "text": "Hình ảnh xe chữa cháy lưu thông trên đường"
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "pnLTIpr2Rm",
                        "type": "image",
                        "data": {
                            "caption": "Hình ảnh xe chữa cháy lưu thông trên đường",
                            "withBorder": false,
                            "withBackground": false,
                            "stretched": false,
                            "file": {
                                "width": 500,
                                "height": 375,
                                "size": "58888",
                                "name": "P52272022.1.jpg",
                                "title": "P52272022.1.jpg",
                                "extension": "jpg",
                                "fileId": "0b3fb053-886f-4fee-8ad8-52e2c082f613",
                                "fileURL": "/files/0b3fb053-886f-4fee-8ad8-52e2c082f613",
                                "url": "https://dashboard.pccc40.com/assets/0b3fb053-886f-4fee-8ad8-52e2c082f613"
                            }
                        }
                    },
                    {
                        "id": "4E6--zn_FP",
                        "type": "paragraph",
                        "data": {
                            "text": "Theo thống kê tại nước ta, số tuyến đường không đảm bảo chiều rộng tối thiểu 3,5m, chiều cao tối thiểu 4,5m cho xe chữa cháy, xe thang hoạt động là: 70.166/237.408 tuyến đường, chiếm 29,56%. Những tuyến đường này chủ yếu là các tuyến đường giao thông nông thôn, giao thông đô thị, vùng núi. Công tác quy hoạch giao thông tại một số nơi chưa quan tâm đến việc đảm bảo chiều rộng, chiều cao cho xe chữa cháy hoạt động. Bên cạnh đó, nhiều tuyến đường xuống cấp nhưng chưa được cải tạo, nâng cấp; nhiều tuyến đường không đảm bảo về chiều rộng chưa được quy hoạch mở rộng. Hạn chế này do sự phối hợp chưa tích cực của các cơ quan quản lý, nguồn kinh phí và những điều kiện đảm bảo cho công tác giải quyết giao thông phục vụ chữa cháy còn thiếu."
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "UfGrqpOA8G",
                        "type": "paragraph",
                        "data": {
                            "text": "Công tác đầu tư, xây dựng đường, cầu cống chưa tính đến khả năng đảm bảo tải trọng, chiều rộng cho xe chữa cháy di chuyển qua. Nhiều tuyến đường giao thông nội đô, nội khu không có bãi đỗ cho xe chữa cháy triển khai chữa cháy. Theo thống kê, tổng số cầu, cống không bảo đảm chiều rộng và tải trọng cho xe chữa cháy, xe thang hoạt động là: 14.276/30.890, chiếm 46,22%; tổng số tuyến đường giao thông nội đô, nội khu không có bãi đỗ cho xe chữa cháy triển khai chữa cháy là: 46.465/102.641chiếm 45,27%."
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "5LNtip0ook",
                        "type": "paragraph",
                        "data": {
                            "text": "Bên cạnh đó, công tác quản lý hạ tầng kỹ thuật (điện, viễn thông, cấp thoát nước…) chưa đồng bộ, nhiều tuyến đường, phố, ngõ chưa hạ ngầm các đường dây viễn thông, dây điện. Nhiều đường, phố, ngõ vào khu dân cư bị chắn bới các loại cọc, cổng, rào, barie, các hộ dân lắp đặt mái che, mái vẩy đua ra bên ngoài làm cản trở khả năng di chuyển của xe chữa cháy và các loại xe chuyên dụng."
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "kqSCraRDKM",
                        "type": "image",
                        "data": {
                            "caption": "Hình ảnh tuyến đường bị dây điện chắn ngang",
                            "withBorder": false,
                            "withBackground": false,
                            "stretched": false,
                            "file": {
                                "width": 960,
                                "height": 640,
                                "size": "189190",
                                "name": "P52272022.2.jpg",
                                "title": "P52272022.2.jpg",
                                "extension": "jpg",
                                "fileId": "19d0a8c9-db4e-4a7f-be36-f681fefc8d0a",
                                "fileURL": "/files/19d0a8c9-db4e-4a7f-be36-f681fefc8d0a",
                                "url": "https://dashboard.pccc40.com/assets/19d0a8c9-db4e-4a7f-be36-f681fefc8d0a"
                            }
                        }
                    },
                    {
                        "id": "YRtbzVzpMU",
                        "type": "paragraph",
                        "data": {
                            "text": "Tại các thành phố, thị xã, nơi có mật độ dân cư đông đúc thường xuyên xảy ra tắc đường vào giờ cao điểm, gây ách tắc giao thông. Tình trạng lấn chiếm lòng đường, lề đường, hè phố để buôn bán, kinh doanh cũng góp phần gây ách tắc, cản trở xe chữa cháy di chuyển. Đặc biệt nhiều trường hợp không nhường đường cho xe chữa cháy và các xe chuyên dụng khiến thời gian tiếp cận đám cháy của lực lượng Cảnh sát PCCC&amp;CNCH kéo dài."
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "hf4KxZJlhj",
                        "type": "paragraph",
                        "data": {
                            "text": "Hình ảnh ách tắc giao thông trong giờ cao điểm"
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "0vx1MBHFRp",
                        "type": "image",
                        "data": {
                            "caption": "Hình ảnh ách tắc giao thông trong giờ cao điểm",
                            "withBorder": false,
                            "withBackground": false,
                            "stretched": false,
                            "file": {
                                "width": 665,
                                "height": 443,
                                "size": "130233",
                                "name": "P52272022.3.jpg",
                                "title": "P52272022.3.jpg",
                                "extension": "jpg",
                                "fileId": "b5bbac37-2039-4055-818f-179da8c1dbe4",
                                "fileURL": "/files/b5bbac37-2039-4055-818f-179da8c1dbe4",
                                "url": "https://dashboard.pccc40.com/assets/b5bbac37-2039-4055-818f-179da8c1dbe4"
                            }
                        }
                    },
                    {
                        "id": "kYdzaytDS6",
                        "type": "paragraph",
                        "data": {
                            "text": "Để giải quyết những khó khăn, bất cập và thực hiện có hiệu quả việc bảo đảm giao thông phục vụ chữa cháy, góp phần kiềm chế gia tăng số vụ cháy và thiệt hại do cháy gây ra cần tập trung thực hiện một số giải pháp cụ thể sau:"
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "RNmfZZ3ddI",
                        "type": "paragraph",
                        "data": {
                            "text": "Một là, lực lượng Cảnh sát PCCC và CNCH tham mưu UBND các địa phương ban hành các văn bản chỉ đạo giải quyết giao thông phục vụ chữa cháy trên địa bàn. Tổ chức nắm chắc tình trạng giao thông , xây dựng, hoàn thiện và cập nhật thường xuyên bản đồ giao thông để có phương án di chuyển lực lượng, phương tiện đến đám cháy một cách nhanh nhất."
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "HIY9Ee5isG",
                        "type": "paragraph",
                        "data": {
                            "text": "Hai là, UBND cấp tỉnh cần chỉ đạo, phân công cụ thể vai trò, trách nhiệm của từng đơn vị như Công an cấp tỉnh, Sở Xây dựng, Sở kế hoạch và đầu tư, Sở Thông tin truyền thông, Sở Giao thông vận tải, Điện lực, UBND các cấp và các đơn vị có liên quan trong việc quy hoạch, sử dụng, quản lý, vận hành, bảo dưỡng, bảo vệ hệ thống giao thông, hạ ngầm các công trình điện lực, viễn thông để bảo đảm tuyến đường cho xe chữa cháy, xe thang và các xe chuyên dụng di chuyển."
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "kFClCR1rnI",
                        "type": "paragraph",
                        "data": {
                            "text": "Ba là, UBND cấp tỉnh cần xây dựng, hoàn thiện quy hoạch hạ tầng về PCCC gắn với quy hoạch xây dựng, phát triển kinh tế – xã hội của địa phương, tập trung giải quyết những bất cập về giao thông phục vụ chữa cháy và CNCH. Nghiên cứu, khảo sát, đầu tư nguồn ngân sách cải tạo, nâng cấp, mở rộng các tuyến đường giao thông đã xuống cấp, không đảm bảo cho xe chữa cháy và các xe chuyên dụng hoạt động."
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "GQYuz-jhFz",
                        "type": "paragraph",
                        "data": {
                            "text": "Bốn là, UBND các cấp cần có phương án phá dỡ các bục, bệ, barie, mái che, mái vẩy gây cản trở hoạt động của xe chữa cháy, xe thang và các xe chuyên dụng khác. Ngoài ra, cần có phương án di dời các cơ sở có nguy cơ cháy nổ cao ra khỏi các khu dân cư, ngõ sâu, những nơi xe chữa cháy không tiếp cận được."
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "Zc_l8lWiBC",
                        "type": "paragraph",
                        "data": {
                            "text": "Năm là, tăng cường tuyên truyền trên các phương tiện thông tin đại chúng, giải thích cho người dân nhận thấy được sự cần thiết và quan trọng của việc đảm bảo giao thông phục vụ chữa cháy, ý thức nhường đường cho xe chữa cháy đi làm nhiệm vụ nhằm nâng cao trách nhiệm của quần chúng nhân dân."
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    },
                    {
                        "id": "LS7vN9QgAw",
                        "type": "paragraph",
                        "data": {
                            "text": "<b>Nguyễn Hà Sơn</b>"
                        },
                        "tunes": {
                            "alignment": {
                                "alignment": "left"
                            }
                        }
                    }
                ],
                "version": "2.29.1"
            },
            "category": {
                "name": "Tin tức PCCC",
                "slug": "tin-tuc-pccc",
                "id": 1
            }
        }
    ]
};

interface Article {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnailUrl: string;
  summary: string;
  date_updated: string;
  category: {
    name: string;
    slug: string;
    id: number;
  };
  content: {
    time: number;
    blocks: any[];
    version: string;
  };
}

export function TestEditor() {
  const { slug = 'mot-so-giai-phap-de-bao-dam-giao-thong-phuc-vu-chua-chay' } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getPostDetailBySlug(slug);
        
        if (data) {
          const articleWithThumbnail = {
            ...data,
            thumbnailUrl: data.thumbnail ? `https://dashboard.pccc40.com/assets/${data.thumbnail}` : ''
          };
          setArticle(articleWithThumbnail);
        } else {
          setError('Không tìm thấy bài viết');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Có lỗi xảy ra khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Breadcrumbs />
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Breadcrumbs />
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold">Bài viết không tồn tại</h1>
            <Link to="/" className="text-pccc-primary hover:underline mt-4 inline-block">
              Quay lại trang chủ
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }


  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Breadcrumbs />
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <Badge variant="secondary">
                          Tin tức PCCC
                        </Badge>
                        <span className="text-sm text-gray-500">
                        </span>
                      </div>
                      <h1 className="text-3xl font-bold mb-6">Bài viết không tồn tại</h1>
                      
                      <div className="prose max-w-none">
                        <p className="text-lg mb-6">
                          {error}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Breadcrumbs />
        <main className="flex-grow py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <Badge variant="secondary">
                          Tin tức PCCC
                        </Badge>
                        <span className="text-sm text-gray-500">
                        </span>
                      </div>
                      <h1 className="text-3xl font-bold mb-6">Bài viết không tồn tại</h1>
                      
                      <div className="prose max-w-none">
                        <p className="text-lg mb-6">
                          Không tìm thấy bài viết
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format the date using our helper function
  const formattedDate = formatDate(article.date_updated);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {article.thumbnailUrl && (
                    <img 
                      src={article.thumbnailUrl} 
                      alt={article.title} 
                      className="w-full h-[400px] object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary">
                        {article.category?.name || 'Tin tức PCCC'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formattedDate}
                      </span>
                    </div>
                    {/* <h1 className="text-3xl font-bold mb-6">{article.title}</h1> */}
                    
                    <div className="prose max-w-none">
                      {article.content ? (
                        <EditorContent content={article.content} className="mt-6" />
                      ) : (
                        <p className="text-lg mb-6">
                          {article.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Related Articles */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-4 pb-2 border-b">Bài viết liên quan</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((item) => (
                      <div key={item.id} className="pb-3 border-b last:border-0">
                        <Link 
                          to={`/${item.category.slug}/${item.id}`}
                          className="text-sm font-medium hover:text-blue-600 line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(item.date_updated)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Categories */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-4 pb-2 border-b">Danh mục tin</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.slug}>
                        <Link 
                          to={`/${category.slug}`}
                          className="text-sm text-gray-700 hover:text-blue-600 flex items-center py-1.5"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></span>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestEditor;
