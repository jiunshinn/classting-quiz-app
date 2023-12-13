import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

export const getQuizList = async () => {
  const result = await axios.get(BASE_URL);
  return result.data.results;
};
