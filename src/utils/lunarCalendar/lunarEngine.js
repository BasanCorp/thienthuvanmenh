/**
 * LUNAR CALENDAR ENGINE
 * Tính toán đầy đủ thông tin Âm lịch Việt Nam
 * Sử dụng thư viện lunar-javascript
 */

import { Solar, Lunar, LunarYear } from 'lunar-javascript';

// 12 Địa Chi với emoji
const CHI_EMOJIS = {
  '子': '🐀', '丑': '🐂', '寅': '🐅', '卯': '🐇',
  '辰': '🐉', '巳': '🐍', '午': '🐴', '未': '🐐',
  '申': '🐒', '酉': '🐓', '戌': '🐕', '亥': '🐖'
};

// Tên Địa Chi tiếng Việt
const CHI_VIETNAMESE = {
  '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão',
  '辰': 'Thìn', '巳': 'Tỵ', '午': 'Ngọ', '未': 'Mùi',
  '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi'
};

// Tên Thiên Can tiếng Việt
const CAN_VIETNAMESE = {
  '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh', '戊': 'Mậu',
  '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân', '壬': 'Nhâm', '癸': 'Quý'
};

// Thứ tự Địa Chi
const CHI_ORDER = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 12 Trực
const TRUC_LIST = [
  { name: 'Kiến', type: 'hoangDao', meaning: 'Tốt cho khởi công, xây dựng', score: 85 },
  { name: 'Trừ', type: 'hoangDao', meaning: 'Tốt cho trừ tà, chữa bệnh', score: 75 },
  { name: 'Mãn', type: 'hoangDao', meaning: 'Tốt cho kết hôn, khai trương', score: 95 },
  { name: 'Bình', type: 'hoangDao', meaning: 'Tốt cho sửa đường, đào giếng', score: 70 },
  { name: 'Định', type: 'hoangDao', meaning: 'Tốt cho nhập trạch, an táng', score: 80 },
  { name: 'Chấp', type: 'hoangDao', meaning: 'Tốt cho xây dựng, trồng trọt', score: 75 },
  { name: 'Phá', type: 'hacDao', meaning: 'Xấu, chỉ tốt cho phá dỡ', score: 30 },
  { name: 'Nguy', type: 'hacDao', meaning: 'Xấu, cẩn thận mọi việc', score: 25 },
  { name: 'Thành', type: 'trungBinh', meaning: 'Tốt cho khai trương, giao dịch', score: 80 },
  { name: 'Thu', type: 'hacDao', meaning: 'Tốt cho thu hoạch, cất giữ', score: 40 },
  { name: 'Khai', type: 'trungBinh', meaning: 'Tốt cho khai trương, nhập học', score: 78 },
  { name: 'Bế', type: 'hacDao', meaning: 'Xấu, chỉ tốt cho đắp đê, lấp hố', score: 35 }
];

// Bản dịch Festival từ tiếng Trung sang tiếng Việt
const FESTIVAL_TRANSLATIONS = {
  // Dương lịch
  '元旦节': 'Tết Dương Lịch',
  '元旦': 'Tết Dương Lịch',
  '情人节': 'Lễ Tình Nhân',
  '妇女节': 'Quốc tế Phụ nữ',
  '国际妇女节': 'Quốc tế Phụ nữ',
  '植树节': 'Ngày Trồng cây',
  '愚人节': 'Ngày Cá tháng Tư',
  '劳动节': 'Quốc tế Lao động',
  '国际劳动节': 'Quốc tế Lao động',
  '青年节': 'Ngày Thanh niên',
  '儿童节': 'Quốc tế Thiếu nhi',
  '国际儿童节': 'Quốc tế Thiếu nhi',
  '教师节': 'Ngày Nhà giáo',
  '国庆节': 'Quốc khánh',
  '圣诞节': 'Lễ Giáng sinh',
  '平安夜': 'Đêm Giáng sinh',
  '母亲节': 'Ngày của Mẹ',
  '父亲节': 'Ngày của Cha',

  // Âm lịch
  '春节': 'Tết Nguyên Đán',
  '除夕': 'Đêm Giao thừa',
  '元宵节': 'Tết Nguyên Tiêu (Rằm tháng Giêng)',
  '龙抬头': 'Lễ Long Đề Đầu',
  '清明节': 'Tết Thanh Minh',
  '端午节': 'Tết Đoan Ngọ',
  '七夕节': 'Lễ Thất Tịch (Ngưu Lang - Chức Nữ)',
  '中元节': 'Lễ Vu Lan (Rằm tháng Bảy)',
  '中秋节': 'Tết Trung Thu',
  '重阳节': 'Tết Trùng Cửu',
  '寒衣节': 'Tết Hàn Y',
  '下元节': 'Tết Hạ Nguyên',
  '腊八节': 'Lễ Lạp Bát',
  '小年': 'Tết Ông Công Ông Táo',
  '祭灶节': 'Tết Ông Công Ông Táo',

  // Các ngày đặc biệt khác
  '驱傩日': 'Ngày Trừ Tà',
  '人日': 'Tết Nhân Nhật (Mùng 7)',
  '天公生': 'Vía Ngọc Hoàng',
  '观音诞': 'Vía Quan Âm',
  '佛诞': 'Lễ Phật Đản',
  '佛诞节': 'Lễ Phật Đản',
  '盂兰盆节': 'Lễ Vu Lan',
  '财神节': 'Ngày Vía Thần Tài',
  '龙母诞': 'Vía Long Mẫu',
  '关帝诞': 'Vía Quan Công',
  '天后诞': 'Vía Thiên Hậu',

  // Tiết khí
  '立春': 'Lập Xuân',
  '雨水': 'Vũ Thủy',
  '惊蛰': 'Kinh Trập',
  '春分': 'Xuân Phân',
  '清明': 'Thanh Minh',
  '谷雨': 'Cốc Vũ',
  '立夏': 'Lập Hạ',
  '小满': 'Tiểu Mãn',
  '芒种': 'Mang Chủng',
  '夏至': 'Hạ Chí',
  '小暑': 'Tiểu Thử',
  '大暑': 'Đại Thử',
  '立秋': 'Lập Thu',
  '处暑': 'Xử Thử',
  '白露': 'Bạch Lộ',
  '秋分': 'Thu Phân',
  '寒露': 'Hàn Lộ',
  '霜降': 'Sương Giáng',
  '立冬': 'Lập Đông',
  '小雪': 'Tiểu Tuyết',
  '大雪': 'Đại Tuyết',
  '冬至': 'Đông Chí',
  '小寒': 'Tiểu Hàn',
  '大寒': 'Đại Hàn',

  // Các ngày lễ khác
  '填仓节': 'Ngày Điền Thương',
  '社日节': 'Tết Xã Nhật',
  '花朝节': 'Tết Hoa Triêu',
  '上巳节': 'Tết Thượng Tỵ',
  '寒食节': 'Tết Hàn Thực',
  '浴佛节': 'Lễ Tắm Phật',
  '碧霞元君诞': 'Vía Bích Hà Nguyên Quân',
  '药王诞': 'Vía Dược Vương',
  '火把节': 'Lễ Đuốc Lửa',
  '姑姑节': 'Ngày Cô',
  '天医节': 'Ngày Thiên Y',
  '天贶节': 'Ngày Thiên Huống',
  '翻经节': 'Ngày Phiên Kinh',
  '地藏节': 'Vía Địa Tạng',
  '祭祖节': 'Ngày Tế Tổ',
  '北帝诞': 'Vía Bắc Đế',
};

