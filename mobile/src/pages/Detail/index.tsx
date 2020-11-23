import { Feather as Icon, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    name: string;
    whatsapp: string;
    email: string;
    city: string;
    uf: string;
  };
  items: { title: string }[];
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  if (!data.point) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{
            uri: data.point.image
          }}
        />

        <Text style={styles.pointName}>{data.point.name}</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.field}>Esporte(s) presente no local: </Text>
          <Text style={styles.pointItems}>
            {data.items.map((item) => item.title).join(', ')}
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.field}>Qualidades do local: </Text>

          <View style={styles.qualityItem}>
            <View>
              <Text>Acessibilidade</Text>
            </View>
            <View style={styles.avaliationContainer}>
              <View style={styles.avaregeStar}>
                <Text style={styles.avaregeStarText}>5.0</Text>
              </View>
              <View style={styles.triangle} />
              <View style={styles.starInput}>
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
              </View>
            </View>
          </View>

          <View style={styles.qualityItem}>
            <View>
              <Text>Segurança</Text>
            </View>
            <View style={styles.avaliationContainer}>
              <View style={styles.avaregeStar}>
                <Text style={styles.avaregeStarText}>3.6</Text>
              </View>
              <View style={styles.triangle} />
              <View style={styles.starInput}>
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
              </View>
            </View>
          </View>

          <View style={styles.qualityItem}>
            <View>
              <Text>Iluminação</Text>
            </View>
            <View style={styles.avaliationContainer}>
              <View style={styles.avaregeStar}>
                <Text style={styles.avaregeStarText}>4.2</Text>
              </View>
              <View style={styles.triangle} />
              <View style={styles.starInput}>
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
                <AntDesign {...starIcon} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.field}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.point.city}, {data.point.uf}
          </Text>
        </View>

        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleNavigateBack}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-left" color="#fff" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Voltar</Text>
          </RectButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const starIcon = {
  name: 'staro',
  size: 24,
  color: '#6C6C80'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row'
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
    flex: 1
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16
  },

  fieldContainer: {
    marginTop: 30
  },

  field: {
    color: '#322153',
    fontSize: 16,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  qualityItem: {
    marginTop: 20
  },

  avaliationContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#999999',
    flexDirection: 'row',
    paddingRight: 15
  },

  avaregeStar: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#00be56',
    padding: 4
  },

  avaregeStarText: {
    color: '#fff'
  },

  triangle: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderWidth: 10,
    transform: [{ rotate: '-90deg' }],
    borderTopColor: '#00be56',
    borderColor: 'transparent'
  },

  starInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    padding: 4
  }
});

export default Detail;
