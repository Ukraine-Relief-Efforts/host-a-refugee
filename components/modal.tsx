import {
  Modal as MantineModal,
  Text,
  Space,
  Button,
  Container,
} from '@mantine/core';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const Modal = ({ opened, onClose, title, message }: ModalProps) => {
  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      title={title}
      size="md"
      radius="md"
      centered
    >
      <Text>{message}</Text>
      <Space h="xl" />
      <Container
        style={{ width: '100%', display: 'flex', justifyContent: 'right' }}
      >
        <Button onClick={onClose}>Close</Button>
      </Container>
    </MantineModal>
  );
};
