import React from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Button, VStack } from '@chakra-ui/react';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await login({ options: values });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <VStack spacing={4}>
              <InputField
                name="username"
                label="Username"
                placeholder="username"
              />
              <InputField
                name="password"
                label="Password"
                placeholder="password"
                type="password"
              />
              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme={'teal'}
              >
                Log in
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
