import React from "react";
import { useWindowDimensions } from "react-native";

import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AvatarButtom, AvatarPic, Wrapper } from "./styles";

import avatar from "../../../../assets/avatar.png";

interface Props {
  initial: boolean;
  viewTranslateX: SharedValue<number>;
  viewTranslateY: SharedValue<number>;
}

export default function Avatar({ initial, viewTranslateX, viewTranslateY }: Props) {
  const { width } = useWindowDimensions();

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const pressed = useSharedValue(false);

  const wrapRef = useAnimatedRef<Animated.View>();

  useDerivedValue(() => {
    if (_WORKLET) {
      const measured = measure(wrapRef);
      if (!measured || !viewTranslateX.value || !viewTranslateY.value) return;
      const { pageX, pageY } = measured;
      const half = width / 2 - 40;

      if (initial) {
        console.log(half - pageX);
      }

      let initialTranslate = -90;
      let finalTranslate = -10;
      let letValue = pageX;

      if (pageX <= -10) {
        initialTranslate = -90;
        finalTranslate = -10;
        letValue = pageX;
      } else if (pageX >= 280) {
        initialTranslate = 365;
        finalTranslate = 285;
        letValue = pageX;
      } else if (pageY <= 80) {
        initialTranslate = 0;
        finalTranslate = 80;
        letValue = pageY;
      } else if (pageY >= 730) {
        initialTranslate = 810;
        finalTranslate = 730;
        letValue = pageY;
      }

      if (pressed.value) {
        scale.value = withTiming(2);
        translateX.value = withTiming(half - pageX);
        return;
      } else {
        translateX.value = withTiming(0);
      }

      scale.value = interpolate(
        letValue,
        [initialTranslate, finalTranslate],
        [0, 1],
        Extrapolate.CLAMP
      );
    }
  }, [viewTranslateX.value, viewTranslateY.value, pressed.value]);

  const animateWrapper = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
  }));

  const animateAvatar = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
  }));

  const onPress = () => {
    pressed.value = !pressed.value;
    // translateY.value = withTiming(-240);
    // scale.value = withTiming(1.5);
  };

  return (
    <Wrapper ref={wrapRef}>
      <AvatarButtom onPress={onPress}>
        <AvatarPic source={avatar} style={animateAvatar} />
      </AvatarButtom>
    </Wrapper>
  );
}
