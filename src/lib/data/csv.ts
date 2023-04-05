import { json2csv } from 'json-2-csv';

import { agentStoreByName } from '../stores/agent';
import { organizationStore } from '../stores/organization';

import type { AgentData } from '../stores/agent';
import type { OrganizationData } from '../stores/organization';

export type Data = {
  연월: string;
  도시: string;
  구: string;
  소속: string;
  구분: string;
  이름: string;
  출장: number;
  교육: number;
  연가: number;
  오전반가: number;
  오후반가: number;
  병가: number;
  공가: number;
  청원휴가: number;
  특별휴가: number;
  초과결근: number;
  초과병가: number;
  복무이탈: number;
  분할복무: number;
};

export const generateData = (): Data[] => {
  let organization: OrganizationData;
  let agent: AgentData[];

  organizationStore.subscribe((data) => { organization = data; });
  agentStoreByName.subscribe((data) => { agent = data; });

  const {
    month: 연월,
    city: 도시,
    district: 구,
    organization: 소속,
    type: 구분,
  } = organization;

  return agent.map(({
    name: 이름,
    businessTrip: 출장,
    education: 교육,
    paid: {
      annualLeave: 연가,
      halfLeaveAm: 오전반가,
      halfLeavePm: 오후반가,
      sickLeave: 병가,
      officialLeave: 공가,
      emergencyLeave: 청원휴가,
      specialLeave: 특별휴가,
    },
    unpaid: {
      absence: 복무이탈,
      exceedLeave: 초과결근,
      sickLeave: 초과병가,
      suspension: 분할복무,
    },
  }) => ({
    연월,
    도시,
    구,
    소속,
    구분,
    이름,
    출장,
    교육,
    연가,
    오전반가,
    오후반가,
    병가,
    공가,
    청원휴가,
    특별휴가,
    초과결근,
    초과병가,
    복무이탈,
    분할복무,
  }));
};

export const generateCsv = async (): Promise<string | Error> => {
  const data = generateData();
  const commonMessage = '파일 작성에 실패했습니다.';
  if (data.length === 0) return new Error(`${commonMessage} (보수 정보 미입력)`);
  try {
		return await json2csv(data);
  } catch {
    return new Error(`${commonMessage} (CSV 변환 오류)`);
  }
};
