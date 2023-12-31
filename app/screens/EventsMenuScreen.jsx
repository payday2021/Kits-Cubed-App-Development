import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
  Button
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import {
  getAllEvents,
  getUserEvents,
  addUserToEvent
} from '../features/events/eventsSlice';

const EventsMenuScreen = (props) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  useEffect(() => {
    setList(props.list);
  }, [props.list]);

  const fetchAllEvents = () => {
    dispatch(getAllEvents());
  }

  const fetchUserEvents = () => {
    dispatch(getUserEvents({
      id: props.id
    }));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Events</Text>
      <ScrollView>
        <View style={styles.filter}>
          <Button
            title="All Events"
            onPress={() => fetchAllEvents()}
          ></Button>
          <Button
            title="My Events"
            onPress={() => fetchUserEvents()}
          ></Button>
        </View>
        <View>
          {
            list ? (
              list.map((event) => {
                return (
                  <View key={event.EventID}>
                    <Text>{event.EventName}</Text>
                    <Text>{event.EventDate}</Text>
                    <Text>({event.EventDesc})</Text>
                    <Text>({event.EventLocation})</Text>
                    <Button
                      title="Add"
                      onPress={() => dispatch(addUserToEvent({
                        id: props.id,
                        eventId: event.EventID
                      }))}
                    ></Button>
                  </View>
                );
              })
            ) : (
              <Text>No events</Text>
            )
        }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    width: Dimensions.get('screen').width
  },
  filter: {
    flex: 1,
    flexDirection: 'row',
    gap: 20
  }
});

const mapStateToProps = (state) => {
  return {
    id: state.auth.id,
    list: state.events.list,
    status: state.events.status
  };
};

export default connect(mapStateToProps)(EventsMenuScreen);
