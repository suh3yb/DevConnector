import { toast } from 'react-toastify';

export const toastify = (type, text) => toast[type](text);
