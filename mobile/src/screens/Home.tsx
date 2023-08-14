import { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Linking,
  Switch,
  TextInput,
} from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useQuery } from '@tanstack/react-query';
import { getAttendees } from '../services';

type Props = {
  // !!FIXME: customize this type to match route params for this app
  navigation: NativeStackNavigationProp<ParamListBase>;
};

function AttendeeList({ navigation }: Props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, onChangeText] = useState('');
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['attendees', text, isEnabled],
    queryFn: () =>
      getAttendees({
        attendOnly: isEnabled,
        email: text.length > 0 ? text : undefined,
      }),
  });

  return (
    <>
      <View style={{ width: '100%' }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'orange',
            marginVertical: 10,
            textAlign: 'center',
          }}
        >
          {`${isEnabled ? 'Attending' : 'Registered'} (${
            isEnabled ? data?.count ?? 0 : data?.total ?? 0
          })`}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            onChangeText={onChangeText}
            value={text}
            style={styles.input}
            autoComplete="off"
            placeholder="search for email"
          />
          <Switch
            trackColor={{ false: '#767577', true: 'orange' }}
            thumbColor="orange"
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsEnabled(p => !p)}
            value={isEnabled}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          marginBottom: 80,
        }}
      >
        <FlatList
          data={data?.attendants}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: item.attended ? '#00FF001F' : '#3e3e3e1F',
                padding: 20,
                marginVertical: 4,
                marginHorizontal: 16,
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate('User', { user: item })}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}
                >
                  {item.company}
                </Text>
              </View>
              <AntDesign
                style={{
                  alignSelf: 'center',
                }}
                name="link"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          )}
          refreshing={isLoading}
          onRefresh={refetch}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
}

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <AttendeeList navigation={navigation} />
      <View style={styles.floatingButton}>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate('Manual Check In')}
        >
          <MaterialIcons name="mode-edit" size={50} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Check In Attendee')}
        >
          <AntDesign name="pluscircleo" size={50} color="green" />
        </TouchableOpacity>
      </View>
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
  floatingButton: {
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
});
