import { Wrap, WrapItem } from '@chakra-ui/react';
import { memo } from 'react';
import { UserCard } from '../organisms/layout/user/UserCard';

export const UserManagement = memo(() => {
  return (
    <Wrap p={{ base: 4, md: 10 }}>
      <WrapItem>
        <UserCard
          imageUrl="https://picsum.photos/800"
          userName="すみちゃん"
          fullName="住吉 弘"
        />
      </WrapItem>
    </Wrap>
  );
});
