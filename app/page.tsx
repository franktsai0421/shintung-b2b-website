"use client";

import { useMemo, useState } from "react";

type Customer = { username: string; password: string; name: string; tier: keyof typeof multipliers; address: string };
type Product = { id: number; code: string; category: string; name: string; zh: string; spec: string; pack: string; base: number; tone: string };

const multipliers = { gold: 0.86, silver: 0.92, standard: 1 };
const customers: Customer[] = [
  { username: "minhphat", password: "123456", name: "VLXD Minh Phát", tier: "gold", address: "128 Nguyễn Văn Linh, Q.7, TP.HCM" },
  { username: "anphu", password: "123456", name: "Điện Nước An Phú", tier: "silver", address: "42 Lê Văn Việt, TP. Thủ Đức" },
  { username: "hoangnam", password: "123456", name: "Cửa hàng Hoàng Nam", tier: "standard", address: "19 QL1A, Bình Tân, TP.HCM" },
];

const products: Product[] = [
  { id: 1, code: "TD-BR40", category: "Ống mềm inox", name: "Dây cấp inox 304", zh: "304不鏽鋼編織軟管", spec: "F1/2 × F1/2 · 40 cm", pack: "100 sợi / thùng", base: 32000, tone: "#dce9ef" },
  { id: 2, code: "TD-BR60", category: "Ống mềm inox", name: "Dây cấp inox 304", zh: "304不鏽鋼編織軟管", spec: "F1/2 × F1/2 · 60 cm", pack: "100 sợi / thùng", base: 38000, tone: "#e1e9ee" },
  { id: 3, code: "TD-VN40", category: "Dây vòi nước", name: "Dây vòi rửa chén", zh: "廚房龍頭管", spec: "M10 × F1/2 · 40 cm", pack: "100 sợi / thùng", base: 35500, tone: "#e9e2d9" },
  { id: 4, code: "TD-SH150", category: "Dây sen", name: "Dây sen chống xoắn", zh: "防纏繞花灑管", spec: "1.5 m · lõi EPDM", pack: "50 sợi / thùng", base: 92000, tone: "#dce7ec" },
  { id: 5, code: "TD-BD120", category: "Vòi xịt", name: "Bộ vòi xịt vệ sinh", zh: "沖洗器組", spec: "ABS mạ chrome · 1.2 m", pack: "40 bộ / thùng", base: 118000, tone: "#e9e4da" },
  { id: 6, code: "TD-PD27", category: "Phao bồn nước", name: "Phao cơ inox 27", zh: "不鏽鋼水塔浮球", spec: "Ren 27 · bóng inox 140", pack: "20 bộ / thùng", base: 185000, tone: "#dce9e8" },
  { id: 7, code: "TD-PD34", category: "Phao bồn nước", name: "Phao cơ đồng 34", zh: "銅製水塔浮球", spec: "Ren 34 · bóng inox 168", pack: "12 bộ / thùng", base: 268000, tone: "#e8e1d3" },
  { id: 8, code: "TD-GH20", category: "Ống tưới vườn", name: "Ống tưới vườn PVC", zh: "PVC花園管", spec: "Ø 20 mm · cuộn 20 m", pack: "5 cuộn / kiện", base: 295000, tone: "#dce9df" },
  { id: 9, code: "TD-CN12", category: "Phụ kiện", name: "Đầu nối nhanh 1/2\"", zh: "1/2吋快速接頭", spec: "Nhựa ABS chịu lực", pack: "100 cái / thùng", base: 24000, tone: "#e3e7eb" },
  { id: 10, code: "TD-VG12", category: "Phụ kiện", name: "Van góc đồng 1/2\"", zh: "1/2吋銅三角凡而", spec: "Đồng mạ chrome", pack: "60 cái / thùng", base: 86000, tone: "#e9e0d4" },
];

const fmt = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + " ₫";
const Icon = ({ name }: { name: string }) => <span className="icon" aria-hidden>{name}</span>;

