export type Host = {
  id: string;
  fields: {
    name: string;
    userType: string;
    phoneNumber: string;
    email: string;
    country: string;
    city: string;
    lat: number;
    lng: number;
    accomodationDetails?: string;
    groupSize: number;
    languages: string[];
    dateStart?: string;
    dateEnd?: string;
    avatar?: string;
    verified?: boolean;
  };
  createdTime: string;
};

export type Partner = {
  name: string;
  what: string;
  operation: string;
  donation?: string;
};
