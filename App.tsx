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
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  const [initialMaxScore, setInitialMaxScore] = React.useState(12);
  const [maxScore, setMaxScore] = React.useState(initialMaxScore);
  const [countLeft, setCountLeft] = React.useState(0);
  const [countRight, setCountRight] = React.useState(0);

  const winner = () => {
    if (countLeft === maxScore) {
      return 'Left';
    }
    if (countRight === maxScore) {
      return 'Right';
    }
    return '';
  };

  const [lastPoint, setLastPoint] = React.useState('');

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
        <Text style={{fontSize: 36, color: '#00000098'}}>{maxScore}</Text>
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
        <Text style={[styles.teamName, textLeftStyle()]}>Nome</Text>
        <TouchableOpacity
          onPress={incrementLeft}
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
        <Text style={[styles.teamName, textRightStyle()]}>Nome</Text>
        <TouchableOpacity
          onPress={incrementRight}
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
});

export default App;
