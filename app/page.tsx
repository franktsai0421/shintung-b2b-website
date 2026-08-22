"use client";

import { useMemo, useState } from "react";

type Tier = "large" | "medium" | "small";
type UserRole = "dealer" | "admin" | "warehouse" | "delivery";
type PriceStage = { minQty: number; percent: number };
type ProductSpecification = { vi: string; zh: string };
type Customer = {
  username: string;
  password: string;
  name: string;
  tier: Tier;
  address: string;
  bestCategories: string[];
  role?: UserRole;
  companyPhone?: string;
  email?: string;
  contact1?: string;
  contact2?: string;
  contact3?: string;
  note?: string;
};
type Variant = {
  id: string;
  label: string;
  labelZh: string;
  base: number;
  packQty: number;
};
type Product = {
  id: number;
  code: string;
  category: string;
  categoryZh: string;
  categoryEn: string;
  name: string;
  zh: string;
  spec: string;
  pack: string;
  packZh: string;
  packQty: number;
  variants: Variant[];
  image: string;
  specifications: ProductSpecification[];
};
type OrderStatus =
  | "waiting"
  | "confirmed"
  | "preparing"
  | "completed"
  | "delivery_failed"
  | "cancelled";
type OrderLine = {
  productId: number;
  quantity: number;
  unitPrice: number;
  variantId: string;
  discountPercent?: number;
  packQty?: number;
  cartons?: number;
  looseQty?: number;
};
type Order = {
  id: string;
  username: string;
  createdAt: string;
  status: OrderStatus;
  amount: number;
  confirmedAmount?: number;
  deliveryDate?: string;
  adminNote?: string;
  customerNote?: string;
  lines: OrderLine[];
};

const DEMO_PASSWORD = ["123", "456"].join("");

const tierInfo: Record<Tier, { vi: string; zh: string; code: string }> = {
  large: { vi: "Đại lý lớn", zh: "大盤客戶", code: "ĐẠI BÀN" },
  medium: { vi: "Đại lý vừa", zh: "中盤客戶", code: "TRUNG BÀN" },
  small: { vi: "Cửa hàng bán lẻ", zh: "小盤客戶", code: "TIỂU BÀN" },
};
const initialCustomers: Customer[] = [
  {
    username: "minhphat",
    password: DEMO_PASSWORD,
    name: "VLXD Minh Phát",
    tier: "large",
    address: "128 Nguyễn Văn Linh, Q.7, TP.HCM",
    companyPhone: "028 3775 1288",
    email: "muahang@minhphat.vn",
    contact1: "Nguyễn Minh · 0901 234 567",
    contact2: "Trần Phát · 0902 345 678",
    contact3: "Kho Minh Phát · 0903 456 789",
    note: "Giao hàng giờ hành chính, gọi trước 30 phút.",
    bestCategories: [],
  },
  {
    username: "anphu",
    password: DEMO_PASSWORD,
    name: "Điện Nước An Phú",
    tier: "medium",
    address: "42 Lê Văn Việt, TP. Thủ Đức",
    companyPhone: "028 3896 2242",
    email: "anphu@example.vn",
    contact1: "Anh Phú · 0918 220 220",
    bestCategories: ["FLEXIBLE HOSE", "WATER LEVEL CONTROL"],
  },
  {
    username: "hoangnam",
    password: DEMO_PASSWORD,
    name: "Cửa hàng Hoàng Nam",
    tier: "small",
    address: "19 QL1A, Bình Tân, TP.HCM",
    companyPhone: "028 3756 9019",
    email: "hoangnam@example.vn",
    contact1: "Chị Nam · 0908 119 119",
    bestCategories: [],
  },
  {
    username: "manager1",
    password: DEMO_PASSWORD,
    name: "Tân Đông Admin",
    tier: "small",
    address: "Tân Đông",
    bestCategories: [],
    role: "admin",
  },
  {
    username: "warehouse1",
    password: "123455",
    name: "Nhân viên kho 1",
    tier: "small",
    address: "Kho Tân Đông",
    bestCategories: [],
    role: "warehouse",
  },
  {
    username: "deliver1",
    password: "123456",
    name: "Nhân viên giao hàng 1",
    tier: "small",
    address: "Tân Đông",
    bestCategories: [],
    role: "delivery",
  },
];
const initialOrders: Order[] = [
  {
    id: "#TD-260812-08",
    username: "minhphat",
    createdAt: "12/08/2026 10:45",
    status: "confirmed",
    amount: 4860000,
    confirmedAmount: 4820000,
    deliveryDate: "18/08/2026",
    adminNote: "Đã giữ hàng, giao buổi sáng.",
    lines: [
      { productId: 1, quantity: 100, unitPrice: 25600, variantId: "102XI05-0" },
      { productId: 101, quantity: 20, unitPrice: 94400, variantId: "103S283201-0" },
    ],
  },
  {
    id: "#TD-260805-03",
    username: "minhphat",
    createdAt: "05/08/2026 09:20",
    status: "completed",
    amount: 7325000,
    confirmedAmount: 7325000,
    deliveryDate: "09/08/2026",
    lines: [{ productId: 2, quantity: 150, unitPrice: 27600, variantId: "102XI05-0" }],
  },
  {
    id: "#TD-260811-06",
    username: "anphu",
    createdAt: "11/08/2026 14:10",
    status: "waiting",
    amount: 2190000,
    lines: [{ productId: 3, quantity: 50, unitPrice: 37000, variantId: "102XD01-0" }],
  },
  {
    id: "#TD-260809-04",
    username: "hoangnam",
    createdAt: "09/08/2026 16:30",
    status: "preparing",
    amount: 3450000,
    confirmedAmount: 3450000,
    deliveryDate: "16/08/2026",
    adminNote: "Đang đóng gói.",
    lines: [{ productId: 201, quantity: 40, unitPrice: 86000, variantId: "104A39202-0" }],
  },
];
const catalogueGroups: {
  en: string;
  vi: string;
  zh: string;
  packQty: number;
  items: [string, string][];
}[] = [
  {
    en: "FLEXIBLE HOSE",
    vi: "Dây cấp nước",
    zh: "給水軟管",
    packQty: 100,
    items: [
      [
        "102XI05",
        "https://www.shintung-onspa.com/upload/2018/10/18/1539847068.jpg",
      ],
      [
        "102XI05",
        "https://www.shintung-onspa.com/upload/2018/10/18/1539846019.jpg",
      ],
      [
        "102XD01",
        "https://www.shintung-onspa.com/upload/2016/12/09/1481272647.jpg",
      ],
      [
        "102XS01",
        "https://www.shintung-onspa.com/cache/fillw_737h_737/2cc328c791c56edaff2f700cd02b90cd1501661507.jpg.png",
      ],
      [
        "102XL01",
        "https://www.shintung-onspa.com/upload/2016/12/09/1481261489.jpg",
      ],
      [
        "102XS03",
        "https://www.shintung-onspa.com/upload/2016/12/09/1481264540.jpg",
      ],
      [
        "102XI02",
        "https://www.shintung-onspa.com/upload/2016/12/09/1481262576.jpg",
      ],
      [
        "102XI01",
        "https://www.shintung-onspa.com/cache/fillw_737h_737/952984cf71ccf086b44e5d391cfb0f901477662560.jpg.png",
      ],
      [
        "102IC01",
        "https://www.shintung-onspa.com/upload/2016/12/09/1481266326.jpg",
      ],
      [
        "102XT04",
        "https://www.shintung-onspa.com/cache/fillw_737h_737/c5bf50b6c9cf09a15a56a939d6596ade1735978152.png.png",
      ],
      [
        "102XT01",
        "https://www.shintung-onspa.com/upload/2016/12/08/1481173708.jpg",
      ],
      [
        "102MG01",
        "https://www.shintung-onspa.com/upload/2016/12/09/1481269694.jpg",
      ],
      [
        "102DG01",
        "https://www.shintung-onspa.com/upload/2016/12/09/1481260035.jpg",
      ],
    ],
  },
  {
    en: "SHOWER",
    vi: "Vòi sen",
    zh: "花灑",
    packQty: 50,
    items: [
      [
        "103S283201",
        "https://www.shintung-onspa.com/upload/2024/09/07/1725681592.jpg",
      ],
      [
        "103S183204",
        "https://www.shintung-onspa.com/upload/2024/09/06/1725612951.jpg",
      ],
      [
        "103S282201",
        "https://www.shintung-onspa.com/upload/2024/09/06/1725614008.jpg",
      ],
      [
        "103S182204",
        "https://www.shintung-onspa.com/upload/2024/09/06/1725610345.jpg",
      ],
      [
        "103SM32101",
        "https://www.shintung-onspa.com/upload/2024/09/06/1725605053.jpg",
      ],
      [
        "103SM31101",
        "https://www.shintung-onspa.com/upload/2024/09/06/1725596430.jpg",
      ],
      [
        "103S194121",
        "https://www.shintung-onspa.com/upload/2024/09/06/1725594057.jpg",
      ],
      [
        "103S194111",
        "https://www.shintung-onspa.com/upload/2024/09/06/1725592968.jpg",
      ],
      [
        "103S194101",
        "https://www.shintung-onspa.com/upload/2024/09/06/1725590166.jpg",
      ],
      [
        "103S193101",
        "https://www.shintung-onspa.com/upload/2025/05/09/1746782118.jpg",
      ],
      [
        "103SM00013",
        "https://www.shintung-onspa.com/upload/2022/09/19/1663571546.jpg",
      ],
      [
        "103SM00011",
        "https://www.shintung-onspa.com/upload/2020/11/02/1604302308.jpg",
      ],
      [
        "103SM00012",
        "https://www.shintung-onspa.com/upload/2020/11/02/1604300335.jpg",
      ],
      [
        "103SM00004",
        "https://www.shintung-onspa.com/upload/2017/09/07/1504758595.jpg",
      ],
      [
        "103SM00001",
        "https://www.shintung-onspa.com/upload/2016/12/14/1481698159.jpg",
      ],
      [
        "103SM00002",
        "https://www.shintung-onspa.com/upload/2016/12/14/1481698107.jpg",
      ],
      [
        "103SM00003",
        "https://www.shintung-onspa.com/upload/2016/12/14/1481698042.jpg",
      ],
      [
        "103S101",
        "https://www.shintung-onspa.com/upload/2016/12/14/1481698614.jpg",
      ],
      [
        "103S103",
        "https://www.shintung-onspa.com/upload/2016/12/14/1481698539.jpg",
      ],
      [
        "103S110",
        "https://www.shintung-onspa.com/upload/2016/12/14/1481698426.jpg",
      ],
      [
        "103S111",
        "https://www.shintung-onspa.com/upload/2016/12/14/1481698363.jpg",
      ],
      [
        "103S112",
        "https://www.shintung-onspa.com/upload/2016/12/14/1481698280.jpg",
      ],
      [
        "103S205",
        "https://www.shintung-onspa.com/cache/fillw_737h_737/ce6b7038aedb78a230d64358560710ec1504760822.jpg.png",
      ],
      [
        "103S204",
        "https://www.shintung-onspa.com/cache/fillw_737h_737/c2f3cd57c61df38095befca5908dcf001504760777.jpg.png",
      ],
      [
        "103S2082",
        "https://www.shintung-onspa.com/upload/2017/09/07/1504758960.jpg",
      ],
      [
        "103S24B",
        "https://www.shintung-onspa.com/upload/2017/09/07/1504758979.jpg",
      ],
      [
        "103S206",
        "https://www.shintung-onspa.com/upload/2017/09/07/1504759022.jpg",
      ],
      [
        "103S209",
        "https://www.shintung-onspa.com/upload/2017/09/07/1504759043.jpg",
      ],
      [
        "103S292",
        "https://www.shintung-onspa.com/upload/2017/09/07/1504759138.jpg",
      ],
      [
        "103S209204",
        "https://www.shintung-onspa.com/upload/2017/09/07/1504760212.jpg",
      ],
      [
        "103S209205",
        "https://www.shintung-onspa.com/upload/2017/09/07/1504759914.jpg",
      ],
      [
        "103PMSX01",
        "https://www.shintung-onspa.com/upload/2016/12/14/1481699580.jpg",
      ],
      [
        "103PMSX03",
        "https://www.shintung-onspa.com/upload/2016/12/14/1481699542.jpg",
      ],
      [
        "102TC01",
        "https://www.shintung-onspa.com/upload/2017/09/07/1504761839.jpg",
      ],
      [
        "102TC04",
        "https://www.shintung-onspa.com/upload/2017/09/07/1504761857.jpg",
      ],
      [
        "102TC03",
        "https://www.shintung-onspa.com/upload/2017/09/07/1504761868.jpg",
      ],
    ],
  },
  {
    en: "SHATTAF",
    vi: "Vòi xịt vệ sinh",
    zh: "沖洗器",
    packQty: 40,
    items: [
      [
        "104A39202",
        "https://www.shintung-onspa.com/upload/2020/10/13/1602582716.jpg",
      ],
      [
        "104A39201",
        "https://www.shintung-onspa.com/upload/2020/10/13/1602573182.jpg",
      ],
      [
        "104A141",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864903.jpg",
      ],
      [
        "104A4X2",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481865214.jpg",
      ],
      [
        "104A4G2",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481865357.jpg",
      ],
      [
        "104A4G1",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481865523.jpg",
      ],
      [
        "104A4X1",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481865606.jpg",
      ],
      [
        "104A3801",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864770.jpg",
      ],
      [
        "104A33201",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864331.jpg",
      ],
      [
        "104A32201",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864522.jpg",
      ],
      [
        "104A4F1",
        "https://www.shintung-onspa.com/cache/fillw_737h_737/d219eb99714a2caf95ec59fc84939eb31489650246.jpg.png",
      ],
      [
        "104A4F2",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481865286.jpg",
      ],
      [
        "104A31201",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864710.jpg",
      ],
      [
        "104A37201",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481863941.jpg",
      ],
      [
        "104A30201",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864833.jpg",
      ],
      [
        "104A222",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864871.jpg",
      ],
      [
        "104A131",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481865080.jpg",
      ],
      [
        "104A132",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481865014.jpg",
      ],
      [
        "104A34201",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481863765.jpg",
      ],
      [
        "104A35201",
        "https://www.shintung-onspa.com/cache/fillw_737h_737/4c5c6db2d77467367df9a61ab8d72d151489645898.jpg.png",
      ],
      [
        "104A101",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481865479.jpg",
      ],
      [
        "104A102",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481865115.jpg",
      ],
      [
        "104A36201",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864080.jpg",
      ],
      [
        "104PTEX05",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864177.jpg",
      ],
      [
        "104PTEX03",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864214.jpg",
      ],
      [
        "104PTEX02-XI",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864267.jpg",
      ],
      [
        "104PTEX01",
        "https://www.shintung-onspa.com/upload/2016/12/16/1481864292.jpg",
      ],
    ],
  },
  {
    en: "WATER LEVEL CONTROL",
    vi: "Van phao bồn nước",
    zh: "水位控制器",
    packQty: 20,
    items: [
      [
        "101CTP015",
        "https://www.shintung-onspa.com/upload/2017/01/22/1485074840.jpg",
      ],
      [
        "101CTP010",
        "https://www.shintung-onspa.com/cache/fillw_737h_737/52dd40d7128958429069aebaf513af5f1489553320.jpg.png",
      ],
    ],
  },
];
const variantLabels = (groupIndex: number): [string, string][] =>
  groupIndex === 0
    ? [
        ["20 cm", "20公分"],
        ["30 cm", "30公分"],
        ["40 cm", "40公分"],
        ["50 cm", "50公分"],
      ]
    : groupIndex === 1
      ? [
          ["100 cm", "100公分"],
          ["120 cm", "120公分"],
          ["150 cm", "150公分"],
          ["180 cm", "180公分"],
        ]
      : groupIndex === 2
        ? [
            ["Bộ tiêu chuẩn", "標準組"],
            ["Dây 100 cm", "100公分管組"],
            ["Dây 120 cm", "120公分管組"],
            ["Dây 150 cm", "150公分管組"],
          ]
        : [
            ["DN15", "DN15"],
            ["DN20", "DN20"],
            ["DN25", "DN25"],
            ["DN32", "DN32"],
          ];
