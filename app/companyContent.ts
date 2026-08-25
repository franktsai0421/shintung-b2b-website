export type BlogPost = {
  id: number;
  year: string;
  date: string;
  title: string;
  image: string;
  summary: string;
  video?: string;
  source?: string;
};

const legacyRows: Array<[string, string, string, string, number, number, string?]> = [
  ["2016", "09/12/2016", "VIETBUILD 24-28 JUNE (越南)", "1481258417.jpg", 93, 14],
  ["2016", "08/12/2016", "CAMBUILD 8-10 SEP (柬埔寨)", "1481185806.jpg", 93, 13],
  ["2016", "08/12/2016", "MYANBUILD 1-3 DEC (緬甸)", "1481184500.jpg", 93, 12],
  ["2016", "27/10/2016", "INDO BUILD TECH 25-29 MAY (印尼)", "1481180114.jpg", 93, 10],
  ["2016", "25/10/2016", "TEXTILE&GARMENT 28-31 JAN (孟加拉)", "1481182338.jpg", 93, 9],
  ["2017", "29/09/2017", "CAMBUILD 7-9 SEPTEMBER", "1506654376.jpg", 236, 22, "https://www.youtube.com/embed/hM3g4a3HUKE"],
  ["2017", "25/08/2017", "VAN PHAO NHỰA THÔNG MINH", "1503714737.jpg", 236, 21, "https://www.youtube.com/embed/aew8EFA9-nw"],
  ["2017", "21/07/2017", "VIETBUILD 23-27 JUNE", "1503806714.jpg", 236, 20],
  ["2017", "07/07/2017", "LAOBUILD 15-17 JUNE", "1499403663.jpg", 236, 19],
  ["2017", "07/06/2017", "INDO BUILD TECH 17-21 MAY", "1496803710.jpg", 236, 18],
  ["2017", "05/05/2017", "VÒI NHỰA MỚI (SẮP RA MẮT)", "1493971895.png", 236, 17],
  ["2018", "01/12/2018", "BỘ DÂY CAO ÁP TRONG SUỐT SỬ DỤNG ĐẦU NỐI 6 GÓC ¼\” (13)", "1543632575.png", 237, 29, "https://www.youtube.com/embed/ty0T8theajQ"],
  ["2018", "29/11/2018", "MỘT CHÚT CẢI TIẾN CỦA VÒI NHỰA CAO CẤP ONSPA", "1543473876.png", 237, 28],
  ["2018", "08/10/2018", "DÂY XẢ INOX MỚI 2018 VỚI ĐẦU NỐI PHI 21 VÀ PHI 27", "1538981323.png", 237, 27, "https://www.youtube.com/embed/TrZmfB3ZX38"],
  ["2018", "20/07/2018", "HƯỚNG DẪN LẮP ĐẶT VAN PHAO NHỰA THÔNG MINH ONPAS", "1532078598.png", 237, 26, "https://www.youtube.com/embed/de5jDQQJwm0"],
  ["2018", "07/07/2018", "VIETBUILD 21-25 JUNE", "1530933002.png", 237, 25],
  ["2018", "11/06/2018", "BƯỚC CẢI TIẾN MỚI CHO DÒNG SẢN PHẨM 1021, 3200 VÀ 6030", "1530689256.png", 237, 24, "https://www.youtube.com/embed/4lIKoDL1VGU"],
  ["2018", "09/06/2018", "BỘ TƯỚI CÂY THÔNG MINH 3RD GENERATION CÓ GÌ MỚI?", "1528533342.png", 237, 23],
  ["2019", "21/10/2019", "SẢN PHẨM MỚI: HỆ THỐNG THOÁT NƯỚC SUS304", "1571414182.jpg", 242, 36, "https://www.youtube.com/embed/RZ1OFU5RL2o"],
  ["2019", "10/10/2019", "SẢN PHẨM MỚI: VÒI XỊT VỆ SINH THÔNG MINH KHÔNG ĐIỆN OB-8000", "1571414150.jpg", 242, 34, "https://www.youtube.com/embed/IcMEO910KoA"],
  ["2019", "20/09/2019", "SẢN PHẨM MỚI: NẮP BỒN CẦU THÔNG MINH KHÔNG ĐIỆN OB-9000", "1570105171.jpg", 242, 35, "https://www.youtube.com/embed/kj6q0mLITV4"],
  ["2019", "07/08/2019", "KHUYẾN MÃI ĐẶC BIỆT THÁNG 8, MUA NGAY ĐI CHỜ CHI!", "1565157796.png", 242, 33],
  ["2019", "08/07/2019", "VIETBUILD 19-23 JUNE", "1562556970.png", 242, 32],
  ["2019", "01/04/2019", "CÁCH PHÂN BIỆT HÀNG CHÍNH HÃNG - HÀNG GIẢ CÔNG TẮC PHAO", "1556340881.png", 242, 31],
  ["2019", "23/01/2019", "BƯỚC CẢI TIẾN MỚI CHO DÒNG SẢN PHẨM XE VÀ KỆ TƯỚI CÂY", "1548224422.png", 242, 30],
  ["2020", "02/11/2020", "BỘ SEN PHUN SƯƠNG MỚI M1 & M1I", "1604292825.png", 250, 47],
  ["2020", "13/10/2020", "SẢN PHẨM MỚI: BỘ XỊT VỆ SINH D139 & D139I", "1602570101.png", 250, 46],
  ["2020", "17/09/2020", "SẢN PHẨM MỚI: ĐẦU XỊT HƠI CAO ÁP", "1601707360.png", 250, 43],
  ["2020", "26/08/2020", "VIETBUILD 24-28 JUNE", "1598428155.png", 250, 45],
  ["2020", "26/03/2020", "VÒI XỊT VỆ SINH THÔNG MINH MỚI", "1584779658.png", 250, 39, "https://www.youtube.com/embed/7JSWvDy73yU"],
  ["2020", "14/03/2020", "VAN PHAO THÔNG MINH THẾ HỆ MỚI", "1583893619.png", 250, 37, "https://www.youtube.com/embed/Ud-m9NU8JOU"],
  ["2020", "12/02/2020", "PHÒNG CHỐNG DỊCH BỆNH VIÊM ĐƯỜNG HÔ HẤP CẤP DO VI RÚT CORONA", "1581491059.jpg", 250, 38],
  ["2021", "07/10/2021", "SẢN PHẨM MỚI ĐẦU PHUN NƯỚC ĐIỀU CHỈNH", "1633575855.png", 252, 51, "https://www.youtube.com/embed/KQ80xvL-b14"],
  ["2021", "06/10/2021", "LÀM VIỆC TRỞ LẠI", "1633496807.jpg", 252, 50],
  ["2021", "25/03/2021", "GIẤY CHỨNG NHẬN ISO 9001:2015", "1616648181.jpg", 252, 48],
  ["2022", "19/09/2022", "BỘ SEN PHUN SƯƠNG M2 VỚI LÕI LỌC", "1663558135.jpg", 253, 55],
  ["2022", "31/08/2022", "HƯỚNG DẪN LẮP ĐẶT CÔNG TẮC PHAO ONPAS, ONSPA", "1661930730.png", 253, 54, "https://www.youtube.com/embed/yVIYbsaMV6o"],
  ["2022", "25/04/2022", "HẠT NHỰA & DÂY LỚP TRONG PVC ĐẠT KIỂM NGHIỆM REACH & ROHS", "1650878161.png", 253, 53],
  ["2022", "23/04/2022", "VAN PHAO THÔNG MINH GENERATION PREMIUM 3", "1650702714.jpg", 253, 52, "https://www.youtube.com/embed/Ud-m9NU8JOU"],
  ["2023", "30/10/2023", "VAN PHAO THÔNG MINH GENERATION 4", "1698654748.jpg", 255, 61, "https://www.youtube.com/embed/gOrUYPITR-A"],
  ["2023", "18/08/2023", "CẬP NHẬT BÁO CÁO KIỂM NGHIỆM REACH & ROHS DÂY LỚP TRONG PVC 2023", "1692328778.png", 255, 59],
  ["2023", "23/06/2023", "VIETBUILD 14-18 JUNE", "1687490546.png", 255, 57],
  ["2023", "02/02/2023", "GIẤY CHỨNG NHẬN ISO 14001:2015", "1675325796.jpg", 255, 56],
  ["2024", "30/09/2024", "CHUỖI \”TĂNG ÁP LỰC NƯỚC\” - BỘ SEN PHUN SƯƠNG M3 & M3A", "1725694571.jpg", 256, 66, "https://www.youtube.com/embed/-Vfuv1Uh91o"],
  ["2024", "30/09/2024", "CHUỖI \”TĂNG ÁP LỰC NƯỚC\” - BỘ SEN L1094", "1725697943.jpg", 256, 65, "https://www.youtube.com/embed/deCp5oVNJwg"],
  ["2024", "30/09/2024", "CHUỖI \”HIỆN ĐẠI\” - BỘ SEN L1083", "1725698459.jpg", 256, 64, "https://www.youtube.com/embed/7XQABCPOErc"],
  ["2024", "30/09/2024", "CHUỖI \”HIỆN ĐẠI\” - BỘ SEN L1082", "1725699479.jpg", 256, 63, "https://www.youtube.com/embed/NQByvmgbkss"],
  ["2024", "25/06/2024", "BÁO CÁO XÁC MINH ĐỘC LẬP THEO ISO 14064-1:2018", "1719282938.png", 256, 62],
  ["2025", "25/02/2026", "BÁO CÁO HOẠT ĐỘNG TÁI SỬ DỤNG & TÁI CHẾ NGUYÊN VẬT LIỆU - NĂM 2025", "1772002949.png", 257, 71],
  ["2025", "24/05/2025", "BỘ TƯỚI CÂY INOX 304", "1747383932.jpg", 257, 69, "https://www.youtube.com/embed/wi9MrTjX7tg"],
  ["2025", "07/04/2025", "CHƯƠNG TRÌNH ĐỔI CŨ LẤY MỚI - GIẢM RÁC, XANH ĐỜI", "1744259317.jpg", 257, 67],
  ["2025", "12/03/2025", "CẬP NHẬT BÁO CÁO REACH & ROHS HẠT NHỰA PVC 2025", "1741773067.png", 257, 68],
];

