// ── 共用型別 & 資料 ──────────────────────────────────────

export interface MenuItem {
  id: string
  line1: string
  line2: string
  icon: string
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 'organic',    line1: '有機', line2: '化學', icon: '⬡'  },
  { id: 'inorganic',  line1: '無機', line2: '化學', icon: '⚛'  },
  { id: 'analytical', line1: '分析', line2: '化學', icon: '⚗'  },
  { id: 'pharma',     line1: '藥用', line2: '化學', icon: '💊' },
]

export const PAGE_TITLES: Record<string, string> = {
  organic:    '有機化學',
  inorganic:  '無機化學',
  analytical: '分析化學',
  pharma:     '藥用化學',
  results:    '成果分析',
}