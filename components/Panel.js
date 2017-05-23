import React, { Component } from 'react';
import {
    View,
    Animated,
    PanResponder
} from 'react-native';

import { ListItem } from 'react-native-elements';

class Panel extends Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        this.state = { position };
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            //onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: (this.onShouldDrag),
            onPanResponderMove: (event, gesture) => {
                this.state.position.setValue({ x: gesture.dx });
            },
            onPanResponderRelease: this.onReleaseItem,
            onPanResponderTerminate: this.onReleaseItem,
        });
    }

    onShouldDrag = (event, gesture) => {
        const { dx } = gesture;
        return Math.abs(dx) > 2;
    }

    onReleaseItem = (event, gesture) => {
        let config = {
            toValue: { x: 0, y: 0 },
            duration: 500,
        };

        Animated.spring(
            this.state.position,
            config,
        ).start();
    }


    render() {
        const { album, navigation } = this.props;
        const { position } = this.state;
        return (
            <Animated.View
                style={position.getLayout()}
                {...this.panResponder.panHandlers}
            >

            <ListItem
              key={album.title}
              roundAvatar
              avatar={{ uri: album.image }}
              title={album.title}
              subtitle={album.artist}
              onPress={() => navigation.navigate('Details', { ...album })}
            />

            </Animated.View>
        );
    }
}

export default Panel;