const postSummaries: Record<number, string> = {
  7: "Van phao nhựa thông minh ONPAS sử dụng cơ chế kín với gioăng EPDM, dòng nước thẳng mạnh, kích thước nhỏ gọn và kèm lưới lọc inox 304. Bài viết có hướng dẫn lắp đặt và video minh họa.",
  12: "Dây cao áp PVC ba lớp chịu áp lực gần 200 kg/cm², được xử lý chống UV và dùng nguyên liệu đạt yêu cầu RoHS. Bài viết giới thiệu kết cấu, đầu nối và video thử áp lực.",
  19: "Giới thiệu hệ thống thoát nước SUS304 mới cùng video trình diễn sản phẩm và ứng dụng thực tế.",
  35: "Thông báo chứng nhận ISO 9001:2015 cho hệ thống quản lý chất lượng của Shin Tung Việt Nam.",
  43: "Thông báo chứng nhận hệ thống quản lý môi trường ISO 14001:2015, thể hiện định hướng kiểm soát tác động môi trường trong hoạt động sản xuất.",
  48: "Báo cáo xác minh độc lập lượng phát thải khí nhà kính năm 2023 theo ISO 14064-1:2018, được thẩm tra bởi Bureau Veritas Certification Việt Nam.",
  49: "Tổng hợp hoạt động tái sử dụng và tái chế nguyên vật liệu của công ty trong năm 2025.",
  50: "Bộ tưới cây inox 304 chống gỉ, có thể dùng để tưới cây, rửa xe và vệ sinh nhà cửa; thiết kế chắc chắn, linh hoạt và dễ lắp đặt.",
  51: "Chương trình thu hồi sản phẩm cũ nhằm giảm rác thải và khuyến khích lựa chọn thân thiện hơn với môi trường.",
  52: "Cập nhật báo cáo kiểm nghiệm REACH và RoHS đối với hạt nhựa PVC đen dùng cho lớp trong của dây, do Eurofins MTS Việt Nam xác nhận.",
};

