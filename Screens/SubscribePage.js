import React, { useCallback, useState, useEffect } from 'react';
import { Portal, Dialog, List, Button, Text, IconButton } from 'react-native-paper';
import { Linking, Alert, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Purchases from 'react-native-purchases';
import { configConstants } from '../_constants';
import { stylesActions, postsActions } from '../_actions';

const SubscribePage = ({ dispatch, navigation, route }) => {
    const [pakeges, setPakages] = useState('2');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getPakeges = async () => {
            const offerings = await Purchases.getOfferings();
            //console.log(offerings)
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

    const hideDialog = () => {
        route.params.hideDialog()
        navigation.goBack()
    }

    const onSelection = async (pakege) => {
        try {
            console.log(pakege)
            const { purchaserInfo } = await Purchases.purchasePackage(pakege)
            if (purchaserInfo.entitlements.active[configConstants.ENTITLEMENT_ID] !== undefined) {
                await dispatch(stylesActions.setUser('full'));
                await dispatch(postsActions.setPostsLimits({
                    semD: 5,
                    kkz: 5,
                    sokrsokr: 6
                }));
                hideDialog()
            }
        } catch (e) {

            if (e.userCancelled) {
                console.log(e.message)
            }
        }

    }

    if (loading) {
        return null
    }

    return (
        <ScrollView >

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
                    {pakeges !== undefined && pakeges.map((item, index) => (
                        <View key={index} style={{ alignItems: 'center', width: '100%' }}>
                            <Text>{item.product.title.replace('(Сокрытое Сокровище о Христе)', '')}</Text>
                            <Button style={{
                                width: '70%',
                                marginVertical: 8,
                                borderRadius: 20
                            }}
                                mode={'contained'}
                                onPress={() => onSelection(pakeges[index])}>
                                {item.product.price_string}
                            </Button>
                        </View>
                    ))}
                </View>
            </Dialog.Content>
        </ScrollView>
    );
};

function mapStateToProps(state) {
    const { theme, user } = state.style;
    return {
        theme,
        user
    };
}

export default connect(mapStateToProps)(SubscribePage);