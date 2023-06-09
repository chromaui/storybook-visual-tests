import React, { useState } from "react";
import { Client, fetchExchange, Provider } from "urql";

import { ACCESS_TOKEN_KEY, CHROMATIC_BASE_URL } from "../constants";

export { Provider };

let currentToken: string = localStorage.getItem(ACCESS_TOKEN_KEY);

export const useAccessToken = () => {
  const [token, setToken] = useState(currentToken);

  const updateToken = (newToken: string) => {
    currentToken = newToken;
    if (currentToken) localStorage.setItem(ACCESS_TOKEN_KEY, currentToken);
    else localStorage.removeItem(ACCESS_TOKEN_KEY);
    setToken(newToken);
  };

  return [token, updateToken] as const;
};

export const client = new Client({
  url: `${CHROMATIC_BASE_URL}/api`,
  exchanges: [fetchExchange], // no cacheExchange to prevent sharing data between stories
  fetchOptions: () => ({
    headers: {
      accept: "*/*", // workaround for https://github.com/mswjs/msw/issues/1593
      authorization: currentToken ? `Bearer ${currentToken}` : "",
    },
  }),
});

export const storyWrapper = (Story: any) => (
  <Provider value={client}>
    <Story />
  </Provider>
);
