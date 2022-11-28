import { GraphQLError } from "graphql";

const error = (params = "", config) => {
  const response = typeof params !== "string" ? JSON.stringify(params) : params;

  return new GraphQLError(response, {
    ...config,
  });
};

export { error };
