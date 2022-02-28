import { writable } from 'svelte/store';

export type OrganizationData = {
  city: string;
  district: string;
  organization: string;
  type: string;
  month: string;
};

export const organizationStore = writable<OrganizationData>();

export const createOrganizationData = (formData: FormData): OrganizationData => ({
  city: formData.get('city').toString(),
  district: formData.get('district').toString(),
  organization: formData.get('organization').toString(),
  type: formData.get('type').toString(),
  month: formData.get('month').toString(),
});