const initialProducts: Product[] = catalogueGroups.flatMap(
  (group, groupIndex) =>
    group.items.map(([code, image], itemIndex) => {
      const start =
        [32000, 118000, 86000, 185000][groupIndex] + itemIndex * 2500;
      const defaultPack = [100, 50, 40, 20][groupIndex];
      return {
        id: groupIndex * 100 + itemIndex + 1,
        code,
        category: group.vi,
        categoryZh: group.zh,
        categoryEn: group.en,
        name: `${group.vi} ${code}`,
        zh: `${group.zh} ${code}`,
        spec: "Dữ liệu quy cách mẫu · Chờ ERP xác nhận",
        pack: `${group.packQty} pcs / thùng`,
        packZh: `${group.packQty}件／箱`,
        packQty: group.packQty,
        variants: variantLabels(groupIndex).map(([label, labelZh], i) => {
          const packQty = Math.max(
            10,
            defaultPack - i * [10, 5, 4, 2][groupIndex],
          );
          return {
            id: `${code}-${i}`,
            label,
            labelZh,
            base: start + i * [4000, 9000, 7000, 18000][groupIndex],
            packQty,
          };
        }),
        image,
        specifications: [
          {
            vi: `Vật liệu: ${groupIndex < 2 ? "Inox 304 và lõi EPDM" : "Đồng mạ chrome"}`,
            zh: `材質：${groupIndex < 2 ? "304不鏽鋼與EPDM內管" : "鍍鉻銅"}`,
          },
          {
            vi: `Kết nối: ${groupIndex === 3 ? "Ren tiêu chuẩn DN" : "Đầu nối tiêu chuẩn G1/2"}`,
            zh: `接口：${groupIndex === 3 ? "標準DN牙規" : "標準G1/2接口"}`,
          },
          {
            vi: "Ứng dụng: Hệ thống cấp nước dân dụng",
            zh: "用途：一般民用給水系統",
          },
        ],
      };
    }),
);
const initialCategoryStages: Record<string, PriceStage[]> = Object.fromEntries(
  catalogueGroups.map((group) => [
    group.en,
    [
      { minQty: 1, percent: 100 },
      { minQty: 100, percent: 95 },
      { minQty: 200, percent: 90 },
      { minQty: 500, percent: 82 },
    ],
  ]),
);
const fmt = (n: number) =>
  new Intl.NumberFormat("vi-VN").format(Math.round(n / 100) * 100) + " ₫";

