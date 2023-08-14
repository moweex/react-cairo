import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import { checkUserIn } from '../services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const getUserIdFromQRCode = (data: string) => {
  const split = data.split('/');
  return split[split.length - 1];
};

export function CodeScanScreen() {
  const queryClient = useQueryClient();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

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

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = async ({
    type,
    data,
  }) => {
    setScanned(true);

    const userId = getUserIdFromQRCode(data);
    checkInUser(userId);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}
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
});
