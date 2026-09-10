export const CREDIT_PRODUCTS = [
  { id: 'credit_10', credits: 0, amount: 1000, label: '10 Credits' },
  { id: 'credit_50', credits: 0, amount: 5000, label: '50 Credits' },
  { id: 'credit_100', credits: 0, amount: 10000, label: '100 Credits' },
  { id: 'credit_500', credits: 0, amount: 50000, label: '500 Credits' },
] as const;

export type CreditProductId = (typeof CREDIT_PRODUCTS)[number]['id'];

export function getCreditProduct(productId: string) {
  return CREDIT_PRODUCTS.find((product) => product.id === productId) ?? null;
}
