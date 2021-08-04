const resolveConfig = (environment?: string) => {
  if (environment === "production") {
    return {
      apiRootURL: "https://AZURE/aplicacionesapi",
      baseURL: "/aplicaciones",
      
    };
  }

  if (environment === "development") {
    return {
      apiRootURL: "//localhost:3030",
      baseURL: "/aplicaciones",
      
    };
  }

  return {
    apiRootURL: "//localhost:3030",
    baseURL: "/aplicaciones",
    
  };
};

export default resolveConfig(process.env.REACT_APP_ENV || process.env.NODE_ENV);
