import { useEffect, useState } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    props: { type, value, onChange },
    type,
    value,
    onChange,
    reset: () => setValue(""),
  };
};

const useResource = (baseUrl) => {
  const getAll = async () => {
    try {
      const response = await axios.get(baseUrl);
      setResources(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource);
      setResources([...resources, response.data]);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const [resources, setResources] = useState([]);
  useEffect(() => {
    getAll();
  }, [baseUrl, getAll]);

  const service = {
    create,
  };

  return [resources, service];
};
