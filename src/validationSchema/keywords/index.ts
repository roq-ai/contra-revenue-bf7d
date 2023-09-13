import * as yup from 'yup';

export const keywordValidationSchema = yup.object().shape({
  word: yup.string().required(),
});
