import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import { List, ListItem, SearchBar, Icon } from 'react-native-elements';
import { createStackNavigator, withNavigation } from 'react-navigation';

import PrayerDetail from '../screens/PrayerDetailScreen';

class PrayerList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            fulldata: [],
            loading: false,
            query: ''
        };
    };

    componentDidMount() {
        this.makeRequest();
    };

    makeRequest = () => {
        const url = "https://react-native-gcapp.firebaseio.com/-LXstc3dEuV9Da-h3Ak2.json";
        this.setState({ loading: true });
        fetch(url)
        .then(response => response.json())
        .then(response => {
            this.setState({
                data: response.prayerList,
                fulldata: response.prayerList
            })
            console.log(fulldata);
        })
        .catch(error => {
            this.setState({ error, loading: false});
        })
    };

    renderRow ({ item }) {
        return (
          <ListItem
            title={item.title}
            subtitle={item.author}
            leftAvatar={<Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-native-gcapp.appspot.com/o/prayerPictures%2Fscenery.jpg?alt=media&token=847b9847-b3c7-44c6-b2c3-541e9e9330a2" }} style={{borderRadius:30, height:50, width:50 }} />}
            rightIcon={<Icon name='chevron-right' type='material-community'/>}
            onPress={() => this.props.navigation.navigate('PrayerDetail')}
            />
        )
    };
    
    renderSeperator = () => {
        return(
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#CED0CE',
                }}
            />
        );
    };

    searchHandler = (text) => {
        this.setState({ query: text });
    };

    renderHeader = () => {
        console.log(this.state.query);
        return <SearchBar 
            placeholder="Search Prayers..."
            onChangeText={this.searchHandler}
            value={this.state.query}
            />
    };

    renderFooter = () =>{

        if(this.state.loading){
            return (
                <View style={{paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE'}}>
                    <ActivityIndicator animating size="large"/>
                </View>
            );
        }
        else{
            return(
                <View style={{paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE'}}>
                </View>
            )
        }
 
    };

    render(){       
        return (
            <View>
            {   
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.name}
                    ItemSeparatorComponent={this.renderSeperator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    keyExtractor={item => item.title}
                />
            }
            </View>
        );
    }
}

export default withNavigation(PrayerList)


