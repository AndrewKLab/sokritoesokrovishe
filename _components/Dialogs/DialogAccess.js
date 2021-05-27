import React, { useCallback } from 'react';
import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import { Linking, Alert } from 'react-native';
import { config } from '../../_helpers';
export const DialogAccess = ({ visible, hideDialog, text }) => {
  const handlePress = useCallback(
    async (url) => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
      hideDialog();
    },
    [hideDialog]
  );


  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{'Полная версия приложения'}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{text}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => handlePress(config.market_link)}>
            {config.market}
          </Button>
          <Button onPress={hideDialog}>{'Отмена'}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
