import React from 'react';
import { View, Text, Button } from 'react-native';

import { useGetEventsQuery } from '../features/api/apiSlice';


const EventsScreen = () => {
    const {
        data: events,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetEventsQuery()

   // console.log(events)



    let content;
    if (isLoading) {
        content = <Text>is still loading events</Text>
      } else if (isSuccess) {
        //content = JSON.stringify(events);
        console.log(events)
        content = events.events.map(event => {
            return (
                <View key = {event.id}>
                    <Text>{event.name}</Text>
                    <Text>{event.desc}</Text>
                    <Button title = "Join"/>
                </View>
            )
        })

      } else if (isError) {
        content = <Text>{error.toString()}</Text>
      }


    return (
        <View>
            <Text>Events Screen</Text>
            <Text>{content}</Text>
        </View>
    )
}

export default EventsScreen;