import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, ScrollView, Button, Modal } from 'react-native'
import { KitModal } from '../../components/kitModal';

export const KitsList = ( props ) => {
    const [visibleModalID, setVisibleModalID] = useState(null)




    return (
        <ScrollView>
        <View>
          {props.kitlist.map((kit) => {
            return (
              <View key={kit.id}>
                <Text>{kit.id}</Text>
                <Text>{kit.name}</Text>
                <Text>Type: {kit.typeK}</Text> 
              {kit && (
                <KitModal
                  visible={kit.id === visibleModalID}
                  onClose={() => setVisibleModalID(null)}
                  kit={kit}
                />
              )}
                <Button
                    title = "More Details"
                    onPress = {() => setVisibleModalID(kit.id)}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
  
    );
};