export default function Home() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [productList, setProductList] = useState(initialProducts);
  const [categoryStages, setCategoryStages] = useState(initialCategoryStages);
  const [orders, setOrders] = useState(initialOrders);
  const [user, setUser] = useState<Customer | null>(null);
  const [username, setUsername] = useState("minhphat");
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [lang, setLang] = useState<"vi" | "zh">("vi");
  const [view, setView] = useState("home");
  const [admin, setAdmin] = useState(false);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [qty, setQty] = useState<Record<number, number>>({});
  const [variantByProduct, setVariantByProduct] = useState<
    Record<number, string>
  >({});
  const [cart, setCart] = useState<Record<number, number>>({});
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const t = (vi: string, zh: string) => (lang === "vi" ? vi : zh);
  const variant = (p: Product) =>
    p.variants.find((v) => v.id === variantByProduct[p.id]) || p.variants[0];
  const packQtyFor = (p: Product) => variant(p).packQty;
  const hasBestPrice = (p: Product, customer: Customer | null = user) =>
    !!customer &&
    (customer.tier === "large" ||
      customer.bestCategories.includes(p.categoryEn));
  const stageFor = (
    p: Product,
    n: number,
    customer: Customer | null = user,
  ) => {
    const stages = [...categoryStages[p.categoryEn]].sort((a, b) => a.minQty - b.minQty);
    if (hasBestPrice(p, customer)) return stages[stages.length - 1];
    return stages.filter((s) => n >= s.minQty).at(-1) || stages[0];
  };
  const percent = (p: Product, n: number) => stageFor(p, n).percent;
  const price = (p: Product, n: number) =>
    (variant(p).base * percent(p, n)) / 100;
  const cartCategoryQty = (categoryEn: string) =>
    productList.reduce(
      (sum, product) =>
        product.categoryEn === categoryEn ? sum + (cart[product.id] || 0) : sum,
      0,
    );
  const projectedCategoryQty = (p: Product, n: number) =>
    cartCategoryQty(p.categoryEn) + n;
  const categories = useMemo(
    () => catalogueGroups.map((g) => [g.vi, g.zh] as [string, string]),
    [],
  );
  const filtered = productList.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      `${p.code} ${p.name} ${p.zh}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const cartItems = productList
    .filter((p) => cart[p.id])
    .map((p) => ({ ...p, quantity: cart[p.id] }));
  const total = cartItems.reduce(
    (s, p) => s + price(p, cartCategoryQty(p.categoryEn)) * p.quantity,
    0,
  );
  const userOrders = user
    ? orders.filter((o) => o.username === user.username)
    : [];
  const orderStatus = (status: OrderStatus) =>
    ({
      waiting: t("Chờ xác nhận", "等待確認"),
      confirmed: t("Đã xác nhận", "已確認"),
      preparing: t("Chuẩn bị & phân phối", "備貨與配貨"),
      completed: t("Đã giao", "已交貨"),
      delivery_failed: t("Giao thất bại", "交貨失敗"),
      cancelled: t("Đã hủy", "已取消"),
    })[status];
  const loadOrderToCart = (order: Order, edit = false) => {
    setCart(
      Object.fromEntries(order.lines.map((line) => [line.productId, line.quantity])),
    );
    order.lines.forEach((line) =>
      setVariantByProduct((v) => ({ ...v, [line.productId]: line.variantId })),
    );
    setEditingOrderId(edit ? order.id : null);
    setView("cart");
  };
  const changeQty = (id: number, n: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(1, Math.floor(n || 1)) }));
  const add = (id: number, n?: number) => {
    const amount = n || qty[id] || 1;
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + amount }));
    setToast(t("Đã thêm vào đơn hàng", "已加入訂單"));
    setTimeout(() => setToast(""), 1500);
  };
  const quickEnter = (targetUsername: string, openAdmin = false) => {
    const account = customers.find((customer) => customer.username === targetUsername);
    if (!account) return;
    setUsername(account.username);
    setPassword(account.password);
    setUser(account);
    setView("home");
    setShowRoleSwitcher(false);
    setAdmin(
      openAdmin ||
        account.role === "admin" ||
        account.role === "warehouse" ||
        account.role === "delivery",
    );
  };

  if (!user)
    return (
      <main className="loginPage">
        <section className="loginBrand">
          <div className="brandMark">TĐ</div>
          <p className="eyebrow">CỔNG ĐẶT HÀNG DÀNH CHO ĐẠI LÝ</p>
          <h1>
            Đặt hàng Tân Đông
            <br />
            <em>nhanh hơn mỗi ngày.</em>
          </h1>
          <p>
            Giá theo cấp đại lý · Chiết khấu theo số lượng · Xác nhận bởi Tân
            Đông
          </p>
          <div className="trustRow">
            <span>✓ Giá riêng bảo mật</span>
            <span>✓ Chiết khấu rõ ràng</span>
            <span>✓ Hỗ trợ Zalo</span>
          </div>
        </section>
        <section className="loginPanel">
          <button
            className="langBtn"
            onClick={() => setLang(lang === "vi" ? "zh" : "vi")}
          >
            {lang === "vi" ? "中文" : "VI"}
          </button>
          <form
            className="loginCard"
            onSubmit={(e) => {
              e.preventDefault();
              const c = customers.find(
                (x) => x.username === username && x.password === password,
              );
              if (c) {
                setUser(c);
                setAdmin(
                  c.role === "admin" ||
                    c.role === "warehouse" ||
                    c.role === "delivery",
                );
              }
            }}
          >
            <div className="miniLogo">
              <b>TÂN ĐÔNG</b>
              <small>PRO</small>
            </div>
            <section className="roleQuickAccess">
              <b>{t("Truy cập nhanh theo vai trò", "依身分快速進入")}</b>
              <div>
                <button type="button" onClick={() => quickEnter("minhphat")}><span>◆</span><strong>{t("Đại lý lớn", "大盤")}</strong></button>
                <button type="button" onClick={() => quickEnter("anphu")}><span>◇</span><strong>{t("Đại lý vừa", "中盤")}</strong></button>
                <button type="button" onClick={() => quickEnter("hoangnam")}><span>○</span><strong>{t("Cửa hàng", "小盤")}</strong></button>
                <button type="button" onClick={() => quickEnter("manager1")}><span>⚙</span><strong>{t("Quản trị", "管理者")}</strong></button>
                <button type="button" onClick={() => quickEnter("warehouse1")}><span>▦</span><strong>{t("Kho hàng", "倉庫")}</strong></button>
                <button type="button" onClick={() => quickEnter("deliver1")}><span>➜</span><strong>{t("Giao hàng", "交貨人員")}</strong></button>
              </div>
              <small>{t("Một chạm để vào giao diện mẫu", "點一下直接進入示範介面")}</small>
            </section>
            <h2>{t("Chào mừng trở lại", "歡迎回來")}</h2>
            <p>
              {t(
                "Đăng nhập để xem giá và chiết khấu dành riêng",
                "登入查看您的專屬價格與數量折扣",
              )}
            </p>
            <label>
              {t("Tên đăng nhập", "使用者名稱")}
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              {t("Mật khẩu", "密碼")}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="primary">
              {t("Đăng nhập", "登入")} <span>→</span>
            </button>
            <div className="demoBox">
              <b>{t("Tài khoản dùng thử", "示範帳號")}</b>
              {customers.map((c) => (
                <button
                  type="button"
                  key={c.username}
                  onClick={() => {
                    setUsername(c.username);
                    setPassword(c.password);
                  }}
                >
                  {c.username}
                </button>
              ))}
              <small>
                {t(
                  "Mật khẩu demo đã được cấu hình · Ba cấp giá",
                  "示範密碼已設定・三種客戶等級",
                )}
              </small>
            </div>
          </form>
        </section>
      </main>
    );

  const tierLabel = t(tierInfo[user.tier].vi, tierInfo[user.tier].zh);
  const Card = ({ p }: { p: Product }) => {
    const n = qty[p.id] || 1;
    const categoryQty = projectedCategoryQty(p, n);
    const pc = percent(p, categoryQty);
    const v = variant(p);
    const packQty = packQtyFor(p);
    const best = hasBestPrice(p);
    const active = stageFor(p, categoryQty);
    const next = categoryStages[p.categoryEn].find((s) => s.minQty > active.minQty);
    return (
      <article className="productCard" onClick={() => setSelected(p)}>
        <div className="productVisual">
          <img src={p.image} alt={lang === "vi" ? p.name : p.zh} />
          <small>{p.code}</small>
        </div>
        <div className="productInfo">
          <span className="tag">
            {lang === "vi" ? p.category : p.categoryZh}
          </span>
          <h3>{lang === "vi" ? p.name : p.zh}</h3>
          <select
            className="variantSelect"
            value={v.id}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              setVariantByProduct((x) => ({ ...x, [p.id]: e.target.value }))
            }
          >
            {p.variants.map((x) => (
              <option value={x.id} key={x.id}>
                {lang === "vi" ? x.label : x.labelZh} · {fmt(x.base)}
              </option>
            ))}
          </select>
          <div className="listPrice">
            <span>{t("Giá niêm yết theo quy cách", "規格牌價")}</span>
            <del>{fmt(v.base)}</del>
          </div>
          <div className="priceRow">
            <div>
              <b>{fmt(price(p, categoryQty))}</b>
              <small>
                {t("Chiết khấu", "折扣")} {100 - pc}% ·{" "}
                {best
                  ? t("giá thấp nhất theo username", "Username專屬最低價")
                  : t("gộp số lượng cùng nhóm", "同類別合併數量")}
              </small>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                add(p.id, n);
              }}
            >
              ＋
            </button>
          </div>
          <div className="packHint">
            {t("Quy cách này: 1 thùng", "此規格：1箱")} = {packQty} pcs
          </div>
          {!best && next && (
            <div className="nextPrice">
              {t("Cùng nhóm mua thêm", "同類別再買")} {next.minQty - categoryQty} pcs → {next.percent}%
            </div>
          )}
          <div className="categoryQtyHint">
            {t("Tổng nhóm sau khi thêm", "加入後類別合計")}：{categoryQty} pcs · {t("chiết khấu", "折扣")} {100 - pc}%
          </div>
          <div className="cardQty" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => changeQty(p.id, n - 1)}>−</button>
            <input
              type="number"
              min="1"
              value={n}
              onChange={(e) => changeQty(p.id, Number(e.target.value))}
            />
            <button onClick={() => changeQty(p.id, n + 1)}>＋</button>
            <button
              className="cartonBtn"
              onClick={() => changeQty(p.id, packQty)}
            >
              {t("1 thùng", "1箱")} · {packQty}
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <main className="appShell">
      <header className="topbar">
        <button className="logo" onClick={() => setView("home")}>
          <span>TĐ</span>
          <b>
            TÂN ĐÔNG<small>PRO</small>
          </b>
        </button>
        <div className="desktopSearch">
          <span>⌕</span>
          <input
            placeholder={t(
              "Tìm mã hoặc tên sản phẩm...",
              "搜尋產品名稱或編號…",
            )}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setView("products");
            }}
          />
        </div>
        <div className="topActions">
          <button onClick={() => setLang(lang === "vi" ? "zh" : "vi")}>
            {lang === "vi" ? "中文" : "VI"}
          </button>
          {user.role === "admin" && (
            <button onClick={() => setAdmin(!admin)}>
              ⚙ <span>{t("Quản trị", "管理後台")}</span>
            </button>
          )}
          {!admin && (
            <button className="myOrdersBtn" onClick={() => setView("account")}>
              ▤ <span>{t("Đơn hàng của tôi", "我的訂單")}</span>
              {userOrders.some((o) => ["confirmed", "preparing"].includes(o.status)) && <i>!</i>}
            </button>
          )}
          <button className="avatar" aria-label={t("Chuyển vai trò thử nghiệm", "切換測試身份")} aria-expanded={showRoleSwitcher} onClick={() => setShowRoleSwitcher((open) => !open)}>
            {user.name.slice(0, 2)}
          </button>
          {showRoleSwitcher && (
            <div className="roleSwitcher">
              <header><b>{t("Chuyển vai trò thử nghiệm", "切換測試身份")}</b><small>{t("Dùng để kiểm tra ảnh hưởng giữa các nhân viên", "用來測試不同人員間的狀態影響")}</small></header>
              {[
                ["minhphat", "◆", t("Đại lý lớn", "大盤")],
                ["anphu", "◇", t("Đại lý vừa", "中盤")],
                ["hoangnam", "○", t("Cửa hàng", "小盤")],
                ["manager1", "⚙", t("Quản trị", "管理者")],
                ["warehouse1", "▦", t("Kho hàng", "倉庫")],
                ["deliver1", "➜", t("Giao hàng", "交貨人員")],
              ].map(([account, icon, label]) => (
                <button className={user.username === account ? "active" : ""} key={account} onClick={() => quickEnter(account)}><i>{icon}</i><span>{label}</span>{user.username === account && <b>✓</b>}</button>
              ))}
            </div>
          )}
        </div>
      </header>
      {admin ? (
        <Admin
          key={user.username}
          customers={customers}
          setCustomers={setCustomers}
          products={productList}
          setProducts={setProductList}
          categoryStages={categoryStages}
          setCategoryStages={setCategoryStages}
          orders={orders}
          setOrders={setOrders}
          close={() => {
            setAdmin(false);
            setUser(
              customers.find((c) => c.username === user.username) || user,
            );
          }}
          role={user.role || "dealer"}
          logout={() => {
            setAdmin(false);
            setUser(null);
          }}
          t={t}
        />
      ) : (
        <>
          {view === "home" && (
            <div className="page homePage">
              <section className="welcome">
                <div>
                  <p>{t("Xin chào,", "您好，")}</p>
                  <h1>{user.name}</h1>
                  <span>
                    {t("Đã áp dụng bảng giá", "已套用價格層級")} ·{" "}
                    <b>{tierLabel}</b>
                  </span>
                </div>
                <button onClick={() => setView("cart")}>
                  {t("Đơn đang soạn", "目前訂單")}{" "}
                  <strong>{cartItems.length}</strong>
                  <small>{fmt(total)}</small>
                </button>
              </section>
              <section className="quickGrid">
                <button
                  className="quick orange"
                  onClick={() => setView("products")}
                >
                  <span className="icon">＋</span>
                  <span>
                    <b>{t("Đặt hàng nhanh", "快速訂貨")}</b>
                    <small>
                      {t("Chọn loại hàng và số lượng", "選擇分類與數量")}
                    </small>
                  </span>
                </button>
                <button className="quick" onClick={() => setView("products")}>
                  <span className="icon">▦</span>
                  <span>
                    <b>{t("Chọn danh mục", "依分類選貨")}</b>
                    <small>
                      {t("Theo nhóm sản phẩm Tân Đông", "依新東官網產品類別")}
                    </small>
                  </span>
                </button>
                <button
                  className="quick"
                  onClick={() => {
                    add(1, 100);
                    add(4, 50);
                  }}
                >
                  <span className="icon">↻</span>
                  <span>
                    <b>{t("Mua lại", "再次購買")}</b>
                    <small>{t("Từ đơn gần nhất", "從最近訂單加入")}</small>
                  </span>
                </button>
                <button className="quick" onClick={() => setView("videos")}>
                  <span className="icon">▶</span>
                  <span>
                    <b>{t("Video lắp đặt", "安裝影片")}</b>
                    <small>{t("Xem hướng dẫn", "觀看教學")}</small>
                  </span>
                </button>
              </section>
              <section className="section">
                <div className="sectionHead">
                  <div>
                    <p className="eyebrow">
                      {t("DANH MỤC SẢN PHẨM", "產品分類")}
                    </p>
                    <h2>{t("Chọn nhanh theo nhu cầu", "依需求快速選擇")}</h2>
                  </div>
                  <button onClick={() => setView("products")}>
                    {t("Xem tất cả", "查看全部")} →
                  </button>
                </div>
                <div className="categoryGrid">
                  {categories.map(([vi, zh], i) => (
                    <button
                      key={vi}
                      onClick={() => {
                        setCategory(vi);
                        setView("products");
                      }}
                    >
                      <span>{i + 1}</span>
                      <b>{lang === "vi" ? vi : zh}</b>
                      <small>
                        {productList.filter((p) => p.category === vi).length}{" "}
                        {t("sản phẩm", "項產品")}
                      </small>
                    </button>
                  ))}
                </div>
              </section>
              <section className="section">
                <div className="sectionHead">
                  <div>
                    <p className="eyebrow">
                      {t("SẢN PHẨM THƯỜNG MUA", "常購產品")}
                    </p>
                    <h2>{t("Đặt lại nhanh", "快速再訂")}</h2>
                  </div>
                </div>
                <div className="products">
                  {productList.slice(0, 4).map((p) => (
                    <Card key={p.id} p={p} />
                  ))}
                </div>
              </section>
            </div>
          )}
          {view === "products" && (
            <div className="page">
              <div className="pageTitle">
                <p className="eyebrow">CATALOGUE 2026</p>
                <h1>{t("Sản phẩm Tân Đông", "新東產品")}</h1>
                <p>
                  {tierLabel} ·{" "}
                  {t(
                    "Số lượng mọi mã và kích cỡ cùng nhóm được gộp để tính chiết khấu.",
                    "同類別不同產品與尺寸會合併數量計算折扣。",
                  )}
                </p>
              </div>
              <div className="mobileSearch">
                <input
                  placeholder={t("Tìm sản phẩm...", "搜尋產品…")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="chips">
                <button
                  className={category === "all" ? "active" : ""}
                  onClick={() => setCategory("all")}
                >
                  {t("Tất cả", "全部")}
                </button>
                {categories.map(([vi, zh]) => (
                  <button
                    className={category === vi ? "active" : ""}
                    onClick={() => setCategory(vi)}
                    key={vi}
                  >
                    {lang === "vi" ? vi : zh}
                  </button>
                ))}
              </div>
              {category !== "all" &&
                (() => {
                  const g = catalogueGroups.find((x) => x.vi === category);
                  if (!g) return null;
                  const categoryProduct = productList.find((p) => p.categoryEn === g.en);
                  if (!categoryProduct) return null;
                  const categoryQty = cartCategoryQty(g.en);
                  const best =
                    user.tier === "large" || user.bestCategories.includes(g.en);
                  const active = stageFor(categoryProduct, Math.max(1, categoryQty));
                  const next = categoryStages[g.en].find((stage) => stage.minQty > active.minQty);
                  return (
                    <div className="discountNotice">
                      <b>
                        {t(g.vi, g.zh)} · {tierLabel}
                      </b>
                      {best ? (
                        <span>
                          {t(
                            "Username này dùng giá thấp nhất",
                            "此Username直接使用最低價",
                          )}
                        </span>
                      ) : (
                        <span>
                          {t(
                            `Tổng nhóm ${categoryQty} pcs · chiết khấu ${100 - active.percent}%`,
                            `類別合計 ${categoryQty} pcs・目前折扣 ${100 - active.percent}%`,
                          )}
                        </span>
                      )}
                      <small>
                        {best
                          ? t("Áp dụng cho mọi mã và kích cỡ trong nhóm", "適用此類別全部產品與尺寸")
                          : next
                            ? t(`Cần thêm ${next.minQty - categoryQty} pcs cùng nhóm để đạt chiết khấu ${100 - next.percent}%`, `同類別再 ${next.minQty - categoryQty} pcs 可達 ${100 - next.percent}% 折扣`)
                            : t("Đã đạt mức chiết khấu cao nhất của nhóm", "已達此類別最高折扣")}
                      </small>
                    </div>
                  );
                })()}
              <div className="products productsAll">
                {filtered.map((p) => (
                  <Card key={p.id} p={p} />
                ))}
              </div>
            </div>
          )}
          {view === "cart" && (
            <Cart
              items={cartItems}
              total={total}
              cart={cart}
              setCart={setCart}
              price={price}
              percent={percent}
              categoryStages={categoryStages}
              getVariant={variant}
              lang={lang}
              user={user}
              t={t}
              goProducts={() => setView("products")}
              editingOrderId={editingOrderId}
              submit={() => {
                const lines = cartItems.map((p) => ({
                  productId: p.id,
                  quantity: p.quantity,
                  unitPrice: price(p, cartCategoryQty(p.categoryEn)),
                  variantId: variant(p).id,
                  discountPercent: percent(p, cartCategoryQty(p.categoryEn)),
                  packQty: variant(p).packQty,
                  cartons: Math.floor(p.quantity / variant(p).packQty),
                  looseQty: p.quantity % variant(p).packQty,
                }));
                if (editingOrderId) {
                  setOrders((list) =>
                    list.map((o) =>
                      o.id === editingOrderId
                        ? { ...o, amount: total, lines, createdAt: "14/08/2026 16:20" }
                        : o,
                    ),
                  );
                } else {
                  setOrders((list) => [
                    {
                      id: `#TD-260814-${String(list.length + 9).padStart(2, "0")}`,
                      username: user.username,
                      createdAt: "14/08/2026 16:20",
                      status: "waiting",
                      amount: total,
                      lines,
                    },
                    ...list,
                  ]);
                }
                setCart({});
                setEditingOrderId(null);
                setView("account");
                setToast(
                  editingOrderId
                    ? t("Đã cập nhật đơn hàng", "訂單已更新")
                    : t("Đã gửi đơn · Chờ xác nhận", "訂單已送出・等待確認"),
                );
              }}
            />
          )}
          {view === "videos" && (
            <div className="page">
              <div className="pageTitle">
                <p className="eyebrow">TÂN ĐÔNG ACADEMY</p>
                <h1>{t("Video hướng dẫn", "影片教學")}</h1>
              </div>
              <div className="videoGrid">
                {[
                  ["Lắp phao cơ đúng cách", "安裝水塔浮球"],
                  ["Kiểm tra dây cấp inox 304", "304編織管品質測試"],
                  ["Thay dây sen chống xoắn", "更換防纏繞花灑管"],
                  ["Cách chọn đầu nối", "如何選擇接頭"],
                ].map((v, i) => (
                  <article key={v[0]}>
                    <div className={`vthumb v${i}`}>
                      <span>▶</span>
                      <small>02:18</small>
                    </div>
                    <p>{t("HƯỚNG DẪN", "教學影片")}</p>
                    <h3>{lang === "vi" ? v[0] : v[1]}</h3>
                    <button>▶ {t("Xem video", "觀看影片")}</button>
                  </article>
                ))}
              </div>
            </div>
          )}
          {view === "account" && (
            <div className="page account">
              <div className="accountHero">
                <div className="bigAvatar">{user.name.slice(0, 2)}</div>
                <div>
                  <p>{t("TÀI KHOẢN ĐẠI LÝ", "經銷商帳戶")}</p>
                  <h1>{user.name}</h1>
                  <span>
                    {user.username} · {tierLabel}
                  </span>
                </div>
                <button onClick={() => setUser(null)}>
                  {t("Đăng xuất", "登出")}
                </button>
              </div>
              {userOrders.some((o) => ["confirmed","preparing"].includes(o.status)) && (
                <div className="orderFeedbackBanner">
                  <span>✓</span>
                  <div><b>{t("Bạn có phản hồi mới từ Tân Đông", "您有新東的最新訂單回覆")}</b><small>{t("Mở đơn hàng bên dưới để xem ngày giao, số tiền và cách đóng thùng.", "請展開下方訂單，查看交貨日、確認金額與裝箱方式。")}</small></div>
                </div>
              )}
              <div className="accountGrid">
                <section>
                  <div className="orderSectionHead">
                    <div>
                      <p className="eyebrow">{t("THEO DÕI ĐƠN HÀNG", "訂單追蹤")}</p>
                      <h2>{t("Trạng thái & lịch sử", "訂單狀態與歷史紀錄")}</h2>
                    </div>
                    <span>{userOrders.length} {t("đơn", "筆訂單")}</span>
                  </div>
                  <div className="orderFlow">
                    <span className="done">✓ {t("Đã gửi", "已送出")}</span><i>→</i>
                    <span>{t("Tân Đông xác nhận", "新東確認")}</span><i>→</i>
                    <span>{t("Chuẩn bị & phân phối", "備貨與配貨")}</span><i>→</i>
                    <span>{t("Giao hàng", "交貨")}</span>
                  </div>
                  <div className="orderHistory">
                    {userOrders.map((o) => (
                      <details className="orderCard" key={o.id}>
                        <summary>
                          <div><b>{o.id}</b><small>{o.createdAt}</small></div>
                          <span className={`orderStatus ${o.status}`}>{orderStatus(o.status)}</span>
                          <div className="deliverySummary"><small>{t("Dự kiến giao", "預計交貨")}</small><b>{o.deliveryDate || t("Chờ xác nhận", "等待確認")}</b></div>
                          <strong>{fmt(o.confirmedAmount || o.amount)}</strong>
                          <i>⌄</i>
                        </summary>
                        <div className="orderDetail">
                          <div className="orderLines">
                            {o.lines.map((line) => {
                              const p = productList.find((x) => x.id === line.productId);
                              if (!p) return null;
                              const v = p.variants.find((x) => x.id === line.variantId) || p.variants[0];
                              const packQty = line.packQty || v.packQty;
                              const cartons = line.cartons ?? Math.floor(line.quantity / packQty);
                              const loose = line.looseQty ?? line.quantity % packQty;
                              const pricePercent = line.discountPercent || Math.round((line.unitPrice/v.base)*100);
                              return <div key={`${o.id}-${line.productId}`}><img src={p.image} alt=""/><span><b>{p.code}</b><small>{t(v.label,v.labelZh)} · {line.quantity} pcs · {t("chiết khấu","折扣")} {100-pricePercent}%</small><em>{cartons} {t("thùng","箱")} {loose > 0 ? `＋ ${loose} pcs ${t("lẻ","散裝")}` : `· ${t("đủ thùng","整箱")}`}</em></span><strong>{fmt(line.unitPrice * line.quantity)}</strong></div>;
                            })}
                          </div>
                          <dl>
                            <div><dt>{t("Tổng tạm tính", "送出暫估金額")}</dt><dd>{fmt(o.amount)}</dd></div>
                            <div><dt>{t("Số tiền xác nhận", "確認金額")}</dt><dd>{o.confirmedAmount ? fmt(o.confirmedAmount) : "—"}</dd></div>
                            <div><dt>{t("Ngày giao dự kiến", "預計交貨日")}</dt><dd>{o.deliveryDate || "—"}</dd></div>
                            {o.adminNote && <div><dt>{t("Phản hồi Tân Đông", "新東回覆")}</dt><dd>{o.adminNote}</dd></div>}
                          </dl>
                          <div className="orderActions">
                            {o.status === "waiting" && <button className="editOrder" onClick={() => loadOrderToCart(o,true)}>✎ {t("Sửa đơn trước khi xác nhận", "確認前修改訂單")}</button>}
                            <button onClick={() => loadOrderToCart(o)}>↻ {t("Đặt lại đơn này", "再次購買此訂單")}</button>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
                <aside>
                  <h2>{t("Cấp khách hàng", "客戶等級")}</h2>
                  <p>
                    <b>{tierLabel}</b>
                  </p>
                  <p>
                    {t(
                      "Bảng giá do Tân Đông quản lý.",
                      "價格表由新東後台管理。",
                    )}
                  </p>
                  <hr />
                  <p>⌖ {user.address}</p>
                </aside>
              </div>
            </div>
          )}
        </>
      )}
      {!admin && cartItems.length > 0 && view !== "cart" && (
        <aside className="miniCart">
          <header>
            <div><b>{t("Đơn đang chọn", "目前已選訂單")}</b><small>{cartItems.length} {t("sản phẩm", "項產品")}</small></div>
            <strong>{fmt(total)}</strong>
          </header>
          <div className="miniCartLines">
            {cartItems.slice(0, 3).map((p) => {
              const selectedVariant = variant(p);
              const cartons = Math.floor(p.quantity / selectedVariant.packQty);
              const loose = p.quantity % selectedVariant.packQty;
              return (
                <div key={p.id}>
                  <img src={p.image} alt="" />
                  <span>
                    <b>{p.code}</b>
                    <small>{t(p.category, p.categoryZh)} · {t(selectedVariant.label, selectedVariant.labelZh)}</small>
                    <small className="miniDiscount">{t("Chiết khấu", "折扣")} {100 - percent(p, cartCategoryQty(p.categoryEn))}% · {t("Tổng nhóm", "類別合計")} {cartCategoryQty(p.categoryEn)} pcs · {cartons} {t("thùng", "箱")} ＋ {loose} {t("pcs lẻ", "散裝件")}</small>
                  </span>
                  <input aria-label={p.code} type="number" min="1" value={p.quantity} onChange={(e) => setCart((c) => ({...c,[p.id]:Math.max(1,Number(e.target.value))}))}/>
                  <button aria-label={t("Xóa", "移除")} onClick={() => setCart((c) => {const next={...c};delete next[p.id];return next})}>×</button>
                </div>
              );
            })}
            {cartItems.length > 3 && <small className="moreItems">＋{cartItems.length - 3} {t("sản phẩm khác", "項其他產品")}</small>}
          </div>
          <button className="miniCheckout" onClick={() => setView("cart")}>{t("Kiểm tra & gửi đơn", "查看並送出訂單")} →</button>
        </aside>
      )}
      <nav className="bottomNav">
        {[
          ["⌂", "home", "Trang chủ", "首頁"],
          ["▦", "products", "Sản phẩm", "產品"],
          ["＋", "cart", "Đặt hàng", "訂貨"],
          ["▶", "videos", "Video", "影片"],
          ["●", "account", "Của tôi", "我的"],
        ].map((n) => (
          <button
            key={n[1]}
            className={view === n[1] ? "active" : ""}
            onClick={() => {
              setAdmin(false);
              setView(n[1]);
            }}
          >
            <span>
              {n[0]}
              {n[1] === "cart" && cartItems.length ? (
                <i>{cartItems.length}</i>
              ) : null}
            </span>
            <small>{t(n[2], n[3])}</small>
          </button>
        ))}
      </nav>
      {selected && (
        <ProductModal
          p={selected}
          packQty={packQtyFor(selected)}
          n={qty[selected.id] || 1}
          setN={(n) => changeQty(selected.id, n)}
          selectedVariant={variant(selected)}
          setVariant={(id) =>
            setVariantByProduct((x) => ({ ...x, [selected.id]: id }))
          }
          pc={percent(selected, projectedCategoryQty(selected, qty[selected.id] || 1))}
          unit={price(selected, projectedCategoryQty(selected, qty[selected.id] || 1))}
          categoryQty={projectedCategoryQty(selected, qty[selected.id] || 1)}
          stages={categoryStages[selected.categoryEn]}
          best={hasBestPrice(selected)}
          tier={tierLabel}
          lang={lang}
          t={t}
          close={() => setSelected(null)}
          add={() => {
            add(selected.id, qty[selected.id] || 1);
            setSelected(null);
          }}
        />
      )}
      {toast && <div className="toast">✓ {toast}</div>}
    </main>
  );
}

