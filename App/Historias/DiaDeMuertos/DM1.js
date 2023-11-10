import { View, Text, StyleSheet, Image} from 'react-native'
import React, { useContext } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { useNavigation } from '@react-navigation/native'
import { DataContext } from '../../Context/DataContext'
const nuevosDatosTemporales = [
  {
    id:1,
    nombre:'Pan con Madre',
    descripcion: 'Pan hecho a mano, en lotes pequeños y elaborado con insumos de productores locales. Creemos en la alimentación como base para el balance físico, mental, emocional y espiritual.',
    latitud: 17.0690952,
    longitud: -96.7256769,
    uri: 'https://scontent.fpbc2-3.fna.fbcdn.net/v/t39.30808-6/354052576_2212493232283193_7200578155207068515_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwUgHXQ8EB5c_xh89FRDo51r3knHpe2tfWveScel7a16FaU_rIBhCs0WvsQKekBRRx64fFVMA7FGIfWBLBeL7l&_nc_ohc=0WSLA_EL7MsAX_zMVMg&_nc_ht=scontent.fpbc2-3.fna&oh=00_AfDYhW17AALDiZYm7zjJvf3k-DiB9YDRjQtt4GGTmbA5rw&oe=653D5840'
  },
  {
    id:2,
    nombre:'Pan de Olla',
    descripcion: 'Preparate tu delicioso pan con una técnica diferente, en un olla en ves de horno convencional',
    latitud:17.0682002,
    longitud: -96.7181433,
    uri: 'https://scontent.fpbc2-1.fna.fbcdn.net/v/t39.30808-6/354620860_672271224917622_8484305176873472826_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE5BwMSFJfLnXbth-k_TPplfYF-xQxOVcl9gX7FDE5VyRqsn2QCEW1kiBRGMHVH1U7JNXeu0idEOZRA89HebId4&_nc_ohc=zCm5LXS1-s8AX9au0sw&_nc_ht=scontent.fpbc2-1.fna&oh=00_AfAJEyBhLDAaWI6zchaM8BhkptZNwXKpWv6T-FcSEGANkg&oe=653C866B'
  },
  {
    id:3,
    nombre:'Panadería Juquilita',
    descripcion: 'Demostración de la elaboración del pan ven con nosotros y aprende a elaborar el rico pan artesanal',
    latitud: 17.0825566,
    longitud: -96.761387,
    uri: 'https://scontent.fpbc2-1.fna.fbcdn.net/v/t1.6435-9/122753033_144582224066071_7271310451483107058_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=dd63ad&_nc_eui2=AeFfAB_VB4EdKQ13jjArtC2cLlSYqD3HVN8uVJioPcdU3wrHc-8bCVUVZ-x1_y4HMwJRhDn7jNSMeBOr4g2QR6ra&_nc_ohc=cyNno4O_8SAAX-4ZWz6&_nc_ht=scontent.fpbc2-1.fna&oh=00_AfDXBcnZPQ_FS7lwM51HlKKc0cCS9nAoHP2UgWHGW_sR0w&oe=655F64DE'
  },
  {
    id:4,
    nombre:'Panadería Reforma',
    descripcion:'Disfruta tu rico pan con un desayuno, ya sea chocolate calientito o cafe',
    latitud: 17.0761605,
    longitud: -96.7130133,
    uri: 'https://scontent.fpbc2-1.fna.fbcdn.net/v/t39.30808-6/305808092_509707524489650_8349073771784066670_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEAugVF1PC8zlElNmzGz4EfvuzGMN-Y4Ya-7MYw35jhhrOv4b4ifJKPvzauEGA3Uo7x0GW_12OAoQPQATf3PKjO&_nc_ohc=nV-jf2nFmcEAX_NNk1I&_nc_ht=scontent.fpbc2-1.fna&oh=00_AfDhVEdh70bCkrllNeWrQjAnaqtAlQFeZBTAsLPyrHN_EA&oe=653C216B'
  },
  {
    id:5,
    nombre:'Panificadora la luna',
    descripcion: 'Tu rico pan en un solo lugar, la mejor opcion a la hora de eleguir',
    latitud:17.0612223,
    longitud: -96.7209765,
    uri: 'https://pqs.pe/wp-content/uploads/2021/04/PQS-Emprendimiento-en-pasteleria-o-panaderia-desde-casa-800x533.jpg'
  }
];
const slides=[
  {
    id:1,
    tittle:'La Muerte',
    description: 'La muerte induce miedo y la evitamos, la escondemos, la exiliamos de nuestra existencia; incita amor y la buscamos, nos'
    + ' suicidamos y le rezamos; nos provoca asombro y la rozamos, nos reímos con'
    + ' y de ella, la besamos; nos vemos a diario con ella y con ella aprendemos a'
    + ' darle sentido a la existencia, a vivir. Sin vida no hay muerte, y viceversa; hay'
    + ' que vivir de muerte para aprender a vivir, y morir de vida para aprender a morir',
    image: require('../../../assets/craneo.png'),
    color: '#281f52'
  },
  {
    id:2,
    tittle:'¿Por qué tenerle miedo?',
    description: 'Desde los años cuarenta del siglo XX se ha dicho que México es un país escatológico y morboso; que sus pobladores se burlan de la muerte, juegan con ella y se la comen virtualmente convertida en dulces de azúcar; incluso se ha dicho que en México hasta la muerte es dulce',
    image: require('../../../assets/identify.png'),
    color: '#281f52'
  },
  {
    id:3,
    tittle:'El inicio de todo',
    description: 'Muchas personas eran perseguidas por sus creencias en la iglesia católica y muchos murieron anónimos por amor a Cristo al difundir sus enseñanzas y seguir su ejemplo, por lo que los papas decidieron fijar una celebración para honrar su muerte, el abad de Cluny propuso la fecha el dia 1 de noviembre',
    image: require('../../../assets/cristianismo.png'),
    color: '#281f52'
  },
  {
    id:4,
    tittle:'Celebración de Todos los Santos',
    description: 'En ese día las iglesias, conventos y santuarios exhibían sus reliquias, tesoros, restos y reliquias, a los cuales el creyente le ofrendaba oraciones para evitar el infierno eterno, entre otras costumbres era el de hacer dulces y panes imitando a las reliquias, panes en forma de huesos, galletas en forma de muñecos y animales, estos manjares eran bendecidos y mas tarde en la casa se colocaba en la “mesa del santo” que consistía en una imagen del fallecido adornado con los dulces y panes para pedir su protección en el más allá',
    image: require('../../../assets/pan_de_muerto.png'),
    color: '#281f52'
  },
  {
    id:5,
    tittle:'Su llegada',
    description: 'El 1 de noviembre este llego a Nueva España con la conquista, pero los primeros años no se contaban con las reliquias en las iglesias por lo que se tuvo que traer desde Roma, estas piezas entraron por el puerto de Veracruz y fueron seguidas por muchos indios conversos, en cada poblado les levantaron arcos de flores',
    image: require('../../../assets/altar.png'),
    color: '#281f52'
  },
  {
    id:6,
    tittle:'¿Estás listo?',
    description: 'Reune todos los logros de esta misión y sumergete en una nueva aventura',
    image: require('../../../assets/identify.png'),
    color: '#281f52'
  }
]
export default function DM1() {
  const navigation = useNavigation();
  const{setData} = useContext(DataContext);
  const buttonLabel = (label) =>{
    return(
      <View style={{
        padding:12
      }}>
        <Text style={{
          color:'white',
          fontWeight: '600',
          fontSize: 16,
        }}>
          {label}
        </Text>
      </View>
    )
  }

  return (
    <AppIntroSlider
      data={slides}
      renderItem={({item}) => {
        return(
          <View style={{
            flex: 1,
            alignItems: 'center',
            padding: 15,
            paddingTop:100,
            backgroundColor: item.color
          }}>
            <Image
              source={item.image}
              style={{
                width: 400,
                height: 400,
              }}
              resizeMode='contain'
            />
            <Text style={{
              fontWeight: 'bold',
              color:'white',
              fontSize: 22,
            }}>
              {item.tittle}
            </Text>
            <Text style={{
              textAlign:'center',
              paddingTop: 5,
              color: '#072F4A',
              fontSize: 17,
              textAlign:'center',
              color: 'white',
              fontWeight: '400',
              marginTop:'2'
            }}>
              {item.description}
            </Text>
          </View>
        )
      }}
      activeDotStyle={{
        backgroundColor: '#f52d56',
        width: 30,
      }}
      showPrevButton
      renderNextButton={() => buttonLabel("Siguiente")}
      renderSkipButton={() => buttonLabel("Cancer")}
      renderDoneButton={() => buttonLabel("Vamos")}
      renderPrevButton={() => buttonLabel("Atras")}
      onDone={() => {
        setData(nuevosDatosTemporales);
        navigation.navigate('Home');
      }}
      />
  );
}

const styles = StyleSheet.create({

})
