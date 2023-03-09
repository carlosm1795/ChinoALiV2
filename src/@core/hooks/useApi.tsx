import { useEffect, useState } from "react";
import axios from "axios";
import { ConfigAxios } from "../Types/Types";

const useApi = (
  config: ConfigAxios = {
    config : {
    url: "",
    method: "GET",
    headers: {},
    data: {},
    params: {}
    },
    shouldFire: false,
  }
) => {
  const [parameters,setParameters] = useState(config.config)
  const [fire,setFire] = useState(config.shouldFire)
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [dataReady, setDataReady] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (fire) {
      setIsLoading(true);
      (async () => {
        await executeRequest();
      })();
    }
  }, [fire]);

  const executeRequest = async () => {
    try {
      const response = await axios.request({
        ...parameters,        
        proxy: false,        
      });
      setData(response.data);
      setDataReady(true);
    } catch (e:any) {                  
        setError(e.response);       
    } finally {
      setFire(false);
      setIsLoading(false);

    }
  };
  const reset = () => {
    setData([]);
    setIsLoading(false);
    setFire(false);
    setParameters(config.config);
    setDataReady(false);
  };
  return {
    isLoading,
    data,
    error,
    reset,
    fire,
    setParameters,
    setFire,
    setIsLoading,
    setError,
    dataReady,
    parameters,
  };
};

export default useApi;
