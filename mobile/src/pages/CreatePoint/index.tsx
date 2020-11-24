import React, { useEffect, useState, FunctionComponent } from 'react';

import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import * as LocationRouter from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';

import { Location } from '../../store/ducks/location/types';
import * as LocationActions from '../../store/ducks/location/actions';
import { AplicationState } from '../../store';

import api from '../../services/api';

interface Item {
  id: number;
  name: string;
  image_url: string;
}

//Mapeia o que vem no state
interface StateProps {
  location: Location;
}

// Mapei as funções que podem ser utilizadas
interface DispatchProps {
  setLocationRequest(data: Location): void;
}

// Qualquer propriedade que vier de um componente pai
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

const CreatePoint: FunctionComponent<Props> = (props) => {
  const [name, setName] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0
  ]);

  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    0,
    0
  ]);

  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function handlerPressOnMap(event: any) {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setMarkerPosition([latitude, longitude]);
  }

  async function handleSave() {
    const data = {
      name,
      city: props.location.city,
      uf: props.location.uf,
      items: selectedItems,
      latitude: markerPosition[0],
      longitude: markerPosition[1],
      likes: 0,
      dislikes: 0
    };

    await api.post('points', data);

    alert('Ponto esportivo criado');

    navigation.goBack();
  }

  useEffect(() => {
    api.get('items').then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await LocationRouter.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Oooops...',
          'Precisamos de sua permissão para obter a localização'
        );
        return;
      }

      const locationRouter = await LocationRouter.getCurrentPositionAsync();

      const { latitude, longitude } = locationRouter.coords;

      setInitialPosition([latitude, longitude]);
      setMarkerPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Cadastro do ponto esportivo.</Text>

        <Text style={styles.pointDataTitle}>Dados do ponto</Text>
        <TextInput
          style={styles.input}
          value={name}
          autoCorrect={false}
          onChangeText={setName}
          placeholder="Nome do ponto"
        ></TextInput>

        <Text style={styles.pointDataTitle}>Endereço</Text>
        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
              onPress={handlerPressOnMap}
            >
              <Marker
                coordinate={{
                  latitude: markerPosition[0],
                  longitude: markerPosition[1]
                }}
              />
            </MapView>
          )}
        </View>

        <Text style={styles.pointDataTitle}>
          Selecione os esportes desse local
        </Text>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={String(item.id)}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]}
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <RectButton
          style={[styles.buttonAction, styles.buttonActionCancel]}
          onPress={handleNavigateBack}
        >
          <Text style={styles.buttonActionText}>Cancelar</Text>
        </RectButton>

        <RectButton style={styles.buttonAction} onPress={handleSave}>
          <Text style={styles.buttonActionText}>Confirmar</Text>
        </RectButton>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: AplicationState) => ({
  location: state.location.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(LocationActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoint);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24
  },

  pointDataTitle: {
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
    marginBottom: 8
  },

  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    marginTop: 10
  },

  mapContainer: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16
  },

  map: {
    width: '100%',
    height: '100%'
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 10
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center'
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
    backgroundColor: '#e1faec'
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13
  },

  footer: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  buttonAction: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonActionCancel: {
    backgroundColor: '#ec0101'
  },

  buttonActionText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium'
  }
});