const legacyImagePaths = [
  "2016/12/09/1481258417.jpg", "2016/12/08/1481185806.jpg", "2016/12/08/1481184500.jpg", "2016/12/08/1481180114.jpg", "2016/12/08/1481182338.jpg",
  "2017/09/29/1506654376.jpg", "2017/08/26/1503714737.jpg", "2017/08/27/1503806714.jpg", "2017/07/07/1499403663.jpg", "2017/06/07/1496803710.jpg", "2017/05/05/1493971895.png",
  "2018/12/01/1543632575.png", "2018/11/29/1543473876.png", "2018/10/08/1538981323.png", "2018/07/20/1532078598.png", "2018/07/07/1530933002.png", "2018/07/04/1530689256.png", "2018/06/09/1528533342.png",
  "2019/10/18/1571414182.jpg", "2019/10/18/1571414150.jpg", "2019/10/03/1570105171.jpg", "2019/08/07/1565157796.png", "2019/07/08/1562556970.png", "2019/04/27/1556340881.png", "2019/01/23/1548224422.png",
  "2020/11/02/1604292825.png", "2020/10/13/1602570101.png", "2020/10/03/1601707360.png", "2020/08/26/1598428155.png", "2020/03/21/1584779658.png", "2020/03/11/1583893619.png", "2020/02/12/1581491059.jpg",
  "2021/10/07/1633575855.png", "2021/10/06/1633496807.jpg", "2021/03/25/1616648181.jpg",
  "2022/09/19/1663558135.jpg", "2022/08/31/1661930730.png", "2022/04/25/1650878161.png", "2022/04/23/1650702714.jpg",
  "2023/10/30/1698654748.jpg", "2023/08/18/1692328778.png", "2023/06/23/1687490546.png", "2023/02/02/1675325796.jpg",
  "2024/09/07/1725694571.jpg", "2024/09/07/1725697943.jpg", "2024/09/07/1725698459.jpg", "2024/09/07/1725699479.jpg", "2024/06/25/1719282938.png",
  "2026/02/25/1772002949.png", "2025/05/16/1747383932.jpg", "2025/04/10/1744259317.jpg", "2025/03/12/1741773067.png",
];

