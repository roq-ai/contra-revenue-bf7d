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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createArticleKeyword } from 'apiSdk/article-keywords';
import { articleKeywordValidationSchema } from 'validationSchema/article-keywords';
import { ArticleInterface } from 'interfaces/article';
import { KeywordInterface } from 'interfaces/keyword';
import { getArticles } from 'apiSdk/articles';
import { getKeywords } from 'apiSdk/keywords';
import { ArticleKeywordInterface } from 'interfaces/article-keyword';

function ArticleKeywordCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ArticleKeywordInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createArticleKeyword(values);
      resetForm();
      router.push('/article-keywords');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ArticleKeywordInterface>({
    initialValues: {
      article_id: (router.query.article_id as string) ?? null,
      keyword_id: (router.query.keyword_id as string) ?? null,
    },
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
              label: 'Create Article Keyword',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Article Keyword
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
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
    operation: AccessOperationEnum.CREATE,
  }),
)(ArticleKeywordCreatePage);
