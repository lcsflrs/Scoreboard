/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextInputEndEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  const [initialMaxScore, setInitialMaxScore] = React.useState(12);
  const [maxScore, setMaxScore] = React.useState(initialMaxScore);
  const [countLeft, setCountLeft] = React.useState(0);
  const [countRight, setCountRight] = React.useState(0);
  const [nameLeft, setNameLeft] = React.useState('TM1');
  const [nameRight, setNameRight] = React.useState('TM2');
  const [lastPoint, setLastPoint] = React.useState('');

  const [leftNamePressed, setLeftNamePressed] = React.useState(false);
  const [rightNamePressed, setRightNamePressed] = React.useState(false);
  const [maxScorePressed, setMaxScorePressed] = React.useState(false);

  const handleMaxScorePress = () => {
    if (!isLeftWinner() && !isRightWinner()) {
      console.log('maxScorePressed');
      setMaxScorePressed(true);
    }
  };

  const handleMaxScoreSubmit = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    const newMaxScore = parseInt(e.nativeEvent.text, 10);
    if (newMaxScore > 0) {
      setMaxScore(newMaxScore);
      setInitialMaxScore(newMaxScore);
    }
    setMaxScorePressed(false);
  };

  const handleLeftNamePress = () => {
    if (!isRightWinner() && !isLeftWinner()) {
      setLeftNamePressed(true);
    }
  };

  const handleLeftNameSubmit = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    if (e.nativeEvent.text) {
      if (e.nativeEvent.text !== 'KKK') {
        setNameLeft(e.nativeEvent.text);
      }
    }
    setLeftNamePressed(false);
  };

  const handleRightNamePress = () => {
    if (!isRightWinner() && !isRightWinner()) {
      setRightNamePressed(true);
    }
  };

  const handleRightNameSubmit = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    if (e.nativeEvent.text) {
      if (e.nativeEvent.text !== 'KKK') {
        setNameRight(e.nativeEvent.text);
      }
    }
    setRightNamePressed(false);
  };

  const winner = () => {
    if (countLeft === maxScore) {
      return 'Left';
    }
    if (countRight === maxScore) {
      return 'Right';
    }
    return '';
  };

  const isLeftWinner = () => {
    return winner() === 'Left';
  };

  const isRightWinner = () => {
    return winner() === 'Right';
  };

  const incrementLeft = () => {
    if (countLeft < maxScore) {
      setCountLeft(countLeft + 1);
      setLastPoint('Left');
    }
  };

  const decrementLeft = () => {
    if (countLeft > 0) {
      setCountLeft(countLeft - 1);
    }
  };

  const decrementRight = () => {
    if (countRight > 0) {
      setCountRight(countRight - 1);
    }
  };

  const incrementRight = () => {
    if (countRight < maxScore) {
      setCountRight(prev => prev + 1);
      setLastPoint('Right');
    }
  };

  useEffect(() => {
    if (countRight === maxScore - 1 && countLeft === maxScore - 1) {
      setMaxScore(prev => prev + 1);
    }
  }, [countRight, countLeft, maxScore]);

  const reset = () => {
    setCountLeft(0);
    setCountRight(0);
    setMaxScore(initialMaxScore);
    setLastPoint('');
  };

  const textLeftStyle = () => {
    if (isLeftWinner()) {
      return styles.winnerText;
    } else if (isRightWinner()) {
      return styles.loserText;
    }
    return {};
  };

  const textRightStyle = () => {
    if (isRightWinner()) {
      return styles.winnerText;
    } else if (isLeftWinner()) {
      return styles.loserText;
    }
    return {};
  };

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        animated
        barStyle="light-content"
        backgroundColor="#00000020"
        hidden
      />
      <View
        style={{
          position: 'absolute',
          left: '50%',
          padding: 16,
          backgroundColor: 'white',
          // right: '40%',
          width: 100,
          transform: [{translateX: -50}],
          zIndex: 999,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,

          elevation: 16,
        }}>
        {!maxScorePressed ? (
          <Text
            onPress={handleMaxScorePress}
            style={{fontSize: 36, color: '#00000098'}}>
            {maxScore}
          </Text>
        ) : (
          <TextInput
            onEndEditing={handleMaxScoreSubmit}
            placeholder={maxScore.toString()}
            placeholderTextColor="#00000098"
            maxLength={2}
            disableFullscreenUI
            keyboardType="number-pad"
            style={{fontSize: 36, color: '#00000098', paddingVertical: 0}}
          />
        )}
      </View>
      <View
        style={[
          styles.leftSection,
          isLeftWinner() ? styles.winnerSection : {},
        ]}>
        {lastPoint === 'Left' && (
          <Icon
            style={{position: 'absolute', top: 16, left: 16}}
            name="checkbox-blank-circle-outline"
            size={24}
            color="white"
          />
        )}
        {!leftNamePressed ? (
          <Text
            onPress={handleLeftNamePress}
            style={[styles.teamName, textLeftStyle()]}>
            {nameLeft}
          </Text>
        ) : (
          <TextInput
            autoFocus
            autoCapitalize="characters"
            style={styles.inputName}
            onEndEditing={handleLeftNameSubmit}
            placeholder={nameLeft}
            placeholderTextColor={'#FFFFFF98'}
            maxLength={3}
            disableFullscreenUI
          />
        )}
        <TouchableOpacity
          onPress={incrementLeft}
          onLongPress={decrementLeft}
          disabled={isLeftWinner() || isRightWinner()}>
          <Text style={[styles.score, textLeftStyle()]}>{countLeft}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: '#1C1C1C',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingVertical: 16,
        }}>
        <TouchableOpacity onPress={reset}>
          <Text style={{color: 'white'}}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.rightSection,
          isRightWinner() ? styles.winnerSection : {},
        ]}>
        {lastPoint === 'Right' && (
          <Icon
            style={{position: 'absolute', top: 16, right: 16}}
            name="checkbox-blank-circle-outline"
            size={24}
            color="white"
          />
        )}
        {!rightNamePressed ? (
          <Text
            onPress={handleRightNamePress}
            style={[styles.teamName, textRightStyle()]}>
            {nameRight}
          </Text>
        ) : (
          <TextInput
            autoFocus
            autoCapitalize="characters"
            style={styles.inputName}
            onEndEditing={handleRightNameSubmit}
            placeholder={nameRight}
            placeholderTextColor={'#FFFFFF98'}
            maxLength={3}
            disableFullscreenUI
          />
        )}
        <TouchableOpacity
          onPress={incrementRight}
          onLongPress={decrementRight}
          disabled={isLeftWinner() || isRightWinner()}>
          <Text style={[styles.score, textRightStyle()]}>{countRight}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1C1C1C',
    position: 'relative',
  },
  leftSection: {
    flex: 7,
    backgroundColor: '#393939',
    borderBottomRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rightSection: {
    flex: 7,
    backgroundColor: '#393939',
    borderBottomLeftRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  winnerSection: {
    backgroundColor: '#FEFEFE',
  },
  winnerText: {
    color: '#00000099',
  },
  loserText: {
    color: '#FFFFFF40',
  },
  score: {fontSize: 180, color: 'white'},
  teamName: {
    position: 'absolute',
    color: '#FFFFFF90',
    flex: 1,
    top: 16,
    fontSize: 36,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  inputName: {
    position: 'absolute',
    top: 16,
    fontSize: 36,
    flex: 1,
    color: '#FFFFFF90',
    // borderColor: 'red',
    // borderWidth: 1,
    paddingVertical: 0,
  },
});

export default App;
