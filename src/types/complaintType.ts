export type ComplaintType = {
  position: [number, number];
  address: string;
  title: string;
  description: string;
  objectId: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ComplaintListType = {
  results: ComplaintType[]
};


export type ComplaintFormType = Pick<ComplaintType, 'position' | 'address' | 'title' | 'description'>;