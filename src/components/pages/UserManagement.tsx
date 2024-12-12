import { Center, Spinner, Wrap, WrapItem } from '@chakra-ui/react';
import { memo, useEffect } from 'react';
import { UserCard } from '../organisms/layout/user/UserCard';
import { useAllUsers } from '../../hooks/useAllUsers';

export const UserManagement = memo(() => {
  const { getUsers, loading, users } = useAllUsers();
  useEffect(() => getUsers(), []);
  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                imageUrl="https://picsum.photos/800"
                userName={user.username}
                fullName={user.name}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
});
