import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as LocationRouter from 'expo-location';
import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import api from '../../services/api';
import { AplicationState } from '../../store';
import * as LocationActions from '../../store/ducks/location/actions';
import { Location } from '../../store/ducks/location/types';

interface Item {
  id: number;
  name: string;
  image_url: string;
}

interface Point {
  id: number;
  image: string;
  name: string;
  latitude: number;
  longitude: number;
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

const Points: FunctionComponent<Props> = (props) => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0
  ]);

  const navigation = useNavigation();
  const route = useRoute();

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
    }

    loadPosition();
  }, []);

  useEffect(() => {
    api
      .get('points', {
        params: {
          city: props.location.city,
          uf: props.location.uf,
          items: selectedItems
        }
      })
      .then((response) => {
        setPoints(response.data);
      });
  }, [selectedItems]);

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { point_id: id });
  }

  function handleNavigateToCreate() {
    navigation.navigate('Create');
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Encontre no mapa seus esportes favoritos pertinho de você.
          </Text>
          <RectButton
            style={styles.buttonPlus}
            onPress={handleNavigateToCreate}
          >
            <Text>
              <Icon name="plus" color="#fff" size={24} />
            </Text>
          </RectButton>
        </View>

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
            >
              {points.map((point) => (
                <Marker
                  key={String(point.id)}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      source={{
                        uri: point.image
                      }}
                      style={styles.mapMarkerImage}
                    />
                    <Text style={styles.mapMarkerTitle}> {point.name} </Text>
                  </View>
                  <View style={styles.triangle} />
                </Marker>
              ))}
            </MapView>
          )}
        </View>
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
    </>
  );
};

const mapStateToProps = (state: AplicationState) => ({
  location: state.location.data
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(LocationActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Points);

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

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular'
  },

  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 40
  },

  buttonPlus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#34CB79',
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonPlusIcon: {},

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16
  },

  map: {
    width: '100%',
    height: '100%'
  },

  mapMarker: {
    width: 90,
    height: 80
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  triangle: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderWidth: 10,
    borderBottomWidth: 0,
    borderTopColor: '#34CB79',
    borderColor: 'transparent'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover'
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32
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
  }
});
