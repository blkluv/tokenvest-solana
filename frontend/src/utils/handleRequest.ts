import { getNotify } from "./getNotify";

export const handleRequest = async (
  url: string,
  method: string,
  data?: {},
  isFormData?: boolean
) => {
  try {
    const dataRes = await fetch(url, {
      method,
      headers: isFormData
        ? {}
        : {
          "Content-Type": "application/json",
        },
      body: isFormData ? (data as FormData) : JSON.stringify(data),
    });
    const res = await dataRes.json();
    return res;
  } catch (error) {
    if (typeof window !== "undefined") {
      getNotify((error as { message: string }).message, "error");
    }
  }
};

export const METHODS = Object.freeze({
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
});
