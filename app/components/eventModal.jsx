import { View, Text, ScrollView, Button, Modal } from 'react-native'
import { useEventSignupMutation } from '../features/api/apiSlice';
import { useEffect, useState } from 'react';
import { useIsUserRegisteredQuery } from '../features/api/apiSlice';

export const EventModal = ({visible, onClose, event}) => {
    const [userSignup] = useEventSignupMutation();

    const { data: isRegistered, error, isLoading } = useIsUserRegisteredQuery({ event_id: event.event_id, participant: "Dylan" });

    useEffect(() => {
        console.log('Component re-rendered');
        console.log(isRegistered)
      }, [isRegistered]);


    const closeButtonPressed = () => {
        onClose();
    }

    const onRegisterButtonPressed = () => {
        userSignup({event_id: event.event_id, event_name: event.name, participant: "Dylan"});
        console.log("you have registered!")
    }


    return(
        <Modal visible = {visible}>
            <View>
                <Text>{event.name}</Text>
                <Text>{event.desc}</Text>
                {!isLoading && !error ? (
                    isRegistered.isRegistered === true
                        ? <Text>You have already registered for this event.</Text>
                        : <Button title="Register" onPress={onRegisterButtonPressed} />
                ) : null}
                <Button title = "Close" onPress = {closeButtonPressed}/>
            </View>
        </Modal>
    )
}
