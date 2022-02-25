import { writable } from 'svelte/store';

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

export const createAgentData = (formData: FormData): AgentData => ({
  id: Date.now(),
  name: formData.get('name').toString(),
  businessTrip: Number(formData.get('business-trip')),
  education: Number(formData.get('education')),
  paid: {
    annualLeave: Number(formData.get('annual-leave')),
    emergencyLeave: Number(formData.get('emergency-leave')),
    officialLeave: Number(formData.get('official-leave')),
    sickLeave: Number(formData.get('sick-leave')),
    specialLeave: Number(formData.get('special-leave')),
  },
  unpaid: {
    absence: Number(formData.get('unpaid-absence')),
    exceedLeave: Number(formData.get('unpaid-exceed-leave')),
    sickLeave: Number(formData.get('unpaid-sick-leave')),
  },
});
