export const types = ['사회복지시설', '지방자치단체'] as const;

export type Type = typeof types[number];

export type District = Readonly<{
  center: readonly string[];
  department: readonly string[];
}>;

export type Category = keyof District;

export const gangnam: District = {
  center: [
    '개포1동',
    '개포2동',
    '개포4동',
    '논현1동',
    '논현2동',
    '대치1동',
    '대치2동',
    '대치4동',
    '도곡1동',
    '도곡2동',
    '삼성1동',
    '삼성2동',
    '세곡동',
    '수서동',
    '신사동',
    '압구정동',
    '역삼1동',
    '역삼2동',
    '일원1동',
    '일원2동',
    '일원본동',
    '청담동',
  ],
  department: [
    '건강관리과',
    '건설관리과',
    '건축과',
    '공동주택과',
    '공원녹지과',
    '관광진흥과',
    '교육지원과',
    '교통행정과',
    '기획예산과',
    '뉴디자인과',
    '도로관리과',
    '도시계획과',
    '도시계획상임기획단',
    '문화체육과',
    '민원여권과',
    '보건행정과',
    '보육지원과',
    '복지정책과',
    '부동산정보과',
    '사회복지과',
    '세곡보건지소',
    '세무1과',
    '세무2과',
    '세무관리과',
    '스마트도시과',
    '어르신복지과',
    '여성가족과',
    '위생과',
    '의약과',
    '일자리정책과',
    '자동차민원과',
    '재건축사업과',
    '재난안전과',
    '재무과',
    '전산정보과',
    '주민자치과',
    '주차관리과',
    '지역경제과',
    '질병관리과',
    '청소행정과',
    '총무과',
    '치수과',
    '환경과',
  ],
} as const;
