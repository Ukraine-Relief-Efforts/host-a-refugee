import { Modal as MantineModal, Title, Text, Space } from '@mantine/core';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const Modal = ({ opened, onClose, title, message }: ModalProps) => {
  return (
    <MantineModal opened={opened} onClose={onClose} size="md" radius="md">
      <Title>{title}</Title>
      <Space h="xl" />
      <Text size="lg">{message}</Text>
      <Space h="xl" />
    </MantineModal>
  );
};