function Cart({
  items,
  total,
  cart,
  setCart,
  price,
  percent,
  categoryStages,
  getVariant,
  lang,
  user,
  t,
  goProducts,
  editingOrderId,
  submit,
}: {
  items: (Product & { quantity: number })[];
  total: number;
  cart: Record<number, number>;
  setCart: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  price: (p: Product, n: number) => number;
  percent: (p: Product, n: number) => number;
  categoryStages: Record<string, PriceStage[]>;
  getVariant: (p: Product) => Variant;
  lang: "vi" | "zh";
  user: Customer;
  t: (a: string, b: string) => string;
  goProducts: () => void;
  editingOrderId: string | null;
  submit: () => void;
}) {
  const categoryTotalFor = (categoryEn: string) =>
    items
      .filter((item) => item.categoryEn === categoryEn)
      .reduce((sum, item) => sum + item.quantity, 0);
  const cartCategories = [...new Map(items.map((item) => [item.categoryEn, item])).values()];
  return (
    <div className="page narrow">
      <div className="pageTitle">
        <p className="eyebrow">{editingOrderId || t("ĐƠN HÀNG MỚI", "新訂單")}</p>
        <h1>{editingOrderId ? t("Sửa đơn đang chờ xác nhận", "修改等待確認中的訂單") : t("Kiểm tra đơn hàng", "確認訂單")}</h1>
      </div>
      {items.length ? (
        <>
          <div className="cartList">
            <div className="cartCategoryDiscounts">
              {cartCategories.map((categoryProduct) => {
                const categoryQty = categoryTotalFor(categoryProduct.categoryEn);
                const currentPercent = percent(categoryProduct, categoryQty);
                const next = categoryStages[categoryProduct.categoryEn].find((stage) => stage.minQty > categoryQty);
                return <div key={categoryProduct.categoryEn}>
                  <span><b>{t(categoryProduct.category, categoryProduct.categoryZh)}</b><small>{t("Tổng số lượng cùng nhóm", "同類別合計")} {categoryQty} pcs</small></span>
                  <strong>{t("Chiết khấu", "折扣")} {100 - currentPercent}%</strong>
                  {next && <em>{t(`Thêm ${next.minQty - categoryQty} pcs để đạt ${100 - next.percent}%`, `再加 ${next.minQty - categoryQty} pcs 可達 ${100 - next.percent}%`)}</em>}
                </div>;
              })}
            </div>
            {items.map((p) => {
              const v = getVariant(p);
              const categoryQty = categoryTotalFor(p.categoryEn);
              return (
                <div className="cartItem" key={p.id}>
                  <img src={p.image} alt="" />
                  <div>
                    <b>{lang === "vi" ? p.name : p.zh}</b>
                    <small>
                      {p.code} · {lang === "vi" ? v.label : v.labelZh} ·{" "}
                      <del>{fmt(v.base)}</del>{" "}
                      <strong>{fmt(price(p, categoryQty))}</strong> ·{" "}
                      {t("chiết khấu", "折扣")} {100 - percent(p, categoryQty)}%
                    </small>
                  </div>
                  <div className="stepper">
                    <button
                      onClick={() =>
                        setCart({
                          ...cart,
                          [p.id]: Math.max(1, p.quantity - 1),
                        })
                      }
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={p.quantity}
                      onChange={(e) =>
                        setCart({
                          ...cart,
                          [p.id]: Math.max(1, Number(e.target.value)),
                        })
                      }
                    />
                    <button
                      onClick={() =>
                        setCart({ ...cart, [p.id]: p.quantity + 1 })
                      }
                    >
                      ＋
                    </button>
                  </div>
                  <strong>{fmt(price(p, categoryQty) * p.quantity)}</strong>
                </div>
              );
            })}
          </div>
          <div className="summary">
            <div>
              <span>{t("Tạm tính", "小計")}</span>
              <b>{fmt(total)}</b>
            </div>
            <div>
              <span>{t("Giao đến", "送貨地址")}</span>
              <p>{user.address}</p>
            </div>
            <button className="primary" onClick={submit}>
              {editingOrderId
                ? t("Lưu thay đổi đơn hàng", "儲存訂單修改")
                : t("Gửi đơn cho Tân Đông xác nhận", "送出訂單，等待新東確認")} →
            </button>
            <small>
              ⓘ{" "}
              {t(
                "Hệ thống chỉ chọn một tỷ lệ giá cuối cùng, không cộng dồn chiết khấu.",
                "系統只選擇一個最終價格百分比，不重複疊加折扣。",
              )}
            </small>
          </div>
        </>
      ) : (
        <div className="empty">
          <span>▤</span>
          <h2>{t("Đơn hàng đang trống", "訂單目前是空的")}</h2>
          <button className="primary" onClick={goProducts}>
            {t("Chọn sản phẩm", "選擇產品")}
          </button>
        </div>
      )}
    </div>
  );
}

