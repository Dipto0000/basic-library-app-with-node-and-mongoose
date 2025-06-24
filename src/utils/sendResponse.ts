import { Response } from 'express';

const sendResponse = (
  res: Response,
  success: boolean,
  message: string,
  data: any
) => {
  res.json({
    success,
    message,
    data,
  });
};

export default sendResponse;