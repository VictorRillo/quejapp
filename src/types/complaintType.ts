export type ComplaintType = {
  objectId: string;
  position: [number, number];
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ComplaintListType = {
  results: ComplaintType[]
};
