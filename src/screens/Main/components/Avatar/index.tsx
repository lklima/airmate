import React, { useRef } from "react";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
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
  AvatarWrapper,
} from "./styles";

import avatar from "../../../../assets/avatar.png";

interface Props {
  index: number;
  panStarted: SharedValue<boolean>;
  viewTranslateX: SharedValue<number>;
  viewTranslateY: SharedValue<number>;
}

export default function Avatar({
  index,
  panStarted,
  viewTranslateX,
  viewTranslateY,
}: Props) {
  const tranlateX = useSharedValue(0);
  const tranlateY = useSharedValue(0);

  const wrapRef = useRef(null);

  const measure = () => {
    wrapRef.current.measure((x, y, width, height, pageX, pageY) => {
      // console.log("x:", pageX, "y:", pageY);
    });
  };

  useDerivedValue(() => {
    if (index === 0 && viewTranslateX.value && viewTranslateX.value) {
      runOnJS(measure)();
    }
  }, [viewTranslateX.value, viewTranslateY.value]);

  return (
    <AvatarWrapper ref={wrapRef}>
      <AvatarButtom>
        <AvatarPic source={avatar} />
      </AvatarButtom>
    </AvatarWrapper>
  );
}
