import React, { Component } from 'react'
import { Platform, StyleSheet, Animated } from 'react-native'
import PropTypes from 'prop-types'

class FlipableCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      side: 0,
      sides: [],
      duration: 1000,
      rotateOrientation: '',
      progress: new Animated.Value(0),
      rotation: new Animated.ValueXY({ x: 50, y: 50 }),
      zoom: new Animated.Value(0)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.duration !== prevState.duration ||
      nextProps.flipZoom !== prevState.flipZoom ||
      nextProps.children !== prevState.sides
    ) {
      return {
        duration: nextProps.duration,
        flipZoom: nextProps.flipZoom,
        sides: nextProps.children
      };
    }
    return null;
  }

  componentDidMount() {
    this.setState({
      duration: this.props.duration,
      sides: this.props.children
    });
  }

  flip() {
    if (this.props.flipDirection == 'y') {
      this.flipY();
    } else {
      this.flipX();
    }
  }

  flipY() {
    const { side } = this.state;
    this._flipTo({
      x: 50,
      y: side === 0 ? 100 : 50
    });
    this.setState({
      side: side === 0 ? 1 : 0,
      rotateOrientation: 'y'
    });
  }

  flipX() {
    const { side } = this.state;
    this._flipTo({
      y: 50,
      x: side === 0 ? 100 : 50
    });
    this.setState({
      side: side === 0 ? 1 : 0,
      rotateOrientation: 'x'
    });
  }

  _flipTo(toValue) {
    const { duration, rotation, progress, zoom, side } = this.state;
    this.props.onFlip(side === 0 ? 1 : 0);
    this.props.onFlipStart(side === 0 ? 1 : 0);
    Animated.parallel([
      Animated.timing(progress, {
        toValue: side === 0 ? 100 : 0,
        duration,
        useNativeDriver: true
      }),
      Animated.sequence([
        Animated.timing(zoom, {
          toValue: 150,
          duration: duration / 2,
          useNativeDriver: true
        }),
        Animated.timing(zoom, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true
        })
      ]),
      Animated.timing(rotation, {
        toValue,
        duration,
        useNativeDriver: true
      })
    ]).start(() => {
      this.props.onFlipEnd(side === 0 ? 1 : 0);
    });
  }

  getCardATransformation() {
    // 0, 50, 100
    const { progress, rotation, side, rotateOrientation } = this.state;

    const sideAOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [100, 0],
      extrapolate: 'clamp'
    });

    const sideATransform = {
      opacity: sideAOpacity,
      zIndex: side === 0 ? 1 : 0,
      transform: [{ perspective: this.props.perspective }]
    };
    if (rotateOrientation === 'x') {
      const aXRotation = rotation.x.interpolate({
        inputRange: [0, 50, 100, 150],
        outputRange: ['-180deg', '0deg', '180deg', '0deg'],
        extrapolate: 'clamp'
      });
      sideATransform.transform.push({ rotateX: aXRotation });
    } else {
      // cardA Y-rotation
      const aYRotation = rotation.y.interpolate({
        inputRange: [0, 50, 100, 150],
        outputRange: ['-180deg', '0deg', '180deg', '0deg'],
        extrapolate: 'clamp'
      });
      sideATransform.transform.push({ rotateY: aYRotation });
    }
    return sideATransform;
  }

  getCardBTransformation() {
    const { progress, rotation, side, rotateOrientation } = this.state;

    const sideBOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [0, 100],
      extrapolate: 'clamp'
    });

    const sideBTransform = {
      opacity: sideBOpacity,
      zIndex: side === 0 ? 0 : 1,
      transform: [{ perspective: -1 * this.props.perspective }]
    };
    let bYRotation;
    if (rotateOrientation === 'x') {
      const bXRotation = rotation.x.interpolate({
        inputRange: [0, 50, 100, 150],
        outputRange: ['0deg', '-180deg', '-360deg', '180deg'],
        extrapolate: 'clamp'
      });
      sideBTransform.transform.push({ rotateX: bXRotation });
    } else {
      if (Platform.OS === 'ios') {
        // cardB Y-rotation
        bYRotation = rotation.y.interpolate({
          inputRange: [0, 50, 100, 150],
          outputRange: ['0deg', '180deg', '0deg', '-180deg'],
          extrapolate: 'clamp'
        });
      } else {
        // cardB Y-rotation
        bYRotation = rotation.y.interpolate({
          inputRange: [0, 50, 100, 150],
          outputRange: ['0deg', '-180deg', '0deg', '180deg'],
          extrapolate: 'clamp'
        });
      }
      sideBTransform.transform.push({ rotateY: bYRotation });
    }
    return sideBTransform;
  }

  render() {
    const { zoom, sides } = this.state;
    const { flipZoom } = this.props;
    // Handle cardA transformation
    const cardATransform = this.getCardATransformation();
    // Handle cardB transformation
    const cardBTransform = this.getCardBTransformation();
    // Handle cardPopup
    const cardZoom = zoom.interpolate({
      inputRange: [0, 150],
      outputRange: [1, 1 + flipZoom],
      extrapolate: 'clamp'
    });
    const scaling = {
      transform: [{ scale: cardZoom }]
    };
    return (
      <Animated.View style={[this.props.style, scaling]}>
        <Animated.View style={[styles.cardContainer, cardATransform]}>{sides[0]}</Animated.View>
        <Animated.View style={[styles.cardContainer, cardBTransform]}>{sides[1]}</Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

FlipableCard.defaultProps = {
  style: {},
  duration: 500,
  flipZoom: 0.09,
  flipDirection: 'y',
  perspective: 800,
  onFlip: () => {},
  onFlipStart: () => {},
  onFlipEnd: () => {}
};

FlipableCard.propTypes = {
  onFlip: PropTypes.func,
  style: PropTypes.object,
  duration: PropTypes.number,
  flipZoom: PropTypes.number,
  onFlipEnd: PropTypes.func,
  onFlipStart: PropTypes.func,
  perspective: PropTypes.number,
  flipDirection: PropTypes.string
}

export default FlipableCard