import * as yup from 'yup';

export const articleKeywordValidationSchema = yup.object().shape({
  article_id: yup.string().nullable().required(),
  keyword_id: yup.string().nullable().required(),
});
