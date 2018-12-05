import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import AnimatedButton from "./AnimatedButton";

export default class App extends Component {

    constructor(props) {
        super(props);
        let intervalId = null;
        this.state = {
            progress: 0,
            buttonState: 1
        }
    }

    simulateDownload() {
        this.intervalId = setInterval(() => {
            if (this.state.progress <= 1) {
                this.setState({progress: this.state.progress + 0.05});
            } else {
                this.setState({buttonState: 3});
                clearInterval(this.intervalId);
            }
        }, 100);
    }

    _onDownloadPressed() {
        this.setState({buttonState: 2});
        setTimeout(this.simulateDownload.bind(this), 1000);
    }

    _onStopPressed() {
        clearInterval(this.intervalId);
        this.setState({buttonState: 1, progress: 0});
    }

    _onOpenPressed() {
        this.setState({buttonState: 1, progress: 0});
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#FFF'} barStyle={"dark-content"}/>
                <Text style={styles.instructions}>
                    Press the DOWNLOAD button to simulate the downloading progress. During the download progress STOP
                    button is displayed, which when clicked will stop the progress. Press the OPEN button to reset the
                    button to initial state.
                </Text>
                <AnimatedButton
                    progress={this.state.progress}
                    buttonState={this.state.buttonState}
                    onDownloadPressed={() => this._onDownloadPressed()}
                    onStopPressed={() => this._onStopPressed()}
                    onOpenPressed={() => this._onOpenPressed()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontFamily: 'Product Sans Regular',
        padding: 20
    },
});
