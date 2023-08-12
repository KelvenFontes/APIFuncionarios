// types/transporterTypes.ts
export interface Transporter {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
