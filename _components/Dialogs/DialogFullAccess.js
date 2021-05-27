import React, { useCallback } from 'react';
import { Portal, Dialog, List, Button, Text, IconButton } from 'react-native-paper';
import { Linking, Alert, View } from 'react-native';
import { config } from '../../_helpers';
import InAppBilling from "react-native-billing";

export const DialogFullAccess = ({ visible, hideDialog }) => {
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

    const purchase = useCallback( 
        async () => {
        try {
          await InAppBilling.open();
          const details = await InAppBilling.purchase("android.test.purchased");
          console.log("You purchased: ", details);
        } catch (err) {
          console.log(err);
        } finally {
          await InAppBilling.close();
        }
      }
    )
      
    const checkSubscription = useCallback( 
        async () => {
          try {
          await InAppBilling.open();
          // If subscriptions/products are updated server-side you
          // will have to update cache with loadOwnedPurchasesFromGoogle()
          await InAppBilling.loadOwnedPurchasesFromGoogle();
          const isSubscribed = await InAppBilling.isSubscribed("myapp.productId")
          console.log("Customer subscribed: ", isSubscribed);
        } catch (err) {
          console.log(err);
        } finally {
          await InAppBilling.close();
        }
      }
    )


    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <IconButton
                    icon="close"
                    size={20}
                    onPress={hideDialog}
                    style={{ marginBottom: 0 }}
                />
                <Dialog.Title style={{ textAlign: 'center', fontSize: 28, marginTop: 0, marginBottom: 0 }}>{'Подписка Pro'}</Dialog.Title>
                <Dialog.Content>
                    <Dialog.Title style={{ textAlign: 'center' }}>{'Разблокируйте все функции полной версии приложения:'}</Dialog.Title>
                    <List.Section>
                        <List.Item style={{ padding: 0, alignItems: 'center' }} title="Доступ к статьям о ЗОЖ и для молодежи" titleNumberOfLines={4} left={props => <Text style={{ marginTop: 6 }}>{'-'}</Text>} />
                        <List.Item style={{ padding: 0, alignItems: 'center' }} title="Возможность добавлять статьи в избранное" titleNumberOfLines={4} left={props => <Text style={{ marginTop: 6 }}>{'-'}</Text>} />
                        <List.Item style={{ padding: 0, alignItems: 'center' }} title="Доступ к архивам записей с ресурсов «Ваши ключи к здоровью» и «7D формат»" titleNumberOfLines={4} left={props => <Text style={{ marginTop: 6 }}>{'-'}</Text>} />
                        <List.Item style={{ padding: 0, alignItems: 'center' }} title="Разные шрифты" titleNumberOfLines={4} left={props => <Text style={{ marginTop: 6 }}>{'-'}</Text>} />
                    </List.Section>
                    <View style={{ alignItems: 'center', }}>
                        <Button style={{
                            width: '70%',
                            marginVertical: 8,
                            borderRadius: 20
                        }}
                            mode={'contained'}
                            onPress={() => purchase()}>
                            {'Будут цены'}
                        </Button>
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};
