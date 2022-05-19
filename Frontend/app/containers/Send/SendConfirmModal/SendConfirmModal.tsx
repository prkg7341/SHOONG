import Avatar from '@components/common/Avatar';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider/Divider';
import { useNavigation } from '@react-navigation/native';
import { requestAddFriend, requestDeleteFriend } from '@services/api/friends/friendsAPI';
import { TokenSymbol } from '@services/api/token/tokenTypes';
import Typography from '@theme/Typography';
import { UserCircle } from 'phosphor-react-native';
import { Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { FriendType, TransactionType, UserInfoType } from 'types/apiTypes';

const Wrapper = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.View`
  width: 90%;
  margin: 10px;
  background-color: ${(props) => props.theme.subBgColor};
  border-radius: 10;
  padding: 35px;
  align-items: center;
`;

const Title = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.textColor};
  text-align: left;
  font-size: 20px;
  font-weight: 700;
`;

const Content = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  padding: 5px 0px;
  /* text-overflow: clip; */
`;

const Label = styled.Text`
  width: 25%;
  color: ${({ theme }) => theme.textLinkColor};
  text-align: left;
  font-size: 14px;
  font-weight: 700;
  margin-right: 10px;
`;

const Info = styled.Text`
  width: 75%;
  color: ${({ theme }) => theme.textSubColor};
  text-align: left;
  font-size: 14px;
`;

const ButtonGroup = styled.View`
  justify-content: center;
  flex-direction: row;
`;

interface SendConfirmModalProps {
  modalVisible: boolean;
  onModalClosed: any;
  data: TransactionType;
}

const SendConfirmModal = ({ modalVisible, onModalClosed, data }: SendConfirmModalProps) => {
  const handleTransaction = () => {
    // TODO
    Alert.alert('승현님 여기요!');
    ////////

    onModalClosed();
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onModalClosed}
      >
        <Wrapper onPress={onModalClosed}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Container>
              <Title>송금 내용을 확인할게요</Title>
              <Divider />
              <Content>
                <Label>출금 주소</Label>
                <Info>{data.sendAddress}</Info>
              </Content>
              <Content>
                <Label>송금 주소</Label>
                <Info>{data.targetAddress}</Info>
              </Content>
              <Content>
                <Label>토큰</Label>
                <Info>{`${TokenSymbol[data.token]} (${data.token})`}</Info>
              </Content>
              <Content>
                <Label>송금 수량</Label>
                <Info>{data.amount}</Info>
              </Content>
              <Content>
                <Label>송금 수수료</Label>
                <Info>???????</Info>
              </Content>
              <Divider />
              <ButtonGroup>
                <Button
                  title="네, 확인했어요"
                  onPress={handleTransaction}
                  variant="primary"
                  // disabled={data.cards.length < 1}
                />
                <Divider orientation="horizontal" size="small" />
                {/* <Button title="친구삭제" onPress={deleteFriend} variant="error" /> */}
                {/* <Button title="닫기" /> */}
              </ButtonGroup>
            </Container>
          </TouchableWithoutFeedback>
        </Wrapper>
      </Modal>
    </>
  );
};

export default SendConfirmModal;