import {
  Box,
  Button,
  Input,
  Stack,
  Checkbox,
  Text,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Box>
      <Heading mb={4}>Developer To-Do List</Heading>

      <HStack mb={4}>
        <Input
          placeholder="What needs to be done?"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button onClick={handleAddTodo} colorScheme="blue">
          Add
        </Button>
      </HStack>

      <Stack spacing={3}>
        {todos.map(todo => (
          <Checkbox.Root
            key={todo.id}
            defaultChecked={todo.completed}
            checked={todo.completed}
            onCheckedChange={() => toggleTodo(todo.id)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>
              <Text
                as={todo.completed ? 'del' : undefined}
                color={todo.completed ? 'gray.500' : 'white'}
              >
                {todo.text}
              </Text>
            </Checkbox.Label>
          </Checkbox.Root>
        ))}
      </Stack>
    </Box>
  );
}
