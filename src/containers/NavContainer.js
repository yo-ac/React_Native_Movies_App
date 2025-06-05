import { View, Text, StyleSheet, Pressable, TextInput, Button } from 'react-native'
import { useState } from 'react'
import SelectBottomSheet from './MovieList';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import TvList from './TvShows';
import SearchResults from './Search';


const NavContainer = () => {

    const [selectedTab, setSelectedTab] = useState('Movies');
    const tabs = ['Movies', 'Search Results', 'TV shows'];
    const [details, setDetails] = useState(null);
    console.log('estos son los detalles de la pelicula', details)


    return (
        <View style={{ flex: 1 }}>
            {!details ? (
                <>
                    <View style={styles.container}>
                        {tabs.map((tab) => (
                            <Pressable
                                key={tab}
                                onPress={() => setSelectedTab(tab)}
                                style={[selectedTab === tab && styles.activeTab]}
                            >
                                <Text
                                    style={[
                                        styles.fontStyle,
                                        selectedTab === tab ? styles.activeText : styles.inactiveText
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                    {selectedTab === 'Movies' ? <MovieList setDetails={setDetails} /> : null}
                    {selectedTab === 'TV shows' ? <TvList setDetails={setDetails}></TvList> : null}
                    {selectedTab === 'Search Results' ? <SearchResults setDetails={setDetails} /> : null}
                </>
            ) : (
                <View style={{ }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth:2, borderColor:'#c5c5c5', height:50 }}>
                        <View>
                            <Button title=' Back to list' onPress={() => setDetails(null)}></Button>
                        </View>
                        <View style={styles.containerDetails}>
                            {details.title ? <Text style={styles.title}>{details.title}</Text> : <Text style={styles.title}>{details.name}</Text>}
                        </View>
                    </View>
                    <MovieDetails movie={details} />
                </View>
            )}
        </View>
    );
}

export default NavContainer;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40,
        alignItems: 'center',
        height: 50,
        borderBottomWidth:2,
        borderColor:'#c5c5c5'
    },
    containerDetails: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    fontStyle: {
        fontSize: 20,
    },
    borderActive: {
        borderBottomColor: "blue",
        borderBottomWidth: 2,
    },
    activeText: {
        color: 'black',
        fontWeight: 'bold',
    },
    inactiveText: {
        color: '#aaa',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})