import { writable } from 'svelte/store';

export type OrganizationData = {
  city: string;
  district: string;
  organization: string;
  type: string;
};

export const organizationStore = writable<OrganizationData>();

export type AgentData = {
  id: number;
  name: string;
  businessTrip: number;
  education: number;
  paid: {
    annualLeave: number;
    emergencyLeave: number;
    officialLeave: number;
    sickLeave: number;
    specialLeave: number;
  };
  unpaid: {
    absence: number;
    exceedLeave: number;
    sickLeave: number;
  };
};

export const agentStore = (() => {
  const { subscribe, update } = writable<AgentData[]>([]);
  return {
    subscribe,
    add: (data: AgentData) => update((existing) => [...existing, data]),
    remove: (id: number) => update((existing) => existing.filter((data) => data.id !== id)),
  };
})();
