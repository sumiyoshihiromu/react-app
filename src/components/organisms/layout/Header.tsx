import { memo, useCallback } from 'react';
import { Box, Flex, Heading, Link, useDisclosure } from '@chakra-ui/react';

import { MenuIconButton } from '../../atoms/button/MenuIconButton';
import { MenuDrawer } from '../../molecules/MenuDrawer';
import { useHistory } from 'react-router-dom';
import { useMessage } from '../../../hooks/useMessage';
import { useLoginUser } from '../../../hooks/useLoginUsers';

export const Header = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const onClickHome = useCallback(() => history.push('/home'), [history]);
  const onClickUserManagement = useCallback(
    () => history.push('/home/user_management'),
    [history]
  );
  const onClickSetting = useCallback(
    () => history.push('/home/setting'),
    [history]
  );

  const onClickLogout = useCallback(() => {
    setLoginUser(null);
    showMessage({ title: 'ログアウトしました。', status: 'success' });
    history.push('/');
  }, [history, setLoginUser, showMessage]);

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justifyContent="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          as="a"
          align="center"
          mr={8}
          _hover={{ cursor: 'pointer' }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: 'md', md: 'lg' }}>
            ユーザー管理アプリ
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: 'none', md: 'flex' }}
        >
          <Box pr={4}>
            <Link onClick={onClickUserManagement}>ユーザー</Link>
          </Box>
          <Link onClick={onClickSetting}>設定</Link>
          <Box pl={4} marginLeft="auto">
            <Link onClick={onClickLogout}>ログアウト</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickHome={onClickHome}
        onClickUserManagement={onClickUserManagement}
        onClickSetting={onClickSetting}
      />
    </>
  );
});
