// these variables are plucked off process.env server side
// and attached to the store state as state.processEnv
// so they can be used on the client
const setEnv = (env: any) => {
  return {
    NODE_ENV: env.NODE_ENV || 'development',
    API: {
      uri:
        env.API_URL ||
        'https://currencysimpleapi-integration.azurewebsites.net/',
    },
  };
};

export default setEnv;
