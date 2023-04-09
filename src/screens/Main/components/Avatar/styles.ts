import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import styled, { css } from "styled-components/native";

interface Props {
  reverse?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: white;
`;

export const Header = styled.SafeAreaView`
  align-items: center;
  background: white;
  z-index: 99;
`;

export const Title = styled.Text`
  color: black;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: ["white", "rgba(255, 255, 255, 0.119)"],
  locations: [0.2, 0.8],
})<Props>`
  height: 40px;
  width: 100%;
  z-index: 99;

  ${({ reverse }) =>
    reverse &&
    css`
      position: absolute;
      bottom: 0;
      transform: rotateX(180deg);
    `}
`;

export const AvatarWrapper = styled(Animated.View)``;

export const AvatarButtom = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})``;

export const AvatarRow = styled.View<Props>`
  flex-direction: row;
  margin-left: ${({ reverse }) => (reverse ? 60 : 0)}px;
`;

export const AvatarPic = styled(Animated.Image)`
  height: 80px;
  width: 80px;
  margin: 20px;
`;
