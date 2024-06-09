import React from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Button, VStack } from '@chakra-ui/react';
import { useMutation } from 'urql';


interface RegisterProps { }

const REGISTER_MUTATION = `
  mutation Register($username: String!, $password: String!)  {
  register(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
 }
}
`

const Register: React.FC<RegisterProps> = ({ }) => {
  const [, register] = useMutation(REGISTER_MUTATION)
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={
          (values) => {
            console.log(values)
            register(values);
          }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <VStack spacing={4}>
              <InputField name='username' label='Username' placeholder='username' />
              <InputField name='password' label='Password' placeholder='password' type='password' />
              <Button type='submit' isLoading={isSubmitting} colorScheme={'teal'}>Register</Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Wrapper >
  );
};

export default Register;
