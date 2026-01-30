export interface PaymentMethods {
  cash: boolean;
  upi: boolean;
  card: boolean;
  insurance: boolean;
}

export interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}