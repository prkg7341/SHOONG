import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import EasySendAndReceive from '@containers/EasySendAndReceive';
import ExpandableView from '@containers/ExpandableView';
import Button from '@components/common/Button';
import { SendConfirm } from './SendConfirm';
import { theme } from '@storybook/react-native/dist/preview/components/Shared/theme';
import Typography from '@theme/Typography';
import { useLinkProps, useNavigation } from '@react-navigation/native';
// import Input from '@components/common/Input';
import ProgressTab from '@containers/Send/ProgressTab/ProgressTab';
import Divider from '@components/common/Divider/Divider';
import styled from 'styled-components/native';
import TokenList from '@containers/Send/TokenList/TokenList';
import AmountInput from '@containers/Send/AmountInput/AmountInput';
import { CoinType } from '@services/api/token/tokenTypes';
import TargetModal from '@containers/Send/TargetModal/TargetModal';
import SelectTargetView from '@containers/Send/SelectTargetView/SelectTargetView';
import HFlatList from '@components/layout/HFlatList';
import Card from '@components/item/Card';
import { getUserInfo } from '@services/api/user/userAPI';
import SenderCardItem from '@containers/Send/SenderCardItem/SenderCardItem';
import { getCoinPrice } from '@services/api/token/tokenAPI';
import { CardType } from 'types/apiTypes';
import SendConfirmModal from '@containers/Send/SendConfirmModal/SendConfirmModal';

interface SendProps {
  presetAddress?: string;
  presetTarget?: string;
}
interface ExpandProp {
  width: string;
  height: string;
}
interface IType {
  type: string;
  value: string;
}

const Container = styled.View`
  padding: 0px 10px;
`;

// const defaultAddress = '';

