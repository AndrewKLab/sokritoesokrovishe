import React, { useCallback, useState, useEffect } from 'react';
import { Portal, Dialog, List, Button, Text, IconButton } from 'react-native-paper';
import { Linking, Alert, View } from 'react-native';
import { config } from '../../_helpers';
import Purchases from 'react-native-purchases';
import { configConstants } from '../../_constants';
import { Loading } from '../';

export const DialogFullAccess = ({ visible, hideDialog }) => {
  const [pakeges, setPakages] = useState('2');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPakeges = async () => {
      const offerings = await Purchases.getOfferings();
      console.log(offerings)
      try {
        if (offerings.current !== null) {
          setPakages(offerings.current.availablePackages)
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
    getPakeges();
  }, [])

  const onSelection = async () => {
    try {
      const { purchaserInfo } = await Purchases.purchasePackage(pakeges[0])
      if (typeof purchaserInfo.entitlements.active[configConstants.ENTITLEMENT_ID] !== undefined) {
        console.log(123)
        hideDialog()
      }
    } catch (e) {
      if (e.userCancelled) {
        Alert.alert(e.message)
      }
    }

  }

  if (loading) {
    return <Loading />
  }

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
            {pakeges.map((item, index) => (
              <Button key={index} style={{
                width: '70%',
                marginVertical: 8,
                borderRadius: 20
              }}
                mode={'contained'}
                onPress={() => onSelection()}>
                {item.product.price_string}
              </Button>
            ))}
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
