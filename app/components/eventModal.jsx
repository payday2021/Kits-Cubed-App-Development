import { View, Text, ScrollView, Button, Modal } from 'react-native'
import { endEvent } from 'react-native/Libraries/Performance/Systrace';
import { useEventSignupMutation } from '../features/api/apiSlice';

export const EventModal = ({visible, onClose, event}) => {
    const [userSignup] = useEventSignupMutation();


    const closeButtonPressed = () => {
        onClose();
    }

    const onRegisterButtonPressed = () => {
        userSignup({event_id: event.event_id, event_name: event.name, participant: "Dylan"});
    }

    return(
        <Modal visible = {visible}>
            <View>
                <Text>Hey</Text>
                <Button title = "Register" onPress = {onRegisterButtonPressed}/>
                <Button title = "Close" onPress = {closeButtonPressed}/>
            </View>
        </Modal>
    )
}
