import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import Container from '../../generales/Container';
import GeneralImage from '../../generales/GeneralImage';
import CargandoModal from '../../generales/CargandoModal';
import ButtonReload from '../../generales/ButtonReload';
import Icon from 'react-native-vector-icons/dist/Feather';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {colores, estiloDeLetra, tipoDeLetra} from '../../constantes/Temas';
import {get_carts} from '../../utils/apis/cart_api';
import {get_profile_api} from '../../utils/apis/login_api';

const STATUS = 'draft';

const DraftCard = ({cart, onPressGoToDetail}) => {
  const {t} = useTranslation();
  const cartDate = moment(cart.created).parseZone();

  return (
    <View style={style.draftContainer}>
      <GeneralImage styleImg={style.draftImage} uri={cart.file} />
      <View style={style.infoContainer}>
        <View style={style.titleContainer}>
          <Text style={style.albumTitle}>
            Álbum: {cart.total_pages} páginas
          </Text>
          <Text style={style.price}>$5000</Text>
        </View>
        <Text style={style.name}>{cart.name}</Text>

        <View style={style.dateContainer}>
          <Icon name="calendar" color={colores.grisFormatoAlbum} size={18} />
          <Text style={style.dateText}>
            {cartDate.format('DD')} de{' '}
            {t(`MONTHS.${cartDate.format('MMMM').toUpperCase()}`)} de{' '}
            {cartDate.format('yyy')}
          </Text>
        </View>

        <Text style={style.description} numberOfLines={4}>
          {cart.description}
        </Text>
      </View>
      {cart.active ? (
        <View>
          <View style={style.availableLabel}>
            <Icon
              name="eye"
              style={style.availableLabelIcon}
              size={20}
              color={colores.blanco}
            />
            <Text style={style.availableLabelText}>Disponible</Text>
          </View>
          <View>
            <TouchableOpacity style={style.button} onPress={onPressGoToDetail}>
              <Text style={style.buttonText}>¡TERMINAME!</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={style.disableLabel}>
          <Icon
            name="eye-off"
            style={style.disableIcon}
            size={20}
            color={colores.blanco}
          />
          <Text style={style.disableLabelText}>No Disponible</Text>
        </View>
      )}
    </View>
  );
};

function Drafts({navigation}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [carts, setCarts] = useState([]);
  const [profile, setProfile] = useState({});

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const responseProfile = await get_profile_api();
      const responseCarts = await get_carts(STATUS);
      const selectedCarts = responseCarts.data.filter(
        (selectedCart) => selectedCart.total_pages > 10,
      );

      setCarts(selectedCarts);
      setProfile(responseProfile.data[0]);
      setLoading(false);
    } catch {
      setError(true);
    }
  }, []);

  const handleGoBack = () => navigation.goBack();

  const renderCarts = ({item: cart}) => {
    const handleOnPressGoToDetail = () => {
      navigation.navigate('CartLayoutDetail', {
        cartId: cart.id,
        formatId: cart.format_id,
      });
    };

    return (
      <DraftCard cart={cart} onPressGoToDetail={handleOnPressGoToDetail} />
    );
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <CargandoModal title="Cargando" show={loading} />
      <View style={style.mainContainer}>
        <Container footer={false}>
          <TouchableOpacity style={style.header} onPress={handleGoBack}>
            <Icon name="arrow-left" size={27} color={colores.negro} />
            <Text style={style.headerText}>Borradores</Text>
          </TouchableOpacity>

          {!loading && !error && (
            <>
              <FlatList
                ListHeaderComponentStyle={style.listHeader}
                ListHeaderComponent={
                  <View>
                    <Image
                      style={style.bgHeader}
                      source={require('../../assets/img/bg-app.png')}
                    />
                    <View style={style.avatarContainer}>
                      <GeneralImage
                        styleImg={style.avatar}
                        uri={profile.avatar}
                      />
                    </View>
                  </View>
                }
                renderItem={renderCarts}
                data={carts}
                keyExtractor={(cart) => cart.id.toString()}
              />
            </>
          )}
          {error && <ButtonReload onReload={loadData} />}
        </Container>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colores.fondoScreen,
  },
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    backgroundColor: colores.blanco,
    shadowColor: colores.negro,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  headerText: {
    marginLeft: 16,
    fontSize: 18,
    fontFamily: tipoDeLetra.regular,
  },
  listHeader: {
    marginBottom: 30,
  },
  bgHeader: {
    height: 200,
    width: '100%',
    backgroundColor: colores.blanco,
  },
  avatarContainer: {
    position: 'absolute',
    top: 10,
    justifyContent: 'flex-end',
    height: 200,
    width: '100%',
  },
  avatar: {
    height: 170,
    width: 170,
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 8,
    borderColor: colores.blanco,
    backgroundColor: colores.fondoScreen,
  },
  draftImage: {
    width: '100%',
    height: 275,
    backgroundColor: colores.blanco,
  },
  draftContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 30,
    paddingBottom: 20,
    borderRadius: 5,
    backgroundColor: colores.blanco,
    elevation: 3,
  },
  name: {
    marginTop: 8,
    color: colores.negro,
    fontSize: 20,
  },
  infoContainer: {
    padding: 16,
  },
  description: {
    marginTop: 6,
    ...estiloDeLetra.negrita,
    color: colores.gris,
  },
  availableLabel: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginHorizontal: 16,
    borderRadius: 5,
    padding: 3,
    marginBottom: 20,
    backgroundColor: colores.cartButton,
  },
  availableLabelIcon: {
    marginHorizontal: 5,
  },
  availableLabelText: {
    marginRight: 5,
    ...estiloDeLetra.negrita,
    color: colores.blanco,
  },
  disableLabel: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 16,
    borderRadius: 5,
    padding: 3,
    marginBottom: 20,
    backgroundColor: colores.rojo,
  },
  disableLabelText: {
    marginHorizontal: 10,
    ...estiloDeLetra.negrita,
    color: colores.blanco,
  },
  disableIcon: {
    marginLeft: 5,
  },
  button: {
    width: '85%',
    padding: 15,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colores.logo,
  },
  buttonText: {
    textAlign: 'center',
    ...estiloDeLetra.negrita,
    color: colores.blanco,
    fontSize: RFPercentage(2.2),
  },
  titleContainer: {
    flexDirection: 'row',
  },
  albumTitle: {
    color: colores.grisFormatoAlbum,
    fontSize: 14,
  },
  price: {
    marginLeft: 5,
    color: colores.grisFormatoAlbum,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  dateText: {
    marginLeft: 10,
    color: colores.grisFormatoAlbum,
    fontSize: 14,
  },
});

const mapStateToProps = (state) => {
  const carts = state.cart.data.filter(
    (cart) => cart.status === 'draft' && cart.total_pages > 10,
  );

  return {carts};
};
export default connect(mapStateToProps)(Drafts);
