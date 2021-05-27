import React, { useCallback } from 'react';
import { View, Image, Linking, Alert, ScrollView } from 'react-native';
import { Text, Button, IconButton, Dialog, List } from 'react-native-paper';
import { config } from '../_helpers';

const InfoPage = ({ navigation }) => {
    const handlePress = useCallback(async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, []);

    return (

        <ScrollView style={{backgroundColor: 'white'}} >
            <View style={{alignItems: 'center', paddingHorizontal: 16, marginTop: 28 }}>
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
                            onPress={() => handlePress(config.market_link)}>
                            {'Будут цены'}
                        </Button>
                    </View>
                </Dialog.Content>
            </View>
        </ScrollView>
    );
};


export default InfoPage;
