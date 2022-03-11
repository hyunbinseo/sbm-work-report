import { writable, derived } from 'svelte/store';

export type AgentData = {
  id: number;
  name: string;
  businessTrip: number;
  education: number;
  paid: {
    annualLeave: number;
    emergencyLeave: number;
    halfLeaveAm: number;
    halfLeavePm: number;
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

/*
 * Passing asynchronous function to on:beforeprint and on:afterprint does not work reliably
 * Therefore sorting agent store before and after print does not work (e.g. agentStore.sort())
 */

export const agentStoreByName = derived(
  agentStore,
  (($agentStore) => {
    const data = [...$agentStore];
    return data.sort(({ name: name1 }, { name: name2 }) => {
      if (name1 < name2) return -1;
      if (name1 > name2) return 1;
      return 0;
    });
  }),
);

export const createAgentData = (formData: FormData): AgentData => ({
  id: Date.now(),
  name: formData.get('name').toString(),
  businessTrip: Number(formData.get('business-trip')),
  education: Number(formData.get('education')),
  paid: {
    annualLeave: Number(formData.get('annual-leave')),
    emergencyLeave: Number(formData.get('emergency-leave')),
    halfLeaveAm: Number(formData.get('half-leave-am')),
    halfLeavePm: Number(formData.get('half-leave-pm')),
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
