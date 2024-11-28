import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

const RadioButton: React.FC = ({ options, selectedValue, onChange, style }) => {
    return (
        <View style={[styles.container, style]}>
            {options.map((option: any) => {
                let active = option.value == selectedValue;
                return (
                    <TouchableOpacity 
                    style={active ? [styles.radio, styles.activeRadio] : styles.radio} 
                    onPress={() => {
                        onChange(option.value);
                    }}
                    key={option.value} 
                    >
                        <MaterialIcons name={active ? 'radio-button-checked' : 'radio-button-unchecked'} size={24} color={active ? "#06b6d4" : "#64748b"}/>
                        <Text style={active ? [styles.text, styles.activeText] : styles.text}>{option.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    radio: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#ebebeb',
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    activeRadio: {
        backgroundColor: '#06b6d4' + '11',
    },
    text: {
        fontSize: 14,
        marginLeft: 15,
        color: '#6b7280'
    },
    activeText: {
        color: '#374151'
    }
});

export default RadioButton