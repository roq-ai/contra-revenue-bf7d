import * as yup from 'yup';

export const articleValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  category: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