// Bản dịch hoạt động (宜/忌 - Nên/Kiêng)
const ACTIVITY_TRANSLATIONS = {
  // Các hoạt động phổ biến
  '嫁娶': 'Cưới hỏi',
  '结婚': 'Kết hôn',
  '订婚': 'Đính hôn',
  '订盟': 'Giao ước',
  '纳采': 'Nạp thái (xin cưới)',
  '问名': 'Hỏi tên',
  '纳吉': 'Nạp cát',
  '纳征': 'Nạp trưng',
  '请期': 'Xin ngày cưới',
  '亲迎': 'Đón dâu',

  '祭祀': 'Cúng tế',
  '祈福': 'Cầu phúc',
  '求嗣': 'Cầu tự',
  '开光': 'Khai quang',
  '塑绘': 'Tạc tượng',
  '斋醮': 'Trai đàn',
  '酬神': 'Tạ thần',
  '许愿': 'Hứa nguyện',

  '出行': 'Xuất hành',
  '入宅': 'Nhập trạch',
  '移徙': 'Dời nhà',
  '安床': 'An giường',
  '安香': 'An hương',
  '安门': 'An cửa',
  '修造': 'Sửa chữa',
  '动土': 'Động thổ',
  '起基': 'Đặt móng',
  '竖柱': 'Dựng cột',
  '上梁': 'Thượng lương',
  '盖屋': 'Lợp nhà',
  '作灶': 'Đặt bếp',
  '拆卸': 'Tháo dỡ',
  '破土': 'Phá thổ',
  '启钻': 'Khởi toán',
  '安葬': 'An táng',
  '入殓': 'Liệm',
  '移柩': 'Di quan',
  '除服': 'Trừ phục',
  '成服': 'Thành phục',
  '谢土': 'Tạ thổ',

  '开业': 'Khai trương',
  '开市': 'Mở cửa hàng',
  '开张': 'Khai trương',
  '挂匾': 'Treo biển',
  '立券': 'Lập khế',
  '交易': 'Giao dịch',
  '纳财': 'Thu tiền',
  '纳畜': 'Nuôi gia súc',
  '牧养': 'Chăn nuôi',
  '造畜稠': 'Làm chuồng',

  '栽种': 'Trồng trọt',
  '种植': 'Trồng cây',
  '破屋': 'Phá nhà',
  '坏垣': 'Phá tường',
  '补垣': 'Đắp tường',
  '填塘': 'Lấp ao',
  '平治道涂': 'San đường',
  '伐木': 'Chặt gỗ',
  '作梁': 'Làm đòn',

  '纳婿': 'Nhận rể',
  '冠笄': 'Đội mũ',
  '进人口': 'Nhận người',
  '裁衣': 'Cắt áo',
  '合帐': 'Hợp màn',
  '结网': 'Đan lưới',
  '安机': 'An máy',
  '经络': 'Dệt cửi',
  '酝酿': 'Ủ rượu',
  '造酒': 'Nấu rượu',
  '造车器': 'Làm xe',
  '雕刻': 'Điêu khắc',
  '造船': 'Đóng thuyền',

  '理发': 'Cắt tóc',
  '整手足甲': 'Cắt móng',
  '冠带': 'Đội mũ',
  '沐浴': 'Tắm gội',

  '解除': 'Giải trừ',
  '求医': 'Cầu y',
  '治病': 'Chữa bệnh',
  '针灸': 'Châm cứu',
  '服药': 'Uống thuốc',

  '捕捉': 'Bắt',
  '畋猎': 'Săn bắn',
  '取渔': 'Đánh cá',
  '掘井': 'Đào giếng',
  '穿井': 'Khoan giếng',
  '开渠': 'Đào mương',
  '开池': 'Đào ao',
  '作陂': 'Đắp đê',
  '放水': 'Xả nước',

  '修饰垣墙': 'Sửa tường',
  '平治道途': 'San đường',
  '修仓': 'Sửa kho',
  '开仓': 'Mở kho',
  '入学': 'Nhập học',
  '习艺': 'Học nghề',

  '会亲友': 'Gặp bạn bè',
  '会友': 'Gặp bạn',
  '出火': 'Xuất hỏa',
  '安碓硙': 'Đặt cối',

  '余事勿取': 'Không nên làm việc khác',
  '诸事不宜': 'Mọi việc không nên',
  '无': 'Không có',
  '日值受死': 'Ngày Thọ Tử',
  '大事不宜': 'Không nên việc lớn',

  '开仓库': 'Mở kho',
  '出货财': 'Xuất hàng',
  '嫁娶结婚': 'Cưới hỏi',
  '祈福求嗣': 'Cầu phúc cầu tự',
  '动土修造': 'Động thổ sửa chữa',
  '安葬入殓': 'An táng liệm',
  '移徙入宅': 'Dời nhà nhập trạch',
  '开业开市': 'Khai trương',
  '交易立券': 'Giao dịch lập khế',
  '栽种牧养': 'Trồng trọt chăn nuôi',

  // Thần sát (吉神 - Cát thần)
  '天德': 'Thiên Đức',
  '月德': 'Nguyệt Đức',
  '天德合': 'Thiên Đức Hợp',
  '月德合': 'Nguyệt Đức Hợp',
  '天恩': 'Thiên Ân',
  '天赦': 'Thiên Xá',
  '天愿': 'Thiên Nguyện',
  '月恩': 'Nguyệt Ân',
  '四相': 'Tứ Tướng',
  '时德': 'Thời Đức',
  '相日': 'Tương Nhật',
  '驿马': 'Dịch Mã',
  '天马': 'Thiên Mã',
  '福德': 'Phúc Đức',
  '圣心': 'Thánh Tâm',
  '益后': 'Ích Hậu',
  '续世': 'Tục Thế',
  '明堂': 'Minh Đường',
  '金堂': 'Kim Đường',
  '金匮': 'Kim Quỹ',
  '天贵': 'Thiên Quý',
  '宝光': 'Bảo Quang',
  '玉宇': 'Ngọc Vũ',
  '龙德': 'Long Đức',
  '玉堂': 'Ngọc Đường',
  '司命': 'Tư Mệnh',
  '青龙': 'Thanh Long',
  '天喜': 'Thiên Hỷ',
  '天医': 'Thiên Y',
  '天仓': 'Thiên Thương',
  '不将': 'Bất Tương',
  '五合': 'Ngũ Hợp',
  '六合': 'Lục Hợp',
  '普护': 'Phổ Hộ',
  '生气': 'Sinh Khí',
  '解神': 'Giải Thần',
  '三合': 'Tam Hợp',
  '临日': 'Lâm Nhật',
  '天巫': 'Thiên Vu',
  '要安': 'Yếu An',
  '鸣吠': 'Minh Phệ',
  '鸣吠对': 'Minh Phệ Đối',
  '母仓': 'Mẫu Thương',
  '活曜': 'Hoạt Diệu',
  '官日': 'Quan Nhật',
  '吉期': 'Cát Kỳ',
  '阳德': 'Dương Đức',
  '阴德': 'Âm Đức',
  '守日': 'Thủ Nhật',
  '天成': 'Thiên Thành',

  // Thần sát (凶煞 - Hung sát)
  '天刑': 'Thiên Hình',
  '天火': 'Thiên Hỏa',
  '天吏': 'Thiên Lại',
  '大时': 'Đại Thời',
  '大败': 'Đại Bại',
  '咸池': 'Hàm Trì',
  '朱雀': 'Chu Tước',
  '白虎': 'Bạch Hổ',
  '天牢': 'Thiên Lao',
  '玄武': 'Huyền Vũ',
  '勾陈': 'Câu Trần',
  '元武': 'Nguyên Vũ',
  '天狗': 'Thiên Cẩu',
  '死神': 'Tử Thần',
  '死气': 'Tử Khí',
  '游祸': 'Du Họa',
  '五虚': 'Ngũ Hư',
  '五离': 'Ngũ Ly',
  '九空': 'Cửu Không',
  '九坎': 'Cửu Khảm',
  '九焦': 'Cửu Tiêu',
  '土府': 'Thổ Phủ',
  '土瘟': 'Thổ Ôn',
  '土符': 'Thổ Phù',
  '土忌': 'Thổ Kỵ',
  '大煞': 'Đại Sát',
  '月煞': 'Nguyệt Sát',
  '月虚': 'Nguyệt Hư',
  '月害': 'Nguyệt Hại',
  '月刑': 'Nguyệt Hình',
  '月厌': 'Nguyệt Yếm',
  '月破': 'Nguyệt Phá',
  '血忌': 'Huyết Kỵ',
  '血支': 'Huyết Chi',
  '天贼': 'Thiên Tặc',
  '五墓': 'Ngũ Mộ',
  '河魁': 'Hà Khôi',
  '劫煞': 'Kiếp Sát',
  '灾煞': 'Tai Sát',
  '岁煞': 'Tuế Sát',
  '厌对': 'Yếm Đối',
  '招摇': 'Chiêu Dao',
  '归忌': 'Quy Kỵ',
  '重日': 'Trùng Nhật',
  '复日': 'Phục Nhật',
  '往亡': 'Vãng Vong',
  '四废': 'Tứ Phế',
  '四穷': 'Tứ Cùng',
  '四绝': 'Tứ Tuyệt',
  '四忌': 'Tứ Kỵ',
  '四耗': 'Tứ Hao',
  '八专': 'Bát Chuyên',
  '刀砧': 'Đao Châm',
  '触水龙': 'Xúc Thủy Long',
  '小耗': 'Tiểu Hao',
  '大耗': 'Đại Hao',
  '八座': 'Bát Tọa',
  '横天': 'Hoành Thiên',
  '天罡': 'Thiên Cương',
  '受死': 'Thọ Tử',
  '天穷': 'Thiên Cùng',
  '离巢': 'Ly Sào',
  '孤辰': 'Cô Thần',
  '寡宿': 'Quả Túc',
  '阴错': 'Âm Thác',
  '阳错': 'Dương Thác',
  '绝阴': 'Tuyệt Âm',
  '绝阳': 'Tuyệt Dương',
  '行狠': 'Hành Ngận',
  '了戾': 'Liễu Lệ',
  '地火': 'Địa Hỏa',
  '独火': 'Độc Hỏa'
};

