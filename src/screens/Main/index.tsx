import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { LayoutChangeEvent } from "react-native";

import { AvatarRow, Container, Header, Title, Gradient, AvatarWrapper } from "./styles";

import Avatar from "./components/Avatar";

export default function Main() {
  const tranlateX = useSharedValue(0);
  const tranlateY = useSharedValue(0);

  const panSarted = useSharedValue(false);
  const viewWidth = useSharedValue(0);
  const viewHeight = useSharedValue(0);

  const viewRef = useRef(null);

  const avatarRows = [...Array(10).keys()].map(() => [...Array(8).keys()]);

  const onLayout = (event: LayoutChangeEvent) => {
    viewWidth.value = event.nativeEvent.layout.width;
    viewHeight.value = event.nativeEvent.layout.height;
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      panSarted.value = true;
      ctx.startX = tranlateX.value;
      ctx.startY = tranlateY.value;
    },
    onActive: (event, ctx) => {
      // console.log(Math.abs(ctx.startX + event.translationX));

      tranlateX.value = ctx.startX + event.translationX;

      tranlateY.value = ctx.startY + event.translationY;
    },
    onEnd: (_) => {
      panSarted.value = false;
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
        <AvatarWrapper ref={viewRef} style={containerAnimation} onLayout={onLayout}>
          {avatarRows.map((item, index) => (
            <AvatarRow key={`row-${index}`} reverse={index % 2 === 0}>
              {item.map((key, index2) => (
                <Avatar
                  initial={index === 0 && index2 === 0}
                  key={`avatar-${key}`}
                  viewTranslateX={tranlateX}
                  viewTranslateY={tranlateY}
                />
              ))}
            </AvatarRow>
          ))}
        </AvatarWrapper>
      </PanGestureHandler>
      <Gradient reverse />
    </Container>
  );
}
