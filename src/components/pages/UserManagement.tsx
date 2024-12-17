import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { UserCard } from '../organisms/layout/user/UserCard';
import { useAllUsers } from '../../hooks/useAllUsers';
import { UserDetailModal } from '../organisms/layout/user/UserDetailModal';
import { useSelectUser } from '../../hooks/useSelectUser';
import { useLoginUser } from '../../hooks/useLoginUsers';
import { User } from '../../types/api/user';

export const UserManagement = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, loading, users } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();
  const [editedUsers, setEditedUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setEditedUsers(users.map((user) => ({ ...user })));
    }
  }, [users]);

  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [onOpen, onSelectUser, users]
  );

  const handleUserNameChange = (userName: string) => {
    if (selectedUser) {
      setEditedUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, username: userName } : user
        )
      );
    }
  };

  const handleNameChange = (name: string) => {
    if (selectedUser) {
      setEditedUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, name: name } : user
        )
      );
    }
  };

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {editedUsers.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://picsum.photos/800"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        user={selectedUser}
        isOpen={isOpen}
        isAdmin={loginUser?.isAdmin}
        onClose={onClose}
        onUserNameChange={handleUserNameChange}
        onNameChange={handleNameChange}
      />
    </>
  );
});
