import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// remove console.error warning
const originalConsoleError = global.console.error;
global.console.error = (...args) => {
  const ignoredWarnings = [
    'Support for defaultProps will be removed',
    'act(...)',
    'Warning: findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node',
    'Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.',
    'An error occurred! For more details, see the full error text at https://go.apollo.dev',
  ];
  const errorMessage = typeof args[0] === 'string' ? args[0] : '';
  if (ignoredWarnings.some((warning) => errorMessage.includes(warning))) {
    return;
  }

  originalConsoleError(...args);
};
