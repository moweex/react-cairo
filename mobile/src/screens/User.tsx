import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkUserIn } from '../services';
import { Button, StyleSheet, Text, View } from 'react-native';

type Props = {
  // !!FIXME: This is a hack to get around typing routes in React Navigation
  route: any;
};
export function UserScreen({ route }: Props) {
  const item = route.params.user;
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

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 36,
          fontWeight: 'bold',
          color: 'black',
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          fontSize: 26,
          color: 'black',
        }}
      >
        {item.title}
      </Text>
      <Button
        title={`Check in`}
        color="orange"
        onPress={() => checkInUser(item.id)}
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
