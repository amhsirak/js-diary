import express from "express";

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.get("/cells", async (req, res) => {
    // make sure cell storage file exists
    // if file doesn't exist add default list of cells
    // read the file
    // parse a list of cells out of it
    // send list of cells back to browser
  });

  router.post("/cells", async (req, res) => {
    // make sure file exists
    // if not then create it
    // take list of cells from request object
    // serialize them
    // write the cells into the file
  });
  return router;
};
