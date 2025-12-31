export const formatCurrency = (value: number, currency: string) => {
  return `${currency} ${value.toFixed(2)}`;
};

export const saveCostToBackend = async (costData: any) => {
  console.log("Saving data to backend:", costData);
};
