export const makeResponse = ({ res, status, data, message }): void => {
  const responseData: { data: any; message: string } = { data, message };
  if (!data) {
    delete responseData.data;
  }
  res.status(status).json(responseData);
};