export default function Home() {
  const [user, setUser] = useState<Customer | null>(null);
  const [username, setUsername] = useState("minhphat");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [lang, setLang] = useState<"vi" | "zh">("vi");
  const [view, setView] = useState("home");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [toast, setToast] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [admin, setAdmin] = useState(false);

  const price = (p: Product) => Math.round((p.base * (user ? multipliers[user.tier] : 1)) / 1000) * 1000;
  const cartItems = products.filter(p => cart[p.id]).map(p => ({ ...p, qty: cart[p.id], price: price(p) }));
  const total = cartItems.reduce((s, p) => s + p.qty * p.price, 0);
  const filtered = products.filter(p => (category === "Tất cả" || p.category === category) && `${p.name} ${p.zh} ${p.code}`.toLowerCase().includes(search.toLowerCase()));
  const categories = ["Tất cả", ...Array.from(new Set(products.map(p => p.category)))];
  const t = (vi: string, zh: string) => lang === "vi" ? vi : zh;

  function login(e: React.FormEvent) {
    e.preventDefault();
    const found = customers.find(c => c.username === username && c.password === password);
    if (!found) return setError("Tên đăng nhập hoặc mật khẩu chưa đúng");
    setUser(found); setError("");
  }
  function add(id: number, qty = 1) {
    setCart(c => ({ ...c, [id]: (c[id] || 0) + qty }));
    setToast(t("Đã thêm vào đơn hàng", "已加入訂單")); setTimeout(() => setToast(""), 1600);
  }
  function submitOrder() {
    setCart({}); setView("account"); setToast(t("Đã gửi đơn · Chờ Tân Đông xác nhận", "訂單已送出・等待新東確認")); setTimeout(() => setToast(""), 3000);
  }

  if (!user) return <main className="loginPage">
    <section className="loginBrand">
      <div className="brandMark">TĐ</div>
      <p className="eyebrow">CỔNG ĐẶT HÀNG DÀNH CHO ĐẠI LÝ</p>
      <h1>Đặt hàng Tân Đông<br/><em>nhanh hơn mỗi ngày.</em></h1>
      <p>Giá riêng cho từng đại lý · Đặt lại trong vài chạm · Hướng dẫn luôn sẵn sàng</p>
      <div className="trustRow"><span>✓ Giá riêng bảo mật</span><span>✓ Xác nhận bởi nhân viên</span><span>✓ Hỗ trợ Zalo</span></div>
    </section>
    <section className="loginPanel">
      <button className="langBtn" onClick={() => setLang(lang === "vi" ? "zh" : "vi")}>{lang === "vi" ? "中文" : "VI"}</button>
      <form className="loginCard" onSubmit={login}>
        <div className="miniLogo"><b>TÂN ĐÔNG</b><small>PRO</small></div>
        <h2>{t("Chào mừng trở lại", "歡迎回來")}</h2>
        <p>{t("Đăng nhập để xem giá dành riêng cho bạn", "登入查看您的專屬價格")}</p>
        <label>{t("Tên đăng nhập", "使用者名稱")}<input value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" /></label>
        <label>{t("Mật khẩu", "密碼")}<input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" /></label>
        {error && <div className="error">{error}</div>}
        <button className="primary" type="submit">{t("Đăng nhập", "登入")} <span>→</span></button>
        <div className="demoBox"><b>{t("Tài khoản dùng thử", "示範帳號")}</b><button type="button" onClick={() => setUsername("minhphat")}>minhphat</button><button type="button" onClick={() => setUsername("anphu")}>anphu</button><button type="button" onClick={() => setUsername("hoangnam")}>hoangnam</button><small>{t("Mật khẩu chung: 123456", "共用密碼：123456")}</small></div>
      </form>
    </section>
  </main>;

  const ProductCard = ({ p }: { p: Product }) => <article className="productCard" onClick={() => setSelected(p)}>
    <div className="productVisual" style={{ background: p.tone }}><span className="pipe">◯━━━◯</span><small>{p.code}</small></div>
    <div className="productInfo"><span className="tag">{p.category}</span><h3>{lang === "vi" ? p.name : p.zh}</h3><p>{p.spec}</p><div className="priceRow"><b>{fmt(price(p))}</b><button onClick={e => { e.stopPropagation(); add(p.id); }} aria-label="Thêm sản phẩm">＋</button></div></div>
  </article>;

  return <main className="appShell">
    <header className="topbar"><button className="logo" onClick={() => setView("home")}><span>TĐ</span><b>TÂN ĐÔNG<small>PRO</small></b></button><div className="desktopSearch"><Icon name="⌕"/><input placeholder={t("Tìm mã hoặc tên sản phẩm...", "搜尋產品名稱或編號…")} value={search} onChange={e => {setSearch(e.target.value);setView("products")}}/></div><div className="topActions"><button onClick={() => setLang(lang === "vi" ? "zh" : "vi")}>{lang === "vi" ? "中文" : "VI"}</button><button onClick={() => setAdmin(!admin)}>⚙ <span>{t("Quản trị", "管理後台")}</span></button><button className="avatar" onClick={() => setView("account")}>MP</button></div></header>

    {admin ? <Admin onClose={() => setAdmin(false)} t={t}/> : <>
      {view === "home" && <div className="page homePage">
        <section className="welcome"><div><p>{t("Xin chào,", "您好，")}</p><h1>{user.name}</h1><span>{t("Giá đại lý của bạn đã được áp dụng", "已套用您的經銷商專屬價格")} · <b>{user.tier.toUpperCase()}</b></span></div><button onClick={() => setView("cart")}>{t("Đơn đang soạn", "目前訂單")} <strong>{Object.keys(cart).length}</strong><small>{fmt(total)}</small></button></section>
        <section className="quickGrid"><button className="quick orange" onClick={() => setView("products")}><Icon name="＋"/><span><b>{t("Đặt hàng nhanh", "快速訂貨")}</b><small>{t("Chọn sản phẩm và số lượng", "選擇產品與數量")}</small></span><i>→</i></button><button className="quick" onClick={() => setView("products")}><Icon name="⌕"/><span><b>{t("Tìm sản phẩm", "找產品")}</b><small>{t("Theo tên, mã hoặc danh mục", "依名稱、編號或分類")}</small></span><i>→</i></button><button className="quick" onClick={() => {add(1,10);add(4,5)}}><Icon name="↻"/><span><b>{t("Mua lại", "再次購買")}</b><small>{t("Từ đơn hàng gần nhất", "從最近訂單加入")}</small></span><i>→</i></button><button className="quick" onClick={() => setView("videos")}><Icon name="▶"/><span><b>{t("Video lắp đặt", "安裝影片")}</b><small>{t("Xem đúng cách, làm nhanh hơn", "正確安裝，更快完成")}</small></span><i>→</i></button></section>
        <section className="section"><div className="sectionHead"><div><p className="eyebrow">{t("ĐẶT LẠI NHANH", "快速再訂")}</p><h2>{t("Sản phẩm bạn thường mua", "您常購買的產品")}</h2></div><button onClick={() => setView("products")}>{t("Xem tất cả", "查看全部")} →</button></div><div className="products">{products.slice(0,4).map(p => <ProductCard key={p.id} p={p}/>)}</div></section>
        <section className="videoStrip"><div className="videoThumb"><span>▶</span><small>02:18</small></div><div><p className="eyebrow">{t("VIDEO MỚI", "最新影片")}</p><h2>{t("Lắp phao cơ Tân Đông đúng cách", "新東水塔浮球正確安裝方式")}</h2><p>{t("3 bước đơn giản giúp van kín, bền và vận hành ổn định.", "三個簡單步驟，確保閥門密合、耐用且穩定運作。")}</p><button onClick={() => setView("videos")}>▶ {t("Xem hướng dẫn", "觀看教學")}</button></div></section>
      </div>}

      {view === "products" && <div className="page"><div className="pageTitle"><p className="eyebrow">CATALOGUE 2026</p><h1>{t("Tất cả sản phẩm", "全部產品")}</h1><p>{t("Giá hiển thị là giá riêng của tài khoản bạn.", "顯示價格為此帳號的專屬價格。")}</p></div><div className="mobileSearch"><input placeholder={t("Tìm sản phẩm...", "搜尋產品…")} value={search} onChange={e => setSearch(e.target.value)}/></div><div className="chips">{categories.map(c => <button className={category === c ? "active" : ""} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div><div className="products productsAll">{filtered.map(p => <ProductCard key={p.id} p={p}/>)}</div></div>}

      {view === "cart" && <div className="page narrow"><div className="pageTitle"><p className="eyebrow">{t("ĐƠN HÀNG MỚI", "新訂單")}</p><h1>{t("Kiểm tra đơn hàng", "確認訂單")}</h1></div>{cartItems.length ? <><div className="cartList">{cartItems.map(p => <div className="cartItem" key={p.id}><div className="miniVisual">◯━◯</div><div><b>{lang === "vi" ? p.name : p.zh}</b><small>{p.code} · {fmt(p.price)}</small></div><div className="stepper"><button onClick={() => setCart(c => ({...c,[p.id]: Math.max(0,p.qty-1)}))}>−</button><span>{p.qty}</span><button onClick={() => add(p.id)}>＋</button></div><strong>{fmt(p.qty*p.price)}</strong></div>)}</div><div className="summary"><div><span>{t("Tạm tính", "小計")}</span><b>{fmt(total)}</b></div><div><span>{t("Giao đến", "送貨地址")}</span><p>{user.address}</p></div><button className="primary" onClick={submitOrder}>{t("Gửi đơn cho Tân Đông xác nhận", "送出訂單，等待新東確認")} →</button><small>ⓘ {t("Đây chưa phải đơn xác nhận. Nhân viên Tân Đông sẽ liên hệ lại.", "此時尚未正式確認，新東人員將與您聯絡。")}</small></div></> : <div className="empty"><span>▤</span><h2>{t("Đơn hàng đang trống", "訂單目前是空的")}</h2><button className="primary" onClick={() => setView("products")}>{t("Chọn sản phẩm", "選擇產品")}</button></div>}</div>}

      {view === "videos" && <div className="page"><div className="pageTitle"><p className="eyebrow">TÂN ĐÔNG ACADEMY</p><h1>{t("Video hướng dẫn", "影片教學")}</h1><p>{t("Lắp đúng, dùng bền, tư vấn khách hàng tự tin hơn.", "正確安裝、耐久使用，讓您更有信心服務客戶。")}</p></div><div className="videoGrid">{[["Lắp phao cơ đúng cách","安裝水塔浮球","03:12"],["Kiểm tra dây cấp inox 304","304編織管品質測試","01:48"],["Thay dây sen chống xoắn","更換防纏繞花灑管","02:26"],["Cách chọn đầu nối phù hợp","如何選擇正確接頭","04:05"]].map((v,i)=><article key={v[0]}><div className={`vthumb v${i}`}><span>▶</span><small>{v[2]}</small></div><p>{t("HƯỚNG DẪN", "教學影片")}</p><h3>{lang === "vi" ? v[0] : v[1]}</h3><button>▶ {t("Xem video", "觀看影片")}</button></article>)}</div></div>}

      {view === "account" && <div className="page account"><div className="accountHero"><div className="bigAvatar">MP</div><div><p>{t("TÀI KHOẢN ĐẠI LÝ", "經銷商帳戶")}</p><h1>{user.name}</h1><span>{user.username} · {user.tier.toUpperCase()}</span></div><button onClick={() => setUser(null)}>{t("Đăng xuất", "登出")}</button></div><div className="accountGrid"><section><h2>{t("Đơn hàng gần đây", "最近訂單")}</h2>{[["#TD-260811-08","11/08/2026","Chờ Tân Đông xác nhận","4.860.000 ₫"],["#TD-260728-21","28/07/2026","Đã giao","8.240.000 ₫"],["#TD-260710-14","10/07/2026","Đã giao","3.915.000 ₫"]].map((o,i)=><div className="order" key={o[0]}><div><b>{o[0]}</b><small>{o[1]}</small></div><span className={i===0?"pending":"done"}>{i===0?t(o[2],"等待新東確認"):t(o[2],"已送達")}</span><strong>{o[3]}</strong><button onClick={() => {add(1,10);setView("cart")}}>↻ {t("Đặt lại", "再次訂購")}</button></div>)}</section><aside><h2>{t("Địa chỉ giao hàng", "送貨地址")}</h2><p>⌖ {user.address}</p><button>{t("Chỉnh sửa địa chỉ", "修改地址")}</button><hr/><h2>{t("Hỗ trợ nhanh", "快速支援")}</h2><p>☎ 028 3765 8899</p><p>Zalo: Tân Đông CSKH</p></aside></div></div>}
    </>}

    <nav className="bottomNav">{[["⌂","home","Trang chủ","首頁"],["▦","products","Sản phẩm","產品"],["＋","cart","Đặt hàng","訂貨"],["▶","videos","Video","影片"],["●","account","Của tôi","我的"]].map(n=><button key={n[1]} className={view===n[1]?"active":""} onClick={() => setView(n[1])}><span>{n[0]}{n[1]==="cart"&&Object.keys(cart).length>0?<i>{Object.keys(cart).length}</i>:null}</span><small>{t(n[2],n[3])}</small></button>)}</nav>
    {selected && <div className="modalBackdrop" onClick={() => setSelected(null)}><section className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={() => setSelected(null)}>×</button><div className="detailVisual" style={{background:selected.tone}}>◯━━━━◯</div><p className="eyebrow">{selected.code}</p><h2>{lang === "vi" ? selected.name : selected.zh}</h2><p>{selected.spec}</p><dl><div><dt>{t("Quy cách đóng gói", "包裝數量")}</dt><dd>{selected.pack}</dd></div><div><dt>{t("Giá riêng của bạn", "您的專屬價格")}</dt><dd>{fmt(price(selected))}</dd></div></dl><button className="videoLink">▶ {t("Xem video lắp đặt liên quan", "觀看相關安裝影片")}</button><button className="primary" onClick={()=>{add(selected.id);setSelected(null)}}>{t("Thêm vào đơn hàng", "加入訂單")} ＋</button></section></div>}
    {toast && <div className="toast">✓ {toast}</div>}
  </main>;
}

function Admin({onClose,t}:{onClose:()=>void;t:(a:string,b:string)=>string}) {
  const [tab,setTab]=useState("orders");
  const items = useMemo(()=>({orders:8,customers:3,products:10,videos:4,prices:30}),[]);
  return <div className="admin"><aside><div className="logo"><span>TĐ</span><b>TÂN ĐÔNG<small>ADMIN</small></b></div><p>QUẢN LÝ HỆ THỐNG</p>{[["▤","orders","Đơn hàng"],["●","customers","Khách hàng"],["▦","products","Sản phẩm"],["▶","videos","Video"],["₫","prices","Giá riêng"]].map(x=><button className={tab===x[1]?"active":""} onClick={()=>setTab(x[1])} key={x[1]}><i>{x[0]}</i>{x[2]}<small>{items[x[1] as keyof typeof items]}</small></button>)}<button className="back" onClick={onClose}>← {t("Về trang đại lý","返回經銷商頁")}</button></aside><section className="adminMain"><div className="adminHead"><div><p>TÂN ĐÔNG PRO</p><h1>{({orders:"Quản lý đơn hàng",customers:"Quản lý khách hàng",products:"Quản lý sản phẩm",videos:"Thư viện video",prices:"Bảng giá riêng"} as Record<string,string>)[tab]}</h1></div><button>＋ Thêm mới</button></div><div className="statGrid"><div><span>Chờ xác nhận</span><b>8</b><small>↑ 3 hôm nay</small></div><div><span>Đang xử lý</span><b>12</b><small>Đúng tiến độ</small></div><div><span>Đã giao tháng này</span><b>146</b><small>↑ 12,4%</small></div><div><span>Doanh số tháng</span><b>842M</b><small>VNĐ · dữ liệu mẫu</small></div></div><div className="adminTable"><div className="tableTools"><b>{tab==="prices"?"Giá theo từng khách hàng":"Danh sách gần đây"}</b><input placeholder="⌕ Tìm kiếm..."/></div><div className="tr header"><span>MÃ / KHÁCH HÀNG</span><span>NGÀY</span><span>TRẠNG THÁI</span><span>TỔNG TIỀN</span><span></span></div>{customers.concat(customers).slice(0,5).map((c,i)=><div className="tr" key={i}><span><b>{i%2?c.name:`#TD-260811-0${8-i}`}</b><small>{c.username} · {c.tier.toUpperCase()}</small></span><span>11/08/2026</span><span><i className="status">Chờ xác nhận</i></span><span><b>{[4860000,7325000,2190000,8920000,3450000][i].toLocaleString("vi-VN")} ₫</b></span><button>•••</button></div>)}</div><div className="adminNote">ⓘ {t("Bản mẫu quản trị — mọi thay đổi chỉ là dữ liệu mô phỏng, chưa kết nối ERP.","管理後台原型——所有變更皆為模擬資料，尚未連接ERP。")}</div></section></div>
}
