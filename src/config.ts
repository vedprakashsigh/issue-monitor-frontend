const config = {
  apiUrl:
    import.meta.env.REACT_APP_API_URL ||
    "https://issue-monitor-backend.onrender.com" ||
    "http://127.0.0.1:5000",
  environment: import.meta.env.REACT_APP_ENVIRONMENT,
};

export default config;
