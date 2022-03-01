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
  };
  createdTime: string;
};