// 28 Sao (Nhị Thập Bát Tú)
const SAO_LIST = [
  { name: 'Giác', element: 'Mộc', animal: 'Giao', type: 'tot', meaning: 'Tốt cho xây dựng, cưới hỏi' },
  { name: 'Cang', element: 'Kim', animal: 'Long', type: 'xau', meaning: 'Kỵ mai táng, xây cất' },
  { name: 'Đê', element: 'Thổ', animal: 'Lạc', type: 'xau', meaning: 'Kỵ cưới hỏi, khai trương' },
  { name: 'Phòng', element: 'Nhật', animal: 'Thố', type: 'tot', meaning: 'Tốt cho mọi việc' },
  { name: 'Tâm', element: 'Nguyệt', animal: 'Hồ', type: 'xau', meaning: 'Kỵ mọi việc lớn' },
  { name: 'Vĩ', element: 'Hỏa', animal: 'Hổ', type: 'tot', meaning: 'Tốt cho cưới hỏi, khai trương' },
  { name: 'Cơ', element: 'Thủy', animal: 'Báo', type: 'tot', meaning: 'Tốt cho xây dựng, mai táng' },
  { name: 'Đẩu', element: 'Mộc', animal: 'Giải', type: 'tot', meaning: 'Đại cát, tốt mọi việc' },
  { name: 'Ngưu', element: 'Kim', animal: 'Ngưu', type: 'tot', meaning: 'Tốt cho cưới hỏi, giao dịch' },
  { name: 'Nữ', element: 'Thổ', animal: 'Bức', type: 'xau', meaning: 'Kỵ cưới hỏi, khai trương' },
  { name: 'Hư', element: 'Nhật', animal: 'Thử', type: 'xau', meaning: 'Kỵ mọi việc, chỉ tốt cho cúng tế' },
  { name: 'Nguy', element: 'Nguyệt', animal: 'Yến', type: 'xau', meaning: 'Kỵ mọi việc lớn' },
  { name: 'Thất', element: 'Hỏa', animal: 'Trư', type: 'tot', meaning: 'Tốt cho xây dựng, lập nghiệp' },
  { name: 'Bích', element: 'Thủy', animal: 'Du', type: 'tot', meaning: 'Tốt cho cưới hỏi, xây nhà' },
  { name: 'Khuê', element: 'Mộc', animal: 'Lang', type: 'xau', meaning: 'Kỵ cưới hỏi, xây cất' },
  { name: 'Lâu', element: 'Kim', animal: 'Cẩu', type: 'tot', meaning: 'Tốt cho cưới hỏi, khai trương' },
  { name: 'Vị', element: 'Thổ', animal: 'Trĩ', type: 'tot', meaning: 'Tốt cho xây dựng, giao dịch' },
  { name: 'Mão', element: 'Nhật', animal: 'Kê', type: 'xau', meaning: 'Kỵ cưới hỏi, khởi công' },
  { name: 'Tất', element: 'Nguyệt', animal: 'Ô', type: 'tot', meaning: 'Đại cát, tốt mọi việc' },
  { name: 'Chủy', element: 'Hỏa', animal: 'Hầu', type: 'xau', meaning: 'Kỵ mọi việc lớn' },
  { name: 'Sâm', element: 'Thủy', animal: 'Viên', type: 'tot', meaning: 'Tốt cho cưới hỏi, xây nhà' },
  { name: 'Tỉnh', element: 'Mộc', animal: 'Ngạn', type: 'tot', meaning: 'Tốt cho xây dựng' },
  { name: 'Quỷ', element: 'Kim', animal: 'Dương', type: 'xau', meaning: 'Đại hung, kỵ mọi việc' },
  { name: 'Liễu', element: 'Thổ', animal: 'Chương', type: 'xau', meaning: 'Kỵ cưới hỏi, mai táng' },
  { name: 'Tinh', element: 'Nhật', animal: 'Mã', type: 'xau', meaning: 'Kỵ xây dựng, động thổ' },
  { name: 'Trương', element: 'Nguyệt', animal: 'Lộc', type: 'tot', meaning: 'Tốt cho cưới hỏi, khai trương' },
  { name: 'Dực', element: 'Hỏa', animal: 'Xà', type: 'tot', meaning: 'Tốt cho xây dựng, nhập trạch' },
  { name: 'Chẩn', element: 'Thủy', animal: 'Dẫn', type: 'tot', meaning: 'Tốt cho cưới hỏi, an táng' }
];

