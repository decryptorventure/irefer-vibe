import { Reward } from '@/types';

export const mockRewards: Reward[] = [
  { id: 'R001', name: 'Grab Voucher 100k',      description: 'Voucher Grab cho đặt xe và giao đồ ăn.',    pointsCost: 200,  category: 'voucher',    stock: 10,   isAvailable: true  },
  { id: 'R002', name: 'Shopee Voucher 200k',    description: 'Voucher mua sắm trên Shopee.',               pointsCost: 400,  category: 'voucher',    stock: 5,    isAvailable: true  },
  { id: 'R003', name: 'Hộp snack văn phòng',    description: 'Hộp snack tổng hợp dành riêng cho bạn.',    pointsCost: 100,  category: 'gift',       stock: 20,   isAvailable: true  },
  { id: 'R004', name: 'Vé xem phim CGV (2 vé)', description: '2 vé xem phim bất kỳ tại CGV toàn quốc.',  pointsCost: 300,  category: 'experience', stock: 8,    isAvailable: true  },
  { id: 'R005', name: 'Thưởng tiền mặt 500k',   description: 'Chuyển khoản trực tiếp vào tài khoản.',     pointsCost: 1000, category: 'cash',       stock: null, isAvailable: true  },
  { id: 'R006', name: 'Thưởng tiền mặt 1 triệu',description: 'Chuyển khoản trực tiếp vào tài khoản.',     pointsCost: 2000, category: 'cash',       stock: null, isAvailable: true  },
  { id: 'R007', name: 'Cà phê Highlands (10 ly)',description: 'Thẻ nạp 10 ly cà phê tại Highlands.',      pointsCost: 150,  category: 'voucher',    stock: 15,   isAvailable: true  },
  { id: 'R008', name: 'Khoá học Udemy',          description: 'Voucher mua 1 khoá học bất kỳ trên Udemy.', pointsCost: 250,  category: 'experience', stock: 0,    isAvailable: false },
];
