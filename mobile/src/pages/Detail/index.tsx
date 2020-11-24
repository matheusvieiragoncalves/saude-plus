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
  ScrollView,
  TextInput
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

interface AvaliationItems {
  id: number;
  name: string;
  avarege: number;
}

interface Comment {
  id: number;
  user: string;
  date: string;
  stars: number;
  comment: string;
  like: number;
  dislike: number;
}

const avaliationItems = [
  { id: 1, name: 'Facilidade de acesso', avarege: 5.0 },
  { id: 2, name: 'Segurança', avarege: 3.2 },
  { id: 3, name: 'Iluminação', avarege: 4.6 }
] as AvaliationItems[];

const comments = [
  {
    id: 1,
    user: 'Matheus Vieira',
    date: '21/11/2020',
    stars: 4,
    like: 14,
    dislike: 2,
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  },
  {
    id: 2,
    user: 'Júnior Augusto',
    date: '22/11/2020',
    stars: 2,
    like: 4,
    dislike: 16,
    comment:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
  },
  {
    id: 3,
    user: 'Patrick Alves',
    date: '22/11/2020',
    stars: 5,
    like: 5,
    dislike: 0,
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  },
  {
    id: 4,
    user: 'Thyerre dos Santos',
    date: '23/11/2020',
    stars: 3,
    like: 48,
    dislike: 3,
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  }
] as Comment[];

const Detail = () => {
  const [newComment, setNewComment] = useState('');
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

  function handleCancelComment() {
    setNewComment('');
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

          {avaliationItems.map((item) => (
            <View key={item.id} style={styles.qualityItem}>
              <View>
                <Text>{item.name}</Text>
              </View>
              <View style={styles.avaliationContainer}>
                <View style={styles.avaregeStar}>
                  <Text style={styles.avaregeStarText}>
                    {item.avarege.toFixed(1)}
                  </Text>
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
          ))}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.field}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.point.city}, {data.point.uf}
          </Text>
        </View>

        <View style={styles.commentsContainer}>
          <Text style={styles.field}>Comentários</Text>

          <View style={styles.newCommentContainer}>
            <View style={styles.userAvatar}>
              <AntDesign name="user" size={24} color="black" />
            </View>

            <View style={styles.commentInputContainer}>
              <TextInput
                multiline={true}
                style={styles.commentInput}
                value={newComment}
                autoCorrect={false}
                onChangeText={setNewComment}
                placeholder="Adicionar um comentário público"
              />
              <View style={styles.commentActionButtons}>
                <RectButton
                  style={styles.buttonCancelComment}
                  onPress={handleCancelComment}
                >
                  <Text style={styles.buttonCancelCommentText}>Cancelar</Text>
                </RectButton>

                <RectButton style={styles.buttonSaveComment} onPress={() => {}}>
                  <Text style={styles.buttonSaveCommentText}> Publicar</Text>
                </RectButton>
              </View>
            </View>
          </View>

          {comments.map((item) => (
            <View key={item.id} style={styles.comment}>
              <View style={styles.userContainer}>
                <View style={styles.userAvatar}>
                  <AntDesign name="user" size={24} color="black" />
                </View>

                <Text style={styles.userName}>{item.user}</Text>
              </View>
              <View style={styles.commentInfo}>
                <View style={styles.starListComment}>
                  {[...Array(5)].map((_, index) => {
                    if (index < item.stars)
                      return (
                        <AntDesign
                          key={index}
                          {...starIconComment}
                          name="star"
                        />
                      );

                    return <AntDesign key={index} {...starIconComment} />;
                  })}
                </View>
                <Text style={styles.commentDate}>{item.date}</Text>
              </View>
              <Text style={styles.commentText}>{item.comment}</Text>

              <View style={styles.commentFeedback}>
                <AntDesign
                  name="like2"
                  size={24}
                  color="black"
                  style={styles.commentFeedbackItem}
                />
                <Text style={styles.commentFeedbackItem}>{item.like}</Text>

                <AntDesign
                  name="dislike2"
                  size={24}
                  color="black"
                  style={styles.commentFeedbackItem}
                />
                <Text style={styles.commentFeedbackItem}>{item.dislike}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
};

const starIcon = {
  name: 'staro',
  size: 24,
  color: '#6C6C80'
};

const starIconComment = {
  name: 'staro',
  size: 16,
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
  },

  commentsContainer: {
    marginTop: 20,
    height: '100%',
    paddingBottom: 20
  },

  comment: {
    marginTop: 40
  },

  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  userAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 10
  },

  userName: { fontSize: 14 },

  commentInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10
  },

  starListComment: {
    flexDirection: 'row',
    marginRight: 10
  },

  commentDate: {
    color: '#777'
  },

  commentText: {
    textAlign: 'justify',
    marginTop: 10
  },

  commentFeedback: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4
  },

  commentFeedbackItem: {
    marginRight: 10
  },

  newCommentContainer: {
    marginTop: 30,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 20,
    width: '100%',
    justifyContent: 'space-between'
  },

  commentInputContainer: {
    width: '82%'
  },

  commentInput: {
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },

  commentActionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 14
  },

  buttonCancelComment: {
    marginRight: 10,
    borderRadius: 4
  },

  buttonSaveComment: {
    backgroundColor: '#00007a',
    borderRadius: 4
  },

  buttonSaveCommentText: {
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4
  },

  buttonCancelCommentText: {
    borderWidth: 1,
    borderColor: '#00007a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  }
});

export default Detail;
