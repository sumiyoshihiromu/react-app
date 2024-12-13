import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { memo } from 'react';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickHome: () => void;
  onClickUserManagement: () => void;
  onClickSetting: () => void;
};

export const MenuDrawer = memo((props: Props) => {
  const {
    onClose,
    isOpen,
    onClickHome,
    onClickUserManagement,
    onClickSetting,
  } = props;
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Flex direction="column" h="100%">
              <Button w="100%" onClick={onClickHome}>
                TOP
              </Button>
              <Button w="100%" onClick={onClickUserManagement}>
                ユーザー
              </Button>
              <Button w="100%" onClick={onClickSetting}>
                設定
              </Button>
              <Spacer />
              <Button w="100%" onClick={onClickSetting} mb={4}>
                ログアウト
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
