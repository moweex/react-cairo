import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkUserIn } from '../services';

export function ManualCheckInScreen() {
  const queryClient = useQueryClient();

  const { mutate: checkInUser } = useMutation({
    mutationKey: ['checkIn'],
    mutationFn: checkUserIn,
    onMutate: userId => alert(`Checking in attendee ${userId}`),
    onSuccess: result => {
      switch (result) {
        case 'success':
          alert(`PASS: Attendee checked in successfully`);
          break;
        case 'attended':
          alert(`CAREFUL: Attendee already checked in`);
          break;
        case 'fail':
          alert(`FAILURE: Attendee check in failed, try manual check in`);
      }
      queryClient.invalidateQueries(['attendees']);
    },
  });

  const [text, onChangeText] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        style={styles.input}
        autoComplete="off"
        placeholder="user id for example: 28dc283e-51ff-47bf-b5ea-f44ba4faa3d5"
      />
      <Button
        title={`Check in`}
        color="orange"
        onPress={() => checkInUser(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
  },
});
