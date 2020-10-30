import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, View, Text} from 'react-native';
import Container from '../../generales/Container';
import CargandoModal from '../../generales/CargandoModal';
import {
  get_albums_request,
  accept_shared_album,
} from '../../utils/apis/cart_api';
import {RequestView} from '../components/RequestView'

function AlbumRequest({navigation}) {
  const [albumRequest, setAlbumRequest] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get_albums_request().then((data) =>{
      setAlbumRequest(data.data);
      setLoading(false)
    });
  }, [])

  const acceptRequest = (id) => {
    setLoading(true)
    const sharedIdRequest = {
      "shared_id": id
    }

    accept_shared_album(sharedIdRequest).then((data) =>{
        console.log(data);
        setLoading(false)
        navigation.goBack()
      });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F6FA'}}>
      <CargandoModal show={loading} title={'Cargando'} />
      <ScrollView>
        <Container footer={false}>
          <View style={{marginTop: '15%'}} />
          {albumRequest.map((request, index) => (
            <RequestView
              key={index}
              username={request.from_user_fullname}
              fullName={request.to_user_fullname}
              onPressFunction={() => acceptRequest(request.shared_id)}
            />))
          }
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AlbumRequest;
