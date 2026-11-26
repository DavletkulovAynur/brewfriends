export type BentoEvent = {
  id: string;
  title: string;
  date: string | null;
  time: string | null;
  location: string;
  priceType?: "free" | "paid";
  priceAmount?: number | null;
  color: "amber" | "sky" | "rose";
  imageUrl?: string;
  videoUrl?: string;
  description?: string;
};
