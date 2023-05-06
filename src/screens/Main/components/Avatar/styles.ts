import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Wrapper = styled(Animated.View)``;

export const AvatarButtom = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})``;

export const AvatarPic = styled(Animated.Image)`
  height: 80px;
  width: 80px;
  margin: 20px;
`;
