export type SellerType = 'OF' | 'MB' | 'FU' | 'HC' | 'MP' | '';
export type SendMethod = 'whatsapp' | 'email' | '';
export type GenderType = 'hombre' | 'mujer' | '';
export type DeliveryFormat = 'link' | 'pdf';

export interface ClientData {
  id: string;
  name: string;
  lastName: string;
  company: string;
  phone: string;
  email: string;
  seller: SellerType;
  sendMethod: SendMethod;
  gender: GenderType;
  deliveryFormat: DeliveryFormat;
  lastSentMethod?: SendMethod;
}