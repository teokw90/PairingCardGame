import React, { useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AppConstants } from '@constants'
import { scale } from '@helper'
import { getCardMeasure } from '@helper/utilities'
import { Colors } from '@theme/colors'
import FlipableCard from './flipableCard'

const GameCard = props => {
  // Creating a ref object using useRef hook
  const flipableCard = useRef(null);
  return (
    <FlipableCard
      ref={flipableCard}
      flipZoom={AppConstants.FLIP_ZOOM}
      duration={AppConstants.FLIP_ANIM_DURATION}
      flipDirection="y"
      style={styles.cardFlipContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.flipCardStyle, styles.cardCoverStyle]}
        onPress={() => flipableCard.current.flip()}>
        <Text style={{ fontSize: 48, color: 'white' }}>{'\u003F'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.flipCardStyle, styles.cardFrontStyle]}
        onPress={() => flipableCard.current.flip()}>
        <Text style={{ fontSize: 14, color: 'white' }}>{`Back Side:${props.cardNumber}`}</Text>
      </TouchableOpacity>
    </FlipableCard>
  );
};

const styles = StyleSheet.create({
  cardFlipContainer: {
    flex: 1,
    height: getCardMeasure().CONTAINER_HEIGHT
  },
  flipCardStyle: {
    borderWidth: scale(4),
    borderRadius: scale(12),
    height: getCardMeasure().CARD_HEIGHT,
    width: getCardMeasure().CARD_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.Shades.COLOR_WHITE
  },
  cardCoverStyle: {
    backgroundColor: Colors.CARD_COVER_COLOR
  },
  cardFrontStyle: {
    backgroundColor: Colors.CARD_FRONT_COLOR
  }
});

export default GameCard;