export const AppLink = {
  Varius: {
    JoinLinkAirtable: 'https://airtable.com/appudjkzcwnIO9ch9/shrwfLcnh19o9jTfr',
  },
  Activation: {
    BaseData: '/activation/validate',
    Round: '/activation/round',
    Home: '/activation',
  },
  Auth: {
    SignIn: '/signin',
  },
  VcList: {
    BaseData: '/vc_list',
    Home: '/vc_list',
  },
  Product: {
    Home: '/product',
  },
  Home: '/',
};

export type Round = {
  Name: string;
  Value: string;
};

export const Rounds: Round[] = [
  {
    Name: 'Pre-Seed',
    Value: '1',
  },
  {
    Name: 'Seed',
    Value: '1',
  },
  {
    Name: 'Series A',
    Value: '1',
  },
  {
    Name: 'Series B+',
    Value: '1',
  },
];

export const ProtectedRoutes: string[] = ['/product', '/activation'];
