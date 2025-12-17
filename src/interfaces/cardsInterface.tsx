export interface cardsInterface {
  id: number;
  name: string;
  email: string;
}

export interface cardsState {
    list: cardsInterface[]|null;
    loading: boolean;
    error: string | null;
  }

  export interface CardProps {
    title: string;
    value: string | number;
    percentage: string;
    isPositive?: boolean;
    bgColor: string;
    icon: string;
  }
  