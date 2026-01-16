import { Router } from "express";
import {matchedData, checkSchema, validationResult} from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { mockUser } from "../utils/constants.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";

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

router.get("/api/users/:id", (request, response) => {
  const parseId = parseInt(request.params.id);

  if (isNaN(parseId)) {
    return response.status(400).send({ msg: "Invalid ID" });
  }

  const findUser = mockUser.find((user) => user.id === parseId);
  if (!findUser) return response.sendStatus(404);

  return response.send(findUser);
});

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).send({ errors: result.array() });
    }

    const data = matchedData(request);
    console.log(data);
    data.password = hashPassword(data.password);
    const newUser = new User(data);
    try {
       const savedUser = await newUser.save();
       return response.status(201).send(savedUser)
    } catch (err) {
      console.log(err);
      return response.sendStatus(400);
    }
   
  }
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
router.patch("/api/users/:id", (request, response) => {
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