import * as yup from 'yup';

export const historyValidationSchema = yup.object().shape({
  change_log: yup.string().required(),
  article_id: yup.string().nullable().required(),
});
