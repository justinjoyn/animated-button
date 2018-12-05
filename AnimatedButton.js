import React, {Component} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Progress from 'react-native-progress';

export default class AnimatedButton extends Component {

    constructor(props) {
        super(props);
        this.downloadButtonScale = new Animated.Value(1);
        this.downloadButtonOpacity = new Animated.Value(1);
        this.openButtonScale = new Animated.Value(1);
        this.openButtonOpacity = new Animated.Value(1);
        this.state = {
            buttonState: 1
        };
    }

    static getDerivedStateFromProps(props, state) {
        return ({buttonState: props.buttonState});
    }

    componentDidUpdate(prevProps) {
        console.log(this.state.buttonState);
        if (this.state.buttonState === 1) {
            this.showDownloadButton();
        } else if (this.state.buttonState === 3) {
            this.showOpenButton();
        }
    }

    showDownloadButton() {
        Animated.parallel([
            Animated.spring(this.downloadButtonScale, {
                toValue: 1,
                bounciness: 5,
                velocity: 30,
                useNativeDriver: true
            }),
            Animated.timing(this.downloadButtonOpacity, {toValue: 1, duration: 250, useNativeDriver: true})
        ]).start();
    }

    showOpenButton() {
        Animated.parallel([
            Animated.spring(this.openButtonScale, {toValue: 1, bounciness: 5, velocity: 30, useNativeDriver: true}),
            Animated.timing(this.openButtonOpacity, {toValue: 1, duration: 250, useNativeDriver: true})
        ]).start();
    }

    onDownloadPressed() {
        Animated.parallel([
            Animated.spring(this.downloadButtonScale, {
                toValue: 0.2,
                bounciness: 5,
                velocity: 30,
                useNativeDriver: true
            }),
            Animated.timing(this.downloadButtonOpacity, {toValue: 0, duration: 250, useNativeDriver: true})
        ]).start(() => {
            this.props.onDownloadPressed();
        });
    }

    onOpenPressed() {
        Animated.parallel([
            Animated.spring(this.openButtonScale, {toValue: 0.2, bounciness: 5, velocity: 30, useNativeDriver: true}),
            Animated.timing(this.openButtonOpacity, {toValue: 0, duration: 250, useNativeDriver: true})
        ]).start(() => {
            this.props.onOpenPressed();
        });
    }

    getButton() {
        const {progress, onStopPressed} = this.props;
        switch (this.state.buttonState) {
            case 1:
                return (
                    <Animated.View
                        style={[styles.button, {opacity: this.downloadButtonOpacity}, {transform: ([{scale: this.downloadButtonScale}])}]}>
                        <TouchableOpacity onPress={() => this.onDownloadPressed()}>
                            <Text style={styles.buttonText}>DOWNLOAD</Text>
                        </TouchableOpacity>
                    </Animated.View>
                );
            case 2:
                return (
                    <View style={styles.progressContainer}>
                        <Progress.Circle
                            progress={progress}
                            strokeCap={'round'}
                            thickness={3}
                            borderWidth={0}
                            size={48}
                            indeterminate={progress === 0}
                            animated={true}
                            color={progress === 0 ? '#EEEFF4' : '#1E62B3'}
                            unfilledColor={progress === 0 ? '#FFF' : '#EEEFF4'}/>
                        {progress === 0 ? null : <TouchableOpacity onPress={onStopPressed} style={styles.stopButton}/>}
                    </View>
                );
            case 3:
                return (
                    <Animated.View
                        style={[styles.button, {opacity: this.openButtonOpacity}, {transform: ([{scale: this.openButtonScale}])}]}>
                        <TouchableOpacity onPress={() => this.onOpenPressed()}>
                            <Text style={styles.buttonText}>OPEN</Text>
                        </TouchableOpacity>
                    </Animated.View>
                );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.getButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 80
    },
    button: {
        backgroundColor: '#EEEFF4',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 50
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'Product Sans Bold',
        color: '#1E62B3'
    },
    progressContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    stopButton: {
        width: 18,
        height: 18,
        backgroundColor: '#1E62B3',
        borderRadius: 2,
        position: 'absolute'
    }
});
