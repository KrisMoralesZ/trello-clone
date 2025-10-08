export type Colors =
  | 'sky'
  | 'yellow'
  | 'green'
  | 'red'
  | 'violet'
  | 'gray'
  | 'success'
  | 'primary'
  | 'danger'
  | 'light';

export type ObjectColors = Record<string, Record<string, boolean>>;

export const COLORS: ObjectColors = {
  success: {
    'bg-success-700': true,
    'hover:bg-success-800': true,
    'focus:ring-success-300': true,
    'text-white': true,
  },
  primary: {
    'bg-primary-700': true,
    'hover:bg-primary-800': true,
    'focus:ring-primary-300': true,
    'text-white': true,
  },
  danger: {
    'bg-danger-700': true,
    'hover:bg-danger-800': true,
    'focus:ring-danger-300': true,
    'text-white': true,
  },
  light: {
    'bg-gray-200': true,
    'hover:bg-gray-500': true,
    'focus:ring-gray-50': true,
    'text-gray-700': true,
  },
  sky: {
    'bg-sky-700': true,
    'hover:bg-sky-800': true,
    'focus:ring-sky-300': true,
    'text-white': true,
  },
  yellow: {
    'bg-yellow-700': true,
    'hover:bg-yellow-800': true,
    'text-white': true,
  },
  green: {
    'bg-green-700': true,
    'hover:bg-green-800': true,
    'text-white': true,
  },
  red: {
    'bg-red-700': true,
    'hover:bg-red-800': true,
    'text-white': true,
  },
  violet: {
    'bg-violet-700': true,
    'hover:bg-violet-800': true,
    'text-white': true,
  },
  gray: {
    'bg-gray-700': true,
    'hover:bg-gray-800': true,
    'text-white': true,
  },
};

export const BACKGROUNDS: ObjectColors = {
  success: {
    'bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-600': true,
  },
  primary: {
    'bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-700': true,
  },
  danger: {
    'bg-gradient-to-br from-red-400 via-rose-500 to-pink-600': true,
  },
  light: {
    'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400': true,
  },
  sky: {
    'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600': true,
  },
  yellow: {
    'bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500': true,
  },
  green: {
    'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600': true,
  },
  red: {
    'bg-gradient-to-br from-red-400 via-rose-500 to-pink-600': true,
  },
  violet: {
    'bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600': true,
  },
  gray: {
    'bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700': true,
  },
};

export const NAVBAR_BACKGROUNDS: ObjectColors = {
  success: {
    'bg-success-700': true,
  },
  primary: {
    'bg-primary-700': true,
  },
  danger: {
    'bg-danger-700': true,
  },
  light: {
    'bg-gray-700': true,
  },
  sky: {
    'bg-sky-700': true,
  },
  yellow: {
    'bg-yellow-700': true,
  },
  green: {
    'bg-green-700': true,
  },
  red: {
    'bg-red-700': true,
  },
  violet: {
    'bg-violet-700': true,
  },
  gray: {
    'bg-gray-700': true,
  },
};
