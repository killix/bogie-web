import React from 'react';
import ReactDOM from 'react-dom';
import StyleSheet from 'react-style';

const styles = StyleSheet.create({
    foo: {
        color: 'red',
        backgroundColor: 'white'
    }
});

class HelloWorld extends React.Component {
    render() {
        console.log(styles.foo);
        return <div styles={[styles.foo]}>
            Hello, world!
        </div>;
    }
}

if (typeof window !== 'undefined') {
    ReactDOM.render(
        <HelloWorld color="black" />,
        document.querySelector('main')
    );
}
