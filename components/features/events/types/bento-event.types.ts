export type BentoEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  color: "amber" | "sky" | "rose";
  imageUrl?: string;
  videoUrl?: string;
  description?: string;
};
