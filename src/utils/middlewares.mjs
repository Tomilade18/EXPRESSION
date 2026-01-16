import { mockUser } from "./constants.mjs";

export const resolveIndexByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parseId = parseInt(id);

  if (isNaN(parseId)) return response.sendStatus(400);

  const findUserIndex = mockUser.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return response.sendStatus(404);

  request.findUserIndex = findUserIndex;
  next();
}; 