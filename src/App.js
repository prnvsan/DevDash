import logo from './logo.svg';
import './App.css';
import {Grid,Box, Text, Heading, GridItem} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query';



function App() {
  const fetchRepos = async () => {
  const res = await fetch('https://api.github.com/users/prnvsan/repos');
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
};

const { data, isLoading, error } = useQuery({
  queryKey: ['repos'],
  queryFn: fetchRepos,
});

  return (
    <div className="App">
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {data?.map(repo => (
          <Box key={repo.id} p={4} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{repo.name}</Heading>
            <Text mt={2}>{repo.description}</Text>
          </Box>
        ))}
      </Grid>
    </div>
  );
}

export default App;