export const legacyBlogPosts: BlogPost[] = legacyRows.map(
  ([year, date, title, , section, sourceId, video], index) => ({
    id: index + 1,
    year,
    date,
    title,
    image: `https://www.shintung-onspa.com/upload/${legacyImagePaths[index]}`,
    summary:
      postSummaries[index + 1] ||
      `Tư liệu lưu trữ của Shin Tung Việt Nam về ${title.toLocaleLowerCase("vi-VN")}.`,
    video,
    source: `https://www.shintung-onspa.com/index.php?do=blog&tp=${section}&id=${sourceId}&language=vie`,
  }),
);

export const machines = [
  { image: "/quality/machines/material-analysis.jpg", vi: "Phân tích vật liệu & kiểm tra cơ lý", zh: "材料分析與物性檢測", detailVi: "Máy quang phổ EDXRF EDX 2800B, thiết bị đo khối lượng, độ cứng và kích thước.", detailZh: "EDX 2800B EDXRF分光儀、質量、硬度與尺寸量測設備。" },
  { image: "/quality/machines/tensile-torsion.jpg", vi: "Máy thử kéo & xoắn", zh: "拉力與扭力測試機", detailVi: "Kiểm tra độ bền kéo, độ giãn dài, lực xoắn và khả năng chịu tải của dây và phụ kiện.", detailZh: "檢測軟管與配件的拉伸、延伸、扭力及承載能力。" },
  { image: "/quality/machines/salt-spray.jpg", vi: "Máy thử phun sương muối", zh: "鹽霧試驗機", detailVi: "Đánh giá khả năng chống ăn mòn của bề mặt kim loại, lớp mạ và phụ kiện.", detailZh: "評估金屬表面、電鍍層與配件的耐腐蝕性能。" },
  { image: "/quality/machines/temperature-soak.jpg", vi: "Bể ngâm nhiệt độ", zh: "溫度浸泡試驗機", detailVi: "Thử nghiệm ngâm ở nhiệt độ kiểm soát để đánh giá độ ổn định của vật liệu và dây.", detailZh: "在受控溫度下浸泡，評估材料與軟管的穩定性。" },
  { image: "/quality/machines/environment-chamber.jpg", vi: "Hệ thống thử nhiệt độ & môi trường", zh: "溫度與環境試驗設備", detailVi: "Mô phỏng điều kiện nóng, lạnh và môi trường để kiểm tra độ bền sản phẩm.", detailZh: "模擬高低溫及環境條件，驗證產品耐久度。" },
  { image: "/quality/machines/pulse-pressure.jpg", vi: "Máy thử xung & áp lực ống trong", zh: "脈衝與內管壓力試驗機", detailVi: "Kiểm tra chu kỳ áp lực, áp lực nước và độ kín của ống dẫn.", detailZh: "檢測壓力循環、水壓及管路密封性能。" },
  { image: "/quality/machines/life-uv.jpg", vi: "Máy thử tuổi thọ vòi xịt & UV", zh: "沖洗器壽命與UV試驗機", detailVi: "Kiểm tra số chu kỳ hoạt động, độ kín và khả năng lão hóa dưới tia UV.", detailZh: "檢測操作循環、密封性能及紫外線老化耐受度。" },
];