// Giờ Hoàng Đạo theo Chi ngày
const HOANG_DAO_MAP = {
  '子': ['子', '丑', '卯', '午', '未', '酉'],
  '丑': ['寅', '卯', '巳', '申', '酉', '亥'],
  '寅': ['子', '丑', '辰', '巳', '未', '戌'],
  '卯': ['子', '寅', '卯', '午', '未', '酉'],
  '辰': ['丑', '辰', '巳', '未', '戌', '亥'],
  '巳': ['子', '寅', '辰', '巳', '申', '酉'],
  '午': ['子', '丑', '卯', '午', '未', '酉'],
  '未': ['寅', '卯', '巳', '申', '酉', '亥'],
  '申': ['子', '丑', '辰', '巳', '未', '戌'],
  '酉': ['子', '寅', '卯', '午', '未', '酉'],
  '戌': ['丑', '辰', '巳', '未', '戌', '亥'],
  '亥': ['子', '寅', '辰', '巳', '申', '酉']
};

// Thông tin 12 canh giờ
const GIO_INFO = [
  { chi: '子', name: 'Tý', start: 23, end: 1, period: '23:00 - 01:00' },
  { chi: '丑', name: 'Sửu', start: 1, end: 3, period: '01:00 - 03:00' },
  { chi: '寅', name: 'Dần', start: 3, end: 5, period: '03:00 - 05:00' },
  { chi: '卯', name: 'Mão', start: 5, end: 7, period: '05:00 - 07:00' },
  { chi: '辰', name: 'Thìn', start: 7, end: 9, period: '07:00 - 09:00' },
  { chi: '巳', name: 'Tỵ', start: 9, end: 11, period: '09:00 - 11:00' },
  { chi: '午', name: 'Ngọ', start: 11, end: 13, period: '11:00 - 13:00' },
  { chi: '未', name: 'Mùi', start: 13, end: 15, period: '13:00 - 15:00' },
  { chi: '申', name: 'Thân', start: 15, end: 17, period: '15:00 - 17:00' },
  { chi: '酉', name: 'Dậu', start: 17, end: 19, period: '17:00 - 19:00' },
  { chi: '戌', name: 'Tuất', start: 19, end: 21, period: '19:00 - 21:00' },
  { chi: '亥', name: 'Hợi', start: 21, end: 23, period: '21:00 - 23:00' }
];

