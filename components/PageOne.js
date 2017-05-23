import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-elements';

import Panel from './Panel';
import albums from '../json/albums.json';

// Make a component
class PageOne extends Component {
  state = { albums: [] };

  componentWillMount() {
    this.setState({ albums });
    console.log(this.state);
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.state.albums.map((album) => (

            <Panel
              album = {{...album}}
              navigation = {this.props.navigation}
              />

          ))}
        </List>
      </ScrollView>
    );
  }
}

export default PageOne;
