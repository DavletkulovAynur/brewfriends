export type CafeStoryPerson = {
  id: string;
  name: string;
  cafeName: string;
};

export type OwnPresence = {
  isAvailable: boolean;
  cafeId: string | null;
};