class LunarCalendarEngine {
  /**
   * Dịch festival từ tiếng Trung sang tiếng Việt
   */
  translateFestival(chineseName) {
    return FESTIVAL_TRANSLATIONS[chineseName] || chineseName;
  }

  /**
   * Dịch mảng festivals
   */
  translateFestivals(festivals) {
    if (!festivals || !Array.isArray(festivals)) return [];
    return festivals.map(f => this.translateFestival(f));
  }

  /**
   * Dịch hoạt động từ tiếng Trung sang tiếng Việt
   */
  translateActivity(chineseName) {
    return ACTIVITY_TRANSLATIONS[chineseName] || chineseName;
  }

  /**
   * Dịch mảng activities
   */
  translateActivities(activities) {
    if (!activities || !Array.isArray(activities)) return [];
    return activities.map(a => this.translateActivity(a));
  }

  /**
   * Lấy thông tin đầy đủ cho một ngày
   */
  getFullDayInfo(year, month, day) {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();

    const dayChi = lunar.getDayZhi();
    const monthChi = lunar.getMonthZhi();

    return {
      // Dương lịch
      solar: {
        year: solar.getYear(),
        month: solar.getMonth(),
        day: solar.getDay(),
        weekDay: solar.getWeek(),
        weekDayName: this.getWeekDayName(solar.getWeek()),
        isWeekend: solar.getWeek() === 0 || solar.getWeek() === 6,
        isSunday: solar.getWeek() === 0,
        dateStr: this.formatSolarDate(solar.getYear(), solar.getMonth(), solar.getDay())
      },

      // Âm lịch
      lunar: {
        year: lunar.getYear(),
        month: lunar.getMonth(),
        day: lunar.getDay(),
        monthName: this.getLunarMonthName(lunar.getMonth()),
        dayName: this.getLunarDayName(lunar.getDay()),
        isLeapMonth: lunar.getMonth() < 0,
        yearNameChinese: lunar.getYearInChinese(),
        monthNameChinese: lunar.getMonthInChinese(),
        dayNameChinese: lunar.getDayInChinese(),
        isMungMot: lunar.getDay() === 1,
        isRam: lunar.getDay() === 15
      },

      // Can Chi
      canChi: {
        year: this.convertCanChi(lunar.getYearInGanZhi()),
        month: this.convertCanChi(lunar.getMonthInGanZhi()),
        day: this.convertCanChi(lunar.getDayInGanZhi()),
        yearChinese: lunar.getYearInGanZhi(),
        monthChinese: lunar.getMonthInGanZhi(),
        dayChinese: lunar.getDayInGanZhi(),
        yearCan: CAN_VIETNAMESE[lunar.getYearGan()] || lunar.getYearGan(),
        yearChi: CHI_VIETNAMESE[lunar.getYearZhi()] || lunar.getYearZhi(),
        dayCan: CAN_VIETNAMESE[lunar.getDayGan()] || lunar.getDayGan(),
        dayChi: CHI_VIETNAMESE[dayChi] || dayChi
      },

      // Con giáp
      zodiac: {
        year: this.getVietnameseZodiac(lunar.getYearZhi()),
        yearChinese: lunar.getYearShengXiao(),
        yearEmoji: CHI_EMOJIS[lunar.getYearZhi()] || '🔮'
      },

      // Ngũ hành Nạp Âm
      napAm: {
        year: lunar.getYearNaYin(),
        month: lunar.getMonthNaYin(),
        day: lunar.getDayNaYin()
      },

      // Tiết khí
      jieQi: {
        current: lunar.getJieQi(),
        currentInfo: this.getJieQiInfo(lunar.getJieQi()),
        next: lunar.getNextJieQi()?.getName() || null,
        prev: lunar.getPrevJieQi()?.getName() || null
      },

      // Ngày đặc biệt (đã dịch sang tiếng Việt)
      festivals: {
        solar: this.translateFestivals(solar.getFestivals()),
        lunar: this.translateFestivals(lunar.getFestivals()),
        other: this.translateFestivals(lunar.getOtherFestivals())
      },

      // Trực (12 Trực)
      truc: this.getTruc(monthChi, dayChi),

      // Sao (28 Sao)
      sao: this.getSao(lunar),

      // Giờ Hoàng Đạo
      hoangDao: this.getHoangDaoHours(dayChi),

      // Ngày tốt xấu
      dayQuality: this.getDayQuality(lunar, monthChi, dayChi),

      // Việc nên làm / không nên làm (đã dịch sang tiếng Việt)
      activities: {
        good: this.translateActivities(lunar.getDayYi()),
        bad: this.translateActivities(lunar.getDayJi())
      },

      // Thần sát (đã dịch sang tiếng Việt)
      spirits: {
        good: this.translateActivities(lunar.getDayJiShen()),
        bad: this.translateActivities(lunar.getDayXiongSha())
      },

      // Xung khắc
      clash: {
        zodiac: this.getClashZodiac(dayChi),
        zodiacChinese: lunar.getDayChong(),
        evil: lunar.getDaySha(),
        evilDirection: this.getEvilDirection(lunar.getDaySha())
      },

      // Pha trăng
      moonPhase: this.getMoonPhase(lunar.getDay())
    };
  }

