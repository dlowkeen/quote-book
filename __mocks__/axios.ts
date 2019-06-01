const axiosMock: any = {
  set: (methodName: string, dataToReturn: any) => {
    axiosMock[methodName] = jest.fn(() =>
      Promise.resolve({ data: dataToReturn }),
    );
  },
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
};

export default axiosMock;
