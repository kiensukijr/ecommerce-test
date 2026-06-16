import { generateRandomEmail, generateRandomPassword} from '../utils/random.register.data';

export const userRegisterPass = [
  { id: '1',name:'k8',email: 'k8@gmail.com', password: 'k8' },
  { id: '2',name:'k9',email: 'k9@gmail.com', password: 'k9'},
];

export const userRegisterFail = [
    { id: '3',name: '', email: 'k5@gmail.com', password: 'k4' },
    { id: '4',name: 'k10', email: '', password: 'k7' },
    { id: '5',name: 'k11', email: 'k11@gmail.com', password: '' },
];

export const userRegisterPassUi = () => [
  {
    id: '6',
    name: 'k20',
    email: generateRandomEmail('auto_k8'),
    password: generateRandomPassword('k8'),
  },
  {
    id: '7',
    name: 'k21',
    email: generateRandomEmail('auto_k9'),
    password: generateRandomPassword('k9'),
  },
];