export const certificates = [
  { image: "/quality/certificates/iso-9001-2024-2027.jpg", name: "ISO 9001:2015 · SGS", status: "current", period: "05/03/2024 – 05/03/2027", vi: "Hệ thống quản lý chất lượng cho sản xuất, lắp ráp và gia công sản phẩm vệ sinh, làm vườn, thiết bị bơm và đầu nối công nghiệp.", zh: "品質管理系統，涵蓋衛浴、園藝、泵浦設備與工業接頭的製造、組裝及加工。" },
  { image: "/quality/certificates/ghg-verification-2023.jpg", name: "ISO 14064-1:2018 · Bureau Veritas", status: "report", period: "Báo cáo phát thải năm 2023", vi: "Báo cáo xác minh độc lập phát thải khí nhà kính, thực hiện theo ISO 14064-1:2018 và xác minh theo ISO 14064-3:2019.", zh: "2023年度溫室氣體排放獨立查證報告，依ISO 14064-1:2018盤查並按ISO 14064-3:2019查證。" },
  { image: "/quality/certificates/iso-14001-2023-2026.jpg", name: "ISO 14001:2015 · SGS", status: "archive", period: "06/01/2023 – 06/01/2026", vi: "Chứng nhận hệ thống quản lý môi trường. Bản trong ảnh đã hết thời hạn và được hiển thị như hồ sơ lưu trữ.", zh: "環境管理系統證書。照片版本已到期，現以歷史紀錄展示。" },
  { image: "/quality/certificates/iso-9001-2021-2024.jpg", name: "ISO 9001:2015 · SGS", status: "archive", period: "05/03/2021 – 05/03/2024", vi: "Phiên bản chứng nhận ISO 9001:2015 trước đây, lưu lại để thể hiện quá trình duy trì hệ thống chất lượng.", zh: "前期ISO 9001:2015證書，作為持續維護品質系統的歷史紀錄。" },
  { image: "/quality/certificates/iso-9001-2000-archive.jpg", name: "ISO 9001:2000 · QUACERT", status: "archive", period: "17/06/2002 – 16/06/2005", vi: "Chứng nhận lịch sử của Công ty TNHH Tân Đông cho hoạt động lắp ráp và cung ứng công tắc phao.", zh: "越南新東公司早期浮球開關組裝與供應之歷史認證。" },
];
