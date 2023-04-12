import React from "react";
import { View, useWindowDimensions } from "react-native";

import {
  Extrapolate,
  SharedValue,
  interpolate,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
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

  const wrapRef = useAnimatedRef<View>();

  useDerivedValue(() => {
    if (_WORKLET) {
      const measured = measure(wrapRef);
      if (!measured || !viewTranslateX.value || !viewTranslateY.value) return;
      const { pageX, pageY } = measured;

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

      scale.value = interpolate(
        letValue,
        [initialTranslate, finalTranslate],
        [0, 1],
        Extrapolate.CLAMP
      );
    }
  }, [viewTranslateX.value, viewTranslateY.value]);

  const animateAvatar = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Wrapper ref={wrapRef}>
      <AvatarButtom>
        <AvatarPic source={avatar} style={animateAvatar} />
      </AvatarButtom>
    </Wrapper>
  );
}
