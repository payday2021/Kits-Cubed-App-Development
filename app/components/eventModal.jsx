import { View, Text, ScrollView, Button, Modal } from 'react-native'

export const EventModal = ({visible, onClose, event}) => {

    const closeButtonPressed = () => {
        onClose(0);
    }

    return(
        <Modal visible = {visible}>
            <View>
                <Text>Hey</Text>
                <Button title = "Close" onPress = {closeButtonPressed}/>
            </View>
        </Modal>
    )
}
