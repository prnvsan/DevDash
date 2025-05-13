import { useQuery } from '@tanstack/react-query';
import { Box, Heading, Text, Spinner, Alert, List, ListItem } from '@chakra-ui/react';

// Fetch new packages related to React
const fetchNewPackages = async () => {
  const res = await fetch('https://registry.npmjs.org/-/v1/search?text=react&size=20');
  if (!res.ok) throw new Error('Failed to fetch new React packages');
  return res.json();
};

export default function NpmPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['new-react-packages'],
    queryFn: fetchNewPackages,
  });

  if (isLoading) return <Spinner />;
  if (error) return (
    <Alert.Root status="error">
<Alert.Description>{String(error)}</Alert.Description>
    </Alert.Root>
  );

  const packages = data.objects;
 console.log(packages);
  return (
    <Box>
      <Heading mb={4}>React Packages</Heading>
      <List.Root spacing={3}>
        {packages.map(pkg => {
          if (!pkg.package) {
            return null; // Skip any invalid items
          }

          return (
            <List.Item key={pkg.package?.name || 'default'}>
              <Text fontWeight="bold">{pkg.package?.name || 'No name'}</Text>
              <Text>{pkg.package?.description || 'No description available'}</Text>
            </List.Item>
          );
        })}
      </List.Root>
    </Box>
  );
}
