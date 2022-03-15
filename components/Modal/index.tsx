import {
  Modal as MantineModal,
  Text,
  Space,
  Button,
  Group,
} from '@mantine/core';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function Modal({ opened, onClose, title, message }: ModalProps) {
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
      <Group position="right">
        <Button onClick={onClose}>Close</Button>
      </Group>
    </MantineModal>
  );
}