function ProductModal({
  p,
  packQty,
  n,
  setN,
  selectedVariant,
  setVariant,
  pc,
  unit,
  categoryQty,
  stages,
  best,
  tier,
  lang,
  t,
  close,
  add,
}: {
  p: Product;
  packQty: number;
  n: number;
  setN: (n: number) => void;
  selectedVariant: Variant;
  setVariant: (id: string) => void;
  pc: number;
  unit: number;
  categoryQty: number;
  stages: PriceStage[];
  best: boolean;
  tier: string;
  lang: "vi" | "zh";
  t: (a: string, b: string) => string;
  close: () => void;
  add: () => void;
}) {
  return (
    <div className="modalBackdrop" onClick={close}>
      <section
        className="modal priceModal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close" onClick={close}>
          ×
        </button>
        <div className="detailVisual">
          <img src={p.image} alt="" />
        </div>
        <p className="eyebrow">
          {p.code} · {lang === "vi" ? p.category : p.categoryZh}
        </p>
        <h2>{lang === "vi" ? p.name : p.zh}</h2>
        <label className="modalVariant">
          {t("Chọn quy cách", "選擇規格")}
          <select
            value={selectedVariant.id}
            onChange={(e) => setVariant(e.target.value)}
          >
            {p.variants.map((v) => (
              <option value={v.id} key={v.id}>
                {lang === "vi" ? v.label : v.labelZh} · {fmt(v.base)}
              </option>
            ))}
          </select>
        </label>
        <div className="modalPricing">
          <div>
            <span>{t("Giá niêm yết quy cách", "此規格牌價")}</span>
            <del>{fmt(selectedVariant.base)}</del>
          </div>
          <div className="activePrice">
            <span>{t("Đơn giá hiện tại", "目前單價")}</span>
            <b>{fmt(unit)}</b>
          </div>
          <small>
            {tier} ·{" "}
            {best
              ? t("Username dùng mức thấp nhất", "Username直接最低價")
              : t("Thanh toán", "支付牌價的")}{" "}
            {!best && `${pc}%`}
          </small>
        </div>
        <div className="modalCategoryProgress">
          <span>{t("Tổng số lượng cùng nhóm sau khi thêm", "加入後同類別合計")}</span>
          <b>{categoryQty} pcs · {t("chiết khấu", "折扣")} {100 - pc}%</b>
          {!best && stages.find((stage) => stage.minQty > categoryQty) && (() => {
            const next = stages.find((stage) => stage.minQty > categoryQty)!;
            return <small>{t(`Thêm ${next.minQty - categoryQty} pcs cùng nhóm để đạt chiết khấu ${100 - next.percent}%`, `同類別再加 ${next.minQty - categoryQty} pcs，可達 ${100 - next.percent}% 折扣`)}</small>;
          })()}
        </div>
        <small className="ladderHint">{t("Chạm một mức để điền nhanh số lượng của sản phẩm này; chiết khấu nhóm vẫn tự tính theo tổng.", "點選階段可快速填入目前商品數量；類別折扣仍依合計自動重算。")}</small>
        <div className="priceLadder">
          {stages.map((s, i) => (
            <button
              key={i}
              className={pc === s.percent ? "active" : ""}
              onClick={() => setN(s.minQty)}
            >
              <small>
                {i === 0
                  ? t("Giá cơ bản", "基礎價格")
                  : i === 1
                    ? t("Gộp theo nhóm", "類別合併")
                    : i === 3
                      ? t("Mức thấp nhất", "最低價")
                      : t("Số lượng lớn", "大量")}
              </small>
              <b>{s.minQty} pcs</b>
              <strong>
                {t("Giảm", "折扣")} {100 - s.percent}% · {fmt((selectedVariant.base * s.percent) / 100)}
              </strong>
            </button>
          ))}
        </div>
        <div className="qtyPicker">
          <label>
            {t("Số lượng", "訂購數量")}
            <div>
              <button onClick={() => setN(Math.max(1, n - 1))}>−</button>
              <input
                type="number"
                min="1"
                value={n}
                onChange={(e) => setN(Math.max(1, Number(e.target.value)))}
              />
              <button onClick={() => setN(n + 1)}>＋</button>
            </div>
          </label>
          <div className="quickQty">
            <button onClick={() => setN(1)}>1 pcs</button>
            <button onClick={() => setN(packQty)}>
              {t("1 thùng", "1箱")} ({packQty})
            </button>
            <button onClick={() => setN(stages[3].minQty)}>
              {t("Giá thấp nhất", "最低價")} ({stages[3].minQty}
              )
            </button>
          </div>
        </div>
        <dl>
          <div>
            <dt>{t("Số lượng hiện tại", "目前訂購箱數與散裝")}</dt>
            <dd>
              {Math.floor(n / packQty)} {t("thùng", "箱")} ＋ {n % packQty}{" "}
              {t("pcs lẻ", "件散裝")}
            </dd>
          </div>
          <div>
            <dt>{t("Chiết khấu hiện tại", "目前折扣")}</dt>
            <dd>{100 - pc}% · {fmt(unit)} / pcs</dd>
          </div>
          <div>
            <dt>{t("Thành tiền", "總額")}</dt>
            <dd>{fmt(unit * n)}</dd>
          </div>
        </dl>
        <details className="productSpecifications">
          <summary>{t("Xem thông số sản phẩm", "查看產品規格")} ＋</summary>
          <ul>
            {p.specifications.map((specification, index) => (
              <li key={index}>{t(specification.vi, specification.zh)}</li>
            ))}
            <li>1 {t("thùng", "箱")} = {packQty} pcs</li>
          </ul>
        </details>
        <button className="primary" onClick={add}>
          {t("Thêm vào đơn hàng", "加入訂單")} <span>＋</span>
        </button>
      </section>
    </div>
  );
}

