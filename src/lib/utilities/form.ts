// Resetting a form causes <input value={value}/> to be reset as well
export const keepInputValue = (inputElement: HTMLInputElement, value: string | null): ({ update?: () => void; }) => {
  if (value === null) return {};

  const setValue = () => inputElement.setAttribute('value', value);

  // The node(element) has been mounted in the DOM
  setValue(); // Do not have to set `value={value}`

  return {
    update: setValue,
  };
};