  /**
   * Chuyển Can Chi từ chữ Hán sang tiếng Việt
   */
  convertCanChi(ganZhi) {
    if (!ganZhi || ganZhi.length < 2) return ganZhi;
    const can = CAN_VIETNAMESE[ganZhi[0]] || ganZhi[0];
    const chi = CHI_VIETNAMESE[ganZhi[1]] || ganZhi[1];
    return `${can} ${chi}`;
  }

  /**
   * Tên thứ tiếng Việt
   */
  getWeekDayName(weekDay) {
    const names = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return names[weekDay];
  }

  /**
   * Tên tháng Âm lịch tiếng Việt
   */
  getLunarMonthName(month) {
    const absMonth = Math.abs(month);
    const names = ['', 'Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu',
      'Bảy', 'Tám', 'Chín', 'Mười', 'Một', 'Chạp'];
    const prefix = month < 0 ? 'Nhuận ' : '';
    return prefix + 'Tháng ' + names[absMonth];
  }

  /**
   * Tên ngày Âm lịch tiếng Việt
   */
  getLunarDayName(day) {
    if (day === 1) return 'Mùng Một';
    if (day <= 10) return 'Mùng ' + this.numberToVietnamese(day);
    if (day <= 20) return this.numberToVietnamese(day);
    if (day === 21) return 'Hăm Mốt';
    if (day <= 29) return 'Hăm ' + this.numberToVietnamese(day - 20);
    return 'Ba Mươi';
  }

