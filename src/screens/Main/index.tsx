import React, { useRef } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
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

import { StatusBar } from "expo-status-bar";
import Avatar from "./components/Avatar";
import { LayoutChangeEvent } from "react-native";

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
      console.log(Math.abs(ctx.startX + event.translationX));

      if (
        Math.abs(ctx.startX + event.translationX) > 40 &&
        Math.abs(ctx.startX + event.translationX) < 550
      ) {
        tranlateX.value = ctx.startX + event.translationX;
      }

      //  tranlateY.value = ctx.startY + event.translationY;
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
        <Animated.View ref={viewRef} style={containerAnimation} onLayout={onLayout}>
          {avatarRows.map((item, index) => (
            <AvatarRow key={`row-${index}`} reverse={index % 2 === 0}>
              {item.map((key, index) => (
                <Avatar
                  index={index}
                  key={`avatar-${key}`}
                  panStarted={panSarted}
                  viewTranslateX={tranlateX}
                  viewTranslateY={tranlateY}
                />
              ))}
            </AvatarRow>
          ))}
        </Animated.View>
      </PanGestureHandler>
      <Gradient reverse />
    </Container>
  );
}