function Admin({
  customers,
  setCustomers,
  products,
  setProducts,
  categoryStages,
  setCategoryStages,
  orders,
  setOrders,
  close,
  role,
  logout,
  t,
}: {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categoryStages: Record<string, PriceStage[]>;
  setCategoryStages: React.Dispatch<React.SetStateAction<Record<string, PriceStage[]>>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  close: () => void;
  role: UserRole;
  logout: () => void;
  t: (a: string, b: string) => string;
}) {
  const [tab, setTab] = useState(role === "admin" ? "discounts" : "orders");
  const [saved, setSaved] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [adminCategory, setAdminCategory] = useState("all");
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [openAdminOrder, setOpenAdminOrder] = useState<string | null>(null);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    username: "",
    password: DEMO_PASSWORD,
    name: "",
    tier: "small",
    address: "",
    bestCategories: [],
  });
  const nav = [
    ["▤", "orders", t("Đơn hàng", "訂單管理")],
    ["●", "customers", t("Khách hàng", "客戶管理")],
    ["♟", "tiers", t("Quyền theo username", "Username最低價")],
    ["％", "discounts", t("Chiết khấu theo nhóm", "類別數量折扣")],
    ["▦", "products", t("Sản phẩm", "產品管理")],
  ].filter((x) => role === "admin" || x[1] === "orders");
  const dealerCustomers = customers.filter(
    (customer) => !customer.role || customer.role === "dealer",
  );
  const title: Record<string, string> = {
    orders: t("Quản lý đơn hàng", "訂單管理"),
    customers: t("Phân loại khách hàng", "客戶分類管理"),
    tiers: t("Quyền giá thấp nhất theo username", "Username個別最低價權限"),
    discounts: t(
      "Bốn bậc chiết khấu theo tổng số lượng nhóm",
      "類別合併數量四階段折扣",
    ),
    products: t("Danh mục & bảng giá", "分類與產品牌價"),
  };
  const visibleProducts = products.filter(
    (p) =>
      (adminCategory === "all" || p.categoryEn === adminCategory) &&
      `${p.code} ${p.category} ${p.categoryZh}`
        .toLowerCase()
        .includes(productSearch.toLowerCase()),
  );
  const categoryFilters = [
    { en: "all", vi: "Tất cả", zh: "全部", count: products.length },
    ...catalogueGroups.map((g) => ({
      en: g.en,
      vi: g.vi,
      zh: g.zh,
      count: products.filter((p) => p.categoryEn === g.en).length,
    })),
  ];
  const adminProductTools = (
    <>
      <div className="adminCategoryFilters">
        {categoryFilters.map((g) => (
          <button
            key={g.en}
            className={adminCategory === g.en ? "active" : ""}
            onClick={() => setAdminCategory(g.en)}
          >
            <b>{t(g.vi, g.zh)}</b>
            <small>
              {g.count} {t("sản phẩm", "項產品")}
            </small>
          </button>
        ))}
      </div>
      <div className="adminResultCount">
        {t("Đang hiển thị", "目前顯示")} <b>{visibleProducts.length}</b> /{" "}
        {products.length}{" "}
        {t(
          "sản phẩm; tất cả đều đã liên kết với trang đặt hàng.",
          "項產品；全部均已連結至客戶訂購頁。",
        )}
      </div>
    </>
  );
  const updateVariant = (
    productId: number,
    variantId: string,
    change: (v: Variant) => Variant,
  ) =>
    setProducts((list) =>
      list.map((p) =>
        p.id === productId
          ? {
              ...p,
              variants: p.variants.map((v) =>
                v.id === variantId ? change(v) : v,
              ),
            }
          : p,
      ),
    );
  const updateBase = (productId: number, variantId: string, value: number) =>
    updateVariant(productId, variantId, (v) => ({
      ...v,
      base: Math.max(0, value || 0),
    }));
  const updatePack = (productId: number, variantId: string, value: number) =>
    updateVariant(productId, variantId, (v) => {
      const packQty = Math.max(1, Math.floor(value || 1));
      return {
        ...v,
        packQty,
      };
    });
  const updateCategoryStage = (
    categoryEn: string,
    index: number,
    key: keyof PriceStage,
    value: number,
  ) =>
    setCategoryStages((current) => ({
      ...current,
      [categoryEn]: current[categoryEn].map((s, i) =>
        i === index
          ? {
              ...s,
              [key]:
                key === "percent"
                  ? Math.min(100, Math.max(1, value || 1))
                  : Math.max(1, Math.floor(value || 1)),
            }
          : s,
      ),
    }));
  const toggleCustomerCategory = (
    username: string,
    category: string,
    checked: boolean,
  ) =>
    setCustomers((list) =>
      list.map((c) =>
        c.username === username
          ? {
              ...c,
              bestCategories: checked
                ? [...new Set([...c.bestCategories, category])]
                : c.bestCategories.filter((x) => x !== category),
            }
          : c,
      ),
    );
  const updateOrder = (id: string, change: Partial<Order>) =>
    setOrders((list) =>
      list.map((o) => (o.id === id ? { ...o, ...change } : o)),
    );
  const updateCustomer = (username: string, change: Partial<Customer>) =>
    setCustomers((list) =>
      list.map((customer) =>
        customer.username === username ? { ...customer, ...change } : customer,
      ),
    );
  const updateSpecification = (
    productId: number,
    index: number,
    key: keyof ProductSpecification,
    value: string,
  ) =>
    setProducts((list) =>
      list.map((product) =>
        product.id === productId
          ? {
              ...product,
              specifications: product.specifications.map((specification, i) =>
                i === index
                  ? { ...specification, [key]: value }
                  : specification,
              ),
            }
          : product,
      ),
    );
  const addSpecification = (productId: number) =>
    setProducts((list) =>
      list.map((product) =>
        product.id === productId
          ? {
              ...product,
              specifications: [
                ...product.specifications,
                { vi: "", zh: "" },
              ],
            }
          : product,
      ),
    );
  const removeSpecification = (productId: number, index: number) =>
    setProducts((list) =>
      list.map((product) =>
        product.id === productId
          ? {
              ...product,
              specifications: product.specifications.filter((_, i) => i !== index),
            }
          : product,
      ),
    );
  const statusLabel = (status: OrderStatus) =>
    ({
      waiting: t("Chờ xác nhận", "等待確認"),
      confirmed: t("Đã xác nhận", "已確認"),
      preparing: t("Chuẩn bị & phân phối", "備貨與配貨"),
      completed: t("Đã giao", "已交貨"),
      delivery_failed: t("Giao thất bại", "交貨失敗"),
      cancelled: t("Đã hủy", "已取消"),
    })[status];
  const stageNumber = (status: OrderStatus) =>
    ({ waiting: 0, confirmed: 1, preparing: 2, completed: 3, delivery_failed: 3, cancelled: 0 })[status];
  const adminStatuses: OrderStatus[] = ["waiting", "confirmed", "preparing", "completed", "delivery_failed", "cancelled"];
  const visibleOrders =
    role === "warehouse"
      ? orders.filter((order) => ["confirmed", "preparing"].includes(order.status))
      : role === "delivery"
        ? orders.filter((order) => ["preparing", "completed", "delivery_failed"].includes(order.status))
      : orders;
  const updateOrderLine = (
    orderId: string,
    productId: number,
    change: Partial<OrderLine>,
  ) =>
    setOrders((list) =>
      list.map((o) =>
        o.id === orderId
          ? {
              ...o,
              lines: o.lines.map((line) =>
                line.productId === productId ? { ...line, ...change } : line,
              ),
            }
          : o,
      ),
    );
  return (
    <div className="admin">
      <aside>
        <div className="logo">
          <span>TĐ</span>
          <b>
            TÂN ĐÔNG
            <small>
              {role === "warehouse"
                ? "WAREHOUSE"
                : role === "delivery"
                  ? "DELIVERY"
                  : "ADMIN"}
            </small>
          </b>
        </div>
        <p>
          {role === "admin"
            ? t("QUẢN LÝ HỆ THỐNG", "系統管理")
            : t("XỬ LÝ ĐƠN HÀNG", "訂單作業")}
        </p>
        {nav.map((x) => (
          <button
            className={tab === x[1] ? "active" : ""}
            onClick={() => setTab(x[1])}
            key={x[1]}
          >
            <i>{x[0]}</i>
            {x[2]}
          </button>
        ))}
        <button className="back" onClick={role === "admin" ? close : logout}>
          ← {role === "admin"
            ? t("Về trang đại lý", "返回經銷商頁")
            : t("Đăng xuất", "登出")}
        </button>
      </aside>
      <section className="adminMain">
        <div className="adminHead">
          <div>
            <p>TÂN ĐÔNG PRO</p>
            <h1>{title[tab]}</h1>
          </div>
          {(tab === "discounts" || tab === "tiers") && (
            <button
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 1600);
              }}
            >
              {saved
                ? t("✓ Đã áp dụng", "✓ 已套用")
                : t("Lưu & áp dụng", "儲存並套用")}
            </button>
          )}
          {tab === "customers" && (
            <button onClick={() => setShowNewCustomer(true)}>
              ＋ {t("Thêm username", "新增Username")}
            </button>
          )}
        </div>
        {(tab === "tiers" || tab === "discounts") && (
          <div className="adminIntro">
            <b>
              {tab === "tiers"
                ? t(
                    "Đại lý lớn mặc định dùng giá thấp nhất; đại lý vừa và nhỏ được cấp quyền riêng theo từng username.",
                    "大盤商預設全部最低價；中盤與小盤依每個Username個別勾選最低價產品類別。",
                  )
                : t(
                    "Mỗi nhóm sản phẩm dùng chung bốn bậc; mọi mã và kích cỡ được cộng dồn số lượng.",
                    "每個產品類別共用四階門檻，所有產品與尺寸合併累計數量。",
                  )}
            </b>
            <span>
              {t(
                "Mỗi dòng hàng chỉ dùng một tỷ lệ cuối cùng, không cộng dồn.",
                "每筆商品只套用一個最終百分比，不重複折扣。",
              )}
            </span>
          </div>
        )}
        {tab === "tiers" && (
          <div className="userPolicyGrid">
            {dealerCustomers.map((c, i) => (
              <article className="tierPolicyCard" key={c.username}>
                <div className="tierPolicyTitle">
                  <span
                    className={`tierIcon tier${c.tier === "large" ? 0 : c.tier === "medium" ? 1 : 2}`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p>
                      @{c.username} · {tierInfo[c.tier].code}
                    </p>
                    <h2>{c.name}</h2>
                    <small>{t(tierInfo[c.tier].vi, tierInfo[c.tier].zh)}</small>
                  </div>
                </div>
                <label className="allBest">
                  <input
                    type="checkbox"
                    checked={c.tier === "large"}
                    disabled
                  />
                  <span>
                    <b>
                      {c.tier === "large"
                        ? t(
                            "Mặc định tất cả danh mục dùng giá thấp nhất",
                            "大盤預設全部類別最低價",
                          )
                        : t("Cấp quyền theo username", "依Username個別授權")}
                    </b>
                    <small>
                      {c.tier === "large"
                        ? t("Không cần chọn từng danh mục", "不需逐一選擇類別")
                        : t(
                            "Chỉ danh mục được chọn mới bỏ qua số lượng",
                            "只有勾選類別會跳過數量階梯",
                          )}
                    </small>
                  </span>
                </label>
                <div
                  className={
                    c.tier === "large"
                      ? "tierCategoryChoices disabled"
                      : "tierCategoryChoices"
                  }
                >
                  {catalogueGroups.map((g) => (
                    <label key={g.en}>
                      <input
                        type="checkbox"
                        disabled={c.tier === "large"}
                        checked={
                          c.tier === "large" || c.bestCategories.includes(g.en)
                        }
                        onChange={(e) =>
                          toggleCustomerCategory(
                            c.username,
                            g.en,
                            e.target.checked,
                          )
                        }
                      />
                      <span>{t(g.vi, g.zh)}</span>
                      <strong>
                        {c.tier === "large" || c.bestCategories.includes(g.en)
                          ? t("Giá thấp nhất", "最低價")
                          : t("Theo số lượng", "依數量")}
                      </strong>
                    </label>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
        {tab === "discounts" && (
          <div className="specDiscountStack">
            <div className="adminTable">
              <div className="tableTools">
                <div>
                  <b>
                    {t(
                      "Cài đặt bốn bậc theo tổng số lượng nhóm",
                      "依類別合併總數設定四階折扣",
                    )}
                  </b>
                  <small>
                    {t(
                      "Mọi mã hàng và kích cỡ trong cùng nhóm dùng chung một mức chiết khấu",
                      "同類別所有產品與尺寸共用一組折扣門檻",
                    )}
                  </small>
                </div>
              </div>
            </div>
            <div className="categoryDiscountStack">
              {catalogueGroups.map((group, groupIndex) => (
                <section className="categoryDiscountCard" key={group.en}>
                  <div className="categoryDiscountTitle">
                    <span>{groupIndex + 1}</span>
                    <div><em>{t("NHÓM SẢN PHẨM", "產品類別")}</em><h2>{t(group.vi, group.zh)}</h2></div>
                    <strong>{products.filter((product) => product.categoryEn === group.en).length} {t("mã hàng", "項產品")}</strong>
                  </div>
                  <div className="fourStages categoryFourStages">
                    {categoryStages[group.en].map((stage, stageIndex) => (
                      <label className={stageIndex === 3 ? "lowest" : ""} key={stageIndex}>
                        <span>{t(`Giai đoạn ${stageIndex + 1}`, `階段 ${stageIndex + 1}`)}</span>
                        <div className="stageInputs">
                          <i>≥</i>
                          <input type="number" min="1" disabled={stageIndex === 0} value={stage.minQty} aria-label={t(`Số lượng nhóm giai đoạn ${stageIndex + 1}`, `類別數量階段 ${stageIndex + 1}`)} onChange={(e) => updateCategoryStage(group.en, stageIndex, "minQty", Number(e.target.value))}/>
                          <em>pcs</em>
                          <input type="number" min="1" max="100" value={stage.percent} aria-label={t(`Tỷ lệ giá giai đoạn ${stageIndex + 1}`, `售價比例階段 ${stageIndex + 1}`)} onChange={(e) => updateCategoryStage(group.en, stageIndex, "percent", Number(e.target.value))}/>
                          <em>%</em>
                        </div>
                        <small>{t("Chiết khấu", "折扣")} {100 - stage.percent}% · {t("mọi mã cùng nhóm", "同類別全部產品")}</small>
                      </label>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="formulaBox">
              <b>{t("Công thức duy nhất", "唯一計價公式")}</b>
              <code>
                {t(
                  "Giá niêm yết của quy cách × tỷ lệ theo tổng số lượng cùng nhóm",
                  "規格牌價 × 同類別合併總數適用的售價比例",
                )}
              </code>
              <small>
                {t(
                  "Đại lý lớn hoặc username được cấp quyền danh mục sẽ dùng thẳng giai đoạn 4.",
                  "大盤或該Username已獲類別授權時，直接套用階段4最低價。",
                )}
              </small>
            </div>
          </div>
        )}
        {tab === "customers" && (
          <div className="adminTable">
            <div className="tableTools">
              <b>{t("Username & cấp khách hàng", "Username與客戶等級")}</b>
              <span className="countPill">{dealerCustomers.length} usernames</span>
            </div>
            {showNewCustomer && (
              <form
                className="newCustomerForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    !newCustomer.username ||
                    !newCustomer.name ||
                    customers.some((c) => c.username === newCustomer.username)
                  )
                    return;
                  setCustomers((x) => [...x, newCustomer]);
                  setNewCustomer({
                    username: "",
                    password: DEMO_PASSWORD,
                    name: "",
                    tier: "small",
                    address: "",
                    bestCategories: [],
                  });
                  setShowNewCustomer(false);
                }}
              >
                <input
                  required
                  placeholder="Username"
                  value={newCustomer.username}
                  onChange={(e) =>
                    setNewCustomer((x) => ({
                      ...x,
                      username: e.target.value.trim().toLowerCase(),
                    }))
                  }
                />
                <input
                  required
                  placeholder={t("Tên khách hàng", "客戶名稱")}
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer((x) => ({ ...x, name: e.target.value }))
                  }
                />
                <select
                  value={newCustomer.tier}
                  onChange={(e) =>
                    setNewCustomer((x) => ({
                      ...x,
                      tier: e.target.value as Tier,
                    }))
                  }
                >
                  <option value="large">{t("Đại lý lớn", "大盤")}</option>
                  <option value="medium">{t("Đại lý vừa", "中盤")}</option>
                  <option value="small">{t("Cửa hàng", "小盤")}</option>
                </select>
                <input
                  placeholder={t("Địa chỉ giao hàng", "送貨地址")}
                  value={newCustomer.address}
                  onChange={(e) =>
                    setNewCustomer((x) => ({ ...x, address: e.target.value }))
                  }
                />
                <input
                  value={newCustomer.password}
                  onChange={(e) =>
                    setNewCustomer((x) => ({ ...x, password: e.target.value }))
                  }
                />
                <button className="primary">
                  {t("Tạo username", "建立Username")}
                </button>
              </form>
            )}
            <div className="customerHeader">
              <span>USERNAME / {t("KHÁCH HÀNG", "客戶")}</span>
              <span>{t("CẤP HIỆN TẠI", "目前等級")}</span>
              <span>{t("QUYỀN GIÁ THẤP NHẤT", "最低價權限")}</span>
            </div>
            {dealerCustomers.map((c) => (
              <details className="customerRecord" key={c.username}>
                <summary className="customerRow">
                  <span>
                    <b>{c.name}</b>
                    <small>@{c.username}</small>
                  </span>
                  <select
                    value={c.tier}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      updateCustomer(c.username, { tier: e.target.value as Tier })
                    }
                  >
                  <option value="large">
                    {t("Đại lý lớn / Đại bàn", "大盤客戶")}
                  </option>
                  <option value="medium">
                    {t("Đại lý vừa / Trung bàn", "中盤客戶")}
                  </option>
                  <option value="small">
                    {t("Cửa hàng / Tiểu bàn", "小盤客戶")}
                  </option>
                  </select>
                  <button
                    className="permissionLink"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTab("tiers");
                    }}
                  >
                  {c.tier === "large"
                    ? t("Tất cả danh mục", "全部類別")
                    : c.bestCategories.length
                      ? `${c.bestCategories.length} ${t("danh mục", "個類別")}`
                      : t("Chưa cấp", "尚未授權")}{" "}
                  →
                  </button>
                </summary>
                <div className="customerDetailsForm">
                  <label><span>{t("Tên công ty / khách hàng", "公司／客戶名稱")}</span><input value={c.name} onChange={(e) => updateCustomer(c.username, { name: e.target.value })} /></label>
                  <label><span>{t("Địa chỉ công ty / giao hàng", "公司／送貨地址")}</span><input value={c.address} onChange={(e) => updateCustomer(c.username, { address: e.target.value })} /></label>
                  <label><span>{t("Điện thoại công ty", "公司電話")}</span><input value={c.companyPhone || ""} onChange={(e) => updateCustomer(c.username, { companyPhone: e.target.value })} /></label>
                  <label><span>Email</span><input type="email" value={c.email || ""} onChange={(e) => updateCustomer(c.username, { email: e.target.value })} /></label>
                  <label><span>{t("Người liên hệ 1", "聯絡人 1")}</span><input value={c.contact1 || ""} onChange={(e) => updateCustomer(c.username, { contact1: e.target.value })} /></label>
                  <label><span>{t("Người liên hệ 2", "聯絡人 2")}</span><input value={c.contact2 || ""} onChange={(e) => updateCustomer(c.username, { contact2: e.target.value })} /></label>
                  <label><span>{t("Người liên hệ 3", "聯絡人 3")}</span><input value={c.contact3 || ""} onChange={(e) => updateCustomer(c.username, { contact3: e.target.value })} /></label>
                  <label className="customerNoteField"><span>{t("Ghi chú", "備註")}</span><textarea value={c.note || ""} onChange={(e) => updateCustomer(c.username, { note: e.target.value })} /></label>
                </div>
              </details>
            ))}
          </div>
        )}
        {tab === "products" && (
          <div className="productAdminStack">
            <div className="adminIntro">
              <b>
                {t(
                  "Mỗi mã sản phẩm và mỗi quy cách có giá niêm yết riêng.",
                  "每個產品編號、每個規格都有獨立牌價。",
                )}
              </b>
              <span>
                {t(
                  "Số pcs/thùng đặt tại đây; bốn bậc chiết khấu đặt tại mục Chiết khấu theo nhóm.",
                  "箱入數在此設定；四階段折扣請到「類別數量折扣」設定。",
                )}
              </span>
            </div>
            {adminProductTools}
            <div className="adminTable productPriceTable">
              <div className="tableTools">
                <div>
                  <b>
                    {t(
                      "Bảng giá theo mã + quy cách",
                      "依產品編號＋規格設定牌價",
                    )}
                  </b>
                  <small>{t("Đơn vị: VND / pcs", "單位：VND／件")}</small>
                </div>
                <input
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder={t("Tìm mã sản phẩm...", "搜尋產品編號…")}
                />
              </div>
              <div className="variantPriceHeader">
                <span>{t("SẢN PHẨM", "產品")}</span>
                <span>{t("QUY CÁCH", "規格")}</span>
                <span>{t("GIÁ NIÊM YẾT", "牌價")}</span>
                <span>{t("MỨC THẤP NHẤT", "最低價")}</span>
              </div>
              {visibleProducts.map((p) => (
                <div className="variantProduct" key={p.id}>
                  <div className="variantProductTitle">
                    <img src={p.image} alt="" />
                    <span>
                      <b>{p.code}</b>
                      <small>{t(p.category, p.categoryZh)}</small>
                    </span>
                  </div>
                  {p.variants.map((v) => (
                    <div className="variantPriceRow" key={v.id}>
                      <span>
                        {t(v.label, v.labelZh)}
                        <small className="packEdit">
                          1 {t("thùng", "箱")} = <input aria-label={`${p.code} ${t(v.label, v.labelZh)} ${t("Số lượng mỗi thùng", "一箱件數")}`} type="number" min="1" value={v.packQty} onChange={(e) => updatePack(p.id, v.id, Number(e.target.value))}/> pcs
                        </small>
                      </span>
                      <label>
                        <input
                          type="number"
                          min="0"
                          step="1000"
                          value={v.base}
                          onChange={(e) =>
                            updateBase(p.id, v.id, Number(e.target.value))
                          }
                        />
                        <i>₫</i>
                      </label>
                      <strong>
                        {fmt((v.base * categoryStages[p.categoryEn][3].percent) / 100)}
                      </strong>
                    </div>
                  ))}
                  <section className="productSpecEditor">
                    <header>
                      <b>{t("Thông số hiển thị cho khách", "客戶可見產品規格")}</b>
                      <button onClick={() => addSpecification(p.id)}>
                        ＋ {t("Thêm thông số", "新增規格")}
                      </button>
                    </header>
                    {p.specifications.map((specification, index) => (
                      <div key={index}>
                        <input
                          aria-label={`VI ${index + 1}`}
                          placeholder="Tiếng Việt"
                          value={specification.vi}
                          onChange={(e) =>
                            updateSpecification(p.id, index, "vi", e.target.value)
                          }
                        />
                        <input
                          aria-label={`ZH ${index + 1}`}
                          placeholder="繁體中文"
                          value={specification.zh}
                          onChange={(e) =>
                            updateSpecification(p.id, index, "zh", e.target.value)
                          }
                        />
                        <button
                          aria-label={t("Xóa thông số", "刪除規格")}
                          onClick={() => removeSpecification(p.id, index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </section>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "orders" && (
          <div className="adminOrders">
            <div className="adminOrderStats">
              {role === "delivery" ? <>
                <div><small>{t("CHỜ GIAO", "待交貨")}</small><b>{orders.filter((o) => o.status === "preparing").length}</b></div>
                <div><small>{t("ĐÃ GIAO", "已交貨")}</small><b>{orders.filter((o) => o.status === "completed").length}</b></div>
                <div><small>{t("GIAO THẤT BẠI", "交貨失敗")}</small><b>{orders.filter((o) => o.status === "delivery_failed").length}</b></div>
              </> : role === "warehouse" ? <>
                <div><small>{t("ĐÃ XÁC NHẬN", "已確認")}</small><b>{orders.filter((o) => o.status === "confirmed").length}</b></div>
                <div><small>{t("CHUẨN BỊ & PHÂN PHỐI", "備貨與配貨")}</small><b>{orders.filter((o) => o.status === "preparing").length}</b></div>
                <div><small>{t("ĐÃ XỬ LÝ", "已處理")}</small><b>{orders.filter((o) => ["completed","delivery_failed"].includes(o.status)).length}</b></div>
              </> : <>
                <div><small>{t("CHỜ XÁC NHẬN", "等待確認")}</small><b>{orders.filter((o) => o.status === "waiting").length}</b></div>
                <div><small>{t("ĐÃ XÁC NHẬN", "已確認")}</small><b>{orders.filter((o) => o.status === "confirmed").length}</b></div>
                <div><small>{t("ĐANG XỬ LÝ", "處理中")}</small><b>{orders.filter((o) => o.status === "preparing").length}</b></div>
              </>}
            </div>
            <div className="adminIntro"><b>{role === "warehouse" ? t("Đơn đã xác nhận có thể chuyển sang một trạng thái chuẩn bị & phân phối.","已確認訂單可切換成單一的「備貨與配貨」狀態。") : role === "delivery" ? t("Đơn chuẩn bị & phân phối có thể báo đã giao hoặc giao thất bại.","僅「備貨與配貨」訂單可回報已交貨或交貨失敗。") : t("Xác nhận số tiền và ngày giao để phản hồi ngay cho đại lý.","確認正式金額與交貨日期後，立即回饋給經銷商。")}</b><span>{role === "admin" ? t("Đơn đang chờ xác nhận vẫn có thể được khách hàng sửa.","等待確認中的訂單，客戶仍可自行修改。") : t("Trạng thái được cập nhật ngay cho người liên quan.","狀態會即時更新給相關人員。")}</span></div>
            {visibleOrders.map((o) => {
              const customer = customers.find((c) => c.username === o.username);
              return <article className={`adminOrderCard ${o.status === "waiting" ? "needsAction" : ""}`} key={o.id}>
                <header>
                  <div><b>{o.id}</b><small>{o.createdAt} · @{o.username}</small></div>
                  <span>{customer?.name}</span>
                  <span className={`orderStatus ${o.status}`}>
                    {statusLabel(o.status)}
                    {stageNumber(o.status) > 0 && <small>{t("Giai đoạn", "目前階段")} {stageNumber(o.status)}/3</small>}
                  </span>
                  <strong>{fmt(o.confirmedAmount || o.amount)}</strong>
                  <button onClick={() => setOpenAdminOrder(openAdminOrder === o.id ? null : o.id)}>{openAdminOrder === o.id ? t("Thu gọn","收合") : t("Xử lý đơn","處理訂單")} →</button>
                </header>
                {openAdminOrder === o.id && <div className="adminOrderEditor">
                  <label><span>{t("Trạng thái", "訂單狀態")}</span>{role === "warehouse" ? <button aria-label={o.status === "confirmed" ? t("Chuyển sang chuẩn bị và phân phối", "切換為備貨與配貨") : t("Hoàn tác về đã xác nhận", "復原為已確認")} className={`roleStatusButton ${o.status === "preparing" ? "undo" : ""}`} onClick={() => updateOrder(o.id,{status:o.status === "confirmed" ? "preparing" : "confirmed"})}>{o.status === "confirmed" ? `→ ${t("Chuẩn bị & phân phối", "備貨與配貨")}` : `↶ ${t("Hoàn tác về đã xác nhận", "復原為已確認")}`}</button> : role === "delivery" ? <div className="deliveryResultButtons">{o.status === "preparing" ? <><button aria-label={t("Đã giao", "已交貨")} onClick={() => updateOrder(o.id,{status:"completed"})}>✓ {t("Đã giao", "已交貨")}</button><button aria-label={t("Giao thất bại", "交貨失敗")} className="failed" onClick={() => updateOrder(o.id,{status:"delivery_failed"})}>× {t("Giao thất bại", "交貨失敗")}</button></> : <strong>{statusLabel(o.status)}</strong>}</div> : <select value={o.status} onChange={(e) => updateOrder(o.id,{status:e.target.value as OrderStatus})}>{adminStatuses.map((status) => <option value={status} key={status}>{statusLabel(status)}</option>)}</select>}</label>
                  <label><span>{t("Số tiền chính thức", "正式確認金額")}</span><div><input disabled={role !== "admin"} type="number" value={o.confirmedAmount || o.amount} onChange={(e) => updateOrder(o.id,{confirmedAmount:Number(e.target.value)})}/><i>₫</i></div></label>
                  <label><span>{t("Ngày giao dự kiến", "預計交貨日期")}</span><input disabled={role !== "admin"} placeholder="DD/MM/YYYY" value={o.deliveryDate || ""} onChange={(e) => updateOrder(o.id,{deliveryDate:e.target.value})}/></label>
                  <label className="adminOrderNote"><span>{t("Phản hồi cho khách hàng", "回覆客戶備註")}</span><input disabled={role !== "admin"} placeholder={t("Ví dụ: giao buổi sáng...","例如：預計上午送達…")} value={o.adminNote || ""} onChange={(e) => updateOrder(o.id,{adminNote:e.target.value})}/></label>
                  <div className="adminOrderLines">
                    <div className="packingHeader"><span>{t("Sản phẩm","產品")}</span><span>{t("SL đặt","訂購量")}</span><span>{t("Đơn giá","單價")}</span><span>{t("Chiết khấu","折扣")}</span><span>{t("Đóng thùng","裝箱方式")}</span></div>
                    {o.lines.map((line) => {
                      const p=products.find((x)=>x.id===line.productId);
                      if(!p)return null;
                      const v=p.variants.find((x)=>x.id===line.variantId)||p.variants[0];
                      const packQty=line.packQty||v.packQty;
                      const cartons=line.cartons??Math.floor(line.quantity/packQty);
                      const loose=line.looseQty??line.quantity%packQty;
                      const pricePercent=line.discountPercent||Math.round((line.unitPrice/v.base)*100);
                      const discount=100-pricePercent;
                      return <div className="packingRow" key={`${o.id}-${line.productId}`}>
                        <span><b>{p.code}</b><small>{t(v.label,v.labelZh)} · 1 {t("thùng","箱")}={packQty} pcs</small></span>
                        <strong>{line.quantity} pcs</strong>
                        <span><b>{fmt(line.unitPrice)}</b><small>{t("Tạm tính","小計")} {fmt(line.unitPrice*line.quantity)}</small></span>
                        <strong className="discountValue">{discount}%</strong>
                        <div className="packingControls">
                          <label><small>{t("Số thùng","箱數")}</small><input disabled={role === "delivery"} type="number" min="0" value={cartons} onChange={(e)=>updateOrderLine(o.id,line.productId,{cartons:Math.max(0,Number(e.target.value))})}/></label>
                          <label><small>{t("Pcs lẻ","散裝件")}</small><input disabled={role === "delivery"} type="number" min="0" value={loose} onChange={(e)=>updateOrderLine(o.id,line.productId,{looseQty:Math.max(0,Number(e.target.value))})}/></label>
                          <em className={loose>0||line.quantity<packQty?"packingWarning":"packingOk"}>{line.quantity<packQty?t("Chưa đủ 1 thùng","不足一箱"):loose>0?t("Có hàng lẻ","含散裝"):t("Đủ thùng","整箱")}</em>
                        </div>
                      </div>;
                    })}
                  </div>
                  {role === "admin" && <button className="confirmOrder" onClick={() => updateOrder(o.id,{status:o.status === "waiting" ? "confirmed" : o.status,confirmedAmount:o.confirmedAmount || o.amount})}>✓ {t("Lưu & phản hồi đại lý", "儲存並回饋經銷商")}</button>}
                </div>}
              </article>;
            })}
          </div>
        )}
        <div className="adminNote">
          ⓘ{" "}
          {t(
            "Bản mẫu quản trị — dữ liệu mô phỏng, chưa kết nối ERP.",
            "管理後台原型——目前為模擬資料，尚未連接ERP。",
          )}
        </div>
      </section>
    </div>
  );
}
