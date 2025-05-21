import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-pccc-dark text-white py-10 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">PCCC40</h3>
            <p className="text-sm text-gray-300">
              Cổng thông tin điện tử về phòng cháy chữa cháy, cung cấp tin tức, kiến thức và văn bản pháp luật mới nhất.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white text-sm">Trang chủ</Link></li>
              <li><Link to="/tin-tuc" className="text-gray-300 hover:text-white text-sm">Tin tức PCCC</Link></li>
              <li><Link to="/huong-dan-cong-dong" className="text-gray-300 hover:text-white text-sm">Hướng dẫn cộng đồng</Link></li>
              <li><Link to="/van-ban-phap-quy" className="text-gray-300 hover:text-white text-sm">Văn bản pháp quy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Thông tin hữu ích</h3>
            <ul className="space-y-2">
              <li><Link to="/thu-tuc-hanh-chinh" className="text-gray-300 hover:text-white text-sm">Thủ tục hành chính</Link></li>
              <li><Link to="/huong-dan-nghiep-vu" className="text-gray-300 hover:text-white text-sm">Hướng dẫn nghiệp vụ</Link></li>
              <li><Link to="/nghien-cuu-trao-doi" className="text-gray-300 hover:text-white text-sm">Nghiên cứu - Trao đổi</Link></li>
              <li><Link to="/video" className="text-gray-300 hover:text-white text-sm">Video kỹ năng PCCC</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liên hệ</h3>
            <address className="not-italic text-sm text-gray-300">
              <p>Số 1 Sala, Quận 2</p>
              <p>Hồ Chí Minh, Việt Nam</p>
              <p className="mt-2">Email: admin@pccc40.com</p>
              <p>Điện thoại: (024) 3636 3636</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} PCCC News. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;