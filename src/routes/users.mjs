import { Router } from "express";
import {matchedData, checkSchema, validationResult} from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { mockUser } from "../utils/constants.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";
import { getUserByIdHandler } from "../handlers/users.mjs";

const router = Router();

router.get("/api/users", 
    checkSchema(createUserValidationSchema),
    (request, response) => {
      console.log(request.session.id);
      request.sessionStore.get(request.session.id, (err, sessionData) => {
        if(err) {
          console.log(err);
          throw err;
        }
        console.log(sessionData)
      })
      const result = validationResult(request);
      console.log(result);
      const {
        query: { filter, value },
      } = request;
    
      if (filter && value) {
        return response.send(
          mockUser.filter((user) => user[filter].includes(value))
        );
      }
    
      return response.send(mockUser);
    }
);

router.get("/api/users/:id", resolveIndexByUserId, getUserByIdHandler);

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  
);

// Full update (PUT)
router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUser[findUserIndex] = {
    id: mockUser[findUserIndex].id,
    ...body,
  };

  return response.sendStatus(204);
});

// Partial update (PATCH)
router.patch("/api/users/:id",resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUser[findUserIndex] = {
    id: mockUser[findUserIndex].id,
    ...body,
  };

  return response.sendStatus(204);
});

// Delete user
router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const {
    findUserIndex
  } = request;
  mockUser.splice(findUserIndex, 1);

  return response.sendStatus(204);
});

export default router