const Send: React.FC<SendProps> = ({ route }) => {
  const { presetAddress, presetTarget } = route.params;

  const [card, setCard] = useState({
    width: WIDTH,
    height: HEIGHT,
  });
  const [target, setTarget] = useState({
    width: FOLDED,
    height: FOLDED,
  });
  const [tokenFlag, setTokenFlag] = useState({
    width: FOLDED,
    height: FOLDED,
  });
  const [amountFlag, setAmountFlag] = useState({
    width: FOLDED,
    height: FOLDED,
  });
  // const [visible, setVisible] = useState(false);
  // const [nick, setNick] = useState('');
  // const [phone, setPhone] = useState('');
  // const addr = '' + address;
  // const [fromAddress, setFromAddress] = useState('');
  // useEffect(() => {
  //   if (address) {
  //     setFromAddress(address);
  //     expandSwitch(target);
  //   }
  // }, []);
  // const [to, setTo] = useState(presetTarget);
  // const [price, setPrice] = useState(0);
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');
  //??????
  //??????

  // @?????????
  // ?????? ????????? ??????
  const [focus, setFocus] = useState(1);
  const [senderCardList, setSenderCardList] = useState();
  const [sendCard, setSendCard] = useState<CardType>();
  const [sendAddress, setSendAddress] = useState('');
  const [targetAddress, setTargetAddress] = useState(presetAddress ?? '');
  const [tokenPrices, setTokenPrices] = useState();

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isProceeded, setIsProceeded] = useState(false);

  const expandSwitch = (val: ExpandProp) => {
    const list = [card, target, tokenFlag, amountFlag];
    const setList = [setCard, setTarget, setTokenFlag, setAmountFlag];
    for (let i = 0; i < list.length; i++) {
      if (list[i] === val) {
        setList[i]({
          width: WIDTH,
          height: HEIGHT,
        });
      } else
        setList[i]({
          width: FOLDED,
          height: FOLDED,
        });
    }
  };

  // const goConfirm = () => {
  //   //???????????? id ?????? ????????? ?????????
  //   //???????????? ?????? ??? ???????????? id ????????? ?????? ???????????? ??????
  //   //@ts-ignore
  //   navigate('Send', { screen: 'SendConfirm' });
  // };
  // const getType = (props: IType) => {
  //   if (!props) return;
  //   if (props.type === '????????????') {
  //     setPhone(props.value);
  //     setNick('');
  //   } else if (props.type === '?????????') {
  //     setNick(props.value);
  //     setPhone('');
  //   }
  //   setTo('');
  // };
  // const getTo = (to: string) => {
  //   setTo(to);
  //   console.log(to);
  // };
  const { navigate } = useNavigation();

  // @?????????
  const getUserCards = async () => {
    const { status, data } = await getUserInfo();
    if (status === 200) {
      setSenderCardList(data.cards);
    }
  };

  // TODO ??? ?????? ?????? ??????.. ????????? ???????????? ??????
  const getCoinPrices = async () => {
    const mana = await getCoinPrice('decentraland');
    const eth = await getCoinPrice('ethereum');
    const usdt = await getCoinPrice('tether');
    setTokenPrices({
      decentraland: mana,
      ethereum: eth,
      tether: usdt,
    });
  };

  const selectSendCard = (card: CardType) => {
    setSendCard(card);
    setSendAddress(card.card_address);
  };

  useEffect(() => {
    if (focus === 1) getUserCards();
  }, [focus]);

  useEffect(() => {
    getCoinPrices();
  }, []);

  return (
    <Container>
      <ScrollView nestedScrollEnabled={true}>
        <Divider size="small" />
        <ProgressTab
          title={`?????? ?????? ??????${sendCard ? `: ${sendCard.card_name}` : ''}`}
          index={1}
          onPress={() => {
            expandSwitch(card);
            setFocus(1);
          }}
          state={focus === 1 ? 'focus' : sendAddress ? 'selected' : 'empty'}
        />
        {focus === 1 ? (
          <ExpandableView width={card.width} height={card.height}>
            {senderCardList ? (
              <HFlatList
                // ListFooterComponent={() => <AddCard refetch={refetch} />}
                // data={senderCardList?.map((card) => ({ ...card, prices }))}
                data={senderCardList}
                margin={5}
                renderItem={({ item }) => {
                  return (
                    <SenderCardItem
                      card={item}
                      prices={tokenPrices}
                      selectSendCard={selectSendCard}
                    />
                  );
                }}
              />
            ) : null}
          </ExpandableView>
        ) : null}
        <Divider size="small" />
        <ProgressTab
          // ???????????? ?????? ???????????? ???????????? ??? ?????? ????????? ?????? ??? ???????????? ?????? 'presetAddress' ??????
          title={`????????? ??????${
            targetAddress
              ? `: ${targetAddress.substring(0, 15)}...`
              : presetAddress
              ? `: ${presetAddress.substring(0, 15)}...`
              : ''
          }`}
          index={2}
          onPress={() => {
            expandSwitch(target);
            setFocus(2);
          }}
          state={focus === 2 ? 'focus' : targetAddress || presetAddress ? 'selected' : 'empty'}
        />
        {focus === 2 ? (
          <ExpandableView width={target.width} height={target.height}>
            <SelectTargetView
              targetAddress={targetAddress}
              setTargetAddress={setTargetAddress}
              presetAddress={presetAddress}
            />
            {/* <EasySendAndReceive address={to} setAddress={getTo} setType={getType} /> */}
          </ExpandableView>
        ) : null}
        <Divider size="small" />
        <ProgressTab
          title={`?????? ?????? ??????${token ? `: ${token}` : ''}`}
          index={3}
          onPress={() => {
            expandSwitch(tokenFlag);
            setFocus(3);
          }}
          state={focus === 3 ? 'focus' : token ? 'selected' : 'empty'}
        />
        {focus === 3 ? (
          <ExpandableView width={tokenFlag.width} height={tokenFlag.height}>
            <TokenList selectedToken={token} setSelectedToken={setToken} />
          </ExpandableView>
        ) : null}
        <Divider size="small" />
        <ProgressTab
          title={`?????? ?????? ??????${amount ? `: ${amount}` : ''}`}
          index={4}
          onPress={() => {
            expandSwitch(amountFlag);
            setFocus(4);
          }}
          state={focus === 4 ? 'focus' : amount ? 'selected' : 'empty'}
        />
        {focus === 4 ? (
          <ExpandableView width={amountFlag.width} height={amountFlag.height}>
            {/* ?????? ?????? ?????? */}
            <Divider />
            <AmountInput amount={amount} setAmount={setAmount} token={token} />
          </ExpandableView>
        ) : null}
        <Divider size="small" />
        {focus === 4 ? (
          <Button
            title="??? ???"
            onPress={() => {
              // setVisible(true);
              setConfirmModalVisible(!confirmModalVisible);
            }}
            disabled={
              sendAddress == null || targetAddress == null || token == null || amount == null
            }
          />
        ) : null}
        <SendConfirmModal
          modalVisible={confirmModalVisible}
          onModalClosed={() => {
            setConfirmModalVisible(!confirmModalVisible);
            if (isProceeded) navigate('??????', {});
            setIsProceeded(false);
          }}
          data={{ sendAddress, targetAddress, token, amount }}
          isProceeded={isProceeded}
          setIsProceeded={setIsProceeded}
        />
        {/* {visible === true && (
          <SendModal>
            <Typography size="body1">??????????????? ???????????????!</Typography>
            <Typography size="body3">{nick !== '' && nick}</Typography>
            <Typography size="body3">{phone !== '' && phone}</Typography>
            <Typography size="body3">
              {nick === '' && phone === '' && to.substring(0, 7) + '...'}
            </Typography>
            <Typography size="body3">?????????</Typography>
            <Typography size="body3">{token} ??????</Typography>
            <Typography size="body3">{amount}??? ????????????!</Typography>
            <Button
              title="??? ?????????!"
              onPress={() => {
                goConfirm();
              }}
            ></Button>
            <TouchableWithoutFeedback
              onPress={() => {
                setVisible(false);
              }}
            >
              <Close
                source={{
                  uri: 'https://user-images.githubusercontent.com/63468607/168971504-42ef3187-9a86-4266-abc5-9f3e5c8d0b4b.png',
                }}
              />
            </TouchableWithoutFeedback>
          </SendModal>
        )} */}
      </ScrollView>
    </Container>
  );
};

export default Send;

const WIDTH = '100%';
const HEIGHT = '300px';
const FOLDED = '0px';

const styles = StyleSheet.create({
  send: {
    position: 'absolute',
    backgroundColor: theme.backgroundColor,
    width: '80%',
    alignItems: 'center',
    top: '25%',
    left: '10%',
    height: 400,
    zIndex: 999,
  },
});

const Won = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

const SendModal = styled.View`
  position: absolute;
  background-color: ${({ theme }) => theme.mainBgColor};
  border: 1px solid black;
  width: 80%;
  align-items: center;
  top: 25%;
  left: 10%;
  height: 60%;
  z-index: 999;
  overflow: hidden;
`;

const Close = styled.Image`
  width: 25px;
  height: 25px;
  top: 5%;
  right: 5%;
  position: absolute;
`;