  /**
   * Chuyển số sang tiếng Việt
   */
  numberToVietnamese(num) {
    const ones = ['', 'Một', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười'];
    if (num <= 10) return ones[num];
    if (num < 20) return 'Mười ' + (num === 15 ? 'Lăm' : ones[num - 10]);
    const tens = Math.floor(num / 10);
    const unit = num % 10;
    let result = ones[tens] + ' Mươi';
    if (unit === 1) result += ' Mốt';
    else if (unit === 5) result += ' Lăm';
    else if (unit > 0) result += ' ' + ones[unit];
    return result;
  }

  /**
   * Lấy con giáp tiếng Việt
   */
  getVietnameseZodiac(chi) {
    const zodiacNames = {
      '子': 'Tý (Chuột)', '丑': 'Sửu (Trâu)', '寅': 'Dần (Hổ)', '卯': 'Mão (Mèo)',
      '辰': 'Thìn (Rồng)', '巳': 'Tỵ (Rắn)', '午': 'Ngọ (Ngựa)', '未': 'Mùi (Dê)',
      '申': 'Thân (Khỉ)', '酉': 'Dậu (Gà)', '戌': 'Tuất (Chó)', '亥': 'Hợi (Lợn)'
    };
    return zodiacNames[chi] || chi;
  }

  /**
   * Lấy 12 Trực trong ngày
   */
  getTruc(monthChi, dayChi) {
    const monthIdx = CHI_ORDER.indexOf(monthChi);
    const dayIdx = CHI_ORDER.indexOf(dayChi);

    if (monthIdx === -1 || dayIdx === -1) {
      return TRUC_LIST[0];
    }

    const trucIdx = (dayIdx - monthIdx + 12) % 12;
    return { ...TRUC_LIST[trucIdx], index: trucIdx };
  }

  /**
   * Lấy 28 Sao trong ngày
   */
  getSao(lunar) {
    // Tính index dựa trên ngày Julian
    const jd = this.getJulianDay(
      lunar.getSolar().getYear(),
      lunar.getSolar().getMonth(),
      lunar.getSolar().getDay()
    );
    const index = Math.floor(jd) % 28;
    return { ...SAO_LIST[index], index };
  }

  /**
   * Tính Julian Day Number
   */
  getJulianDay(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y +
      Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  /**
   * Lấy giờ Hoàng Đạo trong ngày
   */
  getHoangDaoHours(dayChi) {
    const hoangDaoChis = HOANG_DAO_MAP[dayChi] || [];

    return GIO_INFO.map(gio => ({
      ...gio,
      isHoangDao: hoangDaoChis.includes(gio.chi),
      type: hoangDaoChis.includes(gio.chi) ? 'hoangDao' : 'hacDao'
    }));
  }

  /**
   * Đánh giá chất lượng ngày
   */
  getDayQuality(lunar, monthChi, dayChi) {
    const truc = this.getTruc(monthChi, dayChi);
    const sao = this.getSao(lunar);
    const goodActivities = lunar.getDayYi() || [];
    const badActivities = lunar.getDayJi() || [];

    let score = 50;

    // Cộng điểm theo Trực
    if (truc.type === 'hoangDao') score += 25;
    else if (truc.type === 'hacDao') score -= 15;
    else score += 10;

    // Cộng điểm theo Sao
    if (sao.type === 'tot') score += 15;
    else score -= 10;

    // Cộng điểm theo số việc tốt
    score += Math.min(goodActivities.length * 2, 15);

    // Trừ điểm theo số việc xấu
    score -= Math.min(badActivities.length, 10);

    score = Math.max(0, Math.min(100, score));

    let label, color, emoji;
    if (score >= 85) {
      label = 'Đại Cát';
      color = 'gold';
      emoji = '⭐';
    } else if (score >= 70) {
      label = 'Tốt';
      color = 'green';
      emoji = '●';
    } else if (score >= 50) {
      label = 'Bình';
      color = 'blue';
      emoji = '○';
    } else {
      label = 'Xấu';
      color = 'red';
      emoji = '✗';
    }

    return { score, label, color, emoji };
  }

  /**
   * Lấy con giáp xung
   */
  getClashZodiac(dayChi) {
    const clashMap = {
      '子': 'Ngọ (Ngựa)', '丑': 'Mùi (Dê)', '寅': 'Thân (Khỉ)', '卯': 'Dậu (Gà)',
      '辰': 'Tuất (Chó)', '巳': 'Hợi (Lợn)', '午': 'Tý (Chuột)', '未': 'Sửu (Trâu)',
      '申': 'Dần (Hổ)', '酉': 'Mão (Mèo)', '戌': 'Thìn (Rồng)', '亥': 'Tỵ (Rắn)'
    };
    return clashMap[dayChi] || '';
  }

  /**
   * Lấy hướng Sát
   */
  getEvilDirection(sha) {
    const directionMap = {
      '东': 'Phương Đông', '南': 'Phương Nam',
      '西': 'Phương Tây', '北': 'Phương Bắc'
    };
    if (!sha) return '';
    for (const [key, value] of Object.entries(directionMap)) {
      if (sha.includes(key)) return value;
    }
    return sha;
  }

  /**
   * Lấy pha trăng
   */
  getMoonPhase(lunarDay) {
    if (lunarDay === 1) return { phase: 'newMoon', emoji: '🌑', name: 'Trăng non' };
    if (lunarDay <= 7) return { phase: 'waxingCrescent', emoji: '🌒', name: 'Trăng lưỡi liềm đầu tháng' };
    if (lunarDay === 8) return { phase: 'firstQuarter', emoji: '🌓', name: 'Bán nguyệt đầu tháng' };
    if (lunarDay <= 14) return { phase: 'waxingGibbous', emoji: '🌔', name: 'Trăng khuyết đầu' };
    if (lunarDay === 15) return { phase: 'fullMoon', emoji: '🌕', name: 'Trăng tròn (Rằm)' };
    if (lunarDay <= 22) return { phase: 'waningGibbous', emoji: '🌖', name: 'Trăng khuyết sau' };
    if (lunarDay === 23) return { phase: 'lastQuarter', emoji: '🌗', name: 'Bán nguyệt cuối tháng' };
    return { phase: 'waningCrescent', emoji: '🌘', name: 'Trăng lưỡi liềm cuối tháng' };
  }

  /**
   * Thông tin tiết khí
   */
  getJieQiInfo(jieQi) {
    if (!jieQi) return null;

    const jieQiData = {
      '立春': { name: 'Lập Xuân', meaning: 'Bắt đầu mùa xuân' },
      '雨水': { name: 'Vũ Thủy', meaning: 'Mưa xuân' },
      '惊蛰': { name: 'Kinh Trập', meaning: 'Sâu bọ thức giấc' },
      '春分': { name: 'Xuân Phân', meaning: 'Giữa xuân' },
      '清明': { name: 'Thanh Minh', meaning: 'Trời trong sáng' },
      '谷雨': { name: 'Cốc Vũ', meaning: 'Mưa cho lúa' },
      '立夏': { name: 'Lập Hạ', meaning: 'Bắt đầu mùa hè' },
      '小满': { name: 'Tiểu Mãn', meaning: 'Lúa bắt đầu chín' },
      '芒种': { name: 'Mang Chủng', meaning: 'Gieo hạt' },
      '夏至': { name: 'Hạ Chí', meaning: 'Giữa hè' },
      '小暑': { name: 'Tiểu Thử', meaning: 'Nóng nhẹ' },
      '大暑': { name: 'Đại Thử', meaning: 'Nóng nhiều' },
      '立秋': { name: 'Lập Thu', meaning: 'Bắt đầu mùa thu' },
      '处暑': { name: 'Xử Thử', meaning: 'Hết nóng' },
      '白露': { name: 'Bạch Lộ', meaning: 'Sương trắng' },
      '秋分': { name: 'Thu Phân', meaning: 'Giữa thu' },
      '寒露': { name: 'Hàn Lộ', meaning: 'Sương lạnh' },
      '霜降': { name: 'Sương Giáng', meaning: 'Sương muối' },
      '立冬': { name: 'Lập Đông', meaning: 'Bắt đầu mùa đông' },
      '小雪': { name: 'Tiểu Tuyết', meaning: 'Tuyết nhỏ' },
      '大雪': { name: 'Đại Tuyết', meaning: 'Tuyết lớn' },
      '冬至': { name: 'Đông Chí', meaning: 'Giữa đông' },
      '小寒': { name: 'Tiểu Hàn', meaning: 'Rét nhẹ' },
      '大寒': { name: 'Đại Hàn', meaning: 'Rét đậm' }
    };

    return jieQiData[jieQi] || { name: jieQi, meaning: '' };
  }

  /**
   * Format ngày dương lịch
   */
  formatSolarDate(year, month, day) {
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  }

  /**
   * Lấy thông tin tháng
   */
  getMonthInfo(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayWeekDay = new Date(year, month - 1, 1).getDay();

    // Lấy thông tin âm lịch cho ngày đầu và cuối tháng
    const firstDaySolar = Solar.fromYmd(year, month, 1);
    const lastDaySolar = Solar.fromYmd(year, month, daysInMonth);
    const firstDayLunar = firstDaySolar.getLunar();
    const lastDayLunar = lastDaySolar.getLunar();

    return {
      solarYear: year,
      solarMonth: month,
      daysInMonth,
      firstDayWeekDay,
      lunarInfo: {
        startMonth: Math.abs(firstDayLunar.getMonth()),
        startDay: firstDayLunar.getDay(),
        endMonth: Math.abs(lastDayLunar.getMonth()),
        endDay: lastDayLunar.getDay(),
        yearGanZhi: this.convertCanChi(firstDayLunar.getYearInGanZhi()),
        yearGanZhiChinese: firstDayLunar.getYearInGanZhi(),
        zodiac: this.getVietnameseZodiac(firstDayLunar.getYearZhi()),
        zodiacEmoji: CHI_EMOJIS[firstDayLunar.getYearZhi()] || '🔮'
      }
    };
  }

  /**
   * Lấy các ngày lễ trong tháng (đã dịch sang tiếng Việt)
   */
  getHolidaysInMonth(year, month) {
    const holidays = [];
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const solar = Solar.fromYmd(year, month, day);
      const lunar = solar.getLunar();

      const solarFestivals = this.translateFestivals(solar.getFestivals());
      const lunarFestivals = this.translateFestivals(lunar.getFestivals());
      const otherFestivals = this.translateFestivals(lunar.getOtherFestivals());

      const allFestivals = [...solarFestivals, ...lunarFestivals, ...otherFestivals];

      if (allFestivals.length > 0) {
        holidays.push({
          solarDay: day,
          lunarMonth: Math.abs(lunar.getMonth()),
          lunarDay: lunar.getDay(),
          festivals: allFestivals,
          solarFestivals,
          lunarFestivals,
          otherFestivals
        });
      }
    }

    return holidays;
  }

  /**
   * Lấy thông tin năm
   */
  getYearInfo(year) {
    const lunarYear = LunarYear.fromYear(year);
    const firstSolar = Solar.fromYmd(year, 1, 1);
    const firstLunar = firstSolar.getLunar();

    return {
      solarYear: year,
      ganZhi: this.convertCanChi(firstLunar.getYearInGanZhi()),
      ganZhiChinese: firstLunar.getYearInGanZhi(),
      zodiac: this.getVietnameseZodiac(firstLunar.getYearZhi()),
      zodiacEmoji: CHI_EMOJIS[firstLunar.getYearZhi()] || '🔮',
      napAm: firstLunar.getYearNaYin(),
      leapMonth: lunarYear.getLeapMonth(),
      months: lunarYear.getMonths().map(m => ({
        month: m.getMonth(),
        isLeap: m.isLeap(),
        days: m.getDayCount()
      }))
    };
  }

  /**
   * Chuyển đổi ngày dương sang âm
   */
  solarToLunar(year, month, day) {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();
    return {
      year: lunar.getYear(),
      month: lunar.getMonth(),
      day: lunar.getDay(),
      isLeapMonth: lunar.getMonth() < 0
    };
  }

  /**
   * Chuyển đổi ngày âm sang dương
   */
  lunarToSolar(year, month, day, isLeapMonth = false) {
    const lunarMonth = isLeapMonth ? -Math.abs(month) : Math.abs(month);
    const lunar = Lunar.fromYmd(year, lunarMonth, day);
    const solar = lunar.getSolar();
    return {
      year: solar.getYear(),
      month: solar.getMonth(),
      day: solar.getDay()
    };
  }

  /**
   * Lấy thông tin hôm nay
   */
  getToday() {
    const now = new Date();
    return this.getFullDayInfo(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }
}

// Export singleton instance
export const lunarEngine = new LunarCalendarEngine();
export default lunarEngine;
