import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  AvatarButtom,
  AvatarPic,
  AvatarRow,
  Container,
  Header,
  Title,
  Gradient,
} from "./styles";

import avatar from "../../assets/avatar.png";
import { StatusBar } from "expo-status-bar";

export default function Main() {
  const tranlateX = useSharedValue(0);
  const tranlateY = useSharedValue(0);

  const avatarRows = [...Array(10).keys()].map(() => [...Array(8).keys()]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = tranlateX.value;
      ctx.startY = tranlateY.value;
    },
    onActive: (event, ctx) => {
      tranlateX.value = ctx.startX + event.translationX;
      tranlateY.value = ctx.startY + event.translationY;
    },
    onEnd: (_) => {
      // tranlateX.value = withTiming(tranlateX.value + 20);
      // tranlateY.value = withTiming(tranlateY.value + 20);
    },
  });

  const containerAnimation = useAnimatedStyle(() => ({
    width: 1000,
    position: "absolute",
    transform: [{ translateX: tranlateX.value }, { translateY: tranlateY.value }],
  }));

  return (
    <Container>
      <StatusBar style="dark" />
      <Header>
        <Title>airmate</Title>
      </Header>
      <Gradient />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={containerAnimation}>
          {avatarRows.map((item, index) => (
            <AvatarRow key={`row-${index}`} reverse={index % 2 === 0}>
              {item.map((key) => (
                <AvatarButtom key={`avatar-${key}`}>
                  <AvatarPic source={avatar} />
                </AvatarButtom>
              ))}
            </AvatarRow>
          ))}
        </Animated.View>
      </PanGestureHandler>
      <Gradient reverse />
    </Container>
  );
}
