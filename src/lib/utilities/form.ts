import type { AgentData } from '$lib/store';

export const isFormElement = (target: unknown): target is HTMLFormElement => (target instanceof HTMLFormElement);

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
