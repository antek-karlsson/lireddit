import React from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Button, VStack } from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
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
                Register
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
