export interface cardsInterface {
  id: number;
  name: string;
  email: string;
}

export interface cardsState {
    list: cardsInterface[];
    loading: boolean;
    error: string | null;
  }