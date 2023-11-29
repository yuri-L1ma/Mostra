import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../firebase/firebase_config'

class StarService {
    static getStars = async (callback) => {
        try {
            const starCollection = collection(firestore, "star")
            const snapshot = await getDocs(starCollection)

            const stars = [];

            snapshot.forEach((document) => {
                const data = document.data()

                const star = {
                    id: document.id,
                    descricao: data.descricao,
                    fotos: data.fotos,
                    localizacao: {
                        endereco: data.localizacao.endereco,
                        latitude: data.localizacao.latitude,
                        longitude: data.localizacao.longitude,
                    },
                    name: data.name,
                }

                stars.push(star)
            })

            callback(stars);
        } catch (error) {
            console.log("Erro ao tentar pegar os dados do Firestore: ", error)
        }
    }
}

export default StarService
