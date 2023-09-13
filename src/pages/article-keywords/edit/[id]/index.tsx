import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getArticleKeywordById, updateArticleKeywordById } from 'apiSdk/article-keywords';
import { articleKeywordValidationSchema } from 'validationSchema/article-keywords';
import { ArticleKeywordInterface } from 'interfaces/article-keyword';
import { ArticleInterface } from 'interfaces/article';
import { KeywordInterface } from 'interfaces/keyword';
import { getArticles } from 'apiSdk/articles';
import { getKeywords } from 'apiSdk/keywords';

function ArticleKeywordEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ArticleKeywordInterface>(
    () => (id ? `/article-keywords/${id}` : null),
    () => getArticleKeywordById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ArticleKeywordInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateArticleKeywordById(id, values);
      mutate(updated);
      resetForm();
      router.push('/article-keywords');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ArticleKeywordInterface>({
    initialValues: data,
    validationSchema: articleKeywordValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Article Keywords',
              link: '/article-keywords',
            },
            {
              label: 'Update Article Keyword',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Article Keyword
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <AsyncSelect<ArticleInterface>
            formik={formik}
            name={'article_id'}
            label={'Select Article'}
            placeholder={'Select Article'}
            fetcher={getArticles}
            labelField={'title'}
          />
          <AsyncSelect<KeywordInterface>
            formik={formik}
            name={'keyword_id'}
            label={'Select Keyword'}
            placeholder={'Select Keyword'}
            fetcher={getKeywords}
            labelField={'word'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/article-keywords')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'article_keyword',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ArticleKeywordEditPage);
