import React, { useEffect, useState } from 'react';
import './App.css';
import { Grid, Box, Text, Heading, Spinner, Alert, AlertTitle, AlertDescription, Input, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';


const fetchRepos = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
};

function App() {
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { data, isLoading, error, status  } = useQuery({
    queryKey: ['repos', username],
    queryFn: () => fetchRepos(username),
    enabled: submitted && username !== '', 

  });

  useEffect(() => {
  if (status === 'success') {
    setSubmitted(false); 
  }
}, [status]);

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleSearchClick = () => {
    if (username) {
      setSubmitted(true);
    }
  };

  return (
    <div className="App">
      <Box p={4}>
        <Heading mb={4}>GitHub User Repositories</Heading>
        
        <Input
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter GitHub Username"
          mb={4}
        />
        <Button onClick={handleSearchClick} colorScheme="blue" mb={4}>
          Fetch Repos
        </Button>


        {isLoading && <Spinner />}

        {error && (
        <Alert.Root status="error" mb={4}>
          <Alert.Indicator>
          </Alert.Indicator>
          <Alert.Content>
            <AlertTitle>Error fetching data</AlertTitle>
            <AlertDescription>{String(error)}</AlertDescription>
          </Alert.Content>
        </Alert.Root>
        )}

        {data && (
          <Grid templateColumns="repeat(auto-fill, minmax(300px, auto))" gap={6}>
            {data.map((repo: any) => (
              <Box key={repo.id} p={4} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{repo.name}</Heading>
                <Text mt={2}>{repo.description}</Text>
              </Box>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
}

export default App;
