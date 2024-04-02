//List Screen
import React from 'react';
import { FlatList, Text, View } from 'react-native';

const ListScreen: React.FC = () => {
    const data = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        // Add more items as needed
    ];

    const renderItem = ({ item }: { item: { id: number; name: string } }) => (
        <View>
            <Text>{item.name}</Text>
        </View>
    );

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default ListScreen;