import { useToggle, upperFirst, useForceUpdate } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
} from '@mantine/core';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function Authentication({ paperProps, signin = "login"}) {
  const forceRefresh = useOutletContext();
  const [type, toggle] = useToggle(['login', 'register']);
  const navigate = useNavigate("/")

  useEffect(()=>{
  if(localStorage.getItem("token")){
    navigate("/")
  }},[])

  function createAccount(form) {
    axios.post("/user/", {
      name: form.values.name,
      email: form.values.email,
      password: form.values.password
    }).then((res) => { })
  }

  function Login(form) {
    var bodyFormData = new FormData();
    bodyFormData.append("username", form.values.email);
    bodyFormData.append("password", form.values.password);
    axios.post("/auth/token", bodyFormData).then((res) => {
      localStorage.setItem("token", res.data.access_token)
      forceRefresh()
      navigate("/")
    })
  }

  useEffect(() => { toggle(signin) }, [signin])

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder {...paperProps}>
        <Text size="lg" fw={500}>
          {upperFirst(type)} with email
        </Text>

        <Divider my="lg" />

        <form onSubmit={form.onSubmit(() => { type == "register" ? createAccount(form) : Login(form) })}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="a.user@privacy.matters"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions&ensp;"
                checked={form.values.terms}
                required={true}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}