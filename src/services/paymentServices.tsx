import { PaymentMethods } from "../interfaces/paymentInterface";

export const togglePaymentMethod = (
  methods: PaymentMethods,
  key: keyof PaymentMethods
): PaymentMethods => {
  return { ...methods, [key]: !methods[key] };